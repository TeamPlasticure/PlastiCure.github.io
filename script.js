document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.fade-in').forEach((elem) => {
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      stagger: 0.2,
    });
  });
});
