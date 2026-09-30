document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeHoverEffects();
    initializeScrollEffects();
});

// animations
function initializeAnimations() {

    const sections = document.querySelectorAll('.content-section');

    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';

        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// hover effects
function initializeHoverEffects() {

    const centerImage = document.querySelector('.center-image');

    if (centerImage) {
        centerImage.addEventListener('click', function () {
            console.log('Center image clicked');

        });
    }
}

// scroll effects
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Change nav bar background 
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
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

    const contentSections = document.querySelectorAll('.content-section');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        contentSections.forEach((section, index) => {
            const rate = scrolled * -0.05 * (index + 1);
            const yPos = -(rate);
            section.style.transform = `translateY(${yPos}px)`;
        });
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

// Loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease';
            mainContent.style.opacity = '1';
        }, 100);
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.content-section, .center-image');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('center-image')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const centerImage = document.querySelector('.center-image');
    if (centerImage) {
        centerImage.setAttribute('tabindex', '0');
        centerImage.setAttribute('role', 'button');
        centerImage.setAttribute('aria-label', '5G Coverage Map of Singapore - click to interact');
    }
});