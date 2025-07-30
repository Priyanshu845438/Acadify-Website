/**
 * Client Logos Slider with Infinite Scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeClientLogos();
});

function initializeClientLogos() {
    const logoRows = document.querySelectorAll('.logos-row');
    
    logoRows.forEach((row, index) => {
        const track = row.querySelector('.logos-track');
        const direction = row.getAttribute('data-direction');
        
        // Clone logos for seamless infinite scroll
        const logos = track.querySelectorAll('.logo-item');
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
        
        // Set different animation speeds for visual interest
        const speeds = ['25s', '30s', '35s'];
        const speed = speeds[index % speeds.length];
        
        if (direction === 'right') {
            track.style.animationDuration = speed;
            track.style.animationDirection = 'reverse';
        } else {
            track.style.animationDuration = speed;
        }
        
        // Add pause on hover functionality
        row.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
    
    // Initialize intersection observer for performance
    initializeLogoObserver();
    
    console.log('Client logos initialized');
}

function initializeLogoObserver() {
    const logoSection = document.querySelector('.client-logos-section');
    const trustItems = document.querySelectorAll('.trust-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate trust indicators when section comes into view
                trustItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    if (logoSection) {
        logoObserver.observe(logoSection);
    }
    
    // Set initial state for trust indicators
    trustItems.forEach(item => {
        item.style.transform = 'translateY(20px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease-out';
    });
}

// Add dynamic logo hover effects
function addLogoEffects() {
    const logoItems = document.querySelectorAll('.logo-item');
    
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize effects after DOM is ready
setTimeout(addLogoEffects, 1000);