/**
 * Phoenix God Creation Protocol - Community System
 * 
 * This file implements the community system for the Phoenix Confidence Companion App.
 * It provides social features, post management, and friend connections.
 * 
 * Created by Integrator Operative
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Community System Activated');
    initCommunitySystem();
});

/**
 * Initialize the community system
 */
function initCommunitySystem() {
    // Create global community namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Community = createCommunitySystem();
}

/**
 * Create the community system
 */
function createCommunitySystem() {
    return {
        // Community state
        posts: [],
        friends: [],
        groups: [],
        friendRequests: [],
        suggestedFriends: [],
        suggestedGroups: [],
        trendingTopics: [],
        
        /**
         * Initialize the community system
         */
        init: function() {
            console.log('Initializing community system');
            
            // Check if user is authenticated
            if (window.Phoenix.Auth && window.Phoenix.Auth.checkAuth()) {
                // Get current user
                const currentUser = window.Phoenix.Auth.currentUser;
                
                if (currentUser) {
                    // Load community data
                    this.loadCommunityData();
                    
                    // Initialize post composer
                    this.initPostComposer();
                    
                    // Initialize post interactions
                    this.initPostInteractions();
                    
                    // Initialize friend interactions
                    this.initFriendInteractions();
                    
                    // Initialize group interactions
                    this.initGroupInteractions();
                }
            } else {
                // Redirect to login if not authenticated
                window.location.href = 'login.html';
            }
            
            return this;
        },
        
        /**
         * Load community data
         */
        loadCommunityData: function() {
            // Load posts
            this.loadPosts();
            
            // Load friends
            this.loadFriends();
            
            // Load groups
            this.loadGroups();
            
            // Load friend requests
            this.loadFriendRequests();
            
            // Load suggested friends
            this.loadSuggestedFriends();
            
            // Load suggested groups
            this.loadSuggestedGroups();
            
            // Load trending topics
            this.loadTrendingTopics();
        },
        
        /**
         * Load posts
         */
        loadPosts: function() {
            // In a real app, this would fetch posts from the API
            // For now, we'll use mock data
            this.posts = [
                {
                    id: 'p1',
                    userId: 'u1',
                    userName: 'Michael Johnson',
                    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    content: 'Just completed the "Speak to a Stranger" challenge! It was nerve-wracking at first, but I ended up having a great conversation about hiking trails in the area. Small steps lead to big confidence gains! 💪',
                    type: 'achievement',
                    achievement: {
                        type: 'challenge',
                        name: 'Speak to a Stranger'
                    },
                    reactions: [
                        { type: '👏', count: 8 },
                        { type: '❤️', count: 4 }
                    ],
                    comments: [
                        {
                            id: 'c1',
                            userId: 'u2',
                            userName: 'Sarah Williams',
                            userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                            content: 'That\'s awesome! I\'m still working up the courage to do this challenge. Any tips?',
                            timestamp: this.addHours(new Date(), -1).toISOString()
                        },
                        {
                            id: 'c2',
                            userId: 'u1',
                            userName: 'Michael Johnson',
                            userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                            content: 'Thanks Sarah! My tip is to start with a simple question about something around you, like asking about a book someone\'s reading or commenting on the weather. It\'s less pressure than trying to start a full conversation right away.',
                            timestamp: this.addMinutes(new Date(), -45).toISOString()
                        }
                    ],
                    timestamp: this.addHours(new Date(), -2).toISOString()
                },
                {
                    id: 'p2',
                    userId: 'u2',
                    userName: 'Sarah Williams',
                    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    content: '30 days of consistent confidence building! 🎉 I never thought I\'d make it this far when I started. The daily challenges have become part of my routine now, and I\'m noticing real changes in how I handle social situations. Thank you to everyone in this community for the support!',
                    type: 'milestone',
                    milestone: {
                        type: 'streak',
                        value: 30
                    },
                    reactions: [
                        { type: '👏', count: 12 },
                        { type: '🎉', count: 8 },
                        { type: '❤️', count: 4 }
                    ],
                    comments: [
                        {
                            id: 'c3',
                            userId: 'u1',
                            userName: 'Michael Johnson',
                            userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                            content: 'Congratulations Sarah! That\'s a huge achievement. What challenge has been your favorite so far?',
                            timestamp: this.addHours(new Date(), -20).toISOString()
                        },
                        {
                            id: 'c4',
                            userId: 'u3',
                            userName: 'David Chen',
                            userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
                            content: 'Amazing work! 30 days is impressive dedication.',
                            timestamp: this.addHours(new Date(), -18).toISOString()
                        }
                    ],
                    timestamp: this.addDays(new Date(), -1).toISOString()
                },
                {
                    id: 'p3',
                    userId: 'u3',
                    userName: 'David Chen',
                    userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
                    content: 'I\'ve been tracking my confidence score for the past month, and I\'m excited to see an 8-point improvement! The public speaking challenges were the most difficult for me, but they made the biggest difference. Looking forward to continuing this journey!',
                    type: 'progress',
                    progress: {
                        type: 'confidence',
                        startValue: 65,
                        currentValue: 73,
                        change: 8,
                        period: '30 days'
                    },
                    reactions: [
                        { type: '👏', count: 10 },
                        { type: '🚀', count: 8 }
                    ],
                    comments: [
                        {
                            id: 'c5',
                            userId: 'u2',
                            userName: 'Sarah Williams',
                            userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                            content: 'That\'s fantastic progress, David! Public speaking is one of the hardest challenges for me too.',
                            timestamp: this.addDays(new Date(), -1).toISOString()
                        }
                    ],
                    timestamp: this.addDays(new Date(), -2).toISOString()
                }
            ];
        },
        
        /**
         * Load friends
         */
        loadFriends: function() {
            // In a real app, this would fetch friends from the API
            // For now, we'll use mock data
            this.friends = [
                {
                    id: 'u1',
                    name: 'Michael Johnson',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    mutualChallenges: 12
                },
                {
                    id: 'u2',
                    name: 'Sarah Williams',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    mutualChallenges: 8
                },
                {
                    id: 'u3',
                    name: 'David Chen',
                    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
                    mutualChallenges: 5
                },
                {
                    id: 'u4',
                    name: 'Emma Wilson',
                    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
                    mutualChallenges: 3
                },
                {
                    id: 'u5',
                    name: 'Robert Johnson',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                    mutualChallenges: 1
                }
            ];
        },
        
        /**
         * Load groups
         */
        loadGroups: function() {
            // In a real app, this would fetch groups from the API
            // For now, we'll use mock data
            this.groups = [
                {
                    id: 'g1',
                    name: 'Public Speaking Masters',
                    description: 'Overcome your fear of public speaking through practice and support.',
                    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    members: [
                        { id: 'u1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                        { id: 'u2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                        { id: 'u3', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
                        { id: 'u6', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
                        { id: 'u7', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
                        { id: 'u8', avatar: 'https://randomuser.me/api/portraits/women/56.jpg' },
                        { id: 'u9', avatar: 'https://randomuser.me/api/portraits/men/78.jpg' },
                        { id: 'u10', avatar: 'https://randomuser.me/api/portraits/women/89.jpg' }
                    ],
                    memberCount: 8,
                    activityLevel: 'Active'
                },
                {
                    id: 'g2',
                    name: 'Networking Ninjas',
                    description: 'Master the art of networking and building professional relationships.',
                    coverImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    members: [
                        { id: 'u2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                        { id: 'u3', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
                        { id: 'u4', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
                        { id: 'u11', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
                        { id: 'u12', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
                        { id: 'u13', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
                        { id: 'u14', avatar: 'https://randomuser.me/api/portraits/women/77.jpg' },
                        { id: 'u15', avatar: 'https://randomuser.me/api/portraits/men/88.jpg' },
                        { id: 'u16', avatar: 'https://randomuser.me/api/portraits/women/99.jpg' },
                        { id: 'u17', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
                        { id: 'u18', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
                        { id: 'u19', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' }
                    ],
                    memberCount: 12,
                    activityLevel: 'Very Active'
                },
                {
                    id: 'g3',
                    name: 'Social Confidence Builders',
                    description: 'Overcome social anxiety and build confidence in social settings.',
                    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    members: [
                        { id: 'u1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                        { id: 'u4', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
                        { id: 'u5', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
                        { id: 'u20', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
                        { id: 'u21', avatar: 'https://randomuser.me/api/portraits/men/56.jpg' }
                    ],
                    memberCount: 5,
                    activityLevel: 'Moderate'
                }
            ];
        },
        
        /**
         * Load friend requests
         */
        loadFriendRequests: function() {
            // In a real app, this would fetch friend requests from the API
            // For now, we'll use mock data
            this.friendRequests = [
                {
                    id: 'fr1',
                    userId: 'u6',
                    name: 'Jessica Parker',
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    reason: 'Similar confidence goals',
                    timestamp: this.addDays(new Date(), -1).toISOString()
                },
                {
                    id: 'fr2',
                    userId: 'u7',
                    name: 'Thomas Anderson',
                    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                    reason: '2 mutual friends',
                    timestamp: this.addDays(new Date(), -2).toISOString()
                }
            ];
        },
        
        /**
         * Load suggested friends
         */
        loadSuggestedFriends: function() {
            // In a real app, this would fetch suggested friends from the API
            // For now, we'll use mock data
            this.suggestedFriends = [
                {
                    id: 'u6',
                    name: 'Jessica Parker',
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    info: 'Working on public speaking confidence',
                    confidenceScore: 78,
                    streak: 45
                },
                {
                    id: 'u7',
                    name: 'Thomas Anderson',
                    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                    info: 'Building social confidence',
                    confidenceScore: 65,
                    streak: 12
                },
                {
                    id: 'u8',
                    name: 'Olivia Martinez',
                    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
                    info: 'Focusing on professional confidence',
                    confidenceScore: 82,
                    streak: 30
                },
                {
                    id: 'u9',
                    name: 'Alex Thompson',
                    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
                    info: 'Working on dating confidence',
                    confidenceScore: 70,
                    streak: 15
                },
                {
                    id: 'u10',
                    name: 'Jennifer Lee',
                    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
                    info: 'Building body confidence',
                    confidenceScore: 75,
                    streak: 22
                },
                {
                    id: 'u11',
                    name: 'James Wilson',
                    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
                    info: 'Improving public speaking skills',
                    confidenceScore: 68,
                    streak: 8
                }
            ];
        },
        
        /**
         * Load suggested groups
         */
        loadSuggestedGroups: function() {
            // In a real app, this would fetch suggested groups from the API
            // For now, we'll use mock data
            this.suggestedGroups = [
                {
                    id: 'g4',
                    name: 'Professional Confidence',
                    avatar: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    memberCount: 24
                },
                {
                    id: 'g5',
                    name: 'Confidence in Dating',
                    avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    memberCount: 18
                },
                {
                    id: 'g6',
                    name: 'Body Confidence',
                    avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    memberCount: 32
                }
            ];
        },
        
        /**
         * Load trending topics
         */
        loadTrendingTopics: function() {
            // In a real app, this would fetch trending topics from the API
            // For now, we'll use mock data
            this.trendingTopics = [
                {
                    id: 't1',
                    name: '#PublicSpeaking',
                    postCount: 24
                },
                {
                    id: 't2',
                    name: '#SocialAnxiety',
                    postCount: 18
                },
                {
                    id: 't3',
                    name: '#WorkplaceConfidence',
                    postCount: 15
                },
                {
                    id: 't4',
                    name: '#BodyConfidence',
                    postCount: 12
                }
            ];
        },
        
        /**
         * Initialize post composer
         */
        initPostComposer: function() {
            const composerForm = document.querySelector('.post-composer');
            const composerInput = document.querySelector('.composer-input');
            const shareButton = document.querySelector('.post-composer .btn-primary');
            
            if (composerForm && composerInput && shareButton) {
                // Add event listener to share button
                shareButton.addEventListener('click', () => {
                    const content = composerInput.value.trim();
                    
                    if (content) {
                        this.createPost(content);
                        composerInput.value = '';
                    }
                });
                
                // Add event listener to input for enter key
                composerInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        shareButton.click();
                    }
                });
            }
        },
        
        /**
         * Create a new post
         * @param {string} content - Post content
         */
        createPost: function(content) {
            // Get current user
            const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
            
            if (!currentUser) return;
            
            // Create post object
            const post = {
                id: `p${Date.now()}`,
                userId: currentUser.id,
                userName: currentUser.profile?.displayName || currentUser.fullName,
                userAvatar: currentUser.profile?.avatar || 'https://randomuser.me/api/portraits/women/65.jpg',
                content: content,
                type: 'text',
                reactions: [],
                comments: [],
                timestamp: new Date().toISOString()
            };
            
            // Add post to posts array
            this.posts.unshift(post);
            
            // In a real app, this would send the post to the API
            console.log('Created post:', post);
            
            // Update UI
            this.addPostToFeed(post);
        },
        
        /**
         * Add post to feed
         * @param {Object} post - Post object
         */
        addPostToFeed: function(post) {
            const feedPosts = document.querySelector('.feed-posts');
            
            if (!feedPosts) return;
            
            // Create post element
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.setAttribute('data-post-id', post.id);
            
            // Set post HTML
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-user">
                        <div class="user-avatar small">
                            <img src="${post.userAvatar}" alt="${post.userName}">
                        </div>
                        <div class="post-user-info">
                            <div class="post-user-name">${post.userName}</div>
                            <div class="post-time">Just now</div>
                        </div>
                    </div>
                    <div class="post-actions">
                        <button class="post-action-button">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                </div>
                
                <div class="post-content">
                    <p>${this.formatPostContent(post.content)}</p>
                </div>
                
                <div class="post-stats">
                    <div class="post-reactions">
                        <span class="reaction-count">0</span>
                    </div>
                    <div class="post-comments-count">
                        0 comments
                    </div>
                </div>
                
                <div class="post-actions-bar">
                    <button class="post-action">
                        <i class="far fa-thumbs-up"></i>
                        <span>Support</span>
                    </button>
                    <button class="post-action">
                        <i class="far fa-comment"></i>
                        <span>Comment</span>
                    </button>
                    <button class="post-action">
                        <i class="far fa-share-square"></i>
                        <span>Share</span>
                    </button>
                </div>
                
                <div class="post-comments">
                    <div class="comment-composer">
                        <div class="user-avatar x-small">
                            <img src="${post.userAvatar}" alt="${post.userName}">
                        </div>
                        <div class="comment-input-container">
                            <input type="text" class="comment-input" placeholder="Write a comment...">
                        </div>
                    </div>
                </div>
            `;
            
            // Add post to feed
            feedPosts.insertBefore(postElement, feedPosts.firstChild);
            
            // Add event listeners
            this.addPostEventListeners(postElement);
        },
        
        /**
         * Format post content
         * @param {string} content - Post content
         * @returns {string} - Formatted content
         */
        formatPostContent: function(content) {
            // Replace URLs with links
            content = content.replace(
                /(https?:\/\/[^\s]+)/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
            );
            
            // Replace hashtags with links
            content = content.replace(
                /#(\w+)/g,
                '<a href="#" class="hashtag">#$1</a>'
            );
            
            // Replace line breaks with <br>
            content = content.replace(/\n/g, '<br>');
            
            return content;
        },
        
        /**
         * Initialize post interactions
         */
        initPostInteractions: function() {
            // Get all posts
            const posts = document.querySelectorAll('.post');
            
            // Add event listeners to each post
            posts.forEach(post => {
                this.addPostEventListeners(post);
            });
        },
        
        /**
         * Add event listeners to post
         * @param {HTMLElement} postElement - Post element
         */
        addPostEventListeners: function(postElement) {
            // Get post ID
            const postId = postElement.getAttribute('data-post-id');
            
            // Get post actions
            const supportButton = postElement.querySelector('.post-action:nth-child(1)');
            const commentButton = postElement.querySelector('.post-action:nth-child(2)');
            const shareButton = postElement.querySelector('.post-action:nth-child(3)');
            
            // Get comment input
            const commentInput = postElement.querySelector('.comment-input');
            
            // Add event listeners
            if (supportButton) {
                supportButton.addEventListener('click', () => {
                    this.supportPost(postId, supportButton);
                });
            }
            
            if (commentButton && commentInput) {
                commentButton.addEventListener('click', () => {
                    commentInput.focus();
                });
            }
            
            if (shareButton) {
                shareButton.addEventListener('click', () => {
                    this.sharePost(postId);
                });
            }
            
            if (commentInput) {
                commentInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        const comment = commentInput.value.trim();
                        
                        if (comment) {
                            this.addComment(postId, comment);
                            commentInput.value = '';
                        }
                    }
                });
            }
        },
        
        /**
         * Support post
         * @param {string} postId - Post ID
         * @param {HTMLElement} button - Support button
         */
        supportPost: function(postId, button) {
            // Get current user
            const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
            
            if (!currentUser) return;
            
            // Find post
            const post = this.posts.find(p => p.id === postId);
            
            if (!post) return;
            
            // Check if user has already supported the post
            const supportReaction = post.reactions.find(r => r.type === '👏');
            
            if (supportReaction) {
                // Increment support count
                supportReaction.count++;
            } else {
                // Add support reaction
                post.reactions.push({ type: '👏', count: 1 });
            }
            
            // Update UI
            const postElement = document.querySelector(`.post[data-post-id="${postId}"]`);
            
            if (postElement) {
                // Update reaction count
                const reactionCount = postElement.querySelector('.reaction-count');
                const totalReactions = post.reactions.reduce((total, reaction) => total + reaction.count, 0);
                
                if (reactionCount) {
                    reactionCount.textContent = totalReactions;
                }
                
                // Update reaction icons
                const reactionsContainer = postElement.querySelector('.post-reactions');
                
                if (reactionsContainer) {
                    // Clear existing reactions
                    reactionsContainer.innerHTML = '';
                    
                    // Add reaction icons
                    post.reactions.forEach(reaction => {
                        const reactionIcon = document.createElement('span');
                        reactionIcon.className = 'reaction-icon';
                        reactionIcon.textContent = reaction.type;
                        reactionsContainer.appendChild(reactionIcon);
                    });
                    
                    // Add reaction count
                    const reactionCountSpan = document.createElement('span');
                    reactionCountSpan.className = 'reaction-count';
                    reactionCountSpan.textContent = totalReactions;
                    reactionsContainer.appendChild(reactionCountSpan);
                }
                
                // Update button style
                if (button) {
                    button.classList.add('active');
                    button.innerHTML = '<i class="fas fa-thumbs-up"></i><span>Supported</span>';
                }
            }
            
            // In a real app, this would send the support to the API
            console.log('Supported post:', postId);
        },
        
        /**
         * Add comment to post
         * @param {string} postId - Post ID
         * @param {string} commentText - Comment text
         */
        addComment: function(postId, commentText) {
            // Get current user
            const currentUser = window.Phoenix.Auth && window.Phoenix.Auth.currentUser;
            
            if (!currentUser) return;
            
            // Find post
            const post = this.posts.find(p => p.id === postId);
            
            if (!post) return;
            
            // Create comment object
            const comment = {
                id: `c${Date.now()}`,
                userId: currentUser.id,
                userName: currentUser.profile?.displayName || currentUser.fullName,
                userAvatar: currentUser.profile?.avatar || 'https://randomuser.me/api/portraits/women/65.jpg',
                content: commentText,
                timestamp: new Date().toISOString()
            };
            
            // Add comment to post
            post.comments.push(comment);
            
            // Update UI
            const postElement = document.querySelector(`.post[data-post-id="${postId}"]`);
            
            if (postElement) {
                // Update comment count
                const commentCount = postElement.querySelector('.post-comments-count');
                
                if (commentCount) {
                    commentCount.textContent = `${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}`;
                }
                
                // Add comment to UI
                const commentsContainer = postElement.querySelector('.post-comments');
                
                if (commentsContainer) {
                    // Create comment element
                    const commentElement = document.createElement('div');
                    commentElement.className = 'post-comment';
                    commentElement.innerHTML = `
                        <div class="user-avatar x-small">
                            <img src="${comment.userAvatar}" alt="${comment.userName}">
                        </div>
                        <div class="comment-content">
                            <div class="comment-user">${comment.userName}</div>
                            <div class="comment-text">${this.formatPostContent(comment.content)}</div>
                            <div class="comment-actions">
                                <button class="comment-action">Like</button>
                                <button class="comment-action">Reply</button>
                                <span class="comment-time">Just now</span>
                            </div>
                        </div>
                    `;
                    
                    // Insert comment before comment composer
                    const commentComposer = commentsContainer.querySelector('.comment-composer');
                    commentsContainer.insertBefore(commentElement, commentComposer);
                }
            }
            
            // In a real app, this would send the comment to the API
            console.log('Added comment to post:', postId, comment);
        },
        
        /**
         * Share post
         * @param {string} postId - Post ID
         */
        sharePost: function(postId) {
            // In a real app, this would open a share dialog
            console.log('Sharing post:', postId);
            
            // Show notification
            this.showNotification('success', 'Post shared successfully!');
        },
        
        /**
         * Initialize friend interactions
         */
        initFriendInteractions: function() {
            // Get all friend request buttons
            const acceptButtons = document.querySelectorAll('.friend-request .btn-primary');
            const declineButtons = document.querySelectorAll('.friend-request .btn-text');
            
            // Add event listeners to accept buttons
            acceptButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const requestElement = button.closest('.friend-request');
                    const requestId = requestElement.getAttribute('data-request-id');
                    
                    if (requestId) {
                        this.acceptFriendRequest(requestId, requestElement);
                    }
                });
            });
            
            // Add event listeners to decline buttons
            declineButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const requestElement = button.closest('.friend-request');
                    const requestId = requestElement.getAttribute('data-request-id');
                    
                    if (requestId) {
                        this.declineFriendRequest(requestId, requestElement);
                    }
                });
            });
            
            // Get all add friend buttons
            const addFriendButtons = document.querySelectorAll('.discover-card .btn-primary');
            
            // Add event listeners to add friend buttons
            addFriendButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const cardElement = button.closest('.discover-card');
                    const userId = cardElement.getAttribute('data-user-id');
                    
                    if (userId) {
                        this.sendFriendRequest(userId, button);
                    }
                });
            });
        },
        
        /**
         * Accept friend request
         * @param {string} requestId - Request ID
         * @param {HTMLElement} requestElement - Request element
         */
        acceptFriendRequest: function(requestId, requestElement) {
            // Find request
            const request = this.friendRequests.find(r => r.id === requestId);
            
            if (!request) return;
            
            // Remove request from list
            this.friendRequests = this.friendRequests.filter(r => r.id !== requestId);
            
            // Add user to friends
            this.friends.push({
                id: request.userId,
                name: request.name,
                avatar: request.avatar,
                mutualChallenges: 0
            });
            
            // Remove request element
            if (requestElement) {
                requestElement.remove();
            }
            
            // Show notification
            this.showNotification('success', `You are now friends with ${request.name}!`);
            
            // In a real app, this would send the acceptance to the API
            console.log('Accepted friend request:', requestId);
        },
        
        /**
         * Decline friend request
         * @param {string} requestId - Request ID
         * @param {HTMLElement} requestElement - Request element
         */
        declineFriendRequest: function(requestId, requestElement) {
            // Find request
            const request = this.friendRequests.find(r => r.id === requestId);
            
            if (!request) return;
            
            // Remove request from list
            this.friendRequests = this.friendRequests.filter(r => r.id !== requestId);
            
            // Remove request element
            if (requestElement) {
                requestElement.remove();
            }
            
            // In a real app, this would send the decline to the API
            console.log('Declined friend request:', requestId);
        },
        
        /**
         * Send friend request
         * @param {string} userId - User ID
         * @param {HTMLElement} button - Button element
         */
        sendFriendRequest: function(userId, button) {
            // Find user
            const user = this.suggestedFriends.find(u => u.id === userId);
            
            if (!user) return;
            
            // Update button
            if (button) {
                button.textContent = 'Request Sent';
                button.disabled = true;
            }
            
            // Show notification
            this.showNotification('success', `Friend request sent to ${user.name}!`);
            
            // In a real app, this would send the request to the API
            console.log('Sent friend request to:', userId);
        },
        
        /**
         * Initialize group interactions
         */
        initGroupInteractions: function() {
            // Get all join group buttons
            const joinButtons = document.querySelectorAll('.suggested-group .btn-secondary');
            
            // Add event listeners to join buttons
            joinButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const groupElement = button.closest('.suggested-group');
                    const groupId = groupElement.getAttribute('data-group-id');
                    
                    if (groupId) {
                        this.joinGroup(groupId, button);
                    }
                });
            });
        },
        
        /**
         * Join group
         * @param {string} groupId - Group ID
         * @param {HTMLElement} button - Button element
         */
        joinGroup: function(groupId, button) {
            // Find group
            const group = this.suggestedGroups.find(g => g.id === groupId);
            
            if (!group) return;
            
            // Update button
            if (button) {
                button.textContent = 'Joined';
                button.disabled = true;
            }
            
            // Show notification
            this.showNotification('success', `You've joined the ${group.name} group!`);
            
            // In a real app, this would send the join request to the API
            console.log('Joined group:', groupId);
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
         * Add hours to date
         * @param {Date} date - Date to add hours to
         * @param {number} hours - Number of hours to add
         * @returns {Date} - New date
         */
        addHours: function(date, hours) {
            const result = new Date(date);
            result.setHours(result.getHours() + hours);
            return result;
        },
        
        /**
         * Add minutes to date
         * @param {Date} date - Date to add minutes to
         * @param {number} minutes - Number of minutes to add
         * @returns {Date} - New date
         */
        addMinutes: function(date, minutes) {
            const result = new Date(date);
            result.setMinutes(result.getMinutes() + minutes);
            return result;
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