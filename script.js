document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.fade-in').forEach((section) => {
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
});
