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

  // --- Smooth Carousel Logic ---
  const carouselImages = [
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    // Add more image URLs here if you want!
  ];

  const positions = {
    left: { x: -90, scale: 0.95, rotationY: 20, zIndex: 2, opacity: 0.6 },
    center: { x: 0, scale: 1.1, rotationY: 0, zIndex: 3, opacity: 1 },
    right: { x: 90, scale: 0.95, rotationY: -20, zIndex: 2, opacity: 0.6 }
  };

  const carousel = document.querySelector('.carousel');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  let carouselIndex = 0;
  let imageElements = [];

  function createImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('carousel-image');
    carousel.appendChild(img);
    return img;
  }

  function setupCarousel() {
    carousel.innerHTML = '';
    imageElements = [];

    // We'll display only 3 images at a time: left, center, right
    // Create three img elements
    for (let i = 0; i < 3; i++) {
      const img = createImage('', 'Gallery image');
      imageElements.push(img);
    }
  }

  function updateCarousel(index) {
    const total = carouselImages.length;
    const leftIdx = (index - 1 + total) % total;
    const centerIdx = index % total;
    const rightIdx = (index + 1) % total;

    // Update src for each image element
    imageElements[0].src = carouselImages[leftIdx];
    imageElements[1].src = carouselImages[centerIdx];
    imageElements[2].src = carouselImages[rightIdx];

    // Animate positions with GSAP
    gsap.to(imageElements[0], {
      duration: 0.8,
      x: positions.left.x,
      scale: positions.left.scale,
      rotationY: positions.left.rotationY,
      opacity: positions.left.opacity,
      zIndex: positions.left.zIndex,
      ease: "power2.out",
      overwrite: "auto"
    });
    gsap.to(imageElements[1], {
      duration: 0.8,
      x: positions.center.x,
      scale: positions.center.scale,
      rotationY: positions.center.rotationY,
      opacity: positions.center.opacity,
      zIndex: positions.center.zIndex,
      ease: "power2.out",
      overwrite: "auto"
    });
    gsap.to(imageElements[2], {
      duration: 0.8,
      x: positions.right.x,
      scale: positions.right.scale,
      rotationY: positions.right.rotationY,
      opacity: positions.right.opacity,
      zIndex: positions.right.zIndex,
      ease: "power2.out",
      overwrite: "auto"
    });
  }

  function initCarousel() {
    setupCarousel();
    updateCarousel(carouselIndex);

    leftArrow.addEventListener('click', () => {
      carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
      updateCarousel(carouselIndex);
    });

    rightArrow.addEventListener('click', () => {
      carouselIndex = (carouselIndex + 1) % carouselImages.length;
      updateCarousel(carouselIndex);
    });
  }

  initCarousel();
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
