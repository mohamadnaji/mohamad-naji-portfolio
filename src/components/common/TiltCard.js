import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const TiltCard = ({ children, maxTilt = 6, style, onMouseLeave: externalLeave, ...rest }) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
    // CSS custom property update — no Framer overhead, no paint
    ref.current.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  const handleMouseLeave = (e) => {
    rawX.set(0);
    rawY.set(0);
    if (ref.current) {
      ref.current.style.setProperty('--spot-x', '-400px');
      ref.current.style.setProperty('--spot-y', '-400px');
    }
    externalLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="tilt-spotlight" aria-hidden="true" />
      {children}
    </motion.div>
  );
};

export default TiltCard;
