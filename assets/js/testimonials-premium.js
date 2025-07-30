/**
 * Premium Testimonials Section with Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    initializePremiumTestimonials();
});

function initializePremiumTestimonials() {
    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize counter animations
    initializeCounterAnimations();
    
    // Add intersection observer for enhanced animations
    initializeTestimonialObserver();
    
    console.log('Premium testimonials initialized');
}

function initializeCounterAnimations() {
    const counterElements = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
    };
    
    updateCounter();
}

function initializeTestimonialObserver() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        testimonialObserver.observe(card);
    });
}

// Add CSS animations dynamically
let testimonialStyles = `
    .testimonial-card {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease-out;
    }
    
    .testimonial-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .testimonial-card:nth-child(odd) {
        animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .testimonial-card:nth-child(even) {
        animation: slideInRight 0.8s ease-out forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px) translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px) translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
    }
    
    .testimonial-card.featured {
        animation: scaleIn 0.8s ease-out forwards;
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
        }
        to {
            opacity: 1;
            transform: scale(1.02) translateY(0);
        }
    }
    
    .stat-number {
        transform: scale(1);
        transition: transform 0.3s ease;
    }
    
    .stat-item:hover .stat-number {
        transform: scale(1.1);
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = testimonialStyles;
document.head.appendChild(styleSheet);