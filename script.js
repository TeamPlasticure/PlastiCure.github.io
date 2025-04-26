// Entrance animation
window.addEventListener('DOMContentLoaded', () => {
  gsap.to("#intro-overlay", {
    opacity: 0,
    duration: 1.2,
    delay: 1.2,
    onComplete: () => {
      document.getElementById('intro-overlay').style.display = 'none';
    }
  });

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
          // When scrolling up, reverse the animation
        }
      }
    );
  });
});
