/**
 * Website Enhancements - Dark Mode, Back to Top, Cookie Consent, Multi-language
 * Modern JavaScript features for enhanced user experience
 */

/**
 * Dark/Light Mode Toggle
 */
function initializeDarkModeToggle() {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.setAttribute('title', 'Toggle dark/light mode');
    
    // Add to header
    const header = document.querySelector('.header');
    if (header) {
        header.appendChild(darkModeToggle);
    }
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle icon based on current theme
    updateDarkModeIcon(darkModeToggle, currentTheme);
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(darkModeToggle, newTheme);
        
        // Add transition effect
        darkModeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateDarkModeIcon(button, theme) {
    const icon = button.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

/**
 * Back to Top Button
 */
function initializeBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Back to top');
    
    // Add to body
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    const toggleBackToTop = () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    
    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Event listeners
    window.addEventListener('scroll', toggleBackToTop);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleBackToTop();
}

/**
 * Cookie Consent Banner
 */
function initializeCookieConsent() {
    // Check if consent already given
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        return;
    }
    
    // Create cookie banner
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <div class="cookie-banner__content">
            <div class="cookie-banner__text">
                <h4>We use cookies</h4>
                <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
            </div>
            <div class="cookie-banner__actions">
                <button class="btn btn--outline btn--sm" id="cookie-settings">Cookie Settings</button>
                <button class="btn btn--primary btn--sm" id="cookie-accept">Accept All</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(cookieBanner);
    
    // Show banner
    setTimeout(() => {
        cookieBanner.classList.add('visible');
    }, 1000);
    
    // Accept all cookies
    document.getElementById('cookie-accept').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('visible');
        setTimeout(() => {
            cookieBanner.remove();
        }, 300);
    });
    
    // Cookie settings (simplified)
    document.getElementById('cookie-settings').addEventListener('click', () => {
        showCookieSettings();
    });
}

function showCookieSettings() {
    const modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.innerHTML = `
        <div class="cookie-modal__backdrop"></div>
        <div class="cookie-modal__content">
            <div class="cookie-modal__header">
                <h3>Cookie Settings</h3>
                <button class="cookie-modal__close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cookie-modal__body">
                <div class="cookie-category">
                    <div class="cookie-category__header">
                        <h4>Essential Cookies</h4>
                        <label class="cookie-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category__header">
                        <h4>Analytics Cookies</h4>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="analytics-cookies" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <p>These cookies help us understand how visitors interact with our website.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category__header">
                        <h4>Marketing Cookies</h4>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="marketing-cookies">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <p>These cookies are used to show you ads that are relevant to your interests.</p>
                </div>
            </div>
            <div class="cookie-modal__footer">
                <button class="btn btn--outline" id="save-preferences">Save Preferences</button>
                <button class="btn btn--primary" id="accept-all-modal">Accept All</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
    
    // Close modal
    const closeModal = () => {
        modal.classList.remove('visible');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.cookie-modal__close').addEventListener('click', closeModal);
    modal.querySelector('.cookie-modal__backdrop').addEventListener('click', closeModal);
    
    // Save preferences
    document.getElementById('save-preferences').addEventListener('click', () => {
        const analytics = document.getElementById('analytics-cookies').checked;
        const marketing = document.getElementById('marketing-cookies').checked;
        
        localStorage.setItem('cookieConsent', 'custom');
        localStorage.setItem('analyticsCookies', analytics);
        localStorage.setItem('marketingCookies', marketing);
        
        closeModal();
        document.querySelector('.cookie-banner').classList.remove('visible');
    });
    
    // Accept all
    document.getElementById('accept-all-modal').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        closeModal();
        document.querySelector('.cookie-banner').classList.remove('visible');
    });
}

/**
 * Multi-language Support
 */
function initializeMultiLanguage() {
    // Create language selector
    const langSelector = document.createElement('div');
    langSelector.className = 'language-selector';
    langSelector.innerHTML = `
        <button class="lang-toggle">
            <i class="fas fa-globe"></i>
            <span class="lang-current">EN</span>
            <i class="fas fa-chevron-down"></i>
        </button>
        <div class="lang-dropdown">
            <a href="#" data-lang="en" class="lang-option active">
                <span class="flag">🇺🇸</span>
                <span>English</span>
            </a>
            <a href="#" data-lang="hi" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>हिंदी</span>
            </a>
            <a href="#" data-lang="mr" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>मराठी</span>
            </a>
            <a href="#" data-lang="ta" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>तमिल</span>
            </a>
            <a href="#" data-lang="te" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>तेलुगु</span>
            </a>
            <a href="#" data-lang="kn" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>ಕನ್ನಡ</span>
            </a>
            <a href="#" data-lang="od" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>ଓଡିଆ</span>
            </a>
            <a href="#" data-lang="bn" class="lang-option">
                <span class="flag">🇮🇳</span>
                <span>বাংলা</span>
            </a>
        </div>
    `;
    
    // Add to header
    const header = document.querySelector('.header');
    if (header) {
        header.appendChild(langSelector);
    }
    
    // Get current language
    const currentLang = localStorage.getItem('language') || 'en';
    updateLanguageDisplay(currentLang);
    
    // Toggle dropdown
    const toggle = langSelector.querySelector('.lang-toggle');
    const dropdown = langSelector.querySelector('.lang-dropdown');
    
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('open');
    });
    
    // Language selection
    const langOptions = langSelector.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.dataset.lang;
            changeLanguage(lang);
            dropdown.classList.remove('open');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
}

function updateLanguageDisplay(lang) {
    const langMap = {
        'en': { flag: '🇺🇸', code: 'EN', name: 'English' },
        'hi': { flag: '🇮🇳', code: 'HI', name: 'हिंदी' },
        'mr': { flag: '🇮🇳', code: 'MR', name: 'मराठी' },
        'ta': { flag: '🇮🇳', code: 'TA', name: 'तमिल' },
        'te': { flag: '🇮🇳', code: 'TE', name: 'तेलुगु' },
        'kn': { flag: '🇮🇳', code: 'KN', name: 'ಕನ್ನಡ' },
        'od': { flag: '🇮🇳', code: 'OD', name: 'ଓଡିଆ' },
        'bn': { flag: '🇮🇳', code: 'BN', name: 'বাংলা' }
    };
    
    const current = langMap[lang];
    if (current) {
        document.querySelector('.lang-current').textContent = current.code;
    }
    
    // Update active option
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    updateLanguageDisplay(lang);
    translatePage(lang);
}

function translatePage(lang) {
    // In a real application, you would load translation files
    // For this demo, we'll show a notification
    showNotification(`Language changed to ${lang.toUpperCase()}. Full translation coming soon!`, 'info');
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Here you would typically:
    // 1. Load translation JSON file
    // 2. Replace text content based on data-i18n attributes
    // 3. Update page title and meta descriptions
    // 4. Handle RTL languages if needed
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

/**
 * Progressive Web App (PWA) Features
 */
function initializePWAFeatures() {
    // Register service worker (commented out - no service worker file yet)
    /*
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
    */
    }
    
    // Install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });
    
    // Show install button
    function showInstallButton() {
        const installBtn = document.createElement('button');
        installBtn.className = 'install-app-btn';
        installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
        installBtn.style.display = 'none';
        
        document.body.appendChild(installBtn);
        
        setTimeout(() => {
            installBtn.style.display = 'block';
        }, 5000);
        
        installBtn.addEventListener('click', () => {
            installBtn.style.display = 'none';
            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
            });
        });
    }
}

/**
 * Testimonials Carousel Functionality - 3 Cards Per Row
 */
function initializeTestimonialsCarousel() {
    const carousel = document.getElementById('testimonials-carousel');
    if (!carousel) return;
    
    const track = document.getElementById('testimonials-track');
    const slides = document.querySelectorAll('.testimonials-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -(currentSlide * 50); // 50% per slide (2 slides = 100%)
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update slides active state
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000); // 6 seconds - longer for 3 cards
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
        });
    });
    
    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', () => {
        const diffX = startX - endX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
        setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel.getBoundingClientRect().top < window.innerHeight && 
            carousel.getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 2000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 2000);
            }
        }
    });
    
    // Initialize
    updateCarousel();
    startAutoSlide();
}

/**
 * Initialize all enhanced features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeBackToTop();
    // initializeDarkModeToggle(); // Temporarily disabled
    initializeCookieConsent();
    initializeLanguageSelector();
    initializeNotificationSystem();
    initializePWAFeatures();
    initializePerformanceMonitoring();
    // initializeTestimonialsCarousel(); // Moved to separate file
    
    // Add smooth scrolling to navigation links
    initializeSmoothScrolling();
    
    // Initialize FAQ if on FAQ page
    if (document.querySelector('.faq-section')) {
        initializeFAQ();
    }
    
    // Initialize contact form if on contact page
    if (document.querySelector('#contact-form')) {
        initializeContactForm();
    }
});