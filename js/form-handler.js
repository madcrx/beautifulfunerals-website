// Form handling utilities
class FormHandler {
    static async submitForm(formElement, endpoint) {
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    static showValidationError(input, message) {
        // Remove any existing error
        this.clearValidationError(input);

        // Add error class
        input.classList.add('border-red-500');
        
        // Create error message
        const errorElement = document.createElement('p');
        errorElement.className = 'text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        
        // Insert after input
        input.parentNode.appendChild(errorElement);
    }

    static clearValidationError(input) {
        input.classList.remove('border-red-500');
        const existingError = input.parentNode.querySelector('.text-red-500');
        if (existingError) {
            existingError.remove();
        }
    }

    static setLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<span class="loading"></span> Processing...';
        } else {
            button.disabled = false;
            button.textContent = button.getAttribute('data-original-text') || 'Submit';
        }
    }
}