/**
 * Enhanced Scroll Effects Module - Handles advanced scroll animations, smart header, parallax effects, and more
 */
class EnhancedScrollEffects {
  constructor() {
    this.lastScrollTop = 0;
    this.header = null;
    this.headerHeight = 0;
    this.isScrolling = false;
    this.scrollElements = [];
    this.parallaxElements = [];
    this.counterElements = [];
    this.progressIndicator = null;
    this.videoElements = [];
    this.staggeredElements = [];
    this.revealSections = [];
    
    // Observer options for better performance
    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.5, 0.8, 1]
    };
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.setupHeader();
      this.setupScrollAnimations();
      this.setupParallaxEffects();
      this.setupCounterAnimations();
      this.setupProgressIndicator();
      this.setupStaggeredAnimations();
      this.setupVideoAnimations();
      this.setupRevealSections();
      this.bindEvents();
      
      // Initial check for elements in view
      this.checkScrollAnimations();
      this.updateParallax();
    }, 100);
  }

  setupHeader() {
    this.header = document.querySelector('.mainnav');
    if (this.header) {
      this.headerHeight = this.header.offsetHeight;
      
      // Add transition for smooth hide/show effect
      this.header.style.transition = 'transform 0.3s ease-in-out';
      
      // Initially make header fixed positioned
      this.header.style.position = 'fixed';
      this.header.style.top = '0';
      this.header.style.left = '0';
      this.header.style.right = '0';
      this.header.style.zIndex = '1000';
      
      // Add padding to body to prevent content jump
      document.body.style.paddingTop = `${this.headerHeight}px`;
    }
  }

  setupScrollAnimations() {
    this.findScrollElements();
    this.setupIntersectionObserver();
  }

  findScrollElements() {
    // Find all elements with scroll animation classes
    this.scrollElements = document.querySelectorAll([
      '.fade-in-up', '.fade-in-left', '.fade-in-right', '.fade-in', '.scale-in',
      '.slide-in-left', '.slide-in-right', '.slide-in-up', '.slide-in-down',
      '.rotate-in', '.flip-in', '.zoom-in', '.bounce-in', '.elastic-in'
    ].join(', '));
    
    // Add initial state to elements
    this.scrollElements.forEach(element => {
      // Skip if already animated
      if (element.classList.contains('animated')) return;
      
      // Set initial state based on animation type
      this.setElementInitialState(element);
    });
  }

  setElementInitialState(element) {
    const delay = element.dataset.animationDelay || '0ms';
    const duration = element.dataset.animationDuration || '0.6s';
    const easing = element.dataset.animationEasing || 'ease';
    
    element.style.transition = `all ${duration} ${easing}`;
    element.style.transitionDelay = delay;
    
    if (element.classList.contains('fade-in-up')) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
    } else if (element.classList.contains('fade-in-left')) {
      element.style.opacity = '0';
      element.style.transform = 'translateX(-50px)';
    } else if (element.classList.contains('fade-in-right')) {
      element.style.opacity = '0';
      element.style.transform = 'translateX(50px)';
    } else if (element.classList.contains('fade-in')) {
      element.style.opacity = '0';
    } else if (element.classList.contains('scale-in')) {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
    } else if (element.classList.contains('slide-in-left')) {
      element.style.opacity = '0';
      element.style.transform = 'translateX(-100px)';
    } else if (element.classList.contains('slide-in-right')) {
      element.style.opacity = '0';
      element.style.transform = 'translateX(100px)';
    } else if (element.classList.contains('slide-in-up')) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(100px)';
    } else if (element.classList.contains('slide-in-down')) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-100px)';
    } else if (element.classList.contains('rotate-in')) {
      element.style.opacity = '0';
      element.style.transform = 'rotate(-10deg) scale(0.9)';
    } else if (element.classList.contains('flip-in')) {
      element.style.opacity = '0';
      element.style.transform = 'rotateY(90deg)';
    } else if (element.classList.contains('zoom-in')) {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.3)';
    } else if (element.classList.contains('bounce-in')) {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.3)';
    } else if (element.classList.contains('elastic-in')) {
      element.style.opacity = '0';
      element.style.transform = 'scale(0)';
    }
  }

  setupIntersectionObserver() {
    // Create intersection observer for better performance
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe all scroll elements
    this.scrollElements.forEach(element => {
      if (!element.classList.contains('animated')) {
        this.intersectionObserver.observe(element);
      }
    });
  }

  animateElement(element) {
    if (element.classList.contains('animated')) return;
    
    element.classList.add('animated');
    
    if (element.classList.contains('fade-in-up')) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    } else if (element.classList.contains('fade-in-left')) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    } else if (element.classList.contains('fade-in-right')) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    } else if (element.classList.contains('fade-in')) {
      element.style.opacity = '1';
    } else if (element.classList.contains('scale-in')) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    } else if (element.classList.contains('slide-in-left')) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    } else if (element.classList.contains('slide-in-right')) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    } else if (element.classList.contains('slide-in-up')) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    } else if (element.classList.contains('slide-in-down')) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    } else if (element.classList.contains('rotate-in')) {
      element.style.opacity = '1';
      element.style.transform = 'rotate(0) scale(1)';
    } else if (element.classList.contains('flip-in')) {
      element.style.opacity = '1';
      element.style.transform = 'rotateY(0)';
    } else if (element.classList.contains('zoom-in')) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    } else if (element.classList.contains('bounce-in')) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      element.style.animation = 'bounceIn 0.8s ease-out';
    } else if (element.classList.contains('elastic-in')) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      element.style.animation = 'elasticIn 0.8s ease-out';
    }
  }

  setupParallaxEffects() {
    // Find all elements with parallax background
    this.parallaxElements = document.querySelectorAll('.parallax-bg, .parallax-element');
    
    // Enhanced parallax with different speeds
    this.parallaxElements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const direction = element.dataset.parallaxDirection || 'vertical';
      
      element.style.transition = 'transform 0.1s ease-out';
    });
  }

  setupCounterAnimations() {
    // Find all counter elements
    this.counterElements = document.querySelectorAll('.counter, .stat-number, .count-up');
    
    this.counterElements.forEach(element => {
      const target = parseInt(element.dataset.counterTarget) || 0;
      const duration = parseInt(element.dataset.counterDuration) || 2000;
      const suffix = element.dataset.counterSuffix || '';
      const prefix = element.dataset.counterPrefix || '';
      
      element.dataset.originalText = element.textContent;
      element.dataset.counterTarget = target;
      element.dataset.counterDuration = duration;
      element.dataset.counterSuffix = suffix;
      element.dataset.counterPrefix = prefix;
      element.dataset.counted = 'false';
    });
  }

  setupProgressIndicator() {
    // Create scroll progress indicator
    this.progressIndicator = document.createElement('div');
    this.progressIndicator.className = 'scroll-progress-indicator';
    this.progressIndicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #d4af37, #b30000);
      z-index: 9999;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    `;
    document.body.appendChild(this.progressIndicator);
  }

  setupStaggeredAnimations() {
    // Find elements with staggered animation
    this.staggeredElements = document.querySelectorAll('.stagger-fade-in, .stagger-slide-up');
    
    this.staggeredElements.forEach(container => {
      const children = container.children;
      const staggerDelay = parseInt(container.dataset.staggerDelay) || 100;
      
      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * staggerDelay}ms`;
        child.classList.add('stagger-item');
      });
    });
  }

  setupVideoAnimations() {
    // Find video elements with scroll-triggered animations
    this.videoElements = document.querySelectorAll('.video-scroll-play, .video-parallax');
    
    this.videoElements.forEach(element => {
      element.dataset.played = 'false';
      
      if (element.classList.contains('video-parallax')) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.1s ease-out';
      }
    });
  }

  setupRevealSections() {
    // Find sections with reveal animations
    this.revealSections = document.querySelectorAll('.reveal-section, .reveal-left, .reveal-right');
    
    this.revealSections.forEach(section => {
      const overlay = document.createElement('div');
      overlay.className = 'reveal-overlay';
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 1;
        transition: transform 0.8s ease-out;
      `;
      
      if (section.classList.contains('reveal-left')) {
        overlay.style.transform = 'translateX(-100%)';
      } else if (section.classList.contains('reveal-right')) {
        overlay.style.transform = 'translateX(100%)';
      } else {
        overlay.style.transform = 'translateY(100%)';
      }
      
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.appendChild(overlay);
      
      section.dataset.revealed = 'false';
    });
  }

  refreshScrollElements() {
    this.findScrollElements();
    this.checkScrollAnimations();
  }

  bindEvents() {
    // Throttle scroll events for better performance
    let scrollTimer = null;
    
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.isScrolling = false;
        });
        this.isScrolling = true;
      }
      
      // Clear previous timer
      clearTimeout(scrollTimer);
      
      // Set a new timer to check scroll animations after scrolling stops
      scrollTimer = setTimeout(() => {
        this.checkScrollAnimations();
      }, 50);
    }, { passive: true });
    
    // Handle resize events
    window.addEventListener('resize', () => {
      if (this.header) {
        this.headerHeight = this.header.offsetHeight;
        document.body.style.paddingTop = `${this.headerHeight}px`;
      }
    });
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Handle smart header
    this.handleSmartHeader(scrollTop);
    
    // Update parallax effects
    this.updateParallax();
    
    // Update progress indicator
    this.updateProgressIndicator(scrollTop);
    
    // Handle counter animations
    this.updateCounterAnimations(scrollTop);
    
    // Handle video animations
    this.updateVideoAnimations(scrollTop);
    
    // Handle reveal sections
    this.updateRevealSections(scrollTop);
    
    // Update last scroll position
    this.lastScrollTop = scrollTop;
  }

  handleSmartHeader(scrollTop) {
    if (!this.header) return;
    
    // Determine scroll direction
    const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
    
    // Hide header when scrolling down, show when scrolling up
    // Only apply smart header behavior on larger screens
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      if (scrollDirection === 'down' && scrollTop > this.headerHeight) {
        this.header.style.transform = `translateY(-${this.headerHeight}px)`;
      } else if (scrollDirection === 'up' || scrollTop <= 0) {
        this.header.style.transform = 'translateY(0)';
      }
    } else {
      // On mobile, keep header visible but with subtle shadow when scrolled
      if (scrollTop > 10) {
        this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        this.header.style.boxShadow = 'none';
      }
    }
  }

  checkScrollAnimations() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    this.scrollElements.forEach(element => {
      // Check if element is in viewport
      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const elementVisible = elementTop - windowHeight < scrollTop - 100;
      
      if (elementVisible && !element.classList.contains('animated')) {
        this.animateElement(element);
      }
    });
  }

  updateParallax() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    this.parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
      const direction = element.dataset.parallaxDirection || 'vertical';
      
      if (direction === 'vertical') {
        const yPos = -(scrollTop * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
      } else if (direction === 'horizontal') {
        const xPos = -(scrollTop * speed);
        element.style.backgroundPosition = `${xPos}px center`;
      }
      
      // Apply transform for additional parallax layers if needed
      if (element.classList.contains('parallax-element')) {
        const transformY = -(scrollTop * speed * 0.5);
        element.style.transform = `translateY(${transformY}px)`;
      }
    });
  }

  updateProgressIndicator(scrollTop) {
    if (!this.progressIndicator) return;
    
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    this.progressIndicator.style.width = `${scrollPercent}%`;
  }

  updateCounterAnimations(scrollTop) {
    const windowHeight = window.innerHeight;
    
    this.counterElements.forEach(element => {
      if (element.dataset.counted === 'true') return;
      
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = elementTop < windowHeight - 100;
      
      if (elementVisible) {
        this.animateCounter(element);
        element.dataset.counted = 'true';
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.counterTarget);
    const duration = parseInt(element.dataset.counterDuration);
    const suffix = element.dataset.counterSuffix;
    const prefix = element.dataset.counterPrefix;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      
      element.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  updateVideoAnimations(scrollTop) {
    const windowHeight = window.innerHeight;
    
    this.videoElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const elementVisible = elementTop < windowHeight && elementBottom > 0;
      
      if (element.classList.contains('video-scroll-play')) {
        if (elementVisible && element.dataset.played === 'false') {
          if (element.tagName === 'VIDEO') {
            element.play();
          }
          element.dataset.played = 'true';
        } else if (!elementVisible && element.dataset.played === 'true') {
          if (element.tagName === 'VIDEO') {
            element.pause();
          }
          element.dataset.played = 'false';
        }
      }
      
      if (element.classList.contains('video-parallax')) {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.1;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px) scale(1.1)`;
      }
    });
  }

  updateRevealSections(scrollTop) {
    const windowHeight = window.innerHeight;
    
    this.revealSections.forEach(section => {
      if (section.dataset.revealed === 'true') return;
      
      const elementTop = section.getBoundingClientRect().top;
      const elementVisible = elementTop < windowHeight - 100;
      
      if (elementVisible) {
        const overlay = section.querySelector('.reveal-overlay');
        if (overlay) {
          if (section.classList.contains('reveal-left')) {
            overlay.style.transform = 'translateX(0)';
          } else if (section.classList.contains('reveal-right')) {
            overlay.style.transform = 'translateX(0)';
          } else {
            overlay.style.transform = 'translateY(0)';
          }
        }
        section.dataset.revealed = 'true';
      }
    });
  }
}

// Add CSS animations for new effects
const enhancedAnimationsCSS = `
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes elasticIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    opacity: 1;
    transform: scale(1.2);
  }
  80% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.stagger-item.animated {
  opacity: 1;
  transform: translateY(0);
}

.scroll-progress-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #d4af37, #b30000);
  z-index: 9999;
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.reveal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1;
  transition: transform 0.8s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress-indicator,
  .reveal-overlay,
  .stagger-item,
  [class*="fade-in"],
  [class*="slide-in"],
  [class*="scale-in"],
  [class*="rotate-in"],
  [class*="flip-in"],
  [class*="zoom-in"],
  [class*="bounce-in"],
  [class*="elastic-in"] {
    animation: none !important;
    transition: none !important;
  }
}
`;

// Inject CSS into head
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedAnimationsCSS;
document.head.appendChild(styleSheet);

// Initialize enhanced scroll effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.enhancedScrollEffects = new EnhancedScrollEffects();
});

// Export for use in other modules
window.EnhancedScrollEffects = EnhancedScrollEffects;