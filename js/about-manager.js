/**
 * About Manager - Handles animations and interactions for the about section
 */
class AboutManager {
  constructor() {
    this.statsAnimated = false;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Check if about section exists
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    // Set up intersection observer for stats animation
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.statsAnimated) {
          this.animateStats();
          this.statsAnimated = true;
        }
      });
    }, observerOptions);

    // Observe the stats section
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.AboutManager) {
    window.aboutManager = new AboutManager();
    window.aboutManager.init();
  }
});

// Export for global access
window.AboutManager = AboutManager;