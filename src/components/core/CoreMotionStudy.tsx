import { useEffect, useId, useRef } from 'react';

export type MotionStudyKind = 'ribbon' | 'orbit' | 'tide';

type Point = { x: number; y: number; z: number };
type Projected = Point & { perspective: number };
type Face = { points: Projected[]; depth: number; orange: boolean; shade: number };

const TAU = Math.PI * 2;
const FRAME_MS = 1000 / 30;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Three self-contained motion studies; no assets, WebGL or animation dependency. */
export function CoreMotionStudy({ kind, paused }: { kind: MotionStudyKind; paused: boolean }) {
  const helpId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const kindRef = useRef(kind);
  const restartRef = useRef<() => void>(() => {});

  // Keep the scene and camera intact when the studio changes kind or pauses it.
  useEffect(() => {
    pausedRef.current = paused;
    kindRef.current = kind;
    restartRef.current();
  }, [paused, kind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !button || !context) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1, height = 1, frame = 0;
    let elapsed = 0, lastTime = 0, lastPaint = 0;
    let yaw = 0, pitch = 0, tiltX = 0, tiltY = 0;
    let shape = 0, shapeTarget = 0;
    let inViewport = true;
    let dragged = false;
    let gesture: { id: number; x: number; y: number; lastX: number; lastY: number; touch: boolean; turning: boolean } | null = null;
    const pointer = { x: 0, y: 0 };
    const still = () => pausedRef.current || reducedMotion.matches;
    const running = () => !still() && !document.hidden && inViewport;

    // Deterministic orbital seeds: even coverage with slightly varied particle sizes.
    const particles = Array.from({ length: 1100 }, (_, index) => ({
      theta: index * 2.399963229728653,
      phi: TAU * ((index * 0.414213562373095) % 1),
      offset: TAU * ((index * 0.754877666246693) % 1),
      size: 0.7 + ((index * 0.569840290998053) % 1) * 0.6,
      orange: index % 13 < 3,
    }));

    function camera() {
      const x = 0.9 + pitch + tiltY * 0.17;
      const y = -0.28 + yaw + tiltX * 0.25 + elapsed * 0.055;
      const cosX = Math.cos(x), sinX = Math.sin(x);
      const cosY = Math.cos(y), sinY = Math.sin(y);
      const project = (point: Point): Projected => {
        const py = point.y * cosX - point.z * sinX;
        const pz = point.y * sinX + point.z * cosX;
        const px = point.x * cosY + pz * sinY;
        const depth = -point.x * sinY + pz * cosY;
        const perspective = 5.5 / (5.5 - depth);
        return { x: px * perspective, y: py * perspective, z: depth, perspective };
      };
      // A fixed conservative sphere bound avoids fit-to-content breathing or edge clipping.
      const bound = kindRef.current === 'tide' ? 1.68 : 1.48;
      const size = Math.min(width, height) / (bound * 2.16);
      const screen = (point: Projected) => ({ x: width / 2 + point.x * size, y: height / 2 + point.y * size });
      return { project, screen, size };
    }

    function ribbon() {
      const { project, screen } = camera();
      const around = 104, across = 18;
      const time = elapsed * TAU / 6.5;
      const vertices: Projected[][] = [];
      for (let i = 0; i <= around; i++) {
        const u = i / around * TAU;
        const row: Projected[] = [];
        for (let j = 0; j <= across; j++) {
          const v = (j / across * 2 - 1) * (0.34 + shape * 0.09);
          const twist = u * 1.5 + Math.sin(time) * 0.43 + shape * 0.45;
          const radius = 0.83 + v * Math.cos(twist) + Math.sin(u * 3 - time) * 0.075;
          row.push(project({
            x: radius * Math.cos(u),
            y: radius * Math.sin(u),
            z: v * Math.sin(twist) + Math.sin(u * 2 + time) * (0.13 + shape * 0.045),
          }));
        }
        vertices.push(row);
      }
      const faces: Face[] = [];
      for (let i = 0; i < around; i++) {
        for (let j = 0; j < across; j++) {
          const points = [vertices[i][j], vertices[i + 1][j], vertices[i + 1][j + 1], vertices[i][j + 1]];
          const depth = points.reduce((total, point) => total + point.z, 0) / 4;
          faces.push({ points, depth, orange: j >= 7 && j <= 10, shade: 0.5 + Math.sin(i / around * TAU * 3 + time * 0.7) * 0.2 });
        }
      }
      faces.sort((a, b) => a.depth - b.depth);
      context!.lineWidth = 0.55;
      context!.lineJoin = 'round';
      for (const face of faces) {
        const light = clamp((face.depth + 1.25) / 2.5, 0, 1);
        const shade = face.shade * 0.55 + light * 0.45;
        const color = face.orange
          ? `rgb(${Math.round(183 + shade * 54)} ${Math.round(51 + shade * 44)} ${Math.round(18 + shade * 20)})`
          : `rgb(${Math.round(17 + shade * 42)} ${Math.round(21 + shade * 41)} ${Math.round(22 + shade * 41)})`;
        context!.beginPath();
        face.points.forEach((point, index) => {
          const position = screen(point);
          if (index === 0) context!.moveTo(position.x, position.y);
          else context!.lineTo(position.x, position.y);
        });
        context!.closePath();
        context!.fillStyle = color;
        context!.strokeStyle = color;
        context!.fill();
        context!.stroke();
      }
      // A handful of long, fine folds reveal the continuous twisted surface.
      context!.strokeStyle = 'rgba(250, 250, 250, 0.14)';
      context!.lineWidth = 0.5;
      for (const j of [3, 6, 11, 15]) {
        context!.beginPath();
        vertices.forEach((row, index) => {
          const position = screen(row[j]);
          if (index === 0) context!.moveTo(position.x, position.y);
          else context!.lineTo(position.x, position.y);
        });
        context!.stroke();
      }
    }

    function orbit() {
      const { project, screen, size } = camera();
      const time = elapsed * TAU / 5.8;
      const dots = particles.map(particle => {
        const angle = particle.theta + time * 0.33 + Math.sin(particle.phi + time) * 0.13;
        const cross = particle.phi + time * 0.58;
        const radius = 0.79 + Math.cos(cross) * (0.23 + shape * 0.1) + Math.sin(angle * 3 + time) * 0.07;
        const point = project({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: Math.sin(cross) * (0.4 - shape * 0.1) + Math.sin(angle * 2 - time + particle.offset) * 0.075,
        });
        return { ...particle, point };
      }).sort((a, b) => a.point.z - b.point.z);
      for (const dot of dots) {
        const position = screen(dot.point);
        const depth = clamp((dot.point.z + 1.2) / 2.4, 0, 1);
        const alpha = 0.32 + depth * 0.62;
        context!.fillStyle = dot.orange ? `rgba(231, 79, 26, ${alpha})` : `rgba(20, 26, 29, ${alpha})`;
        context!.beginPath();
        context!.arc(position.x, position.y, dot.size * dot.point.perspective * clamp(size / 100, 0.75, 1.7), 0, TAU);
        context!.fill();
      }
    }

    function tide() {
      const { project, screen } = camera();
      const time = elapsed * TAU / 5.4;
      const rows = 32, columns = 44;
      const vertices: Projected[][] = [];
      for (let row = 0; row <= rows; row++) {
        const v = row / rows * 2 - 1;
        const points: Projected[] = [];
        for (let col = 0; col <= columns; col++) {
          const u = col / columns * 2 - 1;
          const edge = 0.66 + (1 - u * u) * 0.34;
          points.push(project({
            x: u * 1.18,
            y: v * 0.97,
            z: edge * (Math.sin(u * 3.4 + time) * 0.21
              + Math.cos(v * 3.2 - time * 0.8) * 0.16
              + Math.sin((u + v) * 3 - time) * (0.05 + shape * 0.13)),
          }));
        }
        vertices.push(points);
      }
      const lines: { points: Projected[]; depth: number; orange: boolean; cross: boolean }[] = [];
      for (let row = 0; row <= rows; row++) {
        const points = vertices[row];
        lines.push({ points, depth: points.reduce((sum, p) => sum + p.z, 0) / points.length, orange: row === 9 || row === 10 || row === 23, cross: false });
      }
      for (let col = 0; col <= columns; col += 2) {
        const points = vertices.map(row => row[col]);
        lines.push({ points, depth: points.reduce((sum, p) => sum + p.z, 0) / points.length, orange: false, cross: true });
      }
      lines.sort((a, b) => a.depth - b.depth);
      context!.lineJoin = 'round';
      for (const line of lines) {
        const alpha = clamp(0.4 + (line.depth + 1) * 0.2, 0.25, 0.8);
        context!.strokeStyle = line.orange ? 'rgba(232, 79, 25, 0.98)' : `rgba(20, 25, 28, ${line.cross ? alpha * 0.45 : alpha})`;
        context!.lineWidth = line.orange ? 1.65 : line.cross ? 0.55 : 0.85;
        context!.beginPath();
        line.points.forEach((point, index) => {
          const position = screen(point);
          if (index === 0) context!.moveTo(position.x, position.y);
          else context!.lineTo(position.x, position.y);
        });
        context!.stroke();
      }
    }

    function draw() {
      context!.clearRect(0, 0, width, height);
      if (kindRef.current === 'ribbon') ribbon();
      else if (kindRef.current === 'orbit') orbit();
      else tide();
    }

    function tick(now: number) {
      frame = 0;
      if (!running()) return;
      if (now - lastPaint >= FRAME_MS) {
        const dt = lastTime ? Math.min(now - lastTime, 100) / 1000 : 0;
        elapsed += dt;
        tiltX += (pointer.x - tiltX) * 0.12;
        tiltY += (pointer.y - tiltY) * 0.12;
        shape += (shapeTarget - shape) * 0.1;
        draw();
        lastTime = lastPaint = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function restart() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = lastPaint = 0;
      draw();
      if (running()) frame = requestAnimationFrame(tick);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function move(event: PointerEvent) {
      if (gesture?.id === event.pointerId) {
        const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
        if (!gesture.turning) {
          // Let the browser own vertical touch scrolling; capture only a horizontal turn.
          if (gesture.touch && Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx)) {
            gesture = null;
            return;
          }
          if (Math.abs(dx) + Math.abs(dy) <= 7) return;
          gesture.turning = true;
          dragged = true;
          button!.setPointerCapture(event.pointerId);
        }
        yaw += (event.clientX - gesture.lastX) * 0.009;
        if (!gesture.touch) pitch += (event.clientY - gesture.lastY) * 0.006;
        gesture.lastX = event.clientX;
        gesture.lastY = event.clientY;
        draw();
      } else if (!still() && event.pointerType !== 'touch') {
        const rect = canvas!.getBoundingClientRect();
        pointer.x = clamp((event.clientX - rect.left) / Math.max(1, rect.width) * 2 - 1, -1, 1);
        pointer.y = clamp((event.clientY - rect.top) / Math.max(1, rect.height) * 2 - 1, -1, 1);
      }
    }

    function down(event: PointerEvent) {
      if (event.button !== 0 || !event.isPrimary) return;
      dragged = false;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, touch: event.pointerType === 'touch', turning: false };
      if (event.pointerType !== 'touch') button!.setPointerCapture(event.pointerId);
    }

    function up(event: PointerEvent) {
      if (gesture?.id !== event.pointerId) return;
      gesture = null;
      if (button!.hasPointerCapture(event.pointerId)) button!.releasePointerCapture(event.pointerId);
    }

    function leave() { pointer.x = pointer.y = 0; }
    function reshape(event: MouseEvent) {
      if (dragged && event.detail > 0) { dragged = false; return; }
      shapeTarget = shapeTarget ? 0 : 1;
      if (still()) { shape = shapeTarget; draw(); }
    }
    function key(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') yaw -= 0.18;
      else if (event.key === 'ArrowRight') yaw += 0.18;
      else if (event.key === 'ArrowUp') pitch -= 0.18;
      else if (event.key === 'ArrowDown') pitch += 0.18;
      else return;
      event.preventDefault();
      draw();
    }

    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(entries => {
      inViewport = entries[0]?.isIntersecting ?? false;
      restart();
    });
    sizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    button.addEventListener('pointerdown', down);
    button.addEventListener('pointermove', move);
    button.addEventListener('pointerup', up);
    button.addEventListener('pointercancel', up);
    button.addEventListener('lostpointercapture', up);
    button.addEventListener('pointerleave', leave);
    button.addEventListener('click', reshape);
    button.addEventListener('keydown', key);
    reducedMotion.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    restartRef.current = restart;
    resize();
    restart();
    return () => {
      restartRef.current = () => {};
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      button.removeEventListener('pointerdown', down);
      button.removeEventListener('pointermove', move);
      button.removeEventListener('pointerup', up);
      button.removeEventListener('pointercancel', up);
      button.removeEventListener('lostpointercapture', up);
      button.removeEventListener('pointerleave', leave);
      button.removeEventListener('click', reshape);
      button.removeEventListener('keydown', key);
      reducedMotion.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
    };
  }, []);

  return (
    <button ref={buttonRef} type="button" className="core-sculpture-control" aria-label="Explore the sculpture" aria-describedby={helpId}>
      <canvas ref={canvasRef} className="core-sculpture" aria-hidden="true" />
      <span className="core-sculpture-hint" aria-hidden="true">Drag to turn. Tap to reshape.</span>
      <span className="core-sr-only" id={helpId}>Drag horizontally or use arrow keys to turn the sculpture. Press Enter or Space to reshape it.</span>
    </button>
  );
}
