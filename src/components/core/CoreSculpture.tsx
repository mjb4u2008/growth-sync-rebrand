import { useEffect, useRef } from 'react';

/** An original woven surface, rendered at 30 fps with no animation dependency. */
export function CoreSculpture({ paused }: { paused: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    pausedRef.current = paused;
    updateRef.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !button || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let width = 1, height = 1, phase = 0;
    let lastTime = 0, lastPaint = 0;
    let tiltX = 0, tiltY = 0, yaw = 0, pitch = 0;
    let fold = 0, foldTarget = 0;
    let inViewport = true;
    let dragging = false, dragged = false, lastX = 0, lastY = 0;
    const pointer = { x: 0, y: 0 };
    const still = () => pausedRef.current || reduced.matches;
    const running = () => !still() && !document.hidden && inViewport;

    // Cache trigonometry for the fixed topology; only projection changes per frame.
    const rings = Array.from({ length: 48 }, (_, ring) => ({
      accent: ring === 13,
      vertices: Array.from({ length: 129 }, (_, step) => {
        const angle = step / 128 * Math.PI * 2;
        const ripple = angle * 3 + ring / 48 * Math.PI * 2;
        return [Math.cos(angle), Math.sin(angle), Math.cos(ripple), Math.sin(ripple)];
      }),
    }));

    function draw() {
      context!.clearRect(0, 0, width, height);
      const size = Math.min(width / 3.35, height / 2.7);
      const ax = 0.93 + tiltY * 0.28 + pitch;
      const ay = -0.36 + tiltX * 0.35 + phase + yaw;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const lines = rings.map(ring => {
        let depth = 0;
        const points = ring.vertices.map(([cos, sin, waveCos, waveSin]) => {
          const radius = 0.94 + (0.34 + fold * 0.17) * waveCos;
          const x = radius * cos;
          const y = radius * sin * (1 - fold * 0.12);
          const z = (0.47 + fold * 0.15) * waveSin;
          const ry = y * cosX - z * sinX;
          const rz = y * sinX + z * cosX;
          const rx = x * cosY + rz * sinY;
          const finalZ = -x * sinY + rz * cosY;
          const perspective = 4.9 / (4.9 - finalZ);
          depth += finalZ;
          return [width / 2 + rx * size * perspective, height / 2 + ry * size * perspective];
        });
        return { points, depth: depth / points.length, accent: ring.accent };
      }).sort((a, b) => a.depth - b.depth);
      context!.lineJoin = 'round';
      for (const line of lines) {
        context!.beginPath();
        line.points.forEach(([x, y], i) => i ? context!.lineTo(x, y) : context!.moveTo(x, y));
        context!.strokeStyle = line.accent ? 'rgba(228, 86, 35, .95)' : `rgba(25, 28, 29, ${0.2 + (line.depth + 1) * 0.23})`;
        context!.lineWidth = line.accent ? 1.65 : 0.7;
        context!.stroke();
      }
    }

    function tick(time: number) {
      frame = 0;
      if (!running()) return;
      if (time - lastPaint >= 32) {
        const dt = Math.min(time - (lastTime || time), 64);
        phase += dt * 0.000035;
        tiltX += (pointer.x - tiltX) * 0.11;
        tiltY += (pointer.y - tiltY) * 0.11;
        fold += (foldTarget - fold) * 0.09;
        draw();
        lastTime = time;
        lastPaint = time;
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
    function manualDraw() {
      if (still()) {
        tiltX = pointer.x;
        tiltY = pointer.y;
        fold = foldTarget;
        draw();
      }
    }
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function move(event: PointerEvent) {
      if (dragging) {
        const dx = event.clientX - lastX, dy = event.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 2) dragged = true;
        yaw += dx * 0.009;
        pitch += dy * 0.006;
        lastX = event.clientX; lastY = event.clientY;
        draw();
      } else if (!still() && event.pointerType !== 'touch') {
        const rect = canvas!.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
        pointer.y = (event.clientY - rect.top) / rect.height * 2 - 1;
      }
    }
    function down(event: PointerEvent) {
      if (event.button !== 0) return;
      dragging = true; dragged = false;
      lastX = event.clientX; lastY = event.clientY;
      button!.setPointerCapture(event.pointerId);
    }
    function up() { dragging = false; }
    function leave() { pointer.x = pointer.y = 0; }
    function reshape(event: MouseEvent) {
      if (dragged && event.detail > 0) { dragged = false; return; }
      foldTarget = foldTarget ? 0 : 1;
      manualDraw();
    }
    function key(event: KeyboardEvent) {
      const amount = 0.18;
      if (event.key === 'ArrowLeft') yaw -= amount;
      else if (event.key === 'ArrowRight') yaw += amount;
      else if (event.key === 'ArrowUp') pitch -= amount;
      else if (event.key === 'ArrowDown') pitch += amount;
      else return;
      event.preventDefault();
      draw();
    }
    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(entries => {
      inViewport = entries[0].isIntersecting;
      restart();
    });
    observer.observe(canvas);
    intersection.observe(canvas);
    button.addEventListener('pointermove', move);
    button.addEventListener('pointerdown', down);
    button.addEventListener('pointerup', up);
    button.addEventListener('pointercancel', up);
    button.addEventListener('pointerleave', leave);
    button.addEventListener('click', reshape);
    button.addEventListener('keydown', key);
    reduced.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    updateRef.current = restart;
    resize();
    restart();
    return () => {
      updateRef.current = () => {};
      cancelAnimationFrame(frame);
      observer.disconnect(); intersection.disconnect();
      button.removeEventListener('pointermove', move);
      button.removeEventListener('pointerdown', down);
      button.removeEventListener('pointerup', up);
      button.removeEventListener('pointercancel', up);
      button.removeEventListener('pointerleave', leave);
      button.removeEventListener('click', reshape);
      button.removeEventListener('keydown', key);
      reduced.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
    };
  }, []);

  return (
    <button ref={buttonRef} type="button" className="core-sculpture-control" aria-label="Explore the sculpture" aria-describedby="core-sculpture-help">
      <canvas className="core-sculpture" ref={canvasRef} aria-hidden="true" />
      <span className="core-sculpture-hint" aria-hidden="true">Drag to turn. Tap to reshape.</span>
      <span className="core-sr-only" id="core-sculpture-help">Use arrow keys to turn the sculpture. Press Enter or Space to reshape it.</span>
    </button>
  );
}
