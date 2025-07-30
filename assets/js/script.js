/**
 * TechVision IT Solutions - Main JavaScript File
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeForms();
    initializeModals();
    initializeFilters();
    initializeFAQ();
    initializeBackToTop();
    initializePortfolio();
    initializeBlog();
    initializeTeam();
    initializeCareers();
});

/**
 * Navigation functionality
 */
function initializeNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Scroll effects and animations
 */
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Add staggered delay to elements with data-aos-delay
    document.querySelectorAll('[data-aos-delay]').forEach(el => {
        const delay = el.getAttribute('data-aos-delay');
        el.style.transitionDelay = delay + 'ms';
    });
    
    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroBackground = hero.querySelector('.hero__background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

/**
 * Counter animations for statistics
 */
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Form handling and validation
 */
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success modal
                showSuccessModal();
                contactForm.reset();
            }
        });
    }
    
    // Newsletter forms
    document.querySelectorAll('.newsletter__form, .newsletter-signup__form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]');
            if (email && email.value.trim()) {
                showNotification('Thank you for subscribing!', 'success');
                form.reset();
            }
        });
    });
    
    // Comment form
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Comment submitted successfully!', 'success');
            commentForm.reset();
        });
    }
    
    // File upload handling
    document.querySelectorAll('.file-input').forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
            const fileNameSpan = this.parentElement.querySelector('.file-name');
            if (fileNameSpan) {
                fileNameSpan.textContent = fileName;
            }
        });
    });
}

/**
 * Modal functionality
 */
function initializeModals() {
    // Generic modal functions
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Close modal when clicking on overlay
    document.querySelectorAll('.modal, .job-modal, .portfolio-modal, .success-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal buttons
    document.querySelectorAll('[id$="-close"], .modal__close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal, .job-modal, .portfolio-modal, .success-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Success modal
    const successModal = document.getElementById('success-modal');
    const closeSuccessModal = document.getElementById('close-success-modal');
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

/**
 * Show success modal
 */
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Filter functionality for portfolio, team, etc.
 */
function initializeFilters() {
    // Portfolio filter
    const portfolioFilters = document.querySelectorAll('.filter-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            portfolioFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Team filter
    const teamFilters = document.querySelectorAll('.team-filter-btn');
    const teamCards = document.querySelectorAll('.team-card');
    
    teamFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            teamFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            teamCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Job filter
    const jobFilters = document.querySelectorAll('.job-filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    
    jobFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            jobFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            jobCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Blog category filter
    const blogFilters = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-category');
            
            // Update active filter
            blogFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            blogCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * FAQ accordion functionality
 */
function initializeFAQ() {
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // FAQ category tabs
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide categories
            faqCategories.forEach(cat => {
                if (cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
    
    // FAQ search
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Back to top button
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Portfolio functionality
 */
function initializePortfolio() {
    // Portfolio modal
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalTriggers = document.querySelectorAll('.portfolio-modal-trigger');
    
    // Portfolio project data
    const projectData = {
        ecommerce: {
            title: 'E-commerce Platform',
            category: 'Web Development',
            image: 'https://pixabay.com/get/g41cfd079dc7a4cd052d25bf2c712025aeb95f15db5f44812d1aeafc5bcf11667ebdbaed27644bece9a3702554e011cc63991f5cfb246d6f5963a7d9bce1cc259_1280.jpg',
            description: 'A comprehensive e-commerce platform built with modern web technologies, featuring advanced product management, secure payment processing, and intuitive user experience.',
            client: 'RetailCorp Inc.',
            duration: '6 months',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            features: [
                'Responsive design for all devices',
                'Advanced product filtering and search',
                'Secure payment gateway integration',
                'Real-time inventory management',
                'Customer review and rating system',
                'Admin dashboard with analytics'
            ]
        },
        corporate: {
            title: 'Corporate Website',
            category: 'Web Development',
            image: 'https://pixabay.com/get/g3bd36dbaa2df1e86053e6de84fe6c631516e07f2e1e76b0848212dffd0d8c1f0beff7d4e638962449845e997dab090dbb84497d9eb56310316161e8a0bd24713_1280.jpg',
            description: 'Modern corporate website with CMS integration, SEO optimization, and content management capabilities for a Fortune 500 company.',
            client: 'Global Solutions Ltd.',
            duration: '4 months',
            technologies: ['WordPress', 'PHP', 'MySQL', 'jQuery'],
            features: [
                'Custom WordPress theme development',
                'SEO-optimized structure',
                'Multi-language support',
                'Contact form integration',
                'Blog management system',
                'Google Analytics integration'
            ]
        },
        fitness: {
            title: 'Fitness Tracking App',
            category: 'Mobile Development',
            image: 'https://pixabay.com/get/g6e7ad492b5947fbb88a14375f8ec09ad518cf7d396dd5db70ef53254012f408e701b9b23a95ecc9fc593e6ba1b8766122292038d430f2f8f0a89fe99e885f051_1280.jpg',
            description: 'Cross-platform mobile application for fitness tracking with social features, workout plans, and progress monitoring.',
            client: 'FitLife Solutions',
            duration: '8 months',
            technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
            features: [
                'Real-time workout tracking',
                'Social fitness challenges',
                'Progress analytics and reports',
                'Custom workout plan creation',
                'Integration with wearable devices',
                'Nutrition tracking and advice'
            ]
        },
        banking: {
            title: 'Digital Banking App',
            category: 'Mobile Development',
            image: 'https://pixabay.com/get/g8ed9277d2afc4ad68ab40c89814b360793fe13961aad0784bda9deb7c1bfaa53eac3a9700066fedc480004ae922ce807a98c956a6a04e28a5c3f83dda5913385_1280.jpg',
            description: 'Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
            client: 'SecureBank International',
            duration: '12 months',
            technologies: ['Flutter', 'Dart', 'AWS', 'PostgreSQL'],
            features: [
                'Biometric authentication (fingerprint, face ID)',
                'Real-time transaction monitoring',
                'Bill payment and money transfer',
                'Investment portfolio management',
                'Budgeting and expense tracking',
                'Customer support chat integration'
            ]
        },
        migration: {
            title: 'Enterprise Cloud Migration',
            category: 'Cloud Solutions',
            image: 'https://pixabay.com/get/g67ea64c8ef969a792954658e391cdc5901551542e03ecfb14b517c832f92e7f8a2e5f31ab82fb1b76648e87ca6133f4e186a809f9b5ae5acf34711e36047abd3_1280.jpg',
            description: 'Complete infrastructure migration to AWS cloud with 99.9% uptime guarantee and automated scaling capabilities.',
            client: 'Manufacturing Corp',
            duration: '10 months',
            technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
            features: [
                'Zero-downtime migration strategy',
                'Auto-scaling infrastructure',
                'Cost optimization analysis',
                'Security compliance implementation',
                'Disaster recovery setup',
                'Performance monitoring and alerts'
            ]
        },
        saas: {
            title: 'SaaS Platform Development',
            category: 'Cloud Solutions',
            image: 'https://pixabay.com/get/gb687765b41632eadc4df048af3bebc43a474a0bb1f2f52d8dca278ad8f5b042c7917c3579d6fe1950fd13c60267164ff7a967b1656e77e881a302da8602a34ba_1280.jpg',
            description: 'Multi-tenant SaaS application with auto-scaling, global distribution, and comprehensive API management.',
            client: 'CloudTech Innovations',
            duration: '14 months',
            technologies: ['Azure', 'Microservices', 'Redis', 'Angular'],
            features: [
                'Multi-tenant architecture',
                'API rate limiting and management',
                'Global CDN distribution',
                'Real-time collaboration tools',
                'Advanced analytics dashboard',
                'Third-party integrations'
            ]
        },
        audit: {
            title: 'Enterprise Security Audit',
            category: 'Cybersecurity',
            image: 'https://pixabay.com/get/g5c223a3cf3548fcb20c4e8c6607f8f277297e49b37a407e657c0266d8f08688bedba626e0dc1736bc990237930b6fa8e2b30041579146d76629920403e903dfb_1280.jpg',
            description: 'Comprehensive security assessment and vulnerability remediation for enterprise-level infrastructure.',
            client: 'TechGiant Corp',
            duration: '3 months',
            technologies: ['Penetration Testing', 'SIEM', 'Compliance', 'Security Tools'],
            features: [
                'Comprehensive vulnerability assessment',
                'Penetration testing across all systems',
                'Compliance gap analysis',
                'Security policy development',
                'Employee security training',
                'Incident response plan creation'
            ]
        },
        monitoring: {
            title: '24/7 Security Monitoring',
            category: 'Cybersecurity',
            image: 'https://pixabay.com/get/gbc314950b5636fa46b44a503fca1bd585e97628e4cb2c54d4946b16d290734e3d61aebca8275a66adc8a12b441b08022a4e8e2e94f6219fbd996b32ae7fb9243_1280.jpg',
            description: 'Real-time threat detection and incident response system with AI-powered analytics and automated responses.',
            client: 'FinanceSecure Inc.',
            duration: 'Ongoing',
            technologies: ['SOC', 'AI Detection', 'Automation', 'SIEM'],
            features: [
                '24/7 security operations center',
                'AI-powered threat detection',
                'Automated incident response',
                'Real-time alerting system',
                'Forensic analysis capabilities',
                'Compliance reporting and monitoring'
            ]
        }
    };
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && portfolioModal) {
                // Populate modal with project data
                portfolioModal.querySelector('#modal-image').src = project.image;
                portfolioModal.querySelector('#modal-image').alt = project.title;
                portfolioModal.querySelector('#modal-category').textContent = project.category;
                portfolioModal.querySelector('#modal-title').textContent = project.title;
                portfolioModal.querySelector('#modal-description').textContent = project.description;
                portfolioModal.querySelector('#modal-client').textContent = project.client;
                portfolioModal.querySelector('#modal-duration').textContent = project.duration;
                
                // Populate technologies
                const techContainer = portfolioModal.querySelector('#modal-tech');
                techContainer.innerHTML = '';
                project.technologies.forEach(tech => {
                    const techSpan = document.createElement('span');
                    techSpan.className = 'tech-badge';
                    techSpan.textContent = tech;
                    techContainer.appendChild(techSpan);
                });
                
                // Populate features
                const featuresList = portfolioModal.querySelector('#modal-features');
                featuresList.innerHTML = '';
                project.features.forEach(feature => {
                    const featureLi = document.createElement('li');
                    featureLi.textContent = feature;
                    featuresList.appendChild(featureLi);
                });
                
                // Show modal
                portfolioModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

/**
 * Blog functionality
 */
function initializeBlog() {
    // Blog search
    const blogSearch = document.getElementById('blog-search');
    if (blogSearch) {
        blogSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-card__title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-card__excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Pagination
    document.querySelectorAll('.pagination__number').forEach(pageBtn => {
        pageBtn.addEventListener('click', function() {
            document.querySelectorAll('.pagination__number').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Social sharing for blog posts
    document.querySelectorAll('.share-btn, .share-button').forEach(shareBtn => {
        shareBtn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${url}`;
                    break;
            }
            
            if (shareUrl) {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            }
        });
    });
}

/**
 * Team functionality
 */
function initializeTeam() {
    // Team member hover effects are handled by CSS
    // Additional JavaScript can be added here for enhanced interactions
}

/**
 * Careers functionality
 */
function initializeCareers() {
    // Job application modal
    const jobModal = document.getElementById('job-modal');
    const jobApplyBtns = document.querySelectorAll('.job-apply-btn');
    const jobForm = document.getElementById('job-application-form');
    const cancelBtn = document.getElementById('cancel-application');
    
    // Job data for modal
    const jobData = {
        'react-developer': 'Senior React Developer',
        'devops-engineer': 'DevOps Engineer',
        'ux-designer': 'UX/UI Designer',
        'tech-consultant': 'Technology Consultant',
        'security-analyst': 'Cybersecurity Analyst',
        'mobile-developer': 'Mobile App Developer'
    };
    
    jobApplyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job');
            const jobTitle = jobData[jobId];
            
            if (jobModal && jobTitle) {
                document.getElementById('job-modal-title').textContent = `Apply for ${jobTitle}`;
                document.getElementById('position').value = jobTitle;
                jobModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            jobModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = jobForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                showNotification('Application submitted successfully!', 'success');
                jobModal.classList.remove('active');
                document.body.style.overflow = '';
                jobForm.reset();
            }
        });
    }
}

/**
 * Utility function to show notifications
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            removeNotification(notification);
        }
    }, 5000);
    
    function removeNotification(element) {
        element.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        }, 300);
    }
}

/**
 * Lazy loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Keyboard navigation support
 */
function initializeKeyboardNavigation() {
    // Tab navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close active modals
            document.querySelectorAll('.modal.active, .job-modal.active, .portfolio-modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (e.key === 'Tab') {
            // Ensure tab navigation stays within active modal
            const activeModal = document.querySelector('.modal.active, .job-modal.active, .portfolio-modal.active');
            if (activeModal) {
                const focusableElements = activeModal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
}

/**
 * Performance optimizations
 */
function initializePerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update scroll-based effects here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Handle resize events here
        }, 250);
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeKeyboardNavigation();
    initializePerformanceOptimizations();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
