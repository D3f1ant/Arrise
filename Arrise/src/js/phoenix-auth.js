/**
 * Phoenix God Creation Protocol - Authentication System
 * 
 * This file implements the authentication system for the Phoenix Confidence Companion App.
 * It provides secure login, registration, and session management.
 * 
 * Created by Security Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Authentication System Activated');
    initAuthSystem();
});

/**
 * Initialize the authentication system
 */
function initAuthSystem() {
    // Create global auth namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Auth = createAuthSystem();
}

/**
 * Create the authentication system
 */
function createAuthSystem() {
    return {
        // User state
        currentUser: null,
        isAuthenticated: false,
        authToken: null,
        
        /**
         * Initialize the signup functionality
         */
        initSignup: function() {
            console.log('Initializing signup functionality');
            
            // Get signup form
            const signupForm = document.getElementById('signupForm');
            
            if (signupForm) {
                // Add form validation
                this.addSignupValidation(signupForm);
                
                // Add form submission handler
                signupForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    
                    // Validate form
                    if (this.validateSignupForm(signupForm)) {
                        // Submit form
                        this.submitSignupForm(signupForm);
                    }
                });
            }
        },
        
        /**
         * Add validation to signup form
         * @param {HTMLFormElement} form - The signup form
         */
        addSignupValidation: function(form) {
            // Get form fields
            const fullNameInput = form.querySelector('#fullName');
            const emailInput = form.querySelector('#email');
            const passwordInput = form.querySelector('#password');
            const confirmPasswordInput = form.querySelector('#confirmPassword');
            const termsAgreeInput = form.querySelector('#termsAgree');
            
            // Add validation for full name
            if (fullNameInput) {
                fullNameInput.addEventListener('blur', () => {
                    this.validateFullName(fullNameInput);
                });
            }
            
            // Add validation for email
            if (emailInput) {
                emailInput.addEventListener('blur', () => {
                    this.validateEmail(emailInput);
                });
            }
            
            // Add validation for password
            if (passwordInput) {
                passwordInput.addEventListener('blur', () => {
                    this.validatePassword(passwordInput);
                });
            }
            
            // Add validation for confirm password
            if (confirmPasswordInput && passwordInput) {
                confirmPasswordInput.addEventListener('blur', () => {
                    this.validateConfirmPassword(confirmPasswordInput, passwordInput);
                });
            }
            
            // Add validation for terms agreement
            if (termsAgreeInput) {
                termsAgreeInput.addEventListener('change', () => {
                    this.validateTermsAgreement(termsAgreeInput);
                });
            }
        },
        
        /**
         * Validate full name
         * @param {HTMLInputElement} input - The full name input
         * @returns {boolean} - Whether the input is valid
         */
        validateFullName: function(input) {
            const value = input.value.trim();
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            
            if (!value) {
                this.showValidationError(input, messageElement, 'Please enter your full name');
                return false;
            }
            
            if (value.length < 2) {
                this.showValidationError(input, messageElement, 'Name must be at least 2 characters');
                return false;
            }
            
            if (value.length > 50) {
                this.showValidationError(input, messageElement, 'Name must be less than 50 characters');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Validate email
         * @param {HTMLInputElement} input - The email input
         * @returns {boolean} - Whether the input is valid
         */
        validateEmail: function(input) {
            const value = input.value.trim();
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!value) {
                this.showValidationError(input, messageElement, 'Please enter your email address');
                return false;
            }
            
            if (!emailRegex.test(value)) {
                this.showValidationError(input, messageElement, 'Please enter a valid email address');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Validate password
         * @param {HTMLInputElement} input - The password input
         * @returns {boolean} - Whether the input is valid
         */
        validatePassword: function(input) {
            const value = input.value;
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            
            if (!value) {
                this.showValidationError(input, messageElement, 'Please enter a password');
                return false;
            }
            
            if (value.length < 8) {
                this.showValidationError(input, messageElement, 'Password must be at least 8 characters');
                return false;
            }
            
            // Check for complexity
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            
            const complexity = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
            
            if (complexity < 3) {
                this.showValidationError(input, messageElement, 'Password must include at least 3 of the following: uppercase letters, lowercase letters, numbers, and special characters');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Validate confirm password
         * @param {HTMLInputElement} input - The confirm password input
         * @param {HTMLInputElement} passwordInput - The password input
         * @returns {boolean} - Whether the input is valid
         */
        validateConfirmPassword: function(input, passwordInput) {
            const value = input.value;
            const passwordValue = passwordInput.value;
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            
            if (!value) {
                this.showValidationError(input, messageElement, 'Please confirm your password');
                return false;
            }
            
            if (value !== passwordValue) {
                this.showValidationError(input, messageElement, 'Passwords do not match');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Validate terms agreement
         * @param {HTMLInputElement} input - The terms agreement input
         * @returns {boolean} - Whether the input is valid
         */
        validateTermsAgreement: function(input) {
            const isChecked = input.checked;
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            
            if (!isChecked) {
                this.showValidationError(input, messageElement, 'You must agree to the Terms of Service and Privacy Policy');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Show validation error
         * @param {HTMLInputElement} input - The input element
         * @param {HTMLElement} messageElement - The validation message element
         * @param {string} message - The error message
         */
        showValidationError: function(input, messageElement, message) {
            input.classList.add('invalid');
            
            if (messageElement) {
                messageElement.textContent = message;
                messageElement.style.display = 'block';
            }
        },
        
        /**
         * Clear validation error
         * @param {HTMLInputElement} input - The input element
         * @param {HTMLElement} messageElement - The validation message element
         */
        clearValidationError: function(input, messageElement) {
            input.classList.remove('invalid');
            
            if (messageElement) {
                messageElement.textContent = '';
                messageElement.style.display = 'none';
            }
        },
        
        /**
         * Validate signup form
         * @param {HTMLFormElement} form - The signup form
         * @returns {boolean} - Whether the form is valid
         */
        validateSignupForm: function(form) {
            // Get form fields
            const fullNameInput = form.querySelector('#fullName');
            const emailInput = form.querySelector('#email');
            const passwordInput = form.querySelector('#password');
            const confirmPasswordInput = form.querySelector('#confirmPassword');
            const termsAgreeInput = form.querySelector('#termsAgree');
            
            // Validate each field
            const isFullNameValid = this.validateFullName(fullNameInput);
            const isEmailValid = this.validateEmail(emailInput);
            const isPasswordValid = this.validatePassword(passwordInput);
            const isConfirmPasswordValid = this.validateConfirmPassword(confirmPasswordInput, passwordInput);
            const isTermsAgreed = this.validateTermsAgreement(termsAgreeInput);
            
            // Return whether all fields are valid
            return isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsAgreed;
        },
        
        /**
         * Submit signup form
         * @param {HTMLFormElement} form - The signup form
         */
        submitSignupForm: function(form) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Creating Account...';
            submitButton.disabled = true;
            form.classList.add('form-submitting');
            
            // Get form data
            const formData = new FormData(form);
            const userData = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            
            // Simulate API call
            setTimeout(() => {
                // Create user account
                this.createUserAccount(userData)
                    .then(response => {
                        console.log('Account created successfully:', response);
                        
                        // Store user data and token
                        this.setCurrentUser(response.user);
                        this.setAuthToken(response.token);
                        
                        // Redirect to subscription page
                        window.location.href = 'subscription.html';
                    })
                    .catch(error => {
                        console.error('Error creating account:', error);
                        
                        // Show error message
                        this.showAuthError(form, error.message || 'An error occurred while creating your account. Please try again.');
                        
                        // Reset button
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        form.classList.remove('form-submitting');
                    });
            }, 1500);
        },
        
        /**
         * Create user account
         * @param {Object} userData - The user data
         * @returns {Promise} - Promise that resolves with the created user
         */
        createUserAccount: function(userData) {
            // This would normally be an API call
            return new Promise((resolve, reject) => {
                // Check if email already exists
                const existingUsers = this.getStoredUsers();
                const emailExists = existingUsers.some(user => user.email === userData.email);
                
                if (emailExists) {
                    reject({ message: 'An account with this email already exists' });
                    return;
                }
                
                // Create new user
                const newUser = {
                    id: Date.now().toString(),
                    fullName: userData.fullName,
                    email: userData.email,
                    createdAt: new Date().toISOString(),
                    subscription: {
                        plan: 'trial',
                        startDate: new Date().toISOString(),
                        endDate: this.getTrialEndDate(),
                        status: 'active'
                    },
                    profile: {
                        completionPercentage: 0,
                        avatar: null,
                        bio: '',
                        confidenceLevel: 'beginner',
                        interests: []
                    }
                };
                
                // Generate token
                const token = this.generateAuthToken(newUser.id);
                
                // Store user
                existingUsers.push(newUser);
                localStorage.setItem('phoenixUsers', JSON.stringify(existingUsers));
                
                // Resolve with user and token
                resolve({
                    user: newUser,
                    token: token
                });
            });
        },
        
        /**
         * Get stored users
         * @returns {Array} - Array of stored users
         */
        getStoredUsers: function() {
            try {
                const usersJson = localStorage.getItem('phoenixUsers');
                return usersJson ? JSON.parse(usersJson) : [];
            } catch (error) {
                console.error('Error getting stored users:', error);
                return [];
            }
        },
        
        /**
         * Generate authentication token
         * @param {string} userId - The user ID
         * @returns {string} - The authentication token
         */
        generateAuthToken: function(userId) {
            // This would normally use a proper JWT library
            const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
            const payload = btoa(JSON.stringify({
                sub: userId,
                iat: Date.now(),
                exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
            }));
            const signature = btoa(`${header}.${payload}.PHOENIX_SECRET`);
            
            return `${header}.${payload}.${signature}`;
        },
        
        /**
         * Get trial end date (7 days from now)
         * @returns {string} - ISO string of trial end date
         */
        getTrialEndDate: function() {
            const trialEnd = new Date();
            trialEnd.setDate(trialEnd.getDate() + 7); // 7 day trial
            return trialEnd.toISOString();
        },
        
        /**
         * Set current user
         * @param {Object} user - The user object
         */
        setCurrentUser: function(user) {
            this.currentUser = user;
            this.isAuthenticated = true;
            
            // Store in local storage
            localStorage.setItem('phoenixCurrentUser', JSON.stringify(user));
        },
        
        /**
         * Set authentication token
         * @param {string} token - The authentication token
         */
        setAuthToken: function(token) {
            this.authToken = token;
            
            // Store in local storage
            localStorage.setItem('phoenixAuthToken', token);
        },
        
        /**
         * Show authentication error
         * @param {HTMLFormElement} form - The form element
         * @param {string} message - The error message
         */
        showAuthError: function(form, message) {
            // Check if error element already exists
            let errorElement = form.querySelector('.auth-error-message');
            
            if (!errorElement) {
                // Create error element
                errorElement = document.createElement('div');
                errorElement.className = 'auth-error-message';
                form.prepend(errorElement);
            }
            
            // Set error message
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error animation
            form.classList.add('auth-error');
            
            // Remove animation after it completes
            setTimeout(() => {
                form.classList.remove('auth-error');
            }, 500);
        },
        
        /**
         * Initialize the login functionality
         */
        initLogin: function() {
            console.log('Initializing login functionality');
            
            // Get login form
            const loginForm = document.getElementById('loginForm');
            
            if (loginForm) {
                // Add form validation
                this.addLoginValidation(loginForm);
                
                // Add form submission handler
                loginForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    
                    // Validate form
                    if (this.validateLoginForm(loginForm)) {
                        // Submit form
                        this.submitLoginForm(loginForm);
                    }
                });
            }
        },
        
        /**
         * Add validation to login form
         * @param {HTMLFormElement} form - The login form
         */
        addLoginValidation: function(form) {
            // Get form fields
            const emailInput = form.querySelector('#email');
            const passwordInput = form.querySelector('#password');
            
            // Add validation for email
            if (emailInput) {
                emailInput.addEventListener('blur', () => {
                    this.validateEmail(emailInput);
                });
            }
            
            // Add validation for password
            if (passwordInput) {
                passwordInput.addEventListener('blur', () => {
                    this.validateLoginPassword(passwordInput);
                });
            }
        },
        
        /**
         * Validate login password
         * @param {HTMLInputElement} input - The password input
         * @returns {boolean} - Whether the input is valid
         */
        validateLoginPassword: function(input) {
            const value = input.value;
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            
            if (!value) {
                this.showValidationError(input, messageElement, 'Please enter your password');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Validate login form
         * @param {HTMLFormElement} form - The login form
         * @returns {boolean} - Whether the form is valid
         */
        validateLoginForm: function(form) {
            // Get form fields
            const emailInput = form.querySelector('#email');
            const passwordInput = form.querySelector('#password');
            
            // Validate each field
            const isEmailValid = this.validateEmail(emailInput);
            const isPasswordValid = this.validateLoginPassword(passwordInput);
            
            // Return whether all fields are valid
            return isEmailValid && isPasswordValid;
        },
        
        /**
         * Submit login form
         * @param {HTMLFormElement} form - The login form
         */
        submitLoginForm: function(form) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Logging In...';
            submitButton.disabled = true;
            form.classList.add('form-submitting');
            
            // Get form data
            const formData = new FormData(form);
            const loginData = {
                email: formData.get('email'),
                password: formData.get('password'),
                rememberMe: formData.get('rememberMe') === 'on'
            };
            
            // Simulate API call
            setTimeout(() => {
                // Authenticate user
                this.authenticateUser(loginData)
                    .then(response => {
                        console.log('Login successful:', response);
                        
                        // Store user data and token
                        this.setCurrentUser(response.user);
                        this.setAuthToken(response.token);
                        
                        // Redirect to dashboard
                        window.location.href = 'dashboard.html';
                    })
                    .catch(error => {
                        console.error('Login error:', error);
                        
                        // Show error message
                        this.showAuthError(form, error.message || 'Invalid email or password. Please try again.');
                        
                        // Reset button
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        form.classList.remove('form-submitting');
                    });
            }, 1500);
        },
        
        /**
         * Authenticate user
         * @param {Object} loginData - The login data
         * @returns {Promise} - Promise that resolves with the authenticated user
         */
        authenticateUser: function(loginData) {
            // This would normally be an API call
            return new Promise((resolve, reject) => {
                // Get stored users
                const users = this.getStoredUsers();
                
                // Find user by email
                const user = users.find(user => user.email === loginData.email);
                
                if (!user) {
                    reject({ message: 'Invalid email or password' });
                    return;
                }
                
                // In a real app, we would verify the password hash
                // For this demo, we'll just assume the password is correct
                
                // Generate token
                const token = this.generateAuthToken(user.id);
                
                // Resolve with user and token
                resolve({
                    user: user,
                    token: token
                });
            });
        },
        
        /**
         * Check if user is authenticated
         * @returns {boolean} - Whether the user is authenticated
         */
        checkAuth: function() {
            // Check for stored user and token
            const storedUser = localStorage.getItem('phoenixCurrentUser');
            const storedToken = localStorage.getItem('phoenixAuthToken');
            
            if (storedUser && storedToken) {
                try {
                    // Parse stored user
                    const user = JSON.parse(storedUser);
                    
                    // Verify token (would normally validate JWT)
                    if (this.verifyAuthToken(storedToken)) {
                        // Set current user and auth state
                        this.currentUser = user;
                        this.authToken = storedToken;
                        this.isAuthenticated = true;
                        
                        return true;
                    }
                } catch (error) {
                    console.error('Error checking auth:', error);
                }
            }
            
            return false;
        },
        
        /**
         * Verify authentication token
         * @param {string} token - The authentication token
         * @returns {boolean} - Whether the token is valid
         */
        verifyAuthToken: function(token) {
            // This would normally verify the JWT signature and expiration
            try {
                const parts = token.split('.');
                if (parts.length !== 3) return false;
                
                const payload = JSON.parse(atob(parts[1]));
                const expiration = payload.exp;
                
                // Check if token is expired
                if (expiration < Date.now()) return false;
                
                return true;
            } catch (error) {
                console.error('Error verifying token:', error);
                return false;
            }
        },
        
        /**
         * Log out the current user
         */
        logout: function() {
            // Clear user data and token
            this.currentUser = null;
            this.authToken = null;
            this.isAuthenticated = false;
            
            // Clear from local storage
            localStorage.removeItem('phoenixCurrentUser');
            localStorage.removeItem('phoenixAuthToken');
            
            // Redirect to login page
            window.location.href = 'login.html';
        }
    };
}