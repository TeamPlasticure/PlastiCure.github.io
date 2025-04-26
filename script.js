window.addEventListener('DOMContentLoaded', () => {
  // Animate in sections on scroll
  gsap.utils.toArray('.animated-section').forEach(section => {
    gsap.fromTo(section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  });

  // Overlay scroll animation
  gsap.to("#intro-overlay", {
    y: "-100%",
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: "body",
      start: "top top+=10",
      end: "top top+=100",
      scrub: 1,
      onUpdate: self => {
        gsap.to("#intro-overlay", { opacity: 1 - self.progress, duration: 0.2, overwrite: true });
      }
    }
  });

  // Bring overlay back when scrolling up near the top
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom top",
    onUpdate: self => {
      if (self.direction === -1 && window.scrollY < 100) {
        gsap.to("#intro-overlay", { y: "0%", opacity: 1, ease: "power2.out", duration: 0.7, overwrite: true });
      }
    }
  });
});
