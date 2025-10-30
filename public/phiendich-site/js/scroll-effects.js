/**
 * Scroll Effects Module - Handles scroll animations, smart header, and parallax effects
 */
class ScrollEffects {
  constructor() {
    this.lastScrollTop = 0;
    this.header = null;
    this.headerHeight = 0;
    this.isScrolling = false;
    this.scrollElements = [];
    this.parallaxElements = [];
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.setupHeader();
      this.setupScrollAnimations();
      this.setupParallaxEffects();
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
  }

  findScrollElements() {
    // Find all elements with scroll animation classes
    this.scrollElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in');
    
    // Add initial state to elements
    this.scrollElements.forEach(element => {
      // Skip if already animated
      if (element.classList.contains('animated')) return;
      
      // Set initial state based on animation type
      if (element.classList.contains('fade-in-up')) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      } else if (element.classList.contains('fade-in-left')) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      } else if (element.classList.contains('fade-in-right')) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      } else if (element.classList.contains('fade-in')) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease';
      } else if (element.classList.contains('scale-in')) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });
  }

  refreshScrollElements() {
    this.findScrollElements();
    this.checkScrollAnimations();
  }

  setupParallaxEffects() {
    // Find all elements with parallax background
    this.parallaxElements = document.querySelectorAll('.parallax-bg');
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
        // Add animation class and reset styles
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
        }
      }
    });
  }

  updateParallax() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    this.parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
      const yPos = -(scrollTop * speed);
      
      // Apply parallax effect to background image
      element.style.backgroundPosition = `center ${yPos}px`;
      
      // Also apply transform for additional parallax layers if needed
      if (element.classList.contains('hero')) {
        // For hero section, we want a more subtle effect
        const heroYPos = -(scrollTop * speed * 0.5);
        element.style.transform = `translateY(${heroYPos}px)`;
      }
    });
  }
}

// Initialize scroll effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.scrollEffects = new ScrollEffects();
});

// Export for use in other modules
window.ScrollEffects = ScrollEffects;