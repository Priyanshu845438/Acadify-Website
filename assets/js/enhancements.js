/**
 * Website Enhancements - Dark Mode, Back to Top, Cookie Consent, Multi-language
 * Modern JavaScript features for enhanced user experience
 */

/**
 * Dark/Light Mode Toggle
 * Note: Dark mode toggle is handled in script.js - this function is removed to prevent duplicates
 */



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
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide on scroll
    window.addEventListener('scroll', toggleBackToTop);
    
    // Initial check
    toggleBackToTop();
}

/**
 * Cookie Consent Banner
 */
function initializeCookieConsent() {
    // Check if consent has already been given
    if (localStorage.getItem('cookieConsent')) {
        return;
    }
    
    // Create cookie banner
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <div class="cookie-banner__content">
            <div class="cookie-banner__text">
                <p>We use cookies to enhance your browsing experience and provide personalized content. By continuing to use our site, you agree to our use of cookies.</p>
            </div>
            <div class="cookie-banner__actions">
                <button class="btn btn-secondary cookie-banner__btn" id="cookie-decline">Decline</button>
                <button class="btn btn-primary cookie-banner__btn" id="cookie-accept">Accept</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(cookieBanner);
    
    // Handle accept and decline with event delegation
    cookieBanner.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'cookie-accept') {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('visible');
            setTimeout(() => cookieBanner.remove(), 300);
        } else if (e.target && e.target.id === 'cookie-decline') {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('visible');
            setTimeout(() => cookieBanner.remove(), 300);
        }
    });
    
    // Show banner with animation
    setTimeout(() => {
        cookieBanner.classList.add('visible');
    }, 1000);
}

/**
 * Language Selector
 */
function initializeLanguageSelector() {
    // Language selector implementation
    const languages = {
        'en': 'English',
        'hi': 'हिंदी',
        'mr': 'मराठी'
    };
    
    // Create language selector
    const langSelector = document.createElement('div');
    langSelector.className = 'language-selector';
    langSelector.innerHTML = `
        <select class="language-select" aria-label="Select language">
            ${Object.entries(languages).map(([code, name]) => 
                `<option value="${code}">${name}</option>`
            ).join('')}
        </select>
    `;
    
    // Add to header
    const header = document.querySelector('.header');
    if (header) {
        header.appendChild(langSelector);
    }
}

/**
 * Notification System
 */
function initializeNotificationSystem() {
    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
    
    // Global notification function
    window.showNotification = function(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('visible'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Manual close
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        });
    };
}

/**
 * PWA Features
 */
function initializePWAFeatures() {
    // Register service worker if supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    }
    
    // Add to home screen prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        const installBtn = document.createElement('button');
        installBtn.className = 'install-btn';
        installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
        installBtn.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
                installBtn.remove();
            });
        });
        
        document.body.appendChild(installBtn);
    });
}

/**
 * Performance Monitoring
 */
function initializePerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track Core Web Vitals if supported
        if ('web-vitals' in window) {
            // Implementation would go here
        }
    });
}

/**
 * Smooth Scrolling
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * FAQ Functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Contact Form
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form validation and submission logic here
            console.log('Form submitted');
        });
    }
}

/**
 * Initialize all enhanced features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeBackToTop();
    initializeDarkModeToggle();
    initializeCookieConsent();
    initializeLanguageSelector();
    initializeNotificationSystem();
    initializePWAFeatures();
    initializePerformanceMonitoring();
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