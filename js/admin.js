// Secure Admin JavaScript
class SecureAdmin {
    constructor() {
        this.baseUrl = '/admin/api';
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.setupEventListeners();
    }

    async checkAuthentication() {
        try {
            const response = await fetch('/admin/check-auth.php');
            const result = await response.json();
            
            if (!result.success) {
                this.showLoginModal();
                return false;
            }
            return true;
        } catch (error) {
            console.error('Auth check failed:', error);
            this.showLoginModal();
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
            this.hideAdminPanel();
            this.showLoginModal();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    async addFuneral(funeralData) {
        if (!await this.checkAuthentication()) return false;

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
        if (!await this.checkAuthentication()) return [];

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
            return [];
        }
    }

    // UI Methods
    showLoginModal() {
        document.getElementById('admin-modal').classList.remove('hidden');
    }

    hideLoginModal() {
        document.getElementById('admin-modal').classList.add('hidden');
    }

    showAdminPanel() {
        document.getElementById('admin-panel').classList.remove('hidden');
        this.loadAdminFunerals();
    }

    hideAdminPanel() {
        document.getElementById('admin-panel').classList.add('hidden');
    }

    showError(message) {
        alert('Error: ' + message); // Replace with better UI notification
    }

    showSuccess(message) {
        alert('Success: ' + message); // Replace with better UI notification
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

        // Logout button
        const logoutBtn = document.querySelector('[onclick="secureAdmin.logout()"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    async loadAdminFunerals() {
        const funerals = await this.getFunerals();
        const container = document.getElementById('admin-funerals-list');
        
        if (container) {
            container.innerHTML = funerals.map(funeral => this.createFuneralAdminCard(funeral)).join('') || 
                '<p class="text-gray-400">No funerals found.</p>';
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
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize secure admin
const secureAdmin = new SecureAdmin();