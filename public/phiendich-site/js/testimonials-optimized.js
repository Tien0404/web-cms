/**
 * Testimonials Slider - Optimized Implementation
 * Provides smooth, accessible slider functionality for testimonials
 */

class TestimonialsSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.slidesContainer = sliderElement.querySelector('.testimonials-slides');
        this.slides = Array.from(this.slidesContainer.children);
        this.prevButton = sliderElement.querySelector('[data-prev]');
        this.nextButton = sliderElement.querySelector('[data-next]');
        this.dotsContainer = sliderElement.querySelector('[data-dots]');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isTransitioning = false;
        this.autoplayDelay = 5000;
        
        // Touch/swipe support
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        this.init();
    }
    
    init() {
        if (this.slides.length <= 1) return;
        
        this.setupAccessibility();
        this.createDots();
        this.bindEvents();
        this.setupAutoplay();
        this.goToSlide(0, false);
        
        // Add animation classes to slides
        this.slides.forEach((slide, index) => {
            slide.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    setupAccessibility() {
        // Set up ARIA attributes
        this.slider.setAttribute('role', 'region');
        this.slider.setAttribute('aria-roledescription', 'carousel');
        this.slidesContainer.setAttribute('role', 'list');
        
        this.slides.forEach((slide, index) => {
            slide.setAttribute('role', 'listitem');
            slide.setAttribute('aria-label', `Testimonial ${index + 1} of ${this.slides.length}`);
        });
        
        if (this.prevButton) {
            this.prevButton.setAttribute('aria-controls', 'testimonials-slides');
            this.prevButton.setAttribute('role', 'button');
        }
        
        if (this.nextButton) {
            this.nextButton.setAttribute('aria-controls', 'testimonials-slides');
            this.nextButton.setAttribute('role', 'button');
        }
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        this.dotsContainer.setAttribute('role', 'tablist');
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonials-dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            dot.setAttribute('data-index', index);
            
            dot.addEventListener('click', () => this.goToSlide(index));
            dot.addEventListener('keydown', (e) => this.handleDotKeydown(e, index));
            
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = Array.from(this.dotsContainer.children);
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.previous());
            this.prevButton.addEventListener('keydown', (e) => this.handleKeydown(e, 'prev'));
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.next());
            this.nextButton.addEventListener('keydown', (e) => this.handleKeydown(e, 'next'));
        }
        
        // Touch events for mobile
        this.slidesContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.slidesContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse events for desktop
        this.slider.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.slider.addEventListener('mouseleave', () => this.resumeAutoplay());
        
        // Keyboard navigation
        this.slider.addEventListener('keydown', (e) => this.handleSliderKeydown(e));
        
        // Visibility change to pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else {
                this.resumeAutoplay();
            }
        });
        
        // Resize observer for responsive adjustments
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => this.handleResize());
            resizeObserver.observe(this.slider);
        }
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                this.previous();
            } else {
                this.next();
            }
        }
    }
    
    handleKeydown(e, direction) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (direction === 'prev') {
                this.previous();
            } else {
                this.next();
            }
        }
    }
    
    handleDotKeydown(e, index) {
        let targetIndex = index;
        
        switch (e.key) {
            case 'ArrowLeft':
                targetIndex = Math.max(0, index - 1);
                break;
            case 'ArrowRight':
                targetIndex = Math.min(this.slides.length - 1, index + 1);
                break;
            case 'Home':
                targetIndex = 0;
                break;
            case 'End':
                targetIndex = this.slides.length - 1;
                break;
            default:
                return;
        }
        
        e.preventDefault();
        this.goToSlide(targetIndex);
        this.dots[targetIndex].focus();
    }
    
    handleSliderKeydown(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previous();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.next();
        }
    }
    
    handleResize() {
        // Recalculate positions if needed
        this.goToSlide(this.currentIndex, false);
    }
    
    setupAutoplay() {
        this.resumeAutoplay();
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resumeAutoplay() {
        if (this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.autoplayDelay);
    }
    
    goToSlide(index, animate = true) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        
        // Update current index
        this.currentIndex = index;
        
        // Update slides position
        if (animate) {
            this.slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            this.slidesContainer.style.transition = 'none';
        }
        
        this.slidesContainer.style.transform = `translateX(${-index * 100}%)`;
        
        // Update dots
        this.updateDots();
        
        // Update slide visibility for screen readers
        this.updateSlideAccessibility();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, animate ? 500 : 0);
    }
    
    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            const isActive = index === this.currentIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }
    
    updateSlideAccessibility() {
        this.slides.forEach((slide, index) => {
            const isActive = index === this.currentIndex;
            slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            
            // Focus management for screen readers
            if (isActive) {
                const focusableElements = slide.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length > 0) {
                    slide.setAttribute('tabindex', '0');
                } else {
                    slide.setAttribute('tabindex', '-1');
                }
            } else {
                slide.setAttribute('tabindex', '-1');
            }
        });
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previous() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    // Public methods
    pause() {
        this.pauseAutoplay();
    }
    
    play() {
        this.resumeAutoplay();
    }
    
    goTo(index) {
        if (index >= 0 && index < this.slides.length) {
            this.goToSlide(index);
        }
    }
    
    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        if (this.prevButton) {
            this.prevButton.removeEventListener('click', this.previous);
        }
        
        if (this.nextButton) {
            this.nextButton.removeEventListener('click', this.next);
        }
        
        // Clear dots
        if (this.dotsContainer) {
            this.dotsContainer.innerHTML = '';
        }
        
        // Reset styles
        this.slidesContainer.style.transition = '';
        this.slidesContainer.style.transform = '';
    }
}

// Initialize testimonials slider
function initializeTestimonialsSlider() {
    const sliderElement = document.querySelector('[data-slider]');
    
    if (sliderElement) {
        // Create and store the slider instance
        window.testimonialsSlider = new TestimonialsSlider(sliderElement);
        
        // Add fade-in animation to the slider
        sliderElement.classList.add('fade-in-up');
        
        return window.testimonialsSlider;
    }
    
    return null;
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeTestimonialsSlider);

// Export for use in other modules
window.TestimonialsSlider = TestimonialsSlider;
window.initializeTestimonialsSlider = initializeTestimonialsSlider;