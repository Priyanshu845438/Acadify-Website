/**
 * TechVision IT Solutions - Search Functionality
 * Comprehensive search system for website content
 */

class TechVisionSearch {
    constructor() {
        this.searchData = [];
        this.currentResults = [];
        this.currentPage = 1;
        this.resultsPerPage = 10;
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        this.buildSearchIndex();
        this.initializeEventListeners();
        this.handleURLParameters();
    }
    
    buildSearchIndex() {
        // Comprehensive search data for all website content
        this.searchData = [
            // Services
            {
                id: 'web-development',
                title: 'Web Development Services',
                description: 'Custom website and web application development using modern technologies like React, Node.js, and PHP.',
                url: 'services/web-development.html',
                category: 'services',
                keywords: ['web development', 'website', 'react', 'nodejs', 'php', 'frontend', 'backend']
            },
            {
                id: 'mobile-app-development',
                title: 'Mobile App Development',
                description: 'iOS and Android mobile application development using React Native, Flutter, and native technologies.',
                url: 'services/mobile-app-development.html',
                category: 'services',
                keywords: ['mobile app', 'ios', 'android', 'react native', 'flutter', 'app development']
            },
            {
                id: 'digital-marketing',
                title: 'Digital Marketing Services',
                description: 'Comprehensive digital marketing strategies including SEO, social media, and online advertising.',
                url: 'services/digital-marketing.html',
                category: 'services',
                keywords: ['digital marketing', 'seo', 'social media', 'advertising', 'marketing strategy']
            },
            {
                id: 'seo-services',
                title: 'SEO Services',
                description: 'Search engine optimization to improve your website visibility and organic search rankings.',
                url: 'services/seo-services.html',
                category: 'services',
                keywords: ['seo', 'search engine optimization', 'rankings', 'organic search', 'google']
            },
            {
                id: 'ui-ux-design',
                title: 'UI/UX Design Services',
                description: 'User interface and user experience design for websites and mobile applications.',
                url: 'services/ui-ux-design.html',
                category: 'services',
                keywords: ['ui design', 'ux design', 'user interface', 'user experience', 'design']
            },
            {
                id: 'cloud-solutions',
                title: 'Cloud Solutions',
                description: 'AWS, Azure, and Google Cloud infrastructure setup, migration, and management services.',
                url: 'services/cloud-solutions.html',
                category: 'services',
                keywords: ['cloud', 'aws', 'azure', 'google cloud', 'infrastructure', 'migration']
            },
            {
                id: 'cybersecurity',
                title: 'Cybersecurity Services',
                description: 'Comprehensive cybersecurity solutions to protect your business from digital threats.',
                url: 'services/cybersecurity.html',
                category: 'services',
                keywords: ['cybersecurity', 'security', 'protection', 'threats', 'firewall', 'encryption']
            },
            {
                id: 'it-consulting',
                title: 'IT Consulting',
                description: 'Expert IT consulting services to help optimize your technology infrastructure and strategy.',
                url: 'services/it-consulting.html',
                category: 'services',
                keywords: ['it consulting', 'technology strategy', 'infrastructure', 'consulting']
            },
            
            // Company Pages
            {
                id: 'company-overview',
                title: 'Company Overview',
                description: 'Learn about TechVision IT Solutions - our story, mission, and vision for technology innovation.',
                url: 'company/overview.html',
                category: 'company',
                keywords: ['about us', 'company', 'mission', 'vision', 'history', 'techvision']
            },
            {
                id: 'core-values',
                title: 'Our Core Values',
                description: 'The principles that guide our decisions: innovation, excellence, integrity, and client-centricity.',
                url: 'company/core-values.html',
                category: 'company',
                keywords: ['values', 'principles', 'innovation', 'excellence', 'integrity', 'culture']
            },
            {
                id: 'why-choose-us',
                title: 'Why Choose TechVision',
                description: 'Discover what makes us the preferred technology partner for businesses across India.',
                url: 'company/why-choose-us.html',
                category: 'company',
                keywords: ['why choose', 'benefits', 'advantages', 'proven track record', 'reliability']
            },
            {
                id: 'dev-communities',
                title: 'Developer Communities',
                description: 'Join our vibrant communities of JavaScript, Python, mobile, and UI/UX developers.',
                url: 'company/dev-communities.html',
                category: 'company',
                keywords: ['community', 'developers', 'javascript', 'python', 'mobile', 'uiux', 'meetup']
            },
            {
                id: 'projects-portfolio',
                title: 'Our Projects',
                description: 'Explore our successful project portfolio across web development, mobile apps, and enterprise solutions.',
                url: 'company/projects.html',
                category: 'projects',
                keywords: ['projects', 'portfolio', 'case studies', 'work', 'examples']
            },
            
            // Main Pages
            {
                id: 'portfolio',
                title: 'Portfolio',
                description: 'Showcase of our successful projects including e-commerce platforms, mobile apps, and enterprise solutions.',
                url: 'portfolio.html',
                category: 'projects',
                keywords: ['portfolio', 'projects', 'work', 'case studies', 'examples', 'showcase']
            },
            {
                id: 'contact',
                title: 'Contact Us',
                description: 'Get in touch with TechVision IT Solutions for project inquiries and consultations.',
                url: 'contact.html',
                category: 'company',
                keywords: ['contact', 'get in touch', 'consultation', 'inquiry', 'phone', 'email']
            },
            {
                id: 'blog',
                title: 'Tech Insights Blog',
                description: 'Latest insights on technology trends, best practices, and industry developments.',
                url: 'blog.html',
                category: 'blog',
                keywords: ['blog', 'insights', 'articles', 'tech news', 'trends', 'knowledge']
            },
            {
                id: 'team',
                title: 'Our Team',
                description: 'Meet the talented professionals behind TechVision IT Solutions.',
                url: 'team.html',
                category: 'company',
                keywords: ['team', 'staff', 'professionals', 'experts', 'people']
            },
            {
                id: 'careers',
                title: 'Careers',
                description: 'Join our team and grow your career in technology with exciting opportunities.',
                url: 'careers.html',
                category: 'company',
                keywords: ['careers', 'jobs', 'employment', 'hiring', 'opportunities', 'work with us']
            },
            
            // Specific Technologies and Specializations
            {
                id: 'react-development',
                title: 'React Development',
                description: 'Expert React.js development for modern, interactive web applications.',
                url: 'services/web-development.html#react',
                category: 'services',
                keywords: ['react', 'reactjs', 'javascript', 'frontend', 'spa', 'component']
            },
            {
                id: 'nodejs-development',
                title: 'Node.js Development',
                description: 'Scalable backend development using Node.js and Express framework.',
                url: 'services/web-development.html#nodejs',
                category: 'services',
                keywords: ['nodejs', 'node', 'backend', 'express', 'api', 'javascript']
            },
            {
                id: 'ecommerce-development',
                title: 'E-commerce Development',
                description: 'Custom e-commerce solutions with payment integration and inventory management.',
                url: 'services/web-development.html#ecommerce',
                category: 'services',
                keywords: ['ecommerce', 'online store', 'shopping cart', 'payment', 'inventory']
            }
        ];
    }
    
    initializeEventListeners() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.showSuggestions(e.target.value);
            }, 300));
            
            searchInput.addEventListener('focus', () => {
                const suggestions = document.getElementById('search-suggestions');
                if (suggestions && searchInput.value.length > 0) {
                    suggestions.style.display = 'block';
                }
            });
            
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    const suggestions = document.getElementById('search-suggestions');
                    if (suggestions) {
                        suggestions.style.display = 'none';
                    }
                }, 200);
            });
        }
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.filterResults();
            });
        });
        
        // Pagination
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    }
    
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        
        if (query) {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = decodeURIComponent(query);
                this.performSearch();
            }
        }
    }
    
    performSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            this.displayResults([]);
            return;
        }
        
        const results = this.searchData.filter(item => {
            const searchableText = [
                item.title,
                item.description,
                ...item.keywords
            ].join(' ').toLowerCase();
            
            return searchableText.includes(query);
        });
        
        // Sort by relevance
        results.sort((a, b) => {
            const aRelevance = this.calculateRelevance(a, query);
            const bRelevance = this.calculateRelevance(b, query);
            return bRelevance - aRelevance;
        });
        
        this.currentResults = results;
        this.currentPage = 1;
        this.filterResults();
        
        // Update URL
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('q', query);
        window.history.pushState({}, '', newUrl);
    }
    
    calculateRelevance(item, query) {
        let score = 0;
        const queryWords = query.split(' ');
        
        queryWords.forEach(word => {
            if (item.title.toLowerCase().includes(word)) score += 3;
            if (item.description.toLowerCase().includes(word)) score += 2;
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(word)) score += 1;
            });
        });
        
        return score;
    }
    
    filterResults() {
        let filteredResults = this.currentResults;
        
        if (this.currentFilter !== 'all') {
            filteredResults = this.currentResults.filter(item => 
                item.category === this.currentFilter
            );
        }
        
        this.displayResults(filteredResults);
    }
    
    displayResults(results) {
        const container = document.getElementById('results-container');
        const noResults = document.getElementById('no-results');
        const searchStats = document.getElementById('search-stats');
        
        if (!container || !noResults) return;
        
        // Update search stats
        if (searchStats) {
            const query = document.getElementById('search-input')?.value || '';
            if (query && results.length > 0) {
                searchStats.innerHTML = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
                searchStats.style.display = 'block';
            } else {
                searchStats.style.display = 'none';
            }
        }
        
        if (results.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            document.getElementById('pagination').style.display = 'none';
            return;
        }
        
        noResults.style.display = 'none';
        
        // Pagination
        const totalPages = Math.ceil(results.length / this.resultsPerPage);
        const startIndex = (this.currentPage - 1) * this.resultsPerPage;
        const endIndex = startIndex + this.resultsPerPage;
        const pageResults = results.slice(startIndex, endIndex);
        
        // Display results
        container.innerHTML = pageResults.map(item => `
            <div class="search-result-item">
                <div class="search-result__content">
                    <div class="search-result__category">${this.formatCategory(item.category)}</div>
                    <h3 class="search-result__title">
                        <a href="${item.url}" class="search-result__link">${item.title}</a>
                    </h3>
                    <p class="search-result__description">${item.description}</p>
                    <div class="search-result__meta">
                        <span class="search-result__url">${window.location.origin}/${item.url}</span>
                    </div>
                </div>
                <div class="search-result__action">
                    <a href="${item.url}" class="btn btn--outline btn--sm">
                        View Details <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join('');
        
        // Update pagination
        this.updatePagination(totalPages);
    }
    
    updatePagination(totalPages) {
        const pagination = document.getElementById('pagination');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const paginationInfo = document.getElementById('pagination-info');
        
        if (!pagination) return;
        
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }
        
        pagination.style.display = 'flex';
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
        }
        
        if (paginationInfo) {
            paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.filterResults();
        }
    }
    
    nextPage() {
        const totalPages = Math.ceil(this.currentResults.length / this.resultsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.filterResults();
        }
    }
    
    showSuggestions(query) {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions || query.length < 2) {
            suggestions.style.display = 'none';
            return;
        }
        
        const matches = this.searchData
            .filter(item => {
                const searchableText = [item.title, ...item.keywords].join(' ').toLowerCase();
                return searchableText.includes(query.toLowerCase());
            })
            .slice(0, 5);
        
        if (matches.length === 0) {
            suggestions.style.display = 'none';
            return;
        }
        
        suggestions.innerHTML = matches.map(item => `
            <div class="search-suggestion" data-url="${item.url}">
                <div class="suggestion-title">${item.title}</div>
                <div class="suggestion-category">${this.formatCategory(item.category)}</div>
            </div>
        `).join('');
        
        suggestions.style.display = 'block';
        
        // Add click listeners to suggestions
        suggestions.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                window.location.href = suggestion.dataset.url;
            });
        });
    }
    
    formatCategory(category) {
        const categoryMap = {
            'services': 'Services',
            'projects': 'Projects',
            'company': 'Company',
            'blog': 'Blog'
        };
        return categoryMap[category] || category;
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    new TechVisionSearch();
});