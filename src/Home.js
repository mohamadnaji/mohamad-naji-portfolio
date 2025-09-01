import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Logo from './Logo';

const Home = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, { y: -50, opacity: 0, duration: 1 });
  }, []);

  return (
    <div className="home">
      <Logo />
      <h1 ref={titleRef}>Welcome to Mohamad Naji's Portfolio</h1>
    </div>
  );
};

export default Home;
