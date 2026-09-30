// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeHoverEffects();
    initializeScrollEffects();
    initializeTimelineInteraction();
});

//  page animations
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

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item-h');

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
}

// hover effects
function initializeHoverEffects() {

    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.parentElement.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
        });

        placeholder.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });

        placeholder.addEventListener('click', function () {
            console.log('Image clicked:', this.textContent);
        });
    });

    // box hover effects
    const contentBoxes = document.querySelectorAll('.content-box');

    contentBoxes.forEach(box => {
        box.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}
//  scroll effects
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

    const sections = document.querySelectorAll('.content-section');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        sections.forEach((section, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            const yPos = -(rate);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
}

//timeline interaction
function initializeTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item-h');

    timelineItems.forEach((item, index) => {
        const year = item.querySelector('.timeline-year');
        const content = item.querySelector('.timeline-content-h');

        // Click effect
        item.addEventListener('click', function () {

            timelineItems.forEach(ti => {
                ti.classList.remove('active');
            });

            this.classList.add('active');

            // Animate the selection
            year.style.transform = 'scale(1.2)';
            content.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                year.style.transform = '';
                content.style.transform = 'translateY(-5px)';
            }, 200);

            console.log('Timeline item clicked:', year.textContent);
        });

        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Timeline event: ${year.textContent}`);

        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Horizontal scroll for timeline for mobile
    const timeline = document.querySelector('.timeline-horizontal');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    timeline.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
        timeline.style.cursor = 'grabbing';
    });

    timeline.addEventListener('mouseleave', () => {
        isScrolling = false;
        timeline.style.cursor = 'grab';
    });

    timeline.addEventListener('mouseup', () => {
        isScrolling = false;
        timeline.style.cursor = 'grab';
    });

    timeline.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
    });
}

// Add scrolling 
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
    const animatedElements = document.querySelectorAll('.content-box, .image-box, .timeline-item-h');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});