/**
 * Animation Performance Optimizer
 * Optimizes scroll animations based on device capabilities and user preferences
 */
class AnimationPerformanceOptimizer {
  constructor() {
    this.isLowEndDevice = this.detectLowEndDevice();
    this.isReducedMotion = this.detectReducedMotion();
    this.isMobile = this.detectMobile();
    this.performanceMode = this.determinePerformanceMode();
    
    this.init();
  }

  init() {
    // Apply performance optimizations
    this.applyOptimizations();
    
    // Monitor performance and adjust if needed
    this.monitorPerformance();
    
    // Handle visibility changes
    this.setupVisibilityHandler();
  }

  detectLowEndDevice() {
    // Check for low-end device indicators
    const navigator = window.navigator;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    // Check hardware concurrency (CPU cores)
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    // Check device memory (if available)
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2;
    
    // Check connection speed (if available)
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return lowCores || lowMemory || slowConnection || (isMobile && this.detectOldMobile());
  }

  detectOldMobile() {
    // Detect older mobile devices (rough estimate based on user agent)
    const userAgent = navigator.userAgent;
    const oldAndroid = /Android [1-4]/.test(userAgent);
    const oldIOS = /iPhone OS [6-9]/.test(userAgent);
    
    return oldAndroid || oldIOS;
  }

  detectReducedMotion() {
    // Check if user prefers reduced motion
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  determinePerformanceMode() {
    if (this.isReducedMotion) {
      return 'reduced';
    } else if (this.isLowEndDevice) {
      return 'low';
    } else if (this.isMobile) {
      return 'medium';
    } else {
      return 'high';
    }
  }

  applyOptimizations() {
    switch (this.performanceMode) {
      case 'reduced':
        this.applyReducedMotion();
        break;
      case 'low':
        this.applyLowPerformance();
        break;
      case 'medium':
        this.applyMediumPerformance();
        break;
      case 'high':
        this.applyHighPerformance();
        break;
    }
  }

  applyReducedMotion() {
    // Disable all animations
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    
    // Remove animation classes
    document.querySelectorAll('[class*="fade-in"], [class*="slide-in"], [class*="scale-in"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    
    // Disable parallax
    document.querySelectorAll('.parallax-bg, .parallax-element').forEach(el => {
      el.style.backgroundAttachment = 'scroll';
      el.style.transform = 'none';
    });
    
    // Disable progress indicator
    const progressBar = document.querySelector('.scroll-progress-indicator');
    if (progressBar) progressBar.style.display = 'none';
  }

  applyLowPerformance() {
    // Reduce animation complexity
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    document.documentElement.style.setProperty('--transition-duration', '0.2s');
    
    // Disable complex animations
    document.querySelectorAll('.bounce-in, .elastic-in, .flip-in, .rotate-in').forEach(el => {
      el.classList.remove('bounce-in', 'elastic-in', 'flip-in', 'rotate-in');
      el.classList.add('fade-in-up');
    });
    
    // Reduce parallax effects
    document.querySelectorAll('.parallax-bg').forEach(el => {
      el.style.backgroundAttachment = 'scroll';
    });
    
    // Limit staggered animations
    document.querySelectorAll('.stagger-fade-in, .stagger-slide-up').forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        if (index > 3) { // Only animate first 4 items
          item.style.opacity = '1';
          item.style.transform = 'none';
        }
      });
    });
  }

  applyMediumPerformance() {
    // Moderate animation settings
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
    document.documentElement.style.setProperty('--transition-duration', '0.4s');
    
    // Optimize parallax for mobile
    if (this.isMobile) {
      document.querySelectorAll('.parallax-bg').forEach(el => {
        el.style.backgroundAttachment = 'scroll';
      });
    }
    
    // Reduce stagger delay
    document.querySelectorAll('[data-stagger-delay]').forEach(el => {
      const delay = parseInt(el.dataset.staggerDelay);
      el.dataset.staggerDelay = Math.min(delay, 100);
    });
  }

  applyHighPerformance() {
    // Full animation experience
    document.documentElement.style.setProperty('--animation-duration', '0.6s');
    document.documentElement.style.setProperty('--transition-duration', '0.6s');
    
    // Enable all features
    // No restrictions needed for high-performance devices
  }

  monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // Adjust performance if FPS is too low
        if (fps < 30 && this.performanceMode !== 'reduced') {
          this.downgradePerformance();
        }
      }
      
      if (this.performanceMode !== 'reduced') {
        requestAnimationFrame(measureFPS);
      }
    };
    
    requestAnimationFrame(measureFPS);
  }

  downgradePerformance() {
    if (this.performanceMode === 'high') {
      this.performanceMode = 'medium';
      this.applyMediumPerformance();
    } else if (this.performanceMode === 'medium') {
      this.performanceMode = 'low';
      this.applyLowPerformance();
    }
  }

  setupVisibilityHandler() {
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  pauseAnimations() {
    // Pause all ongoing animations
    document.querySelectorAll('.counter').forEach(counter => {
      if (counter.dataset.animating === 'true') {
        counter.dataset.pausedAt = counter.textContent;
        counter.dataset.wasAnimating = 'true';
      }
    });
    
    // Pause videos
    document.querySelectorAll('.video-scroll-play').forEach(video => {
      if (video.tagName === 'VIDEO' && !video.paused) {
        video.pause();
        video.dataset.wasPlaying = 'true';
      }
    });
  }

  resumeAnimations() {
    // Resume animations
    document.querySelectorAll('.counter').forEach(counter => {
      if (counter.dataset.wasAnimating === 'true') {
        delete counter.dataset.wasAnimating;
        // Counter will resume automatically on next scroll
      }
    });
    
    // Resume videos
    document.querySelectorAll('.video-scroll-play').forEach(video => {
      if (video.tagName === 'VIDEO' && video.dataset.wasPlaying === 'true') {
        delete video.dataset.wasPlaying;
        video.play();
      }
    });
  }

  // Public method to get current performance mode
  getPerformanceMode() {
    return this.performanceMode;
  }

  // Public method to manually set performance mode
  setPerformanceMode(mode) {
    if (['reduced', 'low', 'medium', 'high'].includes(mode)) {
      this.performanceMode = mode;
      this.applyOptimizations();
    }
  }
}

// Performance utilities
const PerformanceUtils = {
  // Debounce function for scroll events
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Check if element is partially in viewport
  isPartiallyInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right > 0
    );
  }
};

// Initialize performance optimizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationPerformance = new AnimationPerformanceOptimizer();
  
  // Make utilities available globally
  window.PerformanceUtils = PerformanceUtils;
});

// Export for use in other modules
window.AnimationPerformanceOptimizer = AnimationPerformanceOptimizer;