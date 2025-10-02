// Main JavaScript for Beautiful Funerals Website
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

    // Event listeners setup
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

        // Admin access
        const adminButton = document.getElementById('admin-access-button');
        if (adminButton) {
            adminButton.addEventListener('click', this.showAdminModal.bind(this));
        }
    }

    // Content loading methods
    async loadServices() {
        const services = [
            {
                icon: 'users',
                title: 'Traditional Funerals',
                description: 'Comprehensive traditional funeral services with personalized ceremonies, viewings, and processions.'
            },
            {
                icon: 'map-pin',
                title: 'Cremation Services',
                description: 'Dignified cremation options with memorial services tailored to your preferences and beliefs.'
            },
            {
                icon: 'document-text',
                title: 'Pre-Planning',
                description: 'Plan ahead to ease the burden on your loved ones and ensure your wishes are respected.'
            },
            {
                icon: 'chat',
                title: 'Grief Support',
                description: 'Comprehensive bereavement support services to help families through difficult times.'
            },
            {
                icon: 'camera',
                title: 'Memorial Services',
                description: 'Personalized memorial services to celebrate and honor the life of your loved one.'
            },
            {
                icon: 'video-camera',
                title: 'Live Streaming',
                description: 'Professional live streaming services for those unable to attend in person.'
            }
        ];

        const container = document.getElementById('services-container');
        if (container) {
            container.innerHTML = services.map(service => this.createServiceCard(service)).join('');
        }
    }

    createServiceCard(service) {
        const icons = {
            'users': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>`,
            'map-pin': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
            'document-text': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
            'chat': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>`,
            'camera': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
            'video-camera': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>`
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

    async loadPricing() {
        const pricing = [
            {
                title: 'Simple Farewell',
                price: '$3,500',
                popular: false,
                features: [
                    'Basic professional services',
                    'Transfer of deceased within 30km',
                    'Simple coffin',
                    'Cremation fees included'
                ]
            },
            {
                title: 'Traditional Service',
                price: '$6,500',
                popular: true,
                features: [
                    'All services from Simple Farewell',
                    'Viewing at our chapel',
                    'Hearse and funeral conductor',
                    'Memorial book and service sheets'
                ]
            },
            {
                title: 'Premium Celebration',
                price: '$9,500+',
                popular: false,
                features: [
                    'All services from Traditional Service',
                    'Premium coffin or casket',
                    'Floral arrangements',
                    'Video tribute and live streaming'
                ]
            }
        ];

        const container = document.getElementById('pricing-container');
        if (container) {
            container.innerHTML = pricing.map(plan => this.createPricingCard(plan)).join('');
        }
    }

    createPricingCard(plan) {
        return `
            <div class="card-bg p-8 rounded-lg border ${plan.popular ? 'border-2 border-silver relative' : 'border-gray-700'}">
                ${plan.popular ? '<div class="absolute top-0 right-0 bg-silver text-black px-4 py-1 text-sm font-medium rounded-bl-lg">Most Popular</div>' : ''}
                <h3 class="text-2xl font-semibold mb-4 text-silver">${plan.title}</h3>
                <div class="text-3xl font-bold mb-6">${plan.price}</div>
                <ul class="space-y-3 mb-8">
                    ${plan.features.map(feature => `
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-silver mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                <button class="w-full bg-silver text-black py-3 rounded-lg font-medium hover:bg-white transition-all" onclick="beautifulFunerals.selectPlan('${plan.title}')">
                    Select Plan
                </button>
            </div>
        `;
    }

    async loadFunerals() {
        // In a real application, this would fetch from an API
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
            {
                id: 'margaret-jones',
                name: 'Margaret Elizabeth Jones',
                dateOfDeath: '18th October 2023',
                location: 'Beautiful Funerals Chapel, Berwick',
                serviceDate: 'Monday, 30th October 2023',
                serviceTime: '11:00 AM',
                liveStream: '#'
            },
            {
                id: 'david-brown',
                name: 'David William Brown',
                dateOfDeath: '20th October 2023',
                location: 'Springvale Botanical Cemetery',
                serviceDate: 'Wednesday, 1st November 2023',
                serviceTime: '1:30 PM',
                liveStream: '#'
            }
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
                    <h3 class="text-xl font-semibold mb-2">${funeral.name}</h3>
                    <p class="text-gray-300 mb-4">Passed away on ${funeral.dateOfDeath}</p>
                    <div class="space-y-2 mb-6">
                        <div class="flex items-start">
                            <svg class="w-5 h-5 text-silver mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>${funeral.location}</span>
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

    async loadSupportResources() {
        const resources = [
            {
                title: 'Bereavement Counseling',
                description: 'Professional counseling services to help you process your grief and find healing.'
            },
            {
                title: 'Support Groups',
                description: 'Connect with others who are experiencing similar losses in a safe, supportive environment.'
            },
            {
                title: 'Online Resources',
                description: 'Access our library of articles, videos, and guides on coping with grief.'
            }
        ];

        const container = document.getElementById('support-resources');
        if (container) {
            container.innerHTML = `
                <div>
                    <h3 class="text-2xl font-semibold mb-6 text-silver">Supporting You Through Grief</h3>
                    <p class="text-gray-300 mb-6">Losing a loved one is one of life's most difficult experiences. We're here to provide support and resources to help you through the grieving process.</p>
                    <div class="space-y-4">
                        ${resources.map(resource => `
                            <div class="card-bg p-4 rounded-lg">
                                <h4 class="text-lg font-medium mb-2">${resource.title}</h4>
                                <p class="text-gray-300">${resource.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    async loadBlogArticles() {
        const articles = [
            {
                title: 'Understanding the Grieving Process',
                description: 'Learn about the stages of grief and what to expect as you navigate this difficult time.',
                link: '#'
            },
            {
                title: 'Supporting Children Through Loss',
                description: 'Guidance on helping children understand and cope with the death of a loved one.',
                link: '#'
            },
            {
                title: 'Creating Meaningful Memorials',
                description: 'Ideas for honoring your loved one\'s memory in meaningful ways.',
                link: '#'
            }
        ];

        const container = document.getElementById('blog-articles');
        if (container) {
            container.innerHTML = `
                <div>
                    <h3 class="text-2xl font-semibold mb-6 text-silver">Helpful Articles</h3>
                    <div class="space-y-6">
                        ${articles.map(article => `
                            <div class="card-bg p-4 rounded-lg">
                                <h4 class="text-lg font-medium mb-2">${article.title}</h4>
                                <p class="text-gray-300 mb-3">${article.description}</p>
                                <a href="${article.link}" class="text-silver hover:text-white transition-all">Read More</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    async loadContactInfo() {
        const container = document.getElementById('contact-info');
        if (container) {
            container.innerHTML = `
                <p class="text-gray-300 mb-8">We're here to help you 24 hours a day, 7 days a week. Please don't hesitate to reach out to us.</p>
                <div class="space-y-6">
                    <div class="flex items-start">
                        <div class="w-10 h-10 bg-silver rounded-full flex items-center justify-center mr-4">
                            <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-lg font-medium">Phone</h4>
                            <p class="text-gray-300">1300 AT NEED (1300 28 6333)</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-10 h-10 bg-silver rounded-full flex items-center justify-center mr-4">
                            <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-lg font-medium">Address</h4>
                            <p class="text-gray-300">123 Funeral Services Road<br>Berwick VIC 3806</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-10 h-10 bg-silver rounded-full flex items-center justify-center mr-4">
                            <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-lg font-medium">Email</h4>
                            <p class="text-gray-300">info@beautifulfunerals.au</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="w-10 h-10 bg-silver rounded-full flex items-center justify-center mr-4">
                            <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-lg font-medium">Hours</h4>
                            <p class="text-gray-300">24 hours, 7 days a week</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    async loadFooterContent() {
        const container = document.getElementById('footer-content');
        if (container) {
            container.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-silver">Beautiful Funerals</h3>
                    <p class="text-gray-300">Providing compassionate and professional funeral services throughout Melbourne.</p>
                </div>
                <div>
                    <h4 class="text-lg font-medium mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="#home" class="text-gray-300 hover:text-white transition-all">Home</a></li>
                        <li><a href="#services" class="text-gray-300 hover:text-white transition-all">Services</a></li>
                        <li><a href="#pricing" class="text-gray-300 hover:text-white transition-all">Pricing</a></li>
                        <li><a href="#upcoming" class="text-gray-300 hover:text-white transition-all">Upcoming Funerals</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-medium mb-4">Resources</h4>
                    <ul class="space-y-2">
                        <li><a href="#support" class="text-gray-300 hover:text-white transition-all">Grief Support</a></li>
                        <li><a href="#forms" class="text-gray-300 hover:text-white transition-all">Statutory Forms</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-white transition-all">FAQ</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-white transition-all">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-medium mb-4">Contact Us</h4>
                    <ul class="space-y-2">
                        <li class="text-gray-300">1300 AT NEED</li>
                        <li class="text-gray-300">info@beautifulfunerals.au</li>
                        <li class="text-gray-300">Berwick VIC 3806</li>
                    </ul>
                </div>
            `;
        }
    }

    // Event handlers
    async handleStatutoryForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            // Show loading state
            const submitButton = e.target.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<span class="loading"></span> Submitting...';
            submitButton.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            alert('Thank you for submitting the form. We will contact you shortly to schedule a meeting.');
            e.target.reset();

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

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            alert('Thank you for your message. We will get back to you soon.');
            e.target.reset();

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

        } catch (error) {
            alert('There was an error sending your message. Please try again or call us directly.');
            console.error('Contact form error:', error);
        }
    }

    async handleCondolenceForm(e) {
        e.preventDefault();
        const name = document.getElementById('condolence-name').value;
        const message = document.getElementById('condolence-message').value;
        
        const condolencesList = document.getElementById('condolences-list');
        const newCondolence = document.createElement('div');
        newCondolence.className = 'border-b border-gray-700 pb-4';
        newCondolence.innerHTML = `
            <h4 class="font-medium">${name}</h4>
            <p class="text-gray-300 mt-1">${message}</p>
            <p class="text-sm text-gray-500 mt-2">Just now</p>
        `;
        
        condolencesList.appendChild(newCondolence);
        
        alert('Thank you for leaving a condolence message.');
        e.target.reset();
    }

    // Modal functions
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

    showAdminModal() {
        const modal = document.getElementById('admin-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeAdminModal() {
        const modal = document.getElementById('admin-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Utility functions
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
            'margaret-jones': `
                <div class="border-b border-gray-700 pb-4">
                    <h4 class="font-medium">Jennifer Wilson</h4>
                    <p class="text-gray-300 mt-1">Margaret was such a beautiful soul. Her warmth and compassion will never be forgotten.</p>
                    <p class="text-sm text-gray-500 mt-2">1 day ago</p>
                </div>
            `,
            'david-brown': `
                <div class="border-b border-gray-700 pb-4">
                    <h4 class="font-medium">Robert Chen</h4>
                    <p class="text-gray-300 mt-1">David was an inspiration to us all. His legacy will live on through the many lives he touched.</p>
                    <p class="text-sm text-gray-500 mt-2">3 hours ago</p>
                </div>
            `
        };
        return condolences[funeralId] || '<p class="text-gray-300">No condolences yet. Be the first to leave a message.</p>';
    }

    selectPlan(planName) {
        alert(`Thank you for your interest in our ${planName}. We will contact you shortly to discuss the details.`);
    }

    watchLiveStream(url) {
        if (url && url !== '#') {
            window.open(url, '_blank');
        } else {
            alert('Live stream link will be available closer to the service time.');
        }
    }
}

// Initialize the application
const beautifulFunerals = new BeautifulFunerals();

// Make it available globally
window.beautifulFunerals = beautifulFunerals;