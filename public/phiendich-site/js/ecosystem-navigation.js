// Ecosystem Navigation Functionality - Optimized for Performance
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle ecosystem item clicks
  function initEcosystemNavigation() {
    const ecosystemItems = document.querySelectorAll('.eco-item.clickable');
    
    ecosystemItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-eco-section');
        if (targetSection) {
          // Direct navigation to specific subsection
          const targetElement = document.getElementById(`ecosystem-${targetSection}`);
          if (targetElement) {
            // Calculate offset for fixed header if any
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
            
            // Fast smooth scroll using requestAnimationFrame
            smoothScrollTo(offsetPosition, 800);
            
            // Add highlight effect immediately
            targetElement.classList.add('eco-block--highlighted');
            
            // Remove highlight after shorter time
            setTimeout(() => {
              targetElement.classList.remove('eco-block--highlighted');
            }, 1500);
          }
        }
      });
    });
  }

  // Optimized smooth scroll function
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }

  // Initialize the navigation
  initEcosystemNavigation();

  // Re-initialize when components are loaded (for dynamic content)
  if (window.reinitializeComponents) {
    const originalReinitialize = window.reinitializeComponents;
    window.reinitializeComponents = function() {
      if (originalReinitialize) originalReinitialize();
      initEcosystemNavigation();
    };
  }
});

// Optimized CSS for highlight effect
const style = document.createElement('style');
style.textContent = `
  .eco-block--highlighted {
    animation: highlightPulse 1.5s ease-out;
    border-left-color: #f5b301 !important;
    box-shadow: 0 12px 32px rgba(245, 179, 1, 0.3) !important;
  }
  
  @keyframes highlightPulse {
    0% {
      transform: scale(1);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }
    30% {
      transform: scale(1.01);
      box-shadow: 0 12px 32px rgba(245, 179, 1, 0.4);
    }
    100% {
      transform: scale(1);
      box-shadow: var(--shadow);
    }
  }
`;
document.head.appendChild(style);