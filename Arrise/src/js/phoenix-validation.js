/**
 * Phoenix God Creation Protocol - Validation and Error Handling System
 * 
 * This file implements the Perpetual Skepticism Loop of the Phoenix God Creation Protocol.
 * It provides robust validation, error handling, and recovery mechanisms.
 * 
 * Created by Critic Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Validation System Activated');
    initValidationSystem();
});

/**
 * Initialize the validation system
 */
function initValidationSystem() {
    // Create global validation namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Validation = createValidationSystem();
    
    // Apply validation to form elements
    applyFormValidation();
    
    // Initialize error handling
    initErrorHandling();
}

/**
 * Create the core validation system
 */
function createValidationSystem() {
    return {
        validators: {
            // Email validator
            email: (value) => {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return {
                    valid: regex.test(value),
                    message: regex.test(value) ? '' : 'Please enter a valid email address'
                };
            },
            
            // Required field validator
            required: (value) => {
                return {
                    valid: value !== undefined && value !== null && value.trim() !== '',
                    message: value !== undefined && value !== null && value.trim() !== '' ? '' : 'This field is required'
                };
            },
            
            // Minimum length validator
            minLength: (value, minLength) => {
                return {
                    valid: value && value.length >= minLength,
                    message: value && value.length >= minLength ? '' : `Must be at least ${minLength} characters`
                };
            },
            
            // Maximum length validator
            maxLength: (value, maxLength) => {
                return {
                    valid: value && value.length <= maxLength,
                    message: value && value.length <= maxLength ? '' : `Must be no more than ${maxLength} characters`
                };
            },
            
            // Numeric validator
            numeric: (value) => {
                const regex = /^[0-9]+$/;
                return {
                    valid: regex.test(value),
                    message: regex.test(value) ? '' : 'Please enter numbers only'
                };
            },
            
            // Range validator
            range: (value, min, max) => {
                const num = parseFloat(value);
                return {
                    valid: !isNaN(num) && num >= min && num <= max,
                    message: !isNaN(num) && num >= min && num <= max ? '' : `Value must be between ${min} and ${max}`
                };
            },
            
            // Match validator (for password confirmation, etc.)
            match: (value, targetValue, fieldName) => {
                return {
                    valid: value === targetValue,
                    message: value === targetValue ? '' : `Must match ${fieldName || 'the other field'}`
                };
            },
            
            // URL validator
            url: (value) => {
                try {
                    new URL(value);
                    return {
                        valid: true,
                        message: ''
                    };
                } catch (e) {
                    return {
                        valid: false,
                        message: 'Please enter a valid URL'
                    };
                }
            },
            
            // Date validator
            date: (value) => {
                const date = new Date(value);
                return {
                    valid: !isNaN(date.getTime()),
                    message: !isNaN(date.getTime()) ? '' : 'Please enter a valid date'
                };
            },
            
            // Custom validator
            custom: (value, validationFn) => {
                return validationFn(value);
            }
        },
        
        // Validate a value against one or more validators
        validate: function(value, validations) {
            // If validations is a string, convert to array
            if (typeof validations === 'string') {
                validations = [validations];
            }
            
            // If validations is an object, convert to array of objects
            if (validations && typeof validations === 'object' && !Array.isArray(validations)) {
                validations = [validations];
            }
            
            // Default result
            let result = {
                valid: true,
                messages: []
            };
            
            // Process each validation
            for (const validation of validations) {
                let validationResult;
                
                if (typeof validation === 'string') {
                    // Simple validator name
                    if (!this.validators[validation]) {
                        console.error(`Validator '${validation}' not found`);
                        continue;
                    }
                    
                    validationResult = this.validators[validation](value);
                } else if (typeof validation === 'object') {
                    // Validator with parameters
                    const { type, ...params } = validation;
                    
                    if (!this.validators[type]) {
                        console.error(`Validator '${type}' not found`);
                        continue;
                    }
                    
                    validationResult = this.validators[type](value, ...Object.values(params));
                } else {
                    console.error('Invalid validation format', validation);
                    continue;
                }
                
                // Update result
                if (!validationResult.valid) {
                    result.valid = false;
                    if (validationResult.message) {
                        result.messages.push(validationResult.message);
                    }
                }
            }
            
            return result;
        },
        
        // Add a custom validator
        addValidator: function(name, validatorFn) {
            if (this.validators[name]) {
                console.warn(`Overriding existing validator '${name}'`);
            }
            
            this.validators[name] = validatorFn;
            return this;
        },
        
        // Sanitize input to prevent XSS
        sanitize: function(value) {
            if (typeof value !== 'string') {
                return value;
            }
            
            return value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        },
        
        // Validate form data
        validateForm: function(formData, validationRules) {
            const results = {
                valid: true,
                fields: {}
            };
            
            for (const field in validationRules) {
                const value = formData[field];
                const validations = validationRules[field];
                
                const fieldResult = this.validate(value, validations);
                
                results.fields[field] = fieldResult;
                
                if (!fieldResult.valid) {
                    results.valid = false;
                }
            }
            
            return results;
        }
    };
}

/**
 * Apply validation to form elements
 */
function applyFormValidation() {
    // Find all forms
    document.querySelectorAll('form').forEach(form => {
        // Add submit event listener
        form.addEventListener('submit', (event) => {
            // Prevent default form submission
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Get validation rules from data attributes
            const validationRules = {};
            
            form.querySelectorAll('[data-validate]').forEach(field => {
                const fieldName = field.name;
                const validations = field.dataset.validate.split(' ');
                
                validationRules[fieldName] = validations;
            });
            
            // Validate form data
            const validationResult = window.Phoenix.Validation.validateForm(data, validationRules);
            
            // Handle validation result
            if (validationResult.valid) {
                // Clear any previous error messages
                form.querySelectorAll('.validation-error').forEach(el => el.remove());
                
                // Submit form
                form.submit();
            } else {
                // Display error messages
                for (const field in validationResult.fields) {
                    const fieldResult = validationResult.fields[field];
                    
                    if (!fieldResult.valid) {
                        const fieldElement = form.querySelector(`[name="${field}"]`);
                        
                        if (fieldElement) {
                            // Add error class
                            fieldElement.classList.add('error');
                            
                            // Create error message element
                            const errorElement = document.createElement('div');
                            errorElement.className = 'validation-error';
                            errorElement.textContent = fieldResult.messages[0];
                            errorElement.style.color = 'var(--phoenix-red)';
                            errorElement.style.fontSize = 'var(--font-size-xs)';
                            errorElement.style.marginTop = '5px';
                            
                            // Insert error message after field
                            fieldElement.parentNode.insertBefore(errorElement, fieldElement.nextSibling);
                            
                            // Focus first invalid field
                            if (field === Object.keys(validationResult.fields).find(f => !validationResult.fields[f].valid)) {
                                fieldElement.focus();
                            }
                        }
                    }
                }
            }
        });
        
        // Add input event listeners for real-time validation
        form.querySelectorAll('[data-validate]').forEach(field => {
            field.addEventListener('input', () => {
                // Get validation rules
                const validations = field.dataset.validate.split(' ');
                
                // Validate field
                const validationResult = window.Phoenix.Validation.validate(field.value, validations);
                
                // Handle validation result
                if (validationResult.valid) {
                    // Remove error class
                    field.classList.remove('error');
                    
                    // Remove error message
                    const errorElement = field.parentNode.querySelector('.validation-error');
                    if (errorElement) {
                        errorElement.remove();
                    }
                } else {
                    // Add error class
                    field.classList.add('error');
                    
                    // Update or create error message
                    let errorElement = field.parentNode.querySelector('.validation-error');
                    
                    if (!errorElement) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'validation-error';
                        errorElement.style.color = 'var(--phoenix-red)';
                        errorElement.style.fontSize = 'var(--font-size-xs)';
                        errorElement.style.marginTop = '5px';
                        
                        field.parentNode.insertBefore(errorElement, field.nextSibling);
                    }
                    
                    errorElement.textContent = validationResult.messages[0];
                }
            });
        });
    });
}

/**
 * Initialize error handling
 */
function initErrorHandling() {
    // Create error handling system
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.ErrorHandling = {
        // Log error with context
        logError: function(error, context = {}) {
            console.error('Phoenix Error:', error, context);
            
            // In a real app, this would send errors to a logging service
            
            return {
                error,
                context,
                timestamp: new Date(),
                handled: false
            };
        },
        
        // Handle error with recovery options
        handleError: function(error, options = {}) {
            const errorInfo = this.logError(error, options.context || {});
            
            // Mark as handled
            errorInfo.handled = true;
            
            // Show user message if specified
            if (options.showUser) {
                this.showErrorMessage(options.userMessage || 'Something went wrong. Please try again.');
            }
            
            // Attempt recovery if specified
            if (options.recover && typeof options.recover === 'function') {
                try {
                    options.recover(error);
                } catch (recoveryError) {
                    this.logError(recoveryError, { originalError: error, context: 'Recovery attempt failed' });
                }
            }
            
            // Trigger Phoenix resurrection if critical
            if (options.critical && window.Phoenix.ResurrectionProtocol) {
                window.Phoenix.ResurrectionProtocol.resurrect(errorInfo);
            }
            
            return errorInfo;
        },
        
        // Show error message to user
        showErrorMessage: function(message, type = 'error') {
            // Create toast element
            const toast = document.createElement('div');
            toast.className = 'phoenix-toast';
            toast.textContent = message;
            
            // Style based on type
            switch (type) {
                case 'error':
                    toast.style.backgroundColor = 'var(--phoenix-red)';
                    break;
                case 'warning':
                    toast.style.backgroundColor = 'var(--highlight-gold)';
                    break;
                case 'info':
                    toast.style.backgroundColor = 'var(--omega-blue)';
                    break;
                case 'success':
                    toast.style.backgroundColor = 'var(--growth-green)';
                    break;
            }
            
            // Style toast
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.zIndex = '1000';
            toast.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
            toast.style.animation = 'phoenix-fade-in 0.3s ease';
            
            // Add to body
            document.body.appendChild(toast);
            
            // Remove after 5 seconds
            setTimeout(() => {
                toast.style.animation = 'phoenix-fade-out 0.3s ease';
                
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 5000);
        },
        
        // Global error handler
        globalErrorHandler: function(event) {
            const error = event.error || new Error('Unknown error');
            
            this.handleError(error, {
                context: {
                    message: event.message,
                    source: event.filename,
                    lineno: event.lineno,
                    colno: event.colno
                },
                showUser: true,
                userMessage: 'An unexpected error occurred. The app will attempt to recover.'
            });
            
            // Prevent default browser error handling
            event.preventDefault();
        }
    };
    
    // Add global error handler
    window.addEventListener('error', (event) => {
        window.Phoenix.ErrorHandling.globalErrorHandler(event);
    });
    
    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        window.Phoenix.ErrorHandling.handleError(event.reason, {
            context: { type: 'unhandled-promise-rejection' },
            showUser: true,
            userMessage: 'An operation failed to complete. Please try again.'
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes phoenix-fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PhoenixValidation: window.Phoenix.Validation };
}