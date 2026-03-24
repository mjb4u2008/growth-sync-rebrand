import { motion, useReducedMotion } from 'motion/react';

type HeroMascotVariant = 'sitter' | 'peer';

type HeroMascotProps = {
  variant: HeroMascotVariant;
  className: string;
};

const mascotConfig: Record<HeroMascotVariant, { src: string; initialRotate: number; animateRotate: number[]; animateY: number[]; floating: boolean }> = {
  sitter: {
    src: '/mascots/hero-sitter.png',
    initialRotate: -2,
    animateRotate: [-2, -4, -2],
    animateY: [0, 0, 0],
    floating: false,
  },
  peer: {
    src: '/mascots/hero-peer.png',
    initialRotate: 7,
    animateRotate: [7, 9, 7],
    animateY: [0, -0.1, 0],
    floating: true,
  },
};

const HeroMascot = ({ variant, className }: HeroMascotProps) => {
  const prefersReducedMotion = useReducedMotion();
  const config = mascotConfig[variant];

  return (
    <motion.img
      aria-hidden="true"
      src={config.src}
      alt=""
      initial={{ opacity: 0, y: '0.15em', scale: 0.92, rotate: config.initialRotate }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1, rotate: config.initialRotate }
          : {
              opacity: 1,
              y: config.floating ? config.animateY.map((value) => `${value}em`) : 0,
              scale: 1,
              rotate: config.floating ? config.animateRotate : config.initialRotate,
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.35 }
          : config.floating
            ? {
              opacity: { duration: 0.35 },
              scale: { duration: 0.35 },
              y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
            }
            : {
                opacity: { duration: 0.35 },
                scale: { duration: 0.35 },
                y: { duration: 0.35 },
                rotate: { duration: 0.35 },
              }
      }
      className={`pointer-events-none absolute select-none drop-shadow-[0_0.9em_1.3em_rgba(15,23,42,0.16)] ${className}`}
    />
  );
};

export default HeroMascot;
