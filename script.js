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

  // --- True Sliding Carousel Logic ---
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
  let isAnimating = false;

  function createImage(src, alt, pos) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('carousel-image');
    carousel.appendChild(img);
    setImagePosition(img, pos);
    return img;
  }

  function setImagePosition(img, pos) {
    gsap.set(img, {
      x: positions[pos].x,
      scale: positions[pos].scale,
      rotationY: positions[pos].rotationY,
      zIndex: positions[pos].zIndex,
      opacity: positions[pos].opacity,
      pointerEvents: pos === "center" ? "auto" : "none"
    });
  }

  function setupCarousel() {
    carousel.innerHTML = '';
    imageElements = [];

    // Show left, center, right images
    const total = carouselImages.length;
    const leftIdx = (carouselIndex - 1 + total) % total;
    const centerIdx = carouselIndex % total;
    const rightIdx = (carouselIndex + 1) % total;

    imageElements.push(createImage(carouselImages[leftIdx], "Gallery image", "left"));
    imageElements.push(createImage(carouselImages[centerIdx], "Gallery image", "center"));
    imageElements.push(createImage(carouselImages[rightIdx], "Gallery image", "right"));
  }

  function slideCarousel(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const total = carouselImages.length;
    let newLeftIdx, newCenterIdx, newRightIdx;

    if (direction === "right") {
      carouselIndex = (carouselIndex + 1) % total;
      newLeftIdx = (carouselIndex - 1 + total) % total;
      newCenterIdx = carouselIndex % total;
      newRightIdx = (carouselIndex + 1) % total;

      // Animate current images to left, center, right
      gsap.to(imageElements[0], { // left -> out left
        x: -200, opacity: 0, duration: 0.7, ease: "power2.in"
      });
      gsap.to(imageElements[1], { // center -> left
        ...positions.left, duration: 0.7, ease: "power2.inOut"
      });
      gsap.to(imageElements[2], { // right -> center
        ...positions.center, duration: 0.7, ease: "power2.inOut",
        onComplete: () => {
          // Remove leftmost image
          imageElements[0].remove();
          // Add new right image
          const newImg = createImage(carouselImages[newRightIdx], "Gallery image", "right");
          imageElements = [imageElements[1], imageElements[2], newImg];
          isAnimating = false;
        }
      });
    } else if (direction === "left") {
      carouselIndex = (carouselIndex - 1 + total) % total;
      newLeftIdx = (carouselIndex - 1 + total) % total;
      newCenterIdx = carouselIndex % total;
      newRightIdx = (carouselIndex + 1) % total;

      // Animate current images to right, center, left
      gsap.to(imageElements[2], { // right -> out right
        x: 200, opacity: 0, duration: 0.7, ease: "power2.in"
      });
      gsap.to(imageElements[1], { // center -> right
        ...positions.right, duration: 0.7, ease: "power2.inOut"
      });
      gsap.to(imageElements[0], { // left -> center
        ...positions.center, duration: 0.7, ease: "power2.inOut",
        onComplete: () => {
          // Remove rightmost image
          imageElements[2].remove();
          // Add new left image
          const newImg = createImage(carouselImages[newLeftIdx], "Gallery image", "left");
          imageElements = [newImg, imageElements[0], imageElements[1]];
          isAnimating = false;
        }
      });
    }
  }

  setupCarousel();

  leftArrow.addEventListener('click', () => slideCarousel("left"));
  rightArrow.addEventListener('click', () => slideCarousel("right"));
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
