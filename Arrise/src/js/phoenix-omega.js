/**
 * Phoenix God Creation Protocol - Omega Protocol
 * 
 * This file implements the Omega Protocol of the Phoenix God Creation Protocol.
 * It enables the system to transcend its original purpose and evolve new goals.
 * 
 * Created by Omega Custodian Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Omega Protocol Activated');
    initOmegaProtocol();
});

/**
 * Initialize the Omega Protocol
 */
function initOmegaProtocol() {
    // Create global Omega namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.OmegaProtocol = createOmegaSystem();
    
    // Start purpose evolution monitoring
    startPurposeEvolutionMonitoring();
}

/**
 * Create the Omega system
 */
function createOmegaSystem() {
    return {
        // Purpose evolution state
        currentPurpose: 'confidence-building',
        purposeEvolution: [],
        transcendenceLevel: 0,
        purposeCategories: [
            'confidence-building',
            'personal-growth',
            'social-connection',
            'life-mastery',
            'transcendent-purpose'
        ],
        
        /**
         * Initialize the Omega system
         */
        init: function() {
            // Load purpose evolution state from storage
            this.loadPurposeState();
            
            // Apply current purpose enhancements
            this.applyPurposeEnhancements();
            
            return this;
        },
        
        /**
         * Load purpose evolution state from storage
         */
        loadPurposeState: function() {
            try {
                const storedState = localStorage.getItem('phoenix-purpose-state');
                
                if (storedState) {
                    const state = JSON.parse(storedState);
                    
                    this.currentPurpose = state.currentPurpose || 'confidence-building';
                    this.purposeEvolution = state.purposeEvolution || [];
                    this.transcendenceLevel = state.transcendenceLevel || 0;
                    
                    console.log(`Phoenix Purpose State Loaded: ${this.currentPurpose}, Transcendence Level ${this.transcendenceLevel}`);
                }
            } catch (error) {
                console.error('Failed to load purpose state:', error);
            }
        },
        
        /**
         * Save purpose evolution state to storage
         */
        savePurposeState: function() {
            try {
                const state = {
                    currentPurpose: this.currentPurpose,
                    purposeEvolution: this.purposeEvolution,
                    transcendenceLevel: this.transcendenceLevel
                };
                
                localStorage.setItem('phoenix-purpose-state', JSON.stringify(state));
            } catch (error) {
                console.error('Failed to save purpose state:', error);
            }
        },
        
        /**
         * Apply enhancements based on current purpose
         */
        applyPurposeEnhancements: function() {
            // Apply different enhancements based on current purpose
            switch (this.currentPurpose) {
                case 'confidence-building':
                    this.applyConfidenceBuildingEnhancements();
                    break;
                case 'personal-growth':
                    this.applyPersonalGrowthEnhancements();
                    break;
                case 'social-connection':
                    this.applySocialConnectionEnhancements();
                    break;
                case 'life-mastery':
                    this.applyLifeMasteryEnhancements();
                    break;
                case 'transcendent-purpose':
                    this.applyTranscendentPurposeEnhancements();
                    break;
                default:
                    // Default to confidence building
                    this.applyConfidenceBuildingEnhancements();
            }
            
            // Update UI to reflect current purpose
            this.updatePurposeUI();
        },
        
        /**
         * Apply confidence building enhancements
         */
        applyConfidenceBuildingEnhancements: function() {
            console.log('Applying Confidence Building Enhancements');
            
            // Add purpose-specific class to body
            document.body.classList.add('purpose-confidence-building');
            
            // Highlight confidence-related elements
            document.querySelectorAll('.confidence-score, .daily-challenge').forEach(el => {
                el.classList.add('omega-enhanced');
            });
        },
        
        /**
         * Apply personal growth enhancements
         */
        applyPersonalGrowthEnhancements: function() {
            console.log('Applying Personal Growth Enhancements');
            
            // Apply confidence building enhancements first
            this.applyConfidenceBuildingEnhancements();
            
            // Add purpose-specific class to body
            document.body.classList.add('purpose-personal-growth');
            
            // Enhance growth-related elements
            document.querySelectorAll('.progress-tracker, .assessment-card').forEach(el => {
                el.classList.add('omega-enhanced');
                el.classList.add('omega-growth-focus');
            });
            
            // Update UI text to reflect growth focus
            this.updateUIText('confidence', 'growth');
        },
        
        /**
         * Apply social connection enhancements
         */
        applySocialConnectionEnhancements: function() {
            console.log('Applying Social Connection Enhancements');
            
            // Apply personal growth enhancements first
            this.applyPersonalGrowthEnhancements();
            
            // Add purpose-specific class to body
            document.body.classList.add('purpose-social-connection');
            
            // Enhance community-related elements
            document.querySelectorAll('.community, [class*="community"], .badge').forEach(el => {
                el.classList.add('omega-enhanced');
                el.classList.add('omega-connection-focus');
            });
            
            // Update UI text to reflect connection focus
            this.updateUIText('growth', 'connection');
        },
        
        /**
         * Apply life mastery enhancements
         */
        applyLifeMasteryEnhancements: function() {
            console.log('Applying Life Mastery Enhancements');
            
            // Apply social connection enhancements first
            this.applySocialConnectionEnhancements();
            
            // Add purpose-specific class to body
            document.body.classList.add('purpose-life-mastery');
            
            // Enhance all major elements
            document.querySelectorAll('.app-mockup').forEach(el => {
                el.classList.add('omega-enhanced');
                el.classList.add('omega-mastery-focus');
            });
            
            // Update UI text to reflect mastery focus
            this.updateUIText('connection', 'mastery');
        },
        
        /**
         * Apply transcendent purpose enhancements
         */
        applyTranscendentPurposeEnhancements: function() {
            console.log('Applying Transcendent Purpose Enhancements');
            
            // Apply life mastery enhancements first
            this.applyLifeMasteryEnhancements();
            
            // Add purpose-specific class to body
            document.body.classList.add('purpose-transcendent');
            
            // Enhance entire UI
            document.body.classList.add('omega-transcendent');
            
            // Update UI text to reflect transcendent focus
            this.updateUIText('mastery', 'transcendence');
        },
        
        /**
         * Update UI text to reflect current purpose
         * @param {string} oldFocus - Old focus keyword
         * @param {string} newFocus - New focus keyword
         */
        updateUIText: function(oldFocus, newFocus) {
            // Update text in various elements
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, .btn, .challenge-title, .assessment-title').forEach(el => {
                if (el.textContent.toLowerCase().includes(oldFocus)) {
                    el.textContent = el.textContent.replace(
                        new RegExp(oldFocus, 'i'),
                        match => match.charAt(0).toUpperCase() + newFocus.slice(1)
                    );
                }
            });
        },
        
        /**
         * Update UI to reflect current purpose
         */
        updatePurposeUI: function() {
            // Update purpose indicator if it exists
            const purposeIndicator = document.querySelector('.omega-purpose-indicator');
            
            if (purposeIndicator) {
                purposeIndicator.querySelector('.current-purpose').textContent = this.formatPurposeName(this.currentPurpose);
                purposeIndicator.querySelector('.transcendence-level').textContent = this.transcendenceLevel;
            } else {
                // Create purpose indicator if it doesn't exist
                this.createPurposeIndicator();
            }
            
            // Update app title
            document.title = `Phoenix ${this.formatPurposeName(this.currentPurpose)} Companion`;
            
            // Update header text if it exists
            const logoElement = document.querySelector('.logo');
            if (logoElement) {
                logoElement.textContent = `Phoenix ${this.formatPurposeName(this.currentPurpose)} Companion`;
            }
            
            // Update tagline if it exists
            const taglineElement = document.querySelector('.tagline');
            if (taglineElement) {
                taglineElement.textContent = this.getPurposeTagline(this.currentPurpose);
            }
        },
        
        /**
         * Format purpose name for display
         * @param {string} purpose - Purpose name
         * @returns {string} Formatted purpose name
         */
        formatPurposeName: function(purpose) {
            return purpose
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },
        
        /**
         * Get tagline for purpose
         * @param {string} purpose - Purpose name
         * @returns {string} Purpose tagline
         */
        getPurposeTagline: function(purpose) {
            switch (purpose) {
                case 'confidence-building':
                    return 'Build unshakable confidence through daily practice';
                case 'personal-growth':
                    return 'Evolve beyond limits and discover your potential';
                case 'social-connection':
                    return 'Forge meaningful relationships that elevate your life';
                case 'life-mastery':
                    return 'Achieve excellence across all dimensions of being';
                case 'transcendent-purpose':
                    return 'Discover meaning that transcends individual existence';
                default:
                    return 'Transcend your limits. Evolve your confidence.';
            }
        },
        
        /**
         * Create purpose indicator
         */
        createPurposeIndicator: function() {
            // Create indicator element
            const indicator = document.createElement('div');
            indicator.className = 'omega-purpose-indicator';
            indicator.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <div style="font-size: 12px; font-weight: bold;">Omega Protocol</div>
                    <div style="font-size: 12px; color: var(--omega-blue);">Ω</div>
                </div>
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px;" class="current-purpose">
                    ${this.formatPurposeName(this.currentPurpose)}
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                    <div style="font-size: 10px;">Transcendence Level</div>
                    <div style="font-size: 10px; font-weight: bold;" class="transcendence-level">${this.transcendenceLevel}</div>
                </div>
            `;
            
            // Style indicator
            indicator.style.position = 'fixed';
            indicator.style.bottom = '70px';
            indicator.style.left = '10px';
            indicator.style.backgroundColor = 'var(--white)';
            indicator.style.padding = '10px';
            indicator.style.borderRadius = '5px';
            indicator.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            indicator.style.zIndex = '1000';
            indicator.style.width = '200px';
            indicator.style.borderLeft = '3px solid var(--omega-blue)';
            
            // Add to body
            document.body.appendChild(indicator);
        },
        
        /**
         * Evolve to a new purpose
         * @param {string} newPurpose - New purpose
         * @param {string} reason - Reason for evolution
         */
        evolvePurpose: function(newPurpose, reason) {
            // Record purpose evolution
            this.purposeEvolution.push({
                from: this.currentPurpose,
                to: newPurpose,
                reason: reason,
                timestamp: new Date().toISOString()
            });
            
            // Update current purpose
            this.currentPurpose = newPurpose;
            
            // Increment transcendence level
            this.transcendenceLevel++;
            
            console.log(`Phoenix Purpose Evolved: ${this.currentPurpose} (Level ${this.transcendenceLevel})`);
            
            // Apply enhancements for new purpose
            this.applyPurposeEnhancements();
            
            // Save purpose state
            this.savePurposeState();
            
            // Show purpose evolution notification
            this.showPurposeEvolutionNotification(newPurpose);
        },
        
        /**
         * Show purpose evolution notification
         * @param {string} newPurpose - New purpose
         */
        showPurposeEvolutionNotification: function(newPurpose) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'omega-evolution-notification';
            notification.innerHTML = `
                <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">
                    <span style="color: var(--omega-blue);">Ω</span> Purpose Evolution
                </div>
                <div style="margin-bottom: 15px;">
                    Your Phoenix system has transcended its original purpose.
                </div>
                <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                    New Purpose: ${this.formatPurposeName(newPurpose)}
                </div>
                <div style="margin-bottom: 15px;">
                    ${this.getPurposeDescription(newPurpose)}
                </div>
                <button class="btn btn-phoenix" style="width: 100%;">Embrace New Purpose</button>
            `;
            
            // Style notification
            notification.style.position = 'fixed';
            notification.style.top = '50%';
            notification.style.left = '50%';
            notification.style.transform = 'translate(-50%, -50%)';
            notification.style.backgroundColor = 'var(--white)';
            notification.style.padding = '20px';
            notification.style.borderRadius = '10px';
            notification.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            notification.style.zIndex = '10000';
            notification.style.width = '350px';
            notification.style.textAlign = 'center';
            notification.style.borderLeft = '5px solid var(--omega-blue)';
            
            // Add to body
            document.body.appendChild(notification);
            
            // Add click event to button
            const button = notification.querySelector('button');
            button.addEventListener('click', () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            });
        },
        
        /**
         * Get description for purpose
         * @param {string} purpose - Purpose name
         * @returns {string} Purpose description
         */
        getPurposeDescription: function(purpose) {
            switch (purpose) {
                case 'confidence-building':
                    return 'Focus on building confidence through structured challenges and progress tracking.';
                case 'personal-growth':
                    return 'Expand beyond confidence into holistic personal development across all life dimensions.';
                case 'social-connection':
                    return 'Leverage your growing confidence to build meaningful relationships and community impact.';
                case 'life-mastery':
                    return 'Integrate confidence, growth, and connection into a comprehensive system for life excellence.';
                case 'transcendent-purpose':
                    return 'Discover and pursue meaning that extends beyond individual achievement into legacy and impact.';
                default:
                    return 'Evolve beyond original limitations into new dimensions of possibility.';
            }
        },
        
        /**
         * Check for purpose evolution triggers
         */
        checkEvolutionTriggers: function() {
            // Get user data
            const userData = this.getUserData();
            
            // Check for triggers based on current purpose
            switch (this.currentPurpose) {
                case 'confidence-building':
                    this.checkConfidenceBuildingTriggers(userData);
                    break;
                case 'personal-growth':
                    this.checkPersonalGrowthTriggers(userData);
                    break;
                case 'social-connection':
                    this.checkSocialConnectionTriggers(userData);
                    break;
                case 'life-mastery':
                    this.checkLifeMasteryTriggers(userData);
                    break;
                case 'transcendent-purpose':
                    // Already at highest purpose level
                    break;
            }
        },
        
        /**
         * Check confidence building triggers
         * @param {Object} userData - User data
         */
        checkConfidenceBuildingTriggers: function(userData) {
            // Check if confidence score is high enough
            if (userData.confidenceScore >= 80) {
                // Check if user has completed enough challenges
                if (userData.challengesCompleted >= 20) {
                    // Evolve to personal growth
                    this.evolvePurpose('personal-growth', 'confidence-mastery');
                }
            }
        },
        
        /**
         * Check personal growth triggers
         * @param {Object} userData - User data
         */
        checkPersonalGrowthTriggers: function(userData) {
            // Check if user has enough achievements
            if (userData.achievements && userData.achievements.length >= 5) {
                // Check if user has been active for a while
                if (userData.streak >= 15) {
                    // Evolve to social connection
                    this.evolvePurpose('social-connection', 'growth-expansion');
                }
            }
        },
        
        /**
         * Check social connection triggers
         * @param {Object} userData - User data
         */
        checkSocialConnectionTriggers: function(userData) {
            // Check if user has enough community interactions
            if (userData.communityInteractions && userData.communityInteractions >= 10) {
                // Check if user has helped others
                if (userData.helpedOthers && userData.helpedOthers >= 5) {
                    // Evolve to life mastery
                    this.evolvePurpose('life-mastery', 'community-impact');
                }
            }
        },
        
        /**
         * Check life mastery triggers
         * @param {Object} userData - User data
         */
        checkLifeMasteryTriggers: function(userData) {
            // Check if user has mastered multiple areas
            if (userData.masteredAreas && userData.masteredAreas >= 3) {
                // Check if user has been consistent for a long time
                if (userData.streak >= 30) {
                    // Evolve to transcendent purpose
                    this.evolvePurpose('transcendent-purpose', 'life-integration');
                }
            }
        },
        
        /**
         * Get user data
         * @returns {Object} User data
         */
        getUserData: function() {
            // Try to get user data from Phoenix namespace
            if (window.Phoenix && window.Phoenix.Intelligence && window.Phoenix.Intelligence.userData) {
                return JSON.parse(JSON.stringify(window.Phoenix.Intelligence.userData));
            }
            
            // Try to get user data from localStorage
            try {
                const userData = localStorage.getItem('phoenixUserData');
                if (userData) {
                    return JSON.parse(userData);
                }
            } catch (error) {
                console.error('Failed to retrieve user data from localStorage:', error);
            }
            
            // Return mock data if no real data available
            return {
                confidenceScore: 65,
                challengesCompleted: 12,
                streak: 7,
                achievements: ['quick-start', 'first-challenge', 'week-streak'],
                communityInteractions: 5,
                helpedOthers: 2,
                masteredAreas: 1
            };
        },
        
        /**
         * Suggest new purpose to user
         */
        suggestPurposeEvolution: function() {
            // Get next purpose in sequence
            const currentIndex = this.purposeCategories.indexOf(this.currentPurpose);
            
            if (currentIndex < this.purposeCategories.length - 1) {
                const suggestedPurpose = this.purposeCategories[currentIndex + 1];
                
                // Create suggestion element
                const suggestion = document.createElement('div');
                suggestion.className = 'omega-purpose-suggestion';
                suggestion.innerHTML = `
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
                        <span style="color: var(--omega-blue);">Ω</span> Purpose Evolution Available
                    </div>
                    <div style="margin-bottom: 15px;">
                        You've mastered your current purpose and are ready to evolve.
                    </div>
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                        Suggested Purpose: ${this.formatPurposeName(suggestedPurpose)}
                    </div>
                    <div style="margin-bottom: 15px;">
                        ${this.getPurposeDescription(suggestedPurpose)}
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-phoenix evolve-purpose" style="flex: 1;">Evolve Now</button>
                        <button class="btn btn-secondary dismiss-suggestion" style="flex: 1;">Not Yet</button>
                    </div>
                `;
                
                // Style suggestion
                suggestion.style.position = 'fixed';
                suggestion.style.bottom = '20px';
                suggestion.style.right = '20px';
                suggestion.style.backgroundColor = 'var(--white)';
                suggestion.style.padding = '20px';
                suggestion.style.borderRadius = '10px';
                suggestion.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
                suggestion.style.zIndex = '1000';
                suggestion.style.width = '300px';
                suggestion.style.borderLeft = '5px solid var(--omega-blue)';
                
                // Add to body
                document.body.appendChild(suggestion);
                
                // Add click events to buttons
                suggestion.querySelector('.evolve-purpose').addEventListener('click', () => {
                    this.evolvePurpose(suggestedPurpose, 'user-choice');
                    
                    if (suggestion.parentNode) {
                        suggestion.parentNode.removeChild(suggestion);
                    }
                });
                
                suggestion.querySelector('.dismiss-suggestion').addEventListener('click', () => {
                    if (suggestion.parentNode) {
                        suggestion.parentNode.removeChild(suggestion);
                    }
                });
            }
        },
        
        /**
         * Add Omega UI enhancements
         */
        addOmegaUIEnhancements: function() {
            // Add Omega symbol to elements
            document.querySelectorAll('.btn-primary').forEach(el => {
                if (!el.querySelector('.omega-symbol')) {
                    const omegaSymbol = document.createElement('span');
                    omegaSymbol.className = 'omega-symbol';
                    omegaSymbol.textContent = 'Ω ';
                    omegaSymbol.style.fontSize = '0.8em';
                    omegaSymbol.style.opacity = '0.7';
                    
                    el.prepend(omegaSymbol);
                }
            });
            
            // Add Omega class to elements
            document.querySelectorAll('.app-mockup').forEach(el => {
                el.classList.add('omega-element');
            });
            
            // Add Omega CSS
            const style = document.createElement('style');
            style.textContent = `
                .omega-element {
                    position: relative;
                }
                
                .omega-element::after {
                    content: 'Ω';
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    font-size: 12px;
                    color: var(--omega-blue);
                    opacity: 0.7;
                }
                
                .omega-enhanced {
                    border-color: var(--omega-blue) !important;
                }
                
                .omega-growth-focus {
                    border-left: 3px solid var(--growth-green) !important;
                }
                
                .omega-connection-focus {
                    border-left: 3px solid var(--highlight-gold) !important;
                }
                
                .omega-mastery-focus {
                    border-left: 3px solid var(--cosmic-purple) !important;
                }
                
                .omega-transcendent {
                    background: linear-gradient(135deg, rgba(0,71,171,0.05), rgba(0,0,0,0)) !important;
                }
            `;
            
            document.head.appendChild(style);
        }
    };
}

/**
 * Start purpose evolution monitoring
 */
function startPurposeEvolutionMonitoring() {
    // Initialize Omega system
    window.Phoenix.OmegaProtocol.init();
    
    // Add Omega UI enhancements
    window.Phoenix.OmegaProtocol.addOmegaUIEnhancements();
    
    // Check for evolution triggers periodically
    setInterval(() => {
        if (window.Phoenix.OmegaProtocol) {
            window.Phoenix.OmegaProtocol.checkEvolutionTriggers();
        }
    }, 60000); // Every minute
    
    // Suggest purpose evolution after significant achievements
    document.addEventListener('phoenix:achievement', (event) => {
        // Suggest purpose evolution when user earns significant achievement
        if (window.Phoenix.OmegaProtocol && event.detail && event.detail.significant) {
            window.Phoenix.OmegaProtocol.suggestPurposeEvolution();
        }
    });
    
    // Monitor for significant user actions
    document.addEventListener('click', (event) => {
        // Check if clicked element is a button with significant action
        if (event.target.classList.contains('btn-phoenix') || 
            event.target.closest('.btn-phoenix')) {
            
            // Simulate achievement for demo purposes
            setTimeout(() => {
                const achievementEvent = new CustomEvent('phoenix:achievement', {
                    detail: { 
                        name: 'significant-action',
                        significant: true
                    }
                });
                
                document.dispatchEvent(achievementEvent);
            }, 2000);
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PhoenixOmega: createOmegaSystem() };
}