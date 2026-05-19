import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const TiltCard = ({ children, maxTilt = 6, style, onMouseLeave: externalLeave, ...rest }) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.07) 0%, transparent 55%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    spotX.set(((e.clientX - r.left) / r.width) * 100);
    spotY.set(((e.clientY - r.top) / r.height) * 100);
  };

  const handleMouseLeave = (e) => {
    rawX.set(0);
    rawY.set(0);
    spotX.set(50);
    spotY.set(50);
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
      <motion.div
        className="tilt-spotlight"
        style={{ background: spotlight }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
};

export default TiltCard;
