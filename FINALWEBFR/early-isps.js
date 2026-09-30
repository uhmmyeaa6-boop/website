document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeHoverEffects();
    initializeScrollEffects();
});

// page animations
function initializeAnimations() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    imagePlaceholders.forEach((placeholder, index) => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'translateY(20px)';

        setTimeout(() => {
            placeholder.style.transition = 'all 0.5s ease';
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// hover effects
function initializeHoverEffects() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });

        placeholder.addEventListener('mouseleave', function () {
            this.style.boxShadow = 'none';
        });

        placeholder.addEventListener('click', function () {
            console.log('Clicked:', this.textContent);
        });
    });
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
}

// scrolling 
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