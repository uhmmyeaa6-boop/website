document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeStatCounters();
    initializeCardClickHandlers();
    initializeScrollEffects();
});

//  all animations
function initializeAnimations() {

    const animatedElements = document.querySelectorAll('.timeline-item, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
}

// stat counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
}

function initializeCardClickHandlers() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('click', function () {
            const page = this.getAttribute('data-page');

            // Add a click animation
            this.style.transform = 'translateX(15px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            console.log(`Navigating to ${page}.html`);

        });

        // hover 
        item.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// scroll effects
function initializeScrollEffects() {

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Nav bar background 
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Change navbar opacity based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');

        if (heroTitle) heroTitle.style.animationPlayState = 'running';
        if (heroSubtitle) heroSubtitle.style.animationPlayState = 'running';
    }, 100);
});

// Mobile menu toggle 
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Keyboard navigation support
document.addEventListener('keydown', function (e) {

    if (e.key === 'Enter' || e.key === ' ') {
        const focusedItem = document.activeElement;
        if (focusedItem.classList.contains('timeline-item')) {
            e.preventDefault();
            focusedItem.click();
        }
    }
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Navigate to ${item.querySelector('h3').textContent} page`);
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
