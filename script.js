window.addEventListener('DOMContentLoaded', () => {
  // Page Fade-in
  gsap.to('body', { opacity: 1, duration: 1.2, ease: "power2.out" });

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

  // Sticky Welcome Animation: fade and slide up after scrolling past header
  gsap.to("#intro-sticky", {
    opacity: 0,
    y: -80,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: "main",
      start: "top top+=80",
      end: "top top+=120",
      scrub: 1,
    }
  });

  // Infinite Floating Bubbles Visuals
  function createBubble() {
    const bubble = document.createElement('div');
    const size = Math.random() * 40 + 20; // 20px to 60px
    bubble.className = 'bubble';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.opacity = Math.random() * 0.4 + 0.2;
    bubble.style.background = '#38b6ff';
    document.getElementById('bubbles').appendChild(bubble);

    // Animate bubble up
    gsap.to(bubble, {
      y: -window.innerHeight - 100,
      x: `+=${(Math.random() - 0.5) * 100}`,
      duration: Math.random() * 3 + 3,
      ease: "sine.inOut",
      onComplete: () => {
        bubble.remove();
      }
    });
  }

  // Continuously create bubbles at random intervals
  function bubbleLoop() {
    createBubble();
    setTimeout(bubbleLoop, Math.random() * 400 + 200); // 200ms to 600ms
  }
  bubbleLoop();
});

// Bubble styles (inject into head so you don't need to edit CSS file)
const bubbleStyles = document.createElement('style');
bubbleStyles.innerHTML = `
  .bubble {
    position: absolute;
    bottom: -60px;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(1px);
    z-index: 3;
    background: #38b6ff;
    transition: background 0.3s;
  }
`;
document.head.appendChild(bubbleStyles);
