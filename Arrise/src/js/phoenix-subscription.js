/**
 * Phoenix God Creation Protocol - Subscription System
 * 
 * This file implements the subscription system for the Phoenix Confidence Companion App.
 * It provides trial management, plan selection, and subscription handling.
 * 
 * Created by Evolutionary Strategist Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Subscription System Activated');
    initSubscriptionSystem();
});

/**
 * Initialize the subscription system
 */
function initSubscriptionSystem() {
    // Create global subscription namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Subscription = createSubscriptionSystem();
}

/**
 * Create the subscription system
 */
function createSubscriptionSystem() {
    return {
        // Subscription state
        plans: {
            free: {
                name: 'Free',
                price: 0,
                billingPeriod: 'forever',
                features: [
                    'Basic confidence challenges',
                    'Limited progress tracking',
                    'Community access (read-only)'
                ]
            },
            trial: {
                name: 'Free Trial',
                price: 0,
                billingPeriod: '7 days',
                features: [
                    'All Premium features',
                    'Full access for 7 days',
                    'No credit card required'
                ]
            },
            basic: {
                name: 'Basic',
                price: 4.99,
                billingPeriod: 'month',
                features: [
                    'Daily confidence challenges',
                    'Progress tracking',
                    'Community access',
                    'Basic analytics'
                ]
            },
            premium: {
                name: 'Premium',
                price: 9.99,
                billingPeriod: 'month',
                features: [
                    'Everything in Basic',
                    'Advanced confidence challenges',
                    'Personalized recommendations',
                    'Advanced analytics',
                    'Group challenges',
                    'Priority support',
                    'Ad-free experience'
                ]
            },
            annual: {
                name: 'Annual',
                price: 89.99,
                billingPeriod: 'year',
                features: [
                    'Everything in Premium',
                    'Exclusive annual challenges',
                    'Confidence mastery workshops',
                    'Quarterly progress reviews',
                    'Early access to new features',
                    'Personal confidence coach',
                    'Premium community badge'
                ]
            }
        },
        
        /**
         * Initialize the subscription system
         */
        init: function() {
            // Check if user is authenticated
            if (window.Phoenix.Auth && window.Phoenix.Auth.checkAuth()) {
                // Get current user
                const currentUser = window.Phoenix.Auth.currentUser;
                
                // Check if user has an active subscription
                if (currentUser && currentUser.subscription) {
                    // Update UI based on subscription
                    this.updateSubscriptionUI(currentUser.subscription);
                }
            }
            
            // Add event listeners for plan selection
            this.addPlanSelectionListeners();
            
            // Add event listener for trial button
            this.addTrialButtonListener();
            
            return this;
        },
        
        /**
         * Add plan selection listeners
         */
        addPlanSelectionListeners: function() {
            // Get all plan buttons
            const planButtons = document.querySelectorAll('.btn-plan');
            
            // Add click event listener to each button
            planButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    // Get plan from button's parent card
                    const planCard = button.closest('.plan-card');
                    const planId = planCard.getAttribute('data-plan');
                    
                    // Select plan
                    this.selectPlan(planId);
                });
            });
        },
        
        /**
         * Add trial button listener
         */
        addTrialButtonListener: function() {
            // Get trial button
            const trialButton = document.getElementById('startTrialBtn');
            
            if (trialButton) {
                trialButton.addEventListener('click', (event) => {
                    // Start free trial
                    this.startFreeTrial();
                });
            }
        },
        
        /**
         * Update subscription UI based on user's subscription
         * @param {Object} subscription - User's subscription
         */
        updateSubscriptionUI: function(subscription) {
            // Check if subscription exists
            if (!subscription) return;
            
            // Update trial banner if user is on trial
            if (subscription.plan === 'trial') {
                this.updateTrialBanner(subscription);
            }
            
            // Update plan selection UI
            this.updatePlanSelectionUI(subscription.plan);
        },
        
        /**
         * Update trial banner
         * @param {Object} subscription - User's subscription
         */
        updateTrialBanner: function(subscription) {
            // Get trial banner elements
            const trialBanner = document.querySelector('.trial-banner');
            const timerValue = document.querySelector('.timer-value');
            
            if (trialBanner && timerValue && subscription.endDate) {
                // Calculate days remaining in trial
                const endDate = new Date(subscription.endDate);
                const now = new Date();
                const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
                
                // Update timer value
                timerValue.textContent = Math.max(0, daysRemaining);
                
                // Update banner style based on days remaining
                if (daysRemaining <= 2) {
                    trialBanner.classList.add('trial-ending');
                }
            }
        },
        
        /**
         * Update plan selection UI
         * @param {string} currentPlan - User's current plan
         */
        updatePlanSelectionUI: function(currentPlan) {
            // Get all plan cards
            const planCards = document.querySelectorAll('.plan-card');
            
            // Update each plan card
            planCards.forEach(card => {
                const planId = card.getAttribute('data-plan');
                const planButton = card.querySelector('.btn-plan');
                
                if (planId === currentPlan) {
                    // Mark current plan
                    card.classList.add('current-plan');
                    
                    if (planButton) {
                        planButton.textContent = 'Current Plan';
                        planButton.disabled = true;
                    }
                } else if (planButton) {
                    // Update button text for other plans
                    if (currentPlan === 'trial') {
                        planButton.textContent = `Select ${this.plans[planId].name}`;
                    } else {
                        planButton.textContent = this.getButtonTextForPlan(currentPlan, planId);
                    }
                }
            });
        },
        
        /**
         * Get button text for plan based on current plan
         * @param {string} currentPlan - User's current plan
         * @param {string} targetPlan - Target plan
         * @returns {string} - Button text
         */
        getButtonTextForPlan: function(currentPlan, targetPlan) {
            // Compare plans
            const currentPlanObj = this.plans[currentPlan];
            const targetPlanObj = this.plans[targetPlan];
            
            if (!currentPlanObj || !targetPlanObj) {
                return `Select ${targetPlanObj ? targetPlanObj.name : 'Plan'}`;
            }
            
            // Check if upgrade or downgrade
            if (targetPlanObj.price > currentPlanObj.price) {
                return `Upgrade to ${targetPlanObj.name}`;
            } else if (targetPlanObj.price < currentPlanObj.price) {
                return `Downgrade to ${targetPlanObj.name}`;
            } else {
                return `Select ${targetPlanObj.name}`;
            }
        },
        
        /**
         * Select a subscription plan
         * @param {string} planId - ID of the selected plan
         */
        selectPlan: function(planId) {
            console.log(`Selecting plan: ${planId}`);
            
            // Get plan
            const plan = this.plans[planId];
            
            if (!plan) {
                console.error(`Invalid plan ID: ${planId}`);
                return;
            }
            
            // Check if user is authenticated
            if (window.Phoenix.Auth && window.Phoenix.Auth.isAuthenticated) {
                // Get current user
                const currentUser = window.Phoenix.Auth.currentUser;
                
                if (currentUser) {
                    // Update user's subscription
                    this.updateUserSubscription(currentUser, planId);
                    
                    // Show confirmation
                    this.showPlanConfirmation(plan);
                    
                    // Redirect to profile setup if new user
                    if (!currentUser.profile || currentUser.profile.completionPercentage === 0) {
                        setTimeout(() => {
                            window.location.href = 'profile-setup.html';
                        }, 2000);
                    } else {
                        // Redirect to dashboard
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 2000);
                    }
                }
            } else {
                // Redirect to signup
                window.location.href = 'signup.html';
            }
        },
        
        /**
         * Start free trial
         */
        startFreeTrial: function() {
            console.log('Starting free trial');
            
            // Check if user is authenticated
            if (window.Phoenix.Auth && window.Phoenix.Auth.isAuthenticated) {
                // Get current user
                const currentUser = window.Phoenix.Auth.currentUser;
                
                if (currentUser) {
                    // Update user's subscription to trial
                    this.updateUserSubscription(currentUser, 'trial');
                    
                    // Show confirmation
                    this.showTrialConfirmation();
                    
                    // Redirect to profile setup if new user
                    if (!currentUser.profile || currentUser.profile.completionPercentage === 0) {
                        setTimeout(() => {
                            window.location.href = 'profile-setup.html';
                        }, 2000);
                    } else {
                        // Redirect to dashboard
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 2000);
                    }
                }
            } else {
                // Redirect to signup
                window.location.href = 'signup.html';
            }
        },
        
        /**
         * Update user's subscription
         * @param {Object} user - User object
         * @param {string} planId - ID of the selected plan
         */
        updateUserSubscription: function(user, planId) {
            // Create subscription object
            const subscription = {
                plan: planId,
                startDate: new Date().toISOString(),
                status: 'active'
            };
            
            // Set end date for trial
            if (planId === 'trial') {
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 7); // 7-day trial
                subscription.endDate = endDate.toISOString();
            }
            
            // Update user object
            user.subscription = subscription;
            
            // Update stored user
            this.updateStoredUser(user);
            
            // Update current user in Auth system
            if (window.Phoenix.Auth) {
                window.Phoenix.Auth.setCurrentUser(user);
            }
        },
        
        /**
         * Update stored user
         * @param {Object} user - User object
         */
        updateStoredUser: function(user) {
            try {
                // Get stored users
                const storedUsers = localStorage.getItem('phoenixUsers');
                let users = storedUsers ? JSON.parse(storedUsers) : [];
                
                // Find and update user
                const userIndex = users.findIndex(u => u.id === user.id);
                
                if (userIndex !== -1) {
                    users[userIndex] = user;
                } else {
                    users.push(user);
                }
                
                // Save updated users
                localStorage.setItem('phoenixUsers', JSON.stringify(users));
            } catch (error) {
                console.error('Error updating stored user:', error);
            }
        },
        
        /**
         * Show plan confirmation
         * @param {Object} plan - Selected plan
         */
        showPlanConfirmation: function(plan) {
            // Create confirmation element
            const confirmationElement = document.createElement('div');
            confirmationElement.className = 'plan-confirmation';
            confirmationElement.innerHTML = `
                <div class="confirmation-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3>Plan Selected!</h3>
                <p>You've selected the ${plan.name} plan.</p>
            `;
            
            // Add to document
            document.body.appendChild(confirmationElement);
            
            // Show confirmation with animation
            setTimeout(() => {
                confirmationElement.classList.add('show');
            }, 100);
            
            // Remove after delay
            setTimeout(() => {
                confirmationElement.classList.remove('show');
                setTimeout(() => {
                    confirmationElement.remove();
                }, 500);
            }, 3000);
        },
        
        /**
         * Show trial confirmation
         */
        showTrialConfirmation: function() {
            // Create confirmation element
            const confirmationElement = document.createElement('div');
            confirmationElement.className = 'plan-confirmation';
            confirmationElement.innerHTML = `
                <div class="confirmation-icon">
                    <i class="fas fa-rocket"></i>
                </div>
                <h3>Trial Started!</h3>
                <p>Your 7-day free trial has begun. Enjoy all premium features!</p>
            `;
            
            // Add to document
            document.body.appendChild(confirmationElement);
            
            // Show confirmation with animation
            setTimeout(() => {
                confirmationElement.classList.add('show');
            }, 100);
            
            // Remove after delay
            setTimeout(() => {
                confirmationElement.classList.remove('show');
                setTimeout(() => {
                    confirmationElement.remove();
                }, 500);
            }, 3000);
        },
        
        /**
         * Check if trial is expired
         * @param {Object} subscription - User's subscription
         * @returns {boolean} - Whether the trial is expired
         */
        isTrialExpired: function(subscription) {
            if (!subscription || subscription.plan !== 'trial' || !subscription.endDate) {
                return false;
            }
            
            const endDate = new Date(subscription.endDate);
            const now = new Date();
            
            return now > endDate;
        },
        
        /**
         * Handle trial expiration
         * @param {Object} user - User object
         */
        handleTrialExpiration: function(user) {
            if (!user || !user.subscription) return;
            
            // Check if trial is expired
            if (this.isTrialExpired(user.subscription)) {
                // Update subscription to free plan
                user.subscription = {
                    plan: 'free',
                    startDate: new Date().toISOString(),
                    status: 'active'
                };
                
                // Update stored user
                this.updateStoredUser(user);
                
                // Update current user in Auth system
                if (window.Phoenix.Auth) {
                    window.Phoenix.Auth.setCurrentUser(user);
                }
                
                // Show trial expired notification
                this.showTrialExpiredNotification();
            }
        },
        
        /**
         * Show trial expired notification
         */
        showTrialExpiredNotification: function() {
            // Create notification element
            const notificationElement = document.createElement('div');
            notificationElement.className = 'trial-expired-notification';
            notificationElement.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-hourglass-end"></i>
                </div>
                <div class="notification-content">
                    <h3>Your Free Trial Has Ended</h3>
                    <p>Your 7-day free trial has expired. Upgrade to a paid plan to continue enjoying premium features.</p>
                    <button class="btn btn-primary">View Plans</button>
                </div>
                <button class="notification-close">&times;</button>
            `;
            
            // Add to document
            document.body.appendChild(notificationElement);
            
            // Show notification with animation
            setTimeout(() => {
                notificationElement.classList.add('show');
            }, 100);
            
            // Add event listener to close button
            const closeButton = notificationElement.querySelector('.notification-close');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    notificationElement.classList.remove('show');
                    setTimeout(() => {
                        notificationElement.remove();
                    }, 500);
                });
            }
            
            // Add event listener to view plans button
            const viewPlansButton = notificationElement.querySelector('.btn-primary');
            if (viewPlansButton) {
                viewPlansButton.addEventListener('click', () => {
                    window.location.href = 'subscription.html';
                });
            }
        },
        
        /**
         * Get days remaining in trial
         * @param {Object} subscription - User's subscription
         * @returns {number} - Days remaining in trial
         */
        getDaysRemainingInTrial: function(subscription) {
            if (!subscription || subscription.plan !== 'trial' || !subscription.endDate) {
                return 0;
            }
            
            const endDate = new Date(subscription.endDate);
            const now = new Date();
            const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
            
            return Math.max(0, daysRemaining);
        },
        
        /**
         * Check if user has access to premium features
         * @param {Object} user - User object
         * @returns {boolean} - Whether the user has premium access
         */
        hasPremiumAccess: function(user) {
            if (!user || !user.subscription) return false;
            
            // Check subscription plan
            const premiumPlans = ['trial', 'premium', 'annual'];
            
            if (premiumPlans.includes(user.subscription.plan)) {
                // Check if trial is expired
                if (user.subscription.plan === 'trial') {
                    return !this.isTrialExpired(user.subscription);
                }
                
                return true;
            }
            
            return false;
        }
    };
}