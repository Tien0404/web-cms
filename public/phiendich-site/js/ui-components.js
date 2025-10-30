// UI Components Module

// Menu toggle functionality
// Menu toggle functionality (optimized)
function initializeMenuToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.menu');

    if (!navToggle || !menu) return;

    let isAnimating = false;

    const toggleMenu = () => {
        if (isAnimating) return;
        isAnimating = true;

        const isOpen = menu.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.classList.toggle('active', isOpen);

        // Khóa cuộn khi mở menu
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Reset animation lock sau 400ms
        setTimeout(() => {
            isAnimating = false;
        }, 400);
    };

    navToggle.addEventListener('click', toggleMenu);

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('show') && !menu.contains(e.target) && !navToggle.contains(e.target)) {
            menu.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Tự đóng khi resize về desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 980 && menu.classList.contains('show')) {
            menu.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}


// Submenu toggle functionality
function initializeSubmenuToggle() {
    document.querySelectorAll('.submenu-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            const submenu = btn.nextElementSibling;
            if (submenu) submenu.style.display = expanded ? 'none' : 'block';
        });
    });
}

// Dropdown menu functionality
function initializeDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            // Toggle dropdown on click for mobile
            toggle.addEventListener('click', (e) => {
                e.preventDefault();

                // Check if we're in mobile view
                const isMobile = window.innerWidth <= 980;

                if (isMobile) {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');

                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });

            // Close dropdown when clicking outside (mobile only)
            document.addEventListener('click', (e) => {
                const isMobile = window.innerWidth <= 980;
                if (isMobile && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

// Slider functionality (legacy - skips testimonials sliders)
function initializeSlider() {
    const slider = document.querySelector('[data-slider]');
    if (slider) {
        // Skip testimonials sliders as they use the optimized implementation
        if (slider.classList.contains('testimonials-slider') ||
            slider.querySelector('.testimonial-slide')) {
            console.log('Testimonials slider found, skipping legacy initialization');
            return;
        }
        
        console.log('Slider found, initializing...');
        const slides = slider.querySelector('.slides');
        const slideItems = Array.from(slides.children);
        const prev = slider.querySelector('[data-prev]');
        const next = slider.querySelector('[data-next]');
        const dotsWrap = slider.querySelector('[data-dots]');
        let index = 0;
        let auto;

        console.log(`Found ${slideItems.length} slides`);

        const go = (i) => {
            index = (i + slideItems.length) % slideItems.length;
            console.log(`Going to slide ${index}`);
            slides.style.transform = `translateX(${-index * 100}%)`;

            // Update dots
            if (dotsWrap) {
                const dots = dotsWrap.querySelectorAll('button');
                dots.forEach((d, di) => {
                    d.setAttribute('aria-current', di === index ? 'true' : 'false');
                });
            }
        };

        // Clear existing dots
        if (dotsWrap) {
            dotsWrap.innerHTML = '';

            // build dots
            slideItems.forEach((_, i) => {
                const b = document.createElement('button');
                b.setAttribute('aria-label', `Go to slide ${i + 1}`);
                b.addEventListener('click', () => go(i));
                dotsWrap.appendChild(b);
            });
        }

        if (prev) prev.addEventListener('click', () => go(index - 1));
        if (next) next.addEventListener('click', () => go(index + 1));

        const start = () => {
            auto = setInterval(() => go(index + 1), 5000);
        };
        const stop = () => clearInterval(auto);

        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);

        // Initialize first slide
        go(0);
        start();
    } else {
        console.log('No slider found');
    }
}

// Form handlers
function initializeFormHandlers() {
    document.querySelectorAll('form').forEach(f => {
        if (f.id !== 'newsForm') {
            f.addEventListener('submit', e => {
                e.preventDefault();
                const alertMessage = window.languageManager ?
                    (window.languageManager.formAlertMessage || 'Đây là mẫu giao diện. Hãy kết nối backend/email theo nhu cầu của bạn.') :
                    'Đây là mẫu giao diện. Hãy kết nối backend/email theo nhu cầu của bạn.';
                alert(alertMessage);
            });
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearEl = document.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Initialize all UI components
function initializeUIComponents() {
    setCurrentYear();
    initializeMenuToggle();
    initializeSubmenuToggle();
    initializeDropdowns();
    initializeSlider();
    initializeFormHandlers();
    initializeSmoothScrolling();
}

// Export functions for use in other modules
window.UIComponents = {
    initializeMenuToggle,
    initializeSubmenuToggle,
    initializeDropdowns,
    initializeSlider,
    initializeFormHandlers,
    initializeSmoothScrolling,
    setCurrentYear,
    initializeUIComponents
};