/**
 * Phoenix God Creation Protocol - Dashboard System
 * 
 * This file implements the dashboard system for the Phoenix Confidence Companion App.
 * It provides user data visualization, activity tracking, and social features.
 * 
 * Created by Integrator Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Dashboard System Activated');
    initDashboardSystem();
});

/**
 * Initialize the dashboard system
 */
function initDashboardSystem() {
    // Create global dashboard namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Dashboard = createDashboardSystem();
}

/**
 * Create the dashboard system
 */
function createDashboardSystem() {
    return {
        // Dashboard state
        userData: null,
        challenges: [],
        activities: [],
        insights: [],
        friendRequests: [],
        suggestedFriends: [],
        groupChallenges: [],
        
        /**
         * Initialize the dashboard
         */
        init: function() {
            console.log('Initializing dashboard');
            
            // Check if user is authenticated
            if (window.Phoenix.Auth && window.Phoenix.Auth.checkAuth()) {
                // Get current user
                const currentUser = window.Phoenix.Auth.currentUser;
                
                if (currentUser) {
                    // Load user data
                    this.loadUserData(currentUser);
                    
                    // Update UI with user data
                    this.updateDashboardUI();
                    
                    // Load social data
                    this.loadSocialData();
                    
                    // Check trial status
                    this.checkTrialStatus();
                    
                    // Start data refresh interval
                    this.startDataRefresh();
                }
            } else {
                // Redirect to login if not authenticated
                window.location.href = 'login.html';
            }
            
            return this;
        },
        
        /**
         * Load user data
         * @param {Object} user - User object
         */
        loadUserData: function(user) {
            this.userData = user;
            
            // Load challenges
            this.loadChallenges();
            
            // Load activities
            this.loadActivities();
            
            // Generate insights
            this.generateInsights();
        },
        
        /**
         * Update dashboard UI with user data
         */
        updateDashboardUI: function() {
            if (!this.userData) return;
            
            // Update user name
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(element => {
                element.textContent = this.userData.profile?.displayName || this.userData.fullName || 'User';
            });
            
            // Update user avatar
            const userAvatarElements = document.querySelectorAll('.user-avatar img');
            userAvatarElements.forEach(element => {
                if (this.userData.profile?.avatar) {
                    element.src = this.userData.profile.avatar;
                }
            });
            
            // Update subscription badge
            this.updateSubscriptionBadge();
            
            // Update confidence score
            this.updateConfidenceScore();
            
            // Update streak
            this.updateStreak();
            
            // Update daily challenge
            this.updateDailyChallenge();
            
            // Update upcoming challenges
            this.updateUpcomingChallenges();
            
            // Update insights
            this.updateInsights();
            
            // Update friend activity
            this.updateFriendActivity();
        },
        
        /**
         * Update subscription badge
         */
        updateSubscriptionBadge: function() {
            const subscriptionBadge = document.querySelector('.subscription-badge');
            
            if (subscriptionBadge && this.userData.subscription) {
                const subscription = this.userData.subscription;
                
                // Update badge based on subscription plan
                if (subscription.plan === 'trial') {
                    subscriptionBadge.className = 'subscription-badge trial';
                    
                    // Calculate days left in trial
                    const daysLeft = this.calculateDaysLeftInTrial(subscription);
                    
                    // Update badge content
                    subscriptionBadge.innerHTML = `
                        <i class="fas fa-star"></i>
                        <span>Free Trial</span>
                        <span class="days-left">${daysLeft} days left</span>
                    `;
                } else if (subscription.plan === 'basic') {
                    subscriptionBadge.className = 'subscription-badge basic';
                    subscriptionBadge.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>Basic Plan</span>
                    `;
                } else if (subscription.plan === 'premium') {
                    subscriptionBadge.className = 'subscription-badge premium';
                    subscriptionBadge.innerHTML = `
                        <i class="fas fa-crown"></i>
                        <span>Premium Plan</span>
                    `;
                } else if (subscription.plan === 'annual') {
                    subscriptionBadge.className = 'subscription-badge annual';
                    subscriptionBadge.innerHTML = `
                        <i class="fas fa-gem"></i>
                        <span>Annual Plan</span>
                    `;
                }
            }
        },
        
        /**
         * Calculate days left in trial
         * @param {Object} subscription - User's subscription
         * @returns {number} - Days left in trial
         */
        calculateDaysLeftInTrial: function(subscription) {
            if (!subscription || subscription.plan !== 'trial' || !subscription.endDate) {
                return 0;
            }
            
            const endDate = new Date(subscription.endDate);
            const now = new Date();
            const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
            
            return Math.max(0, daysLeft);
        },
        
        /**
         * Update confidence score
         */
        updateConfidenceScore: function() {
            // Get confidence score elements
            const scoreText = document.querySelector('.score-text');
            const scoreCircleFill = document.querySelector('.score-circle-fill');
            const scoreStatus = document.querySelector('.score-status');
            const scoreChange = document.querySelector('.score-change');
            
            if (scoreText && scoreCircleFill && this.userData.profile) {
                // Get confidence score
                const confidenceScore = this.userData.profile.confidenceScore || 65;
                
                // Update score text
                scoreText.textContent = confidenceScore;
                
                // Update circle fill
                scoreCircleFill.setAttribute('stroke-dasharray', `${confidenceScore}, 100`);
                
                // Update score status
                if (scoreStatus) {
                    if (confidenceScore < 40) {
                        scoreStatus.textContent = 'Building foundations';
                    } else if (confidenceScore < 60) {
                        scoreStatus.textContent = 'Making progress';
                    } else if (confidenceScore < 80) {
                        scoreStatus.textContent = 'Growing steadily';
                    } else {
                        scoreStatus.textContent = 'Thriving';
                    }
                }
                
                // Update score change
                if (scoreChange) {
                    // In a real app, this would be calculated from historical data
                    const weeklyChange = 5;
                    
                    if (weeklyChange > 0) {
                        scoreChange.className = 'score-change positive';
                        scoreChange.innerHTML = `
                            <i class="fas fa-arrow-up"></i>
                            <span>${weeklyChange} points this week</span>
                        `;
                    } else if (weeklyChange < 0) {
                        scoreChange.className = 'score-change negative';
                        scoreChange.innerHTML = `
                            <i class="fas fa-arrow-down"></i>
                            <span>${Math.abs(weeklyChange)} points this week</span>
                        `;
                    } else {
                        scoreChange.className = 'score-change neutral';
                        scoreChange.innerHTML = `
                            <i class="fas fa-minus"></i>
                            <span>No change this week</span>
                        `;
                    }
                }
            }
        },
        
        /**
         * Update streak
         */
        updateStreak: function() {
            // Get streak elements
            const streakValue = document.querySelector('.streak-value');
            const streakMessage = document.querySelector('.streak-message p');
            
            if (streakValue) {
                // In a real app, this would be fetched from the user's data
                const streak = 12;
                
                // Update streak value
                streakValue.textContent = streak;
                
                // Update streak message
                if (streakMessage) {
                    if (streak < 3) {
                        streakMessage.textContent = 'You\'re just getting started! Complete daily challenges to build your streak.';
                    } else if (streak < 7) {
                        streakMessage.textContent = 'Great start! Keep going to build a solid confidence habit.';
                    } else if (streak < 14) {
                        streakMessage.textContent = 'You\'re on a roll! Keep up the momentum to build lasting confidence.';
                    } else if (streak < 30) {
                        streakMessage.textContent = 'Impressive streak! Your consistency is building strong confidence foundations.';
                    } else {
                        streakMessage.textContent = 'Amazing! Your dedication is transforming your confidence. Keep going!';
                    }
                }
            }
        },
        
        /**
         * Update daily challenge
         */
        updateDailyChallenge: function() {
            // Get daily challenge elements
            const challengeTag = document.querySelector('.challenge-tag');
            const challengeTitle = document.querySelector('.challenge-title');
            const challengeDescription = document.querySelector('.challenge-description');
            const difficultyDots = document.querySelectorAll('.difficulty-dot');
            
            // In a real app, this would be fetched from the challenges API
            const dailyChallenge = {
                category: 'Communication',
                title: 'Speak Up in a Meeting',
                description: 'Today, make a point to speak up in a meeting or group conversation. Share your perspective on a topic, even if it feels uncomfortable.',
                difficulty: 2 // 1-5 scale
            };
            
            // Update challenge tag
            if (challengeTag) {
                challengeTag.textContent = dailyChallenge.category;
            }
            
            // Update challenge title
            if (challengeTitle) {
                challengeTitle.textContent = dailyChallenge.title;
            }
            
            // Update challenge description
            if (challengeDescription) {
                challengeDescription.textContent = dailyChallenge.description;
            }
            
            // Update difficulty dots
            if (difficultyDots.length > 0) {
                difficultyDots.forEach((dot, index) => {
                    if (index < dailyChallenge.difficulty) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        },
        
        /**
         * Update upcoming challenges
         */
        updateUpcomingChallenges: function() {
            // In a real app, this would be fetched from the challenges API
            const upcomingChallenges = [
                {
                    name: 'Start a Conversation',
                    schedule: 'Tomorrow',
                    category: 'communication',
                    icon: 'comments'
                },
                {
                    name: 'Ask for Feedback',
                    schedule: 'In 2 days',
                    category: 'professional',
                    icon: 'briefcase'
                },
                {
                    name: 'Group Challenge: Public Speaking',
                    schedule: 'In 3 days',
                    category: 'group',
                    icon: 'users'
                }
            ];
            
            // Get upcoming challenges list
            const upcomingList = document.querySelector('.upcoming-list');
            
            if (upcomingList && upcomingChallenges.length > 0) {
                // Clear existing challenges
                upcomingList.innerHTML = '';
                
                // Add upcoming challenges
                upcomingChallenges.forEach(challenge => {
                    const challengeElement = document.createElement('div');
                    challengeElement.className = 'upcoming-challenge';
                    challengeElement.innerHTML = `
                        <div class="challenge-icon">
                            <i class="fas fa-${challenge.icon}"></i>
                        </div>
                        <div class="challenge-info">
                            <div class="challenge-name">${challenge.name}</div>
                            <div class="challenge-schedule">${challenge.schedule}</div>
                        </div>
                        <div class="challenge-category ${challenge.category}">
                            <span>${challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}</span>
                        </div>
                    `;
                    
                    upcomingList.appendChild(challengeElement);
                });
            }
        },
        
        /**
         * Update insights
         */
        updateInsights: function() {
            // In a real app, this would be generated from user data analysis
            const insights = [
                {
                    icon: 'lightbulb',
                    text: 'Your confidence grows most in <strong>social situations</strong>. Consider focusing on more group activities to accelerate your growth.'
                },
                {
                    icon: 'chart-line',
                    text: 'Your resilience after setbacks has improved by <strong>27%</strong> this month. Keep practicing the recovery techniques!'
                },
                {
                    icon: 'star',
                    text: 'You\'ve completed <strong>8 challenges</strong> this week, your best record so far!'
                }
            ];
            
            // Get insights content
            const insightsContent = document.querySelector('.insights-content');
            
            if (insightsContent && insights.length > 0) {
                // Clear existing insights
                insightsContent.innerHTML = '';
                
                // Add insights
                insights.forEach(insight => {
                    const insightElement = document.createElement('div');
                    insightElement.className = 'insight-item';
                    insightElement.innerHTML = `
                        <div class="insight-icon">
                            <i class="fas fa-${insight.icon}"></i>
                        </div>
                        <div class="insight-text">
                            <p>${insight.text}</p>
                        </div>
                    `;
                    
                    insightsContent.appendChild(insightElement);
                });
            }
        },
        
        /**
         * Update friend activity
         */
        updateFriendActivity: function() {
            // In a real app, this would be fetched from the social API
            const friendActivities = [
                {
                    name: 'Michael',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    action: 'completed a challenge',
                    details: '"Speak to a Stranger" challenge',
                    time: '2 hours ago'
                },
                {
                    name: 'Sarah',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    action: 'reached a new milestone',
                    details: '30-day streak!',
                    time: 'Yesterday'
                },
                {
                    name: 'David',
                    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
                    action: 'increased his confidence score',
                    details: '+8 points this week',
                    time: '2 days ago'
                }
            ];
            
            // Get friends list
            const friendsList = document.querySelector('.friends-list');
            
            if (friendsList && friendActivities.length > 0) {
                // Clear existing activities
                friendsList.innerHTML = '';
                
                // Add friend activities
                friendActivities.forEach(activity => {
                    const activityElement = document.createElement('div');
                    activityElement.className = 'friend-activity';
                    activityElement.innerHTML = `
                        <div class="friend-avatar">
                            <img src="${activity.avatar}" alt="${activity.name}">
                        </div>
                        <div class="friend-details">
                            <div class="friend-name">${activity.name} ${activity.action}</div>
                            <div class="friend-action">${activity.details}</div>
                            <div class="friend-time">${activity.time}</div>
                        </div>
                    `;
                    
                    friendsList.appendChild(activityElement);
                });
            }
        },
        
        /**
         * Load challenges
         */
        loadChallenges: function() {
            // In a real app, this would be fetched from the challenges API
            this.challenges = [
                {
                    id: 'c1',
                    category: 'Communication',
                    title: 'Speak Up in a Meeting',
                    description: 'Today, make a point to speak up in a meeting or group conversation. Share your perspective on a topic, even if it feels uncomfortable.',
                    difficulty: 2,
                    status: 'active',
                    dueDate: new Date().toISOString()
                },
                {
                    id: 'c2',
                    category: 'Communication',
                    title: 'Start a Conversation',
                    description: 'Initiate a conversation with someone new or someone you don\'t talk to often.',
                    difficulty: 1,
                    status: 'upcoming',
                    dueDate: this.addDays(new Date(), 1).toISOString()
                },
                {
                    id: 'c3',
                    category: 'Professional',
                    title: 'Ask for Feedback',
                    description: 'Request specific feedback on your work from a colleague or supervisor.',
                    difficulty: 3,
                    status: 'upcoming',
                    dueDate: this.addDays(new Date(), 2).toISOString()
                },
                {
                    id: 'c4',
                    category: 'Social',
                    title: 'Group Challenge: Public Speaking',
                    description: 'Participate in the group public speaking exercise.',
                    difficulty: 4,
                    status: 'upcoming',
                    dueDate: this.addDays(new Date(), 3).toISOString()
                }
            ];
        },
        
        /**
         * Load activities
         */
        loadActivities: function() {
            // In a real app, this would be fetched from the activities API
            this.activities = [
                {
                    id: 'a1',
                    type: 'challenge_completed',
                    challengeId: 'c5',
                    challengeTitle: 'Give a Compliment',
                    timestamp: this.addDays(new Date(), -1).toISOString()
                },
                {
                    id: 'a2',
                    type: 'streak_milestone',
                    milestone: 10,
                    timestamp: this.addDays(new Date(), -2).toISOString()
                },
                {
                    id: 'a3',
                    type: 'confidence_increase',
                    amount: 5,
                    timestamp: this.addDays(new Date(), -3).toISOString()
                }
            ];
        },
        
        /**
         * Generate insights
         */
        generateInsights: function() {
            // In a real app, this would be generated from user data analysis
            this.insights = [
                {
                    id: 'i1',
                    type: 'strength',
                    area: 'social',
                    text: 'Your confidence grows most in social situations. Consider focusing on more group activities to accelerate your growth.'
                },
                {
                    id: 'i2',
                    type: 'improvement',
                    area: 'resilience',
                    text: 'Your resilience after setbacks has improved by 27% this month. Keep practicing the recovery techniques!'
                },
                {
                    id: 'i3',
                    type: 'achievement',
                    area: 'challenges',
                    text: 'You\'ve completed 8 challenges this week, your best record so far!'
                }
            ];
        },
        
        /**
         * Load social data
         */
        loadSocialData: function() {
            // Load friend requests
            this.loadFriendRequests();
            
            // Load suggested friends
            this.loadSuggestedFriends();
            
            // Load group challenges
            this.loadGroupChallenges();
            
            // Update social UI
            this.updateSocialUI();
        },
        
        /**
         * Load friend requests
         */
        loadFriendRequests: function() {
            // In a real app, this would be fetched from the social API
            this.friendRequests = [
                {
                    id: 'fr1',
                    userId: 'u1',
                    name: 'Emma Wilson',
                    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
                    mutualFriends: 3,
                    timestamp: this.addDays(new Date(), -1).toISOString()
                },
                {
                    id: 'fr2',
                    userId: 'u2',
                    name: 'Robert Johnson',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                    mutualFriends: 1,
                    timestamp: this.addDays(new Date(), -2).toISOString()
                }
            ];
        },
        
        /**
         * Load suggested friends
         */
        loadSuggestedFriends: function() {
            // In a real app, this would be fetched from the social API
            this.suggestedFriends = [
                {
                    id: 'u3',
                    name: 'Jessica Parker',
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    reason: 'Similar confidence goals'
                },
                {
                    id: 'u4',
                    name: 'Thomas Anderson',
                    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                    reason: '2 mutual friends'
                },
                {
                    id: 'u5',
                    name: 'Olivia Martinez',
                    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
                    reason: 'Similar confidence goals'
                }
            ];
        },
        
        /**
         * Load group challenges
         */
        loadGroupChallenges: function() {
            // In a real app, this would be fetched from the challenges API
            this.groupChallenges = [
                {
                    id: 'gc1',
                    title: 'Public Speaking Workshop',
                    participants: 8,
                    progress: 3,
                    total: 5,
                    nextSession: this.addDays(new Date(), 2).toISOString()
                },
                {
                    id: 'gc2',
                    title: 'Networking Challenge',
                    participants: 12,
                    progress: 1,
                    total: 5,
                    nextSession: this.addDays(new Date(), 1).toISOString()
                }
            ];
        },
        
        /**
         * Update social UI
         */
        updateSocialUI: function() {
            // Update friend requests
            this.updateFriendRequests();
            
            // Update suggested friends
            this.updateSuggestedFriends();
            
            // Update group challenges
            this.updateGroupChallenges();
        },
        
        /**
         * Update friend requests
         */
        updateFriendRequests: function() {
            // Get friend requests container
            const friendRequestsContainer = document.querySelector('.friend-requests');
            
            if (friendRequestsContainer && this.friendRequests.length > 0) {
                // Clear existing requests
                friendRequestsContainer.innerHTML = '';
                
                // Add friend requests
                this.friendRequests.forEach(request => {
                    const requestElement = document.createElement('div');
                    requestElement.className = 'friend-request';
                    requestElement.innerHTML = `
                        <div class="request-avatar">
                            <img src="${request.avatar}" alt="${request.name}">
                        </div>
                        <div class="request-details">
                            <div class="request-name">${request.name}</div>
                            <div class="request-mutual">${request.mutualFriends} mutual friend${request.mutualFriends !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="request-actions">
                            <button class="btn btn-small btn-primary" data-request-id="${request.id}" data-action="accept">Accept</button>
                            <button class="btn btn-small btn-text" data-request-id="${request.id}" data-action="decline">Decline</button>
                        </div>
                    `;
                    
                    friendRequestsContainer.appendChild(requestElement);
                });
                
                // Add event listeners to buttons
                const acceptButtons = friendRequestsContainer.querySelectorAll('[data-action="accept"]');
                const declineButtons = friendRequestsContainer.querySelectorAll('[data-action="decline"]');
                
                acceptButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const requestId = button.getAttribute('data-request-id');
                        this.acceptFriendRequest(requestId);
                    });
                });
                
                declineButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const requestId = button.getAttribute('data-request-id');
                        this.declineFriendRequest(requestId);
                    });
                });
            }
        },
        
        /**
         * Update suggested friends
         */
        updateSuggestedFriends: function() {
            // Get suggested friends container
            const suggestedFriendsContainer = document.querySelector('.suggested-friends');
            
            if (suggestedFriendsContainer && this.suggestedFriends.length > 0) {
                // Clear existing suggestions
                suggestedFriendsContainer.innerHTML = '';
                
                // Add suggested friends
                this.suggestedFriends.forEach(friend => {
                    const friendElement = document.createElement('div');
                    friendElement.className = 'suggested-friend';
                    friendElement.innerHTML = `
                        <div class="suggested-avatar">
                            <img src="${friend.avatar}" alt="${friend.name}">
                        </div>
                        <div class="suggested-details">
                            <div class="suggested-name">${friend.name}</div>
                            <div class="suggested-info">${friend.reason}</div>
                        </div>
                        <button class="btn btn-small btn-secondary" data-user-id="${friend.id}">
                            <i class="fas fa-user-plus"></i>
                        </button>
                    `;
                    
                    suggestedFriendsContainer.appendChild(friendElement);
                });
                
                // Add event listeners to buttons
                const addButtons = suggestedFriendsContainer.querySelectorAll('.btn-secondary');
                
                addButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const userId = button.getAttribute('data-user-id');
                        this.addFriend(userId);
                    });
                });
            }
        },
        
        /**
         * Update group challenges
         */
        updateGroupChallenges: function() {
            // Get group challenges container
            const groupChallengesContainer = document.querySelector('.group-challenges');
            
            if (groupChallengesContainer && this.groupChallenges.length > 0) {
                // Clear existing challenges
                groupChallengesContainer.innerHTML = '';
                
                // Add group challenges
                this.groupChallenges.forEach(challenge => {
                    const challengeElement = document.createElement('div');
                    challengeElement.className = 'group-challenge';
                    challengeElement.innerHTML = `
                        <div class="group-challenge-header">
                            <div class="group-challenge-title">${challenge.title}</div>
                            <div class="group-challenge-participants">${challenge.participants} participants</div>
                        </div>
                        <div class="group-challenge-progress">
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${(challenge.progress / challenge.total) * 100}%"></div>
                            </div>
                            <div class="progress-text">${challenge.progress}/${challenge.total} ${challenge.progress === 1 ? 'session' : 'sessions'} completed</div>
                        </div>
                        <button class="btn btn-small btn-secondary btn-block" data-challenge-id="${challenge.id}">
                            ${challenge.progress === 0 ? 'Join Challenge' : 'Continue Challenge'}
                        </button>
                    `;
                    
                    groupChallengesContainer.appendChild(challengeElement);
                });
                
                // Add event listeners to buttons
                const challengeButtons = groupChallengesContainer.querySelectorAll('.btn-secondary');
                
                challengeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const challengeId = button.getAttribute('data-challenge-id');
                        this.joinGroupChallenge(challengeId);
                    });
                });
            }
        },
        
        /**
         * Accept friend request
         * @param {string} requestId - ID of the friend request
         */
        acceptFriendRequest: function(requestId) {
            console.log(`Accepting friend request: ${requestId}`);
            
            // In a real app, this would call the social API
            
            // Find the request
            const requestIndex = this.friendRequests.findIndex(request => request.id === requestId);
            
            if (requestIndex !== -1) {
                // Remove the request from the list
                const request = this.friendRequests.splice(requestIndex, 1)[0];
                
                // Show success message
                this.showNotification('success', `You are now friends with ${request.name}`);
                
                // Update UI
                this.updateFriendRequests();
            }
        },
        
        /**
         * Decline friend request
         * @param {string} requestId - ID of the friend request
         */
        declineFriendRequest: function(requestId) {
            console.log(`Declining friend request: ${requestId}`);
            
            // In a real app, this would call the social API
            
            // Find the request
            const requestIndex = this.friendRequests.findIndex(request => request.id === requestId);
            
            if (requestIndex !== -1) {
                // Remove the request from the list
                this.friendRequests.splice(requestIndex, 1);
                
                // Update UI
                this.updateFriendRequests();
            }
        },
        
        /**
         * Add friend
         * @param {string} userId - ID of the user to add as friend
         */
        addFriend: function(userId) {
            console.log(`Adding friend: ${userId}`);
            
            // In a real app, this would call the social API
            
            // Find the user
            const userIndex = this.suggestedFriends.findIndex(friend => friend.id === userId);
            
            if (userIndex !== -1) {
                // Get the user
                const user = this.suggestedFriends[userIndex];
                
                // Remove the user from suggested friends
                this.suggestedFriends.splice(userIndex, 1);
                
                // Show success message
                this.showNotification('success', `Friend request sent to ${user.name}`);
                
                // Update UI
                this.updateSuggestedFriends();
            }
        },
        
        /**
         * Join group challenge
         * @param {string} challengeId - ID of the group challenge
         */
        joinGroupChallenge: function(challengeId) {
            console.log(`Joining group challenge: ${challengeId}`);
            
            // In a real app, this would call the challenges API
            
            // Find the challenge
            const challenge = this.groupChallenges.find(challenge => challenge.id === challengeId);
            
            if (challenge) {
                // Show success message
                this.showNotification('success', `You've joined the ${challenge.title} challenge`);
                
                // In a real app, this would redirect to the challenge page
                // For now, just log it
                console.log(`Redirecting to challenge: ${challengeId}`);
            }
        },
        
        /**
         * Show notification
         * @param {string} type - Notification type (success, error, info)
         * @param {string} message - Notification message
         */
        showNotification: function(type, message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `phoenix-notification ${type}`;
            
            // Set notification content
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                </div>
                <div class="notification-message">${message}</div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Add notification to document
            document.body.appendChild(notification);
            
            // Show notification with animation
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Add close button event listener
            const closeButton = notification.querySelector('.notification-close');
            closeButton.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
            
            // Auto-hide notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        },
        
        /**
         * Check trial status
         */
        checkTrialStatus: function() {
            // Check if user is on trial
            if (this.userData.subscription && this.userData.subscription.plan === 'trial') {
                // Check if trial is expired
                const daysLeft = this.calculateDaysLeftInTrial(this.userData.subscription);
                
                if (daysLeft <= 0) {
                    // Trial expired
                    this.showTrialExpiredNotification();
                } else if (daysLeft <= 2) {
                    // Trial ending soon
                    this.showTrialEndingSoonNotification(daysLeft);
                }
            }
        },
        
        /**
         * Show trial expired notification
         */
        showTrialExpiredNotification: function() {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'phoenix-modal';
            
            // Set notification content
            notification.innerHTML = `
                <div class="phoenix-modal-content">
                    <div class="modal-icon">
                        <i class="fas fa-hourglass-end"></i>
                    </div>
                    <h2>Your Free Trial Has Ended</h2>
                    <p>Your 7-day free trial has expired. Upgrade to a paid plan to continue enjoying premium features.</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary" id="upgradeButton">Upgrade Now</button>
                        <button class="btn btn-secondary" id="closeModalButton">Maybe Later</button>
                    </div>
                </div>
            `;
            
            // Add notification to document
            document.body.appendChild(notification);
            
            // Show notification with animation
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Add button event listeners
            const upgradeButton = notification.querySelector('#upgradeButton');
            const closeButton = notification.querySelector('#closeModalButton');
            
            upgradeButton.addEventListener('click', () => {
                // Redirect to subscription page
                window.location.href = 'subscription.html';
            });
            
            closeButton.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        },
        
        /**
         * Show trial ending soon notification
         * @param {number} daysLeft - Days left in trial
         */
        showTrialEndingSoonNotification: function(daysLeft) {
            // Show notification
            this.showNotification('info', `Your free trial ends in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}. <a href="subscription.html" class="notification-link">Upgrade now</a>`);
        },
        
        /**
         * Start data refresh interval
         */
        startDataRefresh: function() {
            // Refresh data every 5 minutes
            setInterval(() => {
                // In a real app, this would fetch fresh data from the API
                console.log('Refreshing dashboard data');
                
                // For demo purposes, just update the UI
                this.updateDashboardUI();
            }, 5 * 60 * 1000); // 5 minutes
        },
        
        /**
         * Add days to date
         * @param {Date} date - Date to add days to
         * @param {number} days - Number of days to add
         * @returns {Date} - New date
         */
        addDays: function(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
    };
}