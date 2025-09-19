/**
 * Phoenix God Creation Protocol - Profile System
 * 
 * This file implements the profile system for the Phoenix Confidence Companion App.
 * It provides profile setup, management, and social features.
 * 
 * Created by Integrator Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Profile System Activated');
    initProfileSystem();
});

/**
 * Initialize the profile system
 */
function initProfileSystem() {
    // Create global profile namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Profile = createProfileSystem();
}

/**
 * Create the profile system
 */
function createProfileSystem() {
    return {
        // Profile state
        currentProfile: null,
        friends: [],
        invitations: [],
        
        /**
         * Initialize the profile setup
         */
        initProfileSetup: function() {
            console.log('Initializing profile setup');
            
            // Check if user is authenticated
            if (window.Phoenix.Auth && window.Phoenix.Auth.checkAuth()) {
                // Get current user
                const currentUser = window.Phoenix.Auth.currentUser;
                
                if (currentUser) {
                    // Check if user already has a profile
                    if (currentUser.profile && currentUser.profile.completionPercentage > 0) {
                        // Pre-fill profile form with existing data
                        this.prefillProfileForm(currentUser.profile);
                    }
                }
            } else {
                // Redirect to login if not authenticated
                window.location.href = 'login.html';
            }
            
            // Add validation to profile forms
            this.addProfileFormValidation();
            
            return this;
        },
        
        /**
         * Add validation to profile forms
         */
        addProfileFormValidation: function() {
            // Basic info form validation
            const basicInfoForm = document.getElementById('basicInfoForm');
            if (basicInfoForm) {
                const displayNameInput = basicInfoForm.querySelector('#displayName');
                const bioTextarea = basicInfoForm.querySelector('#bio');
                
                if (displayNameInput) {
                    displayNameInput.addEventListener('blur', () => {
                        this.validateDisplayName(displayNameInput);
                    });
                }
                
                if (bioTextarea) {
                    bioTextarea.addEventListener('blur', () => {
                        this.validateBio(bioTextarea);
                    });
                }
            }
            
            // Confidence form validation
            const confidenceForm = document.getElementById('confidenceForm');
            if (confidenceForm) {
                const confidenceAreasCheckboxes = confidenceForm.querySelectorAll('input[name="confidenceAreas"]');
                
                if (confidenceAreasCheckboxes.length > 0) {
                    confidenceAreasCheckboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', () => {
                            this.validateConfidenceAreas(confidenceAreasCheckboxes);
                        });
                    });
                }
            }
            
            // Goals form validation
            const goalsForm = document.getElementById('goalsForm');
            if (goalsForm) {
                const primaryGoalRadios = goalsForm.querySelectorAll('input[name="primaryGoal"]');
                
                if (primaryGoalRadios.length > 0) {
                    primaryGoalRadios.forEach(radio => {
                        radio.addEventListener('change', () => {
                            this.validatePrimaryGoal(primaryGoalRadios);
                        });
                    });
                }
            }
        },
        
        /**
         * Validate display name
         * @param {HTMLInputElement} input - The display name input
         * @returns {boolean} - Whether the input is valid
         */
        validateDisplayName: function(input) {
            const value = input.value.trim();
            const messageElement = document.querySelector(`.validation-message[data-for="${input.id}"]`);
            
            if (!value) {
                this.showValidationError(input, messageElement, 'Please enter a display name');
                return false;
            }
            
            if (value.length < 2) {
                this.showValidationError(input, messageElement, 'Display name must be at least 2 characters');
                return false;
            }
            
            if (value.length > 30) {
                this.showValidationError(input, messageElement, 'Display name must be less than 30 characters');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(input, messageElement);
            return true;
        },
        
        /**
         * Validate bio
         * @param {HTMLTextAreaElement} textarea - The bio textarea
         * @returns {boolean} - Whether the textarea is valid
         */
        validateBio: function(textarea) {
            const value = textarea.value.trim();
            const messageElement = document.querySelector(`.validation-message[data-for="${textarea.id}"]`);
            
            if (value.length > 150) {
                this.showValidationError(textarea, messageElement, 'Bio must be less than 150 characters');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(textarea, messageElement);
            return true;
        },
        
        /**
         * Validate confidence areas
         * @param {NodeList} checkboxes - The confidence areas checkboxes
         * @returns {boolean} - Whether at least one checkbox is checked
         */
        validateConfidenceAreas: function(checkboxes) {
            const messageElement = document.querySelector('.validation-message[data-for="confidenceAreas"]');
            const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
            
            if (checkedCount === 0) {
                this.showValidationError(null, messageElement, 'Please select at least one area');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(null, messageElement);
            return true;
        },
        
        /**
         * Validate primary goal
         * @param {NodeList} radios - The primary goal radio buttons
         * @returns {boolean} - Whether a radio button is selected
         */
        validatePrimaryGoal: function(radios) {
            const messageElement = document.querySelector('.validation-message[data-for="primaryGoal"]');
            const selectedCount = Array.from(radios).filter(radio => radio.checked).length;
            
            if (selectedCount === 0) {
                this.showValidationError(null, messageElement, 'Please select a primary goal');
                return false;
            }
            
            // Clear validation error
            this.clearValidationError(null, messageElement);
            return true;
        },
        
        /**
         * Show validation error
         * @param {HTMLElement} input - The input element
         * @param {HTMLElement} messageElement - The validation message element
         * @param {string} message - The error message
         */
        showValidationError: function(input, messageElement, message) {
            if (input) {
                input.classList.add('invalid');
            }
            
            if (messageElement) {
                messageElement.textContent = message;
                messageElement.style.display = 'block';
            }
        },
        
        /**
         * Clear validation error
         * @param {HTMLElement} input - The input element
         * @param {HTMLElement} messageElement - The validation message element
         */
        clearValidationError: function(input, messageElement) {
            if (input) {
                input.classList.remove('invalid');
            }
            
            if (messageElement) {
                messageElement.textContent = '';
                messageElement.style.display = 'none';
            }
        },
        
        /**
         * Prefill profile form with existing data
         * @param {Object} profile - The user's profile
         */
        prefillProfileForm: function(profile) {
            if (!profile) return;
            
            // Basic info form
            const basicInfoForm = document.getElementById('basicInfoForm');
            if (basicInfoForm) {
                const displayNameInput = basicInfoForm.querySelector('#displayName');
                const bioTextarea = basicInfoForm.querySelector('#bio');
                const locationInput = basicInfoForm.querySelector('#location');
                const genderRadios = basicInfoForm.querySelectorAll('input[name="gender"]');
                
                if (displayNameInput && profile.displayName) {
                    displayNameInput.value = profile.displayName;
                }
                
                if (bioTextarea && profile.bio) {
                    bioTextarea.value = profile.bio;
                    const charCounter = basicInfoForm.querySelector('.char-counter');
                    if (charCounter) {
                        charCounter.textContent = `${profile.bio.length}/150`;
                    }
                }
                
                if (locationInput && profile.location) {
                    locationInput.value = profile.location;
                }
                
                if (genderRadios.length > 0 && profile.gender) {
                    genderRadios.forEach(radio => {
                        if (radio.value === profile.gender) {
                            radio.checked = true;
                        }
                    });
                }
                
                // Avatar preview
                if (profile.avatar) {
                    const avatarPreview = basicInfoForm.querySelector('#avatarPreview');
                    const avatarPlaceholder = basicInfoForm.querySelector('.avatar-placeholder');
                    const removeAvatarButton = basicInfoForm.querySelector('#removeAvatar');
                    
                    if (avatarPreview && avatarPlaceholder && removeAvatarButton) {
                        avatarPreview.src = profile.avatar;
                        avatarPreview.style.display = 'block';
                        avatarPlaceholder.style.display = 'none';
                        removeAvatarButton.style.display = 'inline-block';
                    }
                }
            }
            
            // Confidence form
            const confidenceForm = document.getElementById('confidenceForm');
            if (confidenceForm) {
                const confidenceLevelInput = confidenceForm.querySelector('#confidenceLevel');
                const confidenceAreasCheckboxes = confidenceForm.querySelectorAll('input[name="confidenceAreas"]');
                const confidenceObstaclesTextarea = confidenceForm.querySelector('#confidenceObstacles');
                
                if (confidenceLevelInput && profile.confidenceLevel) {
                    confidenceLevelInput.value = profile.confidenceLevel;
                    const confidenceValue = confidenceForm.querySelector('.confidence-value');
                    if (confidenceValue) {
                        confidenceValue.textContent = profile.confidenceLevel;
                    }
                }
                
                if (confidenceAreasCheckboxes.length > 0 && profile.confidenceAreas) {
                    confidenceAreasCheckboxes.forEach(checkbox => {
                        if (profile.confidenceAreas.includes(checkbox.value)) {
                            checkbox.checked = true;
                        }
                    });
                }
                
                if (confidenceObstaclesTextarea && profile.confidenceObstacles) {
                    confidenceObstaclesTextarea.value = profile.confidenceObstacles;
                }
            }
            
            // Goals form
            const goalsForm = document.getElementById('goalsForm');
            if (goalsForm) {
                const primaryGoalRadios = goalsForm.querySelectorAll('input[name="primaryGoal"]');
                const specificGoalTextarea = goalsForm.querySelector('#specificGoal');
                const paceRadios = goalsForm.querySelectorAll('input[name="pace"]');
                const timeCommitmentRadios = goalsForm.querySelectorAll('input[name="timeCommitment"]');
                
                if (primaryGoalRadios.length > 0 && profile.primaryGoal) {
                    primaryGoalRadios.forEach(radio => {
                        if (radio.value === profile.primaryGoal) {
                            radio.checked = true;
                        }
                    });
                }
                
                if (specificGoalTextarea && profile.specificGoal) {
                    specificGoalTextarea.value = profile.specificGoal;
                }
                
                if (paceRadios.length > 0 && profile.pace) {
                    paceRadios.forEach(radio => {
                        if (radio.value === profile.pace) {
                            radio.checked = true;
                        }
                    });
                }
                
                if (timeCommitmentRadios.length > 0 && profile.timeCommitment) {
                    timeCommitmentRadios.forEach(radio => {
                        if (radio.value === profile.timeCommitment) {
                            radio.checked = true;
                        }
                    });
                }
            }
            
            // Social form
            const socialForm = document.getElementById('socialForm');
            if (socialForm) {
                const profileVisibilityCheckbox = socialForm.querySelector('#profileVisibility');
                const communityPreferenceRadios = socialForm.querySelectorAll('input[name="communityPreference"]');
                
                if (profileVisibilityCheckbox && profile.profileVisibility !== undefined) {
                    profileVisibilityCheckbox.checked = profile.profileVisibility;
                }
                
                if (communityPreferenceRadios.length > 0 && profile.communityPreference) {
                    communityPreferenceRadios.forEach(radio => {
                        if (radio.value === profile.communityPreference) {
                            radio.checked = true;
                        }
                    });
                }
            }
        },
        
        /**
         * Save profile data
         * @param {Object} formData - The form data
         * @returns {Promise} - Promise that resolves when profile is saved
         */
        saveProfileData: function(formData) {
            return new Promise((resolve, reject) => {
                try {
                    // Check if user is authenticated
                    if (!window.Phoenix.Auth || !window.Phoenix.Auth.checkAuth()) {
                        reject(new Error('User not authenticated'));
                        return;
                    }
                    
                    // Get current user
                    const currentUser = window.Phoenix.Auth.currentUser;
                    
                    if (!currentUser) {
                        reject(new Error('User not found'));
                        return;
                    }
                    
                    // Create profile object
                    const profile = this.createProfileObject(formData);
                    
                    // Update user's profile
                    currentUser.profile = profile;
                    
                    // Update stored user
                    this.updateStoredUser(currentUser);
                    
                    // Update current user in Auth system
                    if (window.Phoenix.Auth) {
                        window.Phoenix.Auth.setCurrentUser(currentUser);
                    }
                    
                    // Set current profile
                    this.currentProfile = profile;
                    
                    // Send invitations if any
                    if (formData.social && formData.social.invitedFriends) {
                        this.sendInvitations(formData.social.invitedFriends);
                    }
                    
                    resolve(profile);
                } catch (error) {
                    console.error('Error saving profile data:', error);
                    reject(error);
                }
            });
        },
        
        /**
         * Create profile object from form data
         * @param {Object} formData - The form data
         * @returns {Object} - The profile object
         */
        createProfileObject: function(formData) {
            const basics = formData.basics || {};
            const confidence = formData.confidence || {};
            const goals = formData.goals || {};
            const social = formData.social || {};
            
            // Get confidence areas as array
            let confidenceAreas = [];
            if (confidence.confidenceAreas) {
                if (Array.isArray(confidence.confidenceAreas)) {
                    confidenceAreas = confidence.confidenceAreas;
                } else {
                    confidenceAreas = [confidence.confidenceAreas];
                }
            }
            
            // Create profile object
            const profile = {
                displayName: basics.displayName || '',
                bio: basics.bio || '',
                location: basics.location || '',
                gender: basics.gender || '',
                avatar: basics.avatar || null,
                confidenceLevel: confidence.confidenceLevel || 5,
                confidenceAreas: confidenceAreas,
                confidenceObstacles: confidence.confidenceObstacles || '',
                primaryGoal: goals.primaryGoal || '',
                specificGoal: goals.specificGoal || '',
                pace: goals.pace || 'moderate',
                timeCommitment: goals.timeCommitment || '15min',
                profileVisibility: social.profileVisibility === 'on',
                communityPreference: social.communityPreference || 'active',
                completionPercentage: 100,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            return profile;
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
         * Send invitations to friends
         * @param {Array} emails - Array of friend emails
         */
        sendInvitations: function(emails) {
            if (!emails || emails.length === 0) return;
            
            // Get current user
            const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
            
            if (!currentUser) return;
            
            // Create invitations
            const invitations = emails.map(email => ({
                id: `inv-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                email: email,
                senderId: currentUser.id,
                senderName: currentUser.profile ? currentUser.profile.displayName || currentUser.fullName : currentUser.fullName,
                status: 'pending',
                createdAt: new Date().toISOString()
            }));
            
            // Store invitations
            try {
                const storedInvitations = localStorage.getItem('phoenixInvitations');
                let allInvitations = storedInvitations ? JSON.parse(storedInvitations) : [];
                
                // Add new invitations
                allInvitations = [...allInvitations, ...invitations];
                
                // Save updated invitations
                localStorage.setItem('phoenixInvitations', JSON.stringify(allInvitations));
                
                // Update invitations array
                this.invitations = [...this.invitations, ...invitations];
                
                console.log(`Sent ${invitations.length} invitations`);
            } catch (error) {
                console.error('Error storing invitations:', error);
            }
        },
        
        /**
         * Load friends
         */
        loadFriends: function() {
            try {
                // Get current user
                const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
                
                if (!currentUser) return;
                
                // Get stored friendships
                const storedFriendships = localStorage.getItem('phoenixFriendships');
                const friendships = storedFriendships ? JSON.parse(storedFriendships) : [];
                
                // Filter friendships for current user
                const userFriendships = friendships.filter(friendship => 
                    friendship.status === 'accepted' && 
                    (friendship.userId1 === currentUser.id || friendship.userId2 === currentUser.id)
                );
                
                // Get friend IDs
                const friendIds = userFriendships.map(friendship => 
                    friendship.userId1 === currentUser.id ? friendship.userId2 : friendship.userId1
                );
                
                // Get stored users
                const storedUsers = localStorage.getItem('phoenixUsers');
                const users = storedUsers ? JSON.parse(storedUsers) : [];
                
                // Get friend users
                const friendUsers = users.filter(user => friendIds.includes(user.id));
                
                // Set friends array
                this.friends = friendUsers;
                
                console.log(`Loaded ${this.friends.length} friends`);
            } catch (error) {
                console.error('Error loading friends:', error);
            }
        },
        
        /**
         * Load invitations
         */
        loadInvitations: function() {
            try {
                // Get current user
                const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
                
                if (!currentUser) return;
                
                // Get stored invitations
                const storedInvitations = localStorage.getItem('phoenixInvitations');
                const allInvitations = storedInvitations ? JSON.parse(storedInvitations) : [];
                
                // Filter invitations for current user
                const userInvitations = allInvitations.filter(invitation => 
                    invitation.senderId === currentUser.id || 
                    invitation.email === currentUser.email
                );
                
                // Set invitations array
                this.invitations = userInvitations;
                
                console.log(`Loaded ${this.invitations.length} invitations`);
            } catch (error) {
                console.error('Error loading invitations:', error);
            }
        },
        
        /**
         * Add friend
         * @param {string} userId - ID of user to add as friend
         * @returns {Promise} - Promise that resolves when friend is added
         */
        addFriend: function(userId) {
            return new Promise((resolve, reject) => {
                try {
                    // Get current user
                    const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
                    
                    if (!currentUser) {
                        reject(new Error('User not authenticated'));
                        return;
                    }
                    
                    // Check if friendship already exists
                    const storedFriendships = localStorage.getItem('phoenixFriendships');
                    let friendships = storedFriendships ? JSON.parse(storedFriendships) : [];
                    
                    const existingFriendship = friendships.find(friendship => 
                        (friendship.userId1 === currentUser.id && friendship.userId2 === userId) ||
                        (friendship.userId1 === userId && friendship.userId2 === currentUser.id)
                    );
                    
                    if (existingFriendship) {
                        reject(new Error('Friendship already exists'));
                        return;
                    }
                    
                    // Create new friendship
                    const newFriendship = {
                        id: `fr-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                        userId1: currentUser.id,
                        userId2: userId,
                        status: 'pending',
                        createdAt: new Date().toISOString()
                    };
                    
                    // Add to friendships
                    friendships.push(newFriendship);
                    
                    // Save updated friendships
                    localStorage.setItem('phoenixFriendships', JSON.stringify(friendships));
                    
                    // Reload friends
                    this.loadFriends();
                    
                    resolve(newFriendship);
                } catch (error) {
                    console.error('Error adding friend:', error);
                    reject(error);
                }
            });
        },
        
        /**
         * Accept friend request
         * @param {string} friendshipId - ID of friendship to accept
         * @returns {Promise} - Promise that resolves when friend request is accepted
         */
        acceptFriendRequest: function(friendshipId) {
            return new Promise((resolve, reject) => {
                try {
                    // Get stored friendships
                    const storedFriendships = localStorage.getItem('phoenixFriendships');
                    let friendships = storedFriendships ? JSON.parse(storedFriendships) : [];
                    
                    // Find friendship
                    const friendshipIndex = friendships.findIndex(friendship => friendship.id === friendshipId);
                    
                    if (friendshipIndex === -1) {
                        reject(new Error('Friendship not found'));
                        return;
                    }
                    
                    // Update friendship status
                    friendships[friendshipIndex].status = 'accepted';
                    friendships[friendshipIndex].acceptedAt = new Date().toISOString();
                    
                    // Save updated friendships
                    localStorage.setItem('phoenixFriendships', JSON.stringify(friendships));
                    
                    // Reload friends
                    this.loadFriends();
                    
                    resolve(friendships[friendshipIndex]);
                } catch (error) {
                    console.error('Error accepting friend request:', error);
                    reject(error);
                }
            });
        },
        
        /**
         * Reject friend request
         * @param {string} friendshipId - ID of friendship to reject
         * @returns {Promise} - Promise that resolves when friend request is rejected
         */
        rejectFriendRequest: function(friendshipId) {
            return new Promise((resolve, reject) => {
                try {
                    // Get stored friendships
                    const storedFriendships = localStorage.getItem('phoenixFriendships');
                    let friendships = storedFriendships ? JSON.parse(storedFriendships) : [];
                    
                    // Find friendship
                    const friendshipIndex = friendships.findIndex(friendship => friendship.id === friendshipId);
                    
                    if (friendshipIndex === -1) {
                        reject(new Error('Friendship not found'));
                        return;
                    }
                    
                    // Update friendship status
                    friendships[friendshipIndex].status = 'rejected';
                    friendships[friendshipIndex].rejectedAt = new Date().toISOString();
                    
                    // Save updated friendships
                    localStorage.setItem('phoenixFriendships', JSON.stringify(friendships));
                    
                    // Reload friends
                    this.loadFriends();
                    
                    resolve(friendships[friendshipIndex]);
                } catch (error) {
                    console.error('Error rejecting friend request:', error);
                    reject(error);
                }
            });
        },
        
        /**
         * Remove friend
         * @param {string} userId - ID of user to remove as friend
         * @returns {Promise} - Promise that resolves when friend is removed
         */
        removeFriend: function(userId) {
            return new Promise((resolve, reject) => {
                try {
                    // Get current user
                    const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
                    
                    if (!currentUser) {
                        reject(new Error('User not authenticated'));
                        return;
                    }
                    
                    // Get stored friendships
                    const storedFriendships = localStorage.getItem('phoenixFriendships');
                    let friendships = storedFriendships ? JSON.parse(storedFriendships) : [];
                    
                    // Find friendship
                    const friendshipIndex = friendships.findIndex(friendship => 
                        friendship.status === 'accepted' && 
                        ((friendship.userId1 === currentUser.id && friendship.userId2 === userId) ||
                        (friendship.userId1 === userId && friendship.userId2 === currentUser.id))
                    );
                    
                    if (friendshipIndex === -1) {
                        reject(new Error('Friendship not found'));
                        return;
                    }
                    
                    // Remove friendship
                    const removedFriendship = friendships.splice(friendshipIndex, 1)[0];
                    
                    // Save updated friendships
                    localStorage.setItem('phoenixFriendships', JSON.stringify(friendships));
                    
                    // Reload friends
                    this.loadFriends();
                    
                    resolve(removedFriendship);
                } catch (error) {
                    console.error('Error removing friend:', error);
                    reject(error);
                }
            });
        },
        
        /**
         * Get friend suggestions
         * @param {number} limit - Maximum number of suggestions to return
         * @returns {Promise} - Promise that resolves with friend suggestions
         */
        getFriendSuggestions: function(limit = 5) {
            return new Promise((resolve, reject) => {
                try {
                    // Get current user
                    const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
                    
                    if (!currentUser) {
                        reject(new Error('User not authenticated'));
                        return;
                    }
                    
                    // Get stored users
                    const storedUsers = localStorage.getItem('phoenixUsers');
                    const users = storedUsers ? JSON.parse(storedUsers) : [];
                    
                    // Get current user's friends
                    const currentFriends = this.friends.map(friend => friend.id);
                    
                    // Filter users who are not friends and not the current user
                    const nonFriends = users.filter(user => 
                        user.id !== currentUser.id && 
                        !currentFriends.includes(user.id) &&
                        user.profile && 
                        user.profile.profileVisibility !== false
                    );
                    
                    // Sort by compatibility (in a real app, this would use more sophisticated matching)
                    const sortedSuggestions = nonFriends.sort((a, b) => {
                        // Simple random sorting for demo purposes
                        return Math.random() - 0.5;
                    });
                    
                    // Limit number of suggestions
                    const suggestions = sortedSuggestions.slice(0, limit);
                    
                    resolve(suggestions);
                } catch (error) {
                    console.error('Error getting friend suggestions:', error);
                    reject(error);
                }
            });
        },
        
        /**
         * Search users
         * @param {string} query - Search query
         * @returns {Promise} - Promise that resolves with search results
         */
        searchUsers: function(query) {
            return new Promise((resolve, reject) => {
                try {
                    if (!query || query.trim() === '') {
                        resolve([]);
                        return;
                    }
                    
                    // Get current user
                    const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
                    
                    if (!currentUser) {
                        reject(new Error('User not authenticated'));
                        return;
                    }
                    
                    // Get stored users
                    const storedUsers = localStorage.getItem('phoenixUsers');
                    const users = storedUsers ? JSON.parse(storedUsers) : [];
                    
                    // Filter users by query
                    const searchResults = users.filter(user => 
                        user.id !== currentUser.id && 
                        user.profile && 
                        user.profile.profileVisibility !== false &&
                        (
                            (user.profile.displayName && user.profile.displayName.toLowerCase().includes(query.toLowerCase())) ||
                            (user.fullName && user.fullName.toLowerCase().includes(query.toLowerCase())) ||
                            (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
                        )
                    );
                    
                    resolve(searchResults);
                } catch (error) {
                    console.error('Error searching users:', error);
                    reject(error);
                }
            });
        }
    };
}