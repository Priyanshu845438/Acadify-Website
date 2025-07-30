/**
 * Lottie Animation Handler for Hero Section
 */

// Load Lottie Web library
function loadLottieLibrary() {
    return new Promise((resolve, reject) => {
        if (window.lottie) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Initialize Hero Lottie Animation
async function initializeHeroAnimation() {
    try {
        // Load Lottie library
        await loadLottieLibrary();
        
        const container = document.getElementById('hero-lottie-animation');
        if (!container) {
            console.warn('Hero Lottie container not found');
            return;
        }

        // Load and play the animation
        const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/hero-animation.json'
        });

        // Handle animation events
        animation.addEventListener('DOMLoaded', () => {
            console.log('Hero animation loaded successfully');
        });

        animation.addEventListener('error', (error) => {
            console.error('Hero animation error:', error);
            // Fallback to static image
            showFallbackImage(container);
        });

        // Optimize performance
        animation.setSpeed(0.8); // Slightly slower for better visual appeal
        
        return animation;
        
    } catch (error) {
        console.error('Failed to load Lottie animation:', error);
        // Fallback to static image
        const container = document.getElementById('hero-lottie-animation');
        if (container) {
            showFallbackImage(container);
        }
    }
}

// Fallback function to show static image if Lottie fails
function showFallbackImage(container) {
    container.innerHTML = `
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
             alt="Modern Technology Solutions" 
             class="hero__main-image hero__fallback-image">
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeroAnimation);

// Export for use in other scripts
window.heroAnimation = {
    init: initializeHeroAnimation,
    fallback: showFallbackImage
};