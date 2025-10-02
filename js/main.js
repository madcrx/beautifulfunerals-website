// Main JavaScript for Beautiful Funerals Website - PUBLIC SITE ONLY
class BeautifulFunerals {
    constructor() {
        this.init();
    }

    init() {
        this.loadContent();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    // Load dynamic content
    async loadContent() {
        try {
            await Promise.all([
                this.loadServices(),
                this.loadPricing(),
                this.loadFunerals(),
                this.loadSupportResources(),
                this.loadBlogArticles(),
                this.loadContactInfo(),
                this.loadFooterContent()
            ]);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }

    // Smooth scrolling for navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });
    }

    // Event listeners setup - REMOVED ADMIN EVENTS
    setupEventListeners() {
        // Form submissions
        const statutoryForm = document.getElementById('statutory-form');
        if (statutoryForm) {
            statutoryForm.addEventListener('submit', this.handleStatutoryForm.bind(this));
        }

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        const condolenceForm = document.getElementById('condolence-form');
        if (condolenceForm) {
            condolenceForm.addEventListener('submit', this.handleCondolenceForm.bind(this));
        }
    }

    // Content loading methods (keep all existing methods the same)
    async loadServices() {
        const services = [
            {
                icon: 'users',
                title: 'Traditional Funerals',
                description: 'Comprehensive traditional funeral services with personalized ceremonies, viewings, and processions.'
            },
            // ... keep all existing services
        ];

        const container = document.getElementById('services-container');
        if (container) {
            container.innerHTML = services.map(service => this.createServiceCard(service)).join('');
        }
    }

    createServiceCard(service) {
        const icons = {
            'users': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>`,
            // ... keep all existing icons
        };

        return `
            <div class="card-bg p-6 rounded-lg">
                <div class="w-12 h-12 bg-silver rounded-full flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        ${icons[service.icon]}
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">${service.title}</h3>
                <p class="text-gray-300">${service.description}</p>
            </div>
        `;
    }

    async loadFunerals() {
        // Fetch funerals from secure API
        try {
            const response = await fetch('/api/funerals.php');
            const result = await response.json();
            
            if (result.success) {
                const container = document.getElementById('funerals-container');
                if (container) {
                    container.innerHTML = result.data.map(funeral => this.createFuneralCard(funeral)).join('');
                }
            } else {
                this.loadSampleFunerals(); // Fallback to sample data
            }
        } catch (error) {
            console.error('Failed to load funerals:', error);
            this.loadSampleFunerals(); // Fallback to sample data
        }
    }

    loadSampleFunerals() {
        const funerals = [
            {
                id: 'john-smith',
                name: 'John Robert Smith',
                dateOfDeath: '15th October 2023',
                location: 'St. Mary\'s Church, Berwick',
                serviceDate: 'Friday, 27th October 2023',
                serviceTime: '2:00 PM',
                liveStream: '#'
            },
            // ... keep sample data as fallback
        ];

        const container = document.getElementById('funerals-container');
        if (container) {
            container.innerHTML = funerals.map(funeral => this.createFuneralCard(funeral)).join('');
        }
    }

    createFuneralCard(funeral) {
        return `
            <div class="card-bg rounded-lg overflow-hidden">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${this.escapeHtml(funeral.name)}</h3>
                    <p class="text-gray-300 mb-4">Passed away on ${funeral.dateOfDeath}</p>
                    <div class="space-y-2 mb-6">
                        <div class="flex items-start">
                            <svg class="w-5 h-5 text-silver mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>${this.escapeHtml(funeral.location)}</span>
                        </div>
                        <div class="flex items-start">
                            <svg class="w-5 h-5 text-silver mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>${funeral.serviceDate} at ${funeral.serviceTime}</span>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button class="flex-1 bg-silver text-black py-2 rounded-lg font-medium hover:bg-white transition-all" 
                                onclick="beautifulFunerals.showCondolences('${funeral.id}')">
                            Condolences
                        </button>
                        <button class="flex-1 border border-silver text-silver py-2 rounded-lg font-medium hover:bg-silver hover:text-black transition-all"
                                onclick="beautifulFunerals.watchLiveStream('${funeral.liveStream}')">
                            Live Stream
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Event handlers (keep all existing handlers)
    async handleStatutoryForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            // Show loading state
            const submitButton = e.target.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<span class="loading"></span> Submitting...';
            submitButton.disabled = true;

            // Send to secure endpoint
            const response = await fetch('/forms/submit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const result = await response.json();

            if (result.success) {
                alert('Thank you for submitting the form. We will contact you shortly to schedule a meeting.');
                e.target.reset();
            } else {
                alert('There was an error submitting the form. Please try again or call us directly.');
            }

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

        } catch (error) {
            alert('There was an error submitting the form. Please try again or call us directly.');
            console.error('Form submission error:', error);
        }
    }

    async handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            // Show loading state
            const submitButton = e.target.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;

            // Send to secure endpoint
            const response = await fetch('/forms/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const result = await response.json();

            if (result.success) {
                alert('Thank you for your message. We will get back to you soon.');
                e.target.reset();
            } else {
                alert('There was an error sending your message. Please try again or call us directly.');
            }

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

        } catch (error) {
            alert('There was an error sending your message. Please try again or call us directly.');
            console.error('Contact form error:', error);
        }
    }

    // Keep all other existing methods (showCondolences, closeCondolences, etc.)
    showCondolences(funeralId) {
        const modal = document.getElementById('condolences-modal');
        const nameElement = document.getElementById('condolences-name');
        const listElement = document.getElementById('condolences-list');

        if (modal && nameElement && listElement) {
            nameElement.textContent = `Condolences for ${this.getDeceasedName(funeralId)}`;
            listElement.innerHTML = this.getSampleCondolences(funeralId);
            modal.classList.remove('hidden');
        }
    }

    closeCondolences() {
        const modal = document.getElementById('condolences-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Utility methods
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    getDeceasedName(funeralId) {
        const names = {
            'john-smith': 'John Robert Smith',
            'margaret-jones': 'Margaret Elizabeth Jones',
            'david-brown': 'David William Brown'
        };
        return names[funeralId] || 'the deceased';
    }

    getSampleCondolences(funeralId) {
        const condolences = {
            'john-smith': `
                <div class="border-b border-gray-700 pb-4">
                    <h4 class="font-medium">Sarah Johnson</h4>
                    <p class="text-gray-300 mt-1">John was a wonderful friend and colleague. He will be deeply missed by all who knew him.</p>
                    <p class="text-sm text-gray-500 mt-2">2 days ago</p>
                </div>
                <div class="border-b border-gray-700 pb-4">
                    <h4 class="font-medium">Michael Thompson</h4>
                    <p class="text-gray-300 mt-1">My deepest condolences to the family. John's kindness and generosity touched so many lives.</p>
                    <p class="text-sm text-gray-500 mt-2">1 day ago</p>
                </div>
            `,
            // ... keep existing condolences data
        };
        return condolences[funeralId] || '<p class="text-gray-300">No condolences yet. Be the first to leave a message.</p>';
    }

    selectPlan(planName) {
        alert(`Thank you for your interest in our ${planName}. We will contact you shortly to discuss the details.`);
    }

    watchLiveStream(url) {
        if (url && url !== '#') {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            alert('Live stream link will be available closer to the service time.');
        }
    }

    // Keep all other existing methods (loadPricing, loadSupportResources, etc.)
    async loadPricing() {
        // ... keep existing pricing code
    }

    async loadSupportResources() {
        // ... keep existing support resources code
    }

    async loadBlogArticles() {
        // ... keep existing blog articles code
    }

    async loadContactInfo() {
        // ... keep existing contact info code
    }

    async loadFooterContent() {
        // ... keep existing footer content code
    }
}

// Initialize the application
const beautifulFunerals = new BeautifulFunerals();

// Make it available globally
window.beautifulFunerals = beautifulFunerals;