export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
};

export const heroContentStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } }
};

export const heroItemFade = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }
};

export const nameStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

export const wordReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const skillItemFade = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } }
};

export const skillListStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } }
};
