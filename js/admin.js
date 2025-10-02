// Secure Admin JavaScript
class SecureAdmin {
    constructor() {
        this.baseUrl = '/admin/api';
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    async checkAuthentication() {
        try {
            const response = await fetch('/admin/check-auth.php');
            const result = await response.json();
            
            if (result.success) {
                this.isAuthenticated = true;
                return true;
            } else {
                this.isAuthenticated = false;
                return false;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            this.isAuthenticated = false;
            return false;
        }
    }

    async login(username, password) {
        try {
            const response = await fetch('/admin/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            
            if (result.success) {
                this.isAuthenticated = true;
                this.hideLoginModal();
                this.showAdminPanel();
                return true;
            } else {
                this.showError('Invalid credentials');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed. Please try again.');
            return false;
        }
    }

    async logout() {
        try {
            await fetch('/admin/logout.php');
            this.isAuthenticated = false;
            this.hideAdminPanel();
            this.showLoginModal();
        } catch (error) {
            console.error('Logout error:', error);
            this.isAuthenticated = false;
            this.hideAdminPanel();
        }
    }

    async addFuneral(funeralData) {
        if (!this.isAuthenticated && !await this.checkAuthentication()) {
            this.showError('Please login first');
            return false;
        }

        try {
            const response = await fetch('/admin/api/funerals.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(funeralData)
            });

            const result = await response.json();
            
            if (result.success) {
                this.showSuccess('Funeral added successfully');
                this.loadAdminFunerals();
                return true;
            } else {
                this.showError(result.message || 'Failed to add funeral');
                return false;
            }
        } catch (error) {
            console.error('Add funeral error:', error);
            this.showError('Failed to add funeral');
            return false;
        }
    }

    async getFunerals() {
        if (!this.isAuthenticated && !await this.checkAuthentication()) {
            this.showError('Please login first');
            return [];
        }

        try {
            const response = await fetch('/admin/api/funerals.php');
            const result = await response.json();
            
            if (result.success) {
                return result.data || [];
            } else {
                this.showError('Failed to load funerals');
                return [];
            }
        } catch (error) {
            console.error('Get funerals error:', error);
            this.showError('Failed to load funerals');
            return [];
        }
    }

    // UI Methods
    showLoginModal() {
        document.getElementById('admin-modal').classList.remove('hidden');
    }

    hideLoginModal() {
        document.getElementById('admin-modal').classList.add('hidden');
        // Clear form
        const form = document.getElementById('admin-login-form');
        if (form) form.reset();
    }

    showAdminPanel() {
        document.getElementById('admin-panel').classList.remove('hidden');
        this.loadAdminFunerals();
    }

    hideAdminPanel() {
        document.getElementById('admin-panel').classList.add('hidden');
    }

    showError(message) {
        // Simple alert for now - you can replace with a better notification system
        alert('Error: ' + message);
    }

    showSuccess(message) {
        alert('Success: ' + message);
    }

    setupEventListeners() {
        // Admin login form
        const adminLoginForm = document.getElementById('admin-login-form');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('admin-username').value;
                const password = document.getElementById('admin-password').value;
                
                await this.login(username, password);
            });
        }

        // Add funeral form
        const addFuneralForm = document.getElementById('add-funeral-form');
        if (addFuneralForm) {
            addFuneralForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const funeralData = Object.fromEntries(formData.entries());
                
                await this.addFuneral(funeralData);
                e.target.reset();
            });
        }
    }

    async loadAdminFunerals() {
        const funerals = await this.getFunerals();
        const container = document.getElementById('admin-funerals-list');
        
        if (container) {
            if (funerals.length > 0) {
                container.innerHTML = funerals.map(funeral => this.createFuneralAdminCard(funeral)).join('');
            } else {
                container.innerHTML = '<p class="text-gray-400 text-center py-8">No funerals found.</p>';
            }
        }
    }

    createFuneralAdminCard(funeral) {
        return `
            <div class="border-b border-gray-700 pb-4">
                <h4 class="font-medium">${this.escapeHtml(funeral.name)}</h4>
                <p class="text-gray-300 text-sm">Service: ${funeral.service_date} at ${funeral.service_time}</p>
                <p class="text-gray-300 text-sm">Location: ${this.escapeHtml(funeral.location)}</p>
                <div class="mt-2 flex space-x-2">
                    <button class="bg-silver text-black px-3 py-1 rounded text-sm hover:bg-white transition-all">Edit</button>
                    <button class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-all" onclick="secureAdmin.deleteFuneral(${funeral.id})">Delete</button>
                </div>
            </div>
        `;
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Placeholder for delete functionality
    async deleteFuneral(funeralId) {
        if (confirm('Are you sure you want to delete this funeral?')) {
            // Implement delete functionality here
            this.showError('Delete functionality not yet implemented');
        }
    }
}

// Initialize secure admin
const secureAdmin = new SecureAdmin();

// Make it available globally
window.secureAdmin = secureAdmin;