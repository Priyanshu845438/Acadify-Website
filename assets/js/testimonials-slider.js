/**
 * Ultra Professional Testimonials Carousel
 * Modern carousel with auto-play and manual controls
 */

class TestimonialsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.init();
    }

    setupDOM() {
        const track = document.getElementById('testimonials-track');
        const indicators = document.getElementById('carousel-indicators');
        
        if (!track) return;
        
        this.testimonialCards = track.querySelectorAll('.testimonial-card');
        this.totalSlides = this.testimonialCards.length;
        
        // Create indicators
        if (indicators) {
            indicators.innerHTML = '';
            for (let i = 0; i < this.totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
                indicator.addEventListener('click', () => this.goToSlide(i));
                indicators.appendChild(indicator);
            }
        }
        
        this.updateSlidePosition();
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const autoplayToggle = document.getElementById('autoplay-toggle');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        if (autoplayToggle) {
            autoplayToggle.addEventListener('click', () => this.toggleAutoPlay());
        }

        // Pause on hover
        const carousel = document.getElementById('testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }

        // Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.resumeAutoPlay();
                    } else {
                        this.pauseAutoPlay();
                    }
                });
            });

            if (carousel) {
                observer.observe(carousel);
            }
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlidePosition();
        this.updateIndicators();
        this.resetAutoPlay();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlidePosition();
        this.updateIndicators();
        this.resetAutoPlay();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlidePosition();
        this.updateIndicators();
        this.resetAutoPlay();
    }

    updateSlidePosition() {
        const track = document.getElementById('testimonials-track');
        if (track) {
            track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }

        // Update active card styling
        this.testimonialCards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        if (this.isAutoPlaying) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        }
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resumeAutoPlay() {
        if (this.isAutoPlaying && !this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        if (this.isAutoPlaying) {
            this.startAutoPlay();
        }
    }

    toggleAutoPlay() {
        const toggle = document.getElementById('autoplay-toggle');
        
        if (this.isAutoPlaying) {
            this.isAutoPlaying = false;
            this.pauseAutoPlay();
            toggle.classList.remove('playing');
        } else {
            this.isAutoPlaying = true;
            this.startAutoPlay();
            toggle.classList.add('playing');
        }
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard events when not in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            const carousel = document.getElementById('testimonials-carousel');
            if (!carousel) return;
            
            switch(e.key) {
                case ' ':
                case 'Space':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }

    setupTouchControls() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        const carousel = document.getElementById('testimonials-carousel');
        if (!carousel) return;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swiped left - next
                this.nextSlide();
            } else {
                // Swiped right - previous
                this.previousSlide();
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to load
    setTimeout(() => {
        new TestimonialsCarousel();
    }, 800);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsCarousel;
}