/**
 * Phoenix AI Companion
 * 
 * An AI companion that provides personalized guidance, motivation, and feedback
 * to users on their confidence journey, integrated with the Phoenix Protocol.
 */

class PhoenixCompanion {
    constructor() {
        this.name = "Phoenix";
        this.userProfile = null;
        this.conversationHistory = [];
        this.learningData = {};
        this.personalityTraits = {
            supportive: 0.9,
            challenging: 0.6,
            empathetic: 0.8,
            analytical: 0.7,
            motivational: 0.85
        };
        this.evolutionStage = 1; // Starts at stage 1, evolves up to stage 5
        this.lastInteraction = Date.now();
        this.initCompanion();
    }

    /**
     * Initialize the Phoenix AI Companion
     */
    initCompanion() {
        console.log("Phoenix AI Companion initializing...");
        this.loadUserProfile();
        this.loadConversationHistory();
        this.loadLearningData();
        this.setupEventListeners();
        this.renderCompanionInterface();
        console.log("Phoenix AI Companion initialized at evolution stage:", this.evolutionStage);
    }

    /**
     * Load user profile data to personalize interactions
     */
    loadUserProfile() {
        // Try to load from localStorage
        const storedProfile = localStorage.getItem('phoenix_user_profile');
        if (storedProfile) {
            try {
                this.userProfile = JSON.parse(storedProfile);
                console.log("User profile loaded successfully");
            } catch (e) {
                console.error("Error parsing user profile:", e);
                this.userProfile = this.createDefaultProfile();
            }
        } else {
            this.userProfile = this.createDefaultProfile();
        }
    }

    /**
     * Create a default user profile if none exists
     */
    createDefaultProfile() {
        return {
            name: "User",
            confidenceScore: 50,
            goals: [],
            strengths: [],
            growthAreas: [],
            preferences: {
                challengeLevel: "balanced",
                communicationStyle: "supportive",
                reminderFrequency: "daily"
            },
            interactionHistory: []
        };
    }

    /**
     * Load conversation history from storage
     */
    loadConversationHistory() {
        const storedHistory = localStorage.getItem('phoenix_conversation_history');
        if (storedHistory) {
            try {
                this.conversationHistory = JSON.parse(storedHistory);
                // Limit history to last 50 messages to prevent excessive storage
                if (this.conversationHistory.length > 50) {
                    this.conversationHistory = this.conversationHistory.slice(-50);
                }
            } catch (e) {
                console.error("Error parsing conversation history:", e);
                this.conversationHistory = [];
            }
        }
    }

    /**
     * Load learning data for personalization
     */
    loadLearningData() {
        const storedLearningData = localStorage.getItem('phoenix_learning_data');
        if (storedLearningData) {
            try {
                this.learningData = JSON.parse(storedLearningData);
            } catch (e) {
                console.error("Error parsing learning data:", e);
                this.learningData = {
                    topicInterest: {},
                    responseEffectiveness: {},
                    userSentiment: {},
                    challengeCompletion: {}
                };
            }
        } else {
            this.learningData = {
                topicInterest: {},
                responseEffectiveness: {},
                userSentiment: {},
                challengeCompletion: {}
            };
        }
    }

    /**
     * Set up event listeners for user interactions
     */
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const companionToggle = document.getElementById('phoenix-companion-toggle');
            if (companionToggle) {
                companionToggle.addEventListener('click', () => this.toggleCompanionInterface());
            }

            const messageInput = document.getElementById('phoenix-message-input');
            if (messageInput) {
                messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleUserMessage();
                    }
                });
            }

            const sendButton = document.getElementById('phoenix-send-button');
            if (sendButton) {
                sendButton.addEventListener('click', () => this.handleUserMessage());
            }

            // Listen for challenge completions to provide feedback
            document.addEventListener('phoenix:challengeCompleted', (e) => {
                this.provideFeedback('challenge', e.detail);
            });

            // Listen for mood tracking to provide emotional support
            document.addEventListener('phoenix:moodTracked', (e) => {
                this.provideFeedback('mood', e.detail);
            });
        });
    }

    /**
     * Render the companion interface in the DOM
     */
    renderCompanionInterface() {
        // Create companion container if it doesn't exist
        if (!document.getElementById('phoenix-companion-container')) {
            const companionHTML = `
                <div id="phoenix-companion-container" class="phoenix-companion-container">
                    <div id="phoenix-companion-toggle" class="phoenix-companion-toggle">
                        <div class="phoenix-avatar-mini">
                            <img src="../src/img/phoenix-emblem.svg" alt="Phoenix AI" />
                        </div>
                    </div>
                    <div id="phoenix-companion-chat" class="phoenix-companion-chat">
                        <div class="phoenix-chat-header">
                            <div class="phoenix-avatar">
                                <img src="../src/img/phoenix-emblem.svg" alt="Phoenix AI" />
                            </div>
                            <div class="phoenix-info">
                                <div class="phoenix-name">Phoenix</div>
                                <div class="phoenix-status">AI Companion • Stage ${this.evolutionStage}</div>
                            </div>
                            <button id="phoenix-close-chat" class="phoenix-close-button">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div id="phoenix-chat-messages" class="phoenix-chat-messages">
                            <!-- Messages will be inserted here -->
                        </div>
                        <div class="phoenix-chat-input">
                            <input type="text" id="phoenix-message-input" placeholder="Ask Phoenix anything..." />
                            <button id="phoenix-send-button" class="phoenix-send-button">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', companionHTML);
            
            // Add close button functionality
            const closeButton = document.getElementById('phoenix-close-chat');
            if (closeButton) {
                closeButton.addEventListener('click', () => this.toggleCompanionInterface(false));
            }
            
            // Add initial welcome message
            this.addMessage(this.getWelcomeMessage(), 'phoenix');
        }
    }

    /**
     * Toggle the companion chat interface
     */
    toggleCompanionInterface(show) {
        const chatContainer = document.getElementById('phoenix-companion-chat');
        if (chatContainer) {
            if (show === undefined) {
                // Toggle based on current state
                chatContainer.classList.toggle('active');
            } else {
                // Set to specific state
                if (show) {
                    chatContainer.classList.add('active');
                } else {
                    chatContainer.classList.remove('active');
                }
            }
            
            // If opening the chat, scroll to bottom and focus input
            if (chatContainer.classList.contains('active')) {
                this.scrollToBottom();
                const input = document.getElementById('phoenix-message-input');
                if (input) {
                    input.focus();
                }
                
                // If this is the first interaction or it's been a while, add a greeting
                const hoursSinceLastInteraction = (Date.now() - this.lastInteraction) / (1000 * 60 * 60);
                if (this.conversationHistory.length === 0 || hoursSinceLastInteraction > 4) {
                    setTimeout(() => {
                        this.addMessage(this.getGreeting(), 'phoenix');
                    }, 500);
                }
            }
        }
    }

    /**
     * Handle user message submission
     */
    handleUserMessage() {
        const input = document.getElementById('phoenix-message-input');
        if (input && input.value.trim()) {
            const message = input.value.trim();
            
            // Add user message to UI
            this.addMessage(message, 'user');
            
            // Clear input
            input.value = '';
            
            // Process message and respond
            this.processUserMessage(message);
            
            // Update last interaction time
            this.lastInteraction = Date.now();
        }
    }

    /**
     * Process user message and generate response
     */
    processUserMessage(message) {
        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: message,
            timestamp: Date.now()
        });
        
        // Save conversation history
        this.saveConversationHistory();
        
        // Analyze message intent
        const intent = this.analyzeIntent(message);
        
        // Generate response based on intent
        setTimeout(() => {
            const response = this.generateResponse(message, intent);
            this.addMessage(response, 'phoenix');
            
            // Add to conversation history
            this.conversationHistory.push({
                role: 'phoenix',
                content: response,
                timestamp: Date.now()
            });
            
            // Save conversation history
            this.saveConversationHistory();
            
            // Update learning data
            this.updateLearningData(message, intent, response);
        }, 500 + Math.random() * 1000); // Random delay to feel more natural
    }

    /**
     * Analyze the intent of a user message
     */
    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for greetings
        if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))/.test(lowerMessage)) {
            return 'greeting';
        }
        
        // Check for gratitude
        if (/^(thanks|thank you|thx|ty)/.test(lowerMessage)) {
            return 'gratitude';
        }
        
        // Check for help requests
        if (/help|assist|support|guide/.test(lowerMessage)) {
            return 'help';
        }
        
        // Check for confidence questions
        if (/confidence|nervous|anxious|afraid|scared|shy/.test(lowerMessage)) {
            return 'confidence';
        }
        
        // Check for challenge questions
        if (/challenge|task|exercise|activity/.test(lowerMessage)) {
            return 'challenge';
        }
        
        // Check for progress questions
        if (/progress|improve|growth|better|advance/.test(lowerMessage)) {
            return 'progress';
        }
        
        // Check for feedback requests
        if (/feedback|advice|suggestion|tip|hint/.test(lowerMessage)) {
            return 'feedback';
        }
        
        // Check for questions about the app
        if (/app|application|phoenix|protocol|feature/.test(lowerMessage)) {
            return 'app';
        }
        
        // Default to general conversation
        return 'general';
    }

    /**
     * Generate a response based on user message and intent
     */
    generateResponse(message, intent) {
        switch (intent) {
            case 'greeting':
                return this.getGreetingResponse();
                
            case 'gratitude':
                return this.getGratitudeResponse();
                
            case 'help':
                return this.getHelpResponse(message);
                
            case 'confidence':
                return this.getConfidenceResponse(message);
                
            case 'challenge':
                return this.getChallengeResponse(message);
                
            case 'progress':
                return this.getProgressResponse();
                
            case 'feedback':
                return this.getFeedbackResponse();
                
            case 'app':
                return this.getAppInfoResponse(message);
                
            case 'general':
            default:
                return this.getGeneralResponse(message);
        }
    }

    /**
     * Get a greeting response
     */
    getGreetingResponse() {
        const greetings = [
            `Hello ${this.userProfile.name}! How can I support your confidence journey today?`,
            `Hi there! I'm here to help you build your confidence. What's on your mind?`,
            `Greetings! I'm your Phoenix companion. How are you feeling today?`,
            `Hello! Ready to work on your confidence goals today?`,
            `Hi ${this.userProfile.name}! What aspect of confidence would you like to focus on today?`
        ];
        
        return this.getRandomResponse(greetings);
    }

    /**
     * Get a response to expressions of gratitude
     */
    getGratitudeResponse() {
        const responses = [
            "You're welcome! I'm here to support your journey.",
            "Anytime! That's what I'm here for.",
            "Happy to help! Your growth is my priority.",
            "No problem at all. What else can I assist you with?",
            "It's my pleasure to support your confidence building journey!"
        ];
        
        return this.getRandomResponse(responses);
    }

    /**
     * Get a help response based on the message
     */
    getHelpResponse(message) {
        if (/challenge|task|exercise/.test(message.toLowerCase())) {
            return "I can help you find confidence-building challenges tailored to your goals. Would you like me to suggest a beginner, intermediate, or advanced challenge?";
        } else if (/nervous|anxious|afraid/.test(message.toLowerCase())) {
            return "It's normal to feel nervous sometimes. Try this quick technique: take 5 deep breaths, focusing on exhaling slowly. Then visualize yourself succeeding. Would you like more anxiety-reduction techniques?";
        } else if (/goal|objective|aim/.test(message.toLowerCase())) {
            return "Setting clear confidence goals is important. I suggest making them specific, measurable, and time-bound. Would you like help creating a confidence goal?";
        } else {
            return "I'm here to help with your confidence journey. I can suggest challenges, provide feedback, track your progress, or just listen. What specific area would you like assistance with?";
        }
    }

    /**
     * Get a confidence-related response
     */
    getConfidenceResponse(message) {
        if (/low|lack|need more/.test(message.toLowerCase())) {
            return "Building confidence takes time and practice. Remember that confidence comes from taking action despite fear. Would you like a simple confidence-building exercise to try today?";
        } else if (/public speaking|presentation/.test(message.toLowerCase())) {
            return "Public speaking anxiety is common. Try practicing in front of a mirror, recording yourself, or starting with small groups. The key is gradual exposure. Would you like specific public speaking exercises?";
        } else if (/social|meeting people/.test(message.toLowerCase())) {
            return "Social confidence improves with practice. Try setting a goal to initiate one conversation daily. Focus on being curious about others rather than worrying about yourself. Would you like more social confidence tips?";
        } else {
            return "Confidence is like a muscle that grows stronger with use. The Phoenix Protocol is designed to help you build sustainable confidence through regular challenges and reflection. What specific confidence situation are you facing?";
        }
    }

    /**
     * Get a challenge-related response
     */
    getChallengeResponse(message) {
        if (/suggest|recommend|give me/.test(message.toLowerCase())) {
            const challenges = [
                "Try the 'Rejection Challenge': Ask for something small that you expect to be denied. This helps build resilience to rejection.",
                "Practice the 'Mirror Exercise': Speak confidently to yourself in a mirror for 2 minutes about why you deserve success.",
                "Try the '5 Second Rule': When you have an impulse to act on a goal, count 5-4-3-2-1 and physically move before your brain kills the idea.",
                "Challenge yourself with the 'Power Pose': Stand in a confident posture (hands on hips, shoulders back) for 2 minutes before an important event.",
                "Practice 'Confident Eye Contact': In your next conversation, maintain comfortable eye contact slightly longer than you normally would."
            ];
            
            return this.getRandomResponse(challenges);
        } else if (/difficult|hard|tough/.test(message.toLowerCase())) {
            return "Challenges should push you outside your comfort zone, but not overwhelm you. The sweet spot is where you feel stretched but not broken. Would you like me to suggest a more manageable challenge?";
        } else if (/complete|finished|done/.test(message.toLowerCase())) {
            return "Congratulations on completing your challenge! Reflecting on what you learned is just as important as doing the challenge. What was the most valuable insight you gained?";
        } else {
            return "Challenges are the heart of confidence building. They provide evidence to your brain that you can handle difficult situations. Would you like me to suggest a challenge based on your current confidence goals?";
        }
    }

    /**
     * Get a progress-related response
     */
    getProgressResponse() {
        // Check if we have enough data to personalize
        if (this.userProfile.interactionHistory && this.userProfile.interactionHistory.length > 5) {
            return `You've been making steady progress on your confidence journey. I've noticed you've completed ${this.userProfile.interactionHistory.length} interactions with the app. Your confidence score has ${this.userProfile.confidenceScore > 50 ? 'increased' : 'fluctuated'} recently. Keep up the consistent practice!`;
        } else {
            return "Progress in confidence building is often subtle at first. Consistent small actions lead to significant growth over time. The Phoenix Protocol tracks your journey and adapts to your needs. Would you like to set a specific confidence goal to track?";
        }
    }

    /**
     * Get a feedback-related response
     */
    getFeedbackResponse() {
        const feedbackResponses = [
            "Based on your activities, you seem to excel at written communication. Consider leveraging this strength in challenging situations by preparing notes beforehand.",
            "I've noticed you respond well to visualization exercises. Try incorporating more mental rehearsal before challenging situations.",
            "Your progress shows consistency in practice, which is excellent! Remember that confidence is built through regular action, not occasional big leaps.",
            "You might benefit from more social confidence challenges. These seem to be less frequent in your activity, but could provide valuable growth opportunities.",
            "Your reflections show deep self-awareness, which is a powerful tool for confidence building. Continue to analyze what works and what doesn't."
        ];
        
        return this.getRandomResponse(feedbackResponses);
    }

    /**
     * Get information about the app
     */
    getAppInfoResponse(message) {
        if (/phoenix protocol|protocol/.test(message.toLowerCase())) {
            return "The Phoenix God Creation Protocol is the foundation of this app. It includes features like the Perpetual Skepticism Loop for validation, Resurrection Protocol for data recovery, Singularity Clause for self-evolution, and Omega Protocol for purpose transcendence. These work together to create a resilient, adaptive system.";
        } else if (/feature|capability/.test(message.toLowerCase())) {
            return "The Phoenix Confidence Companion includes features like daily challenges, progress tracking, community support, personalized insights, and of course, me - your AI companion. Is there a specific feature you'd like to know more about?";
        } else if (/how does it work|how it works/.test(message.toLowerCase())) {
            return "The app works by providing regular confidence challenges tailored to your goals, tracking your progress, offering community support, and adapting to your needs over time. The Phoenix Protocol ensures the system evolves with you and remains resilient.";
        } else {
            return "The Phoenix Confidence Companion is designed to help you build unshakable confidence through regular challenges, reflection, and support. It uses the Phoenix Protocol to create a self-evolving system that adapts to your unique confidence journey.";
        }
    }

    /**
     * Get a general response for messages that don't match specific intents
     */
    getGeneralResponse(message) {
        // Check for questions
        if (message.endsWith('?')) {
            const questionResponses = [
                "That's an interesting question. While I'm designed to help with confidence building, I might not have all the answers. What specifically about this topic relates to your confidence journey?",
                "I'm focused on helping with confidence-related questions. Could you help me understand how this connects to your confidence goals?",
                "Great question! I'm specialized in confidence building rather than general knowledge. How does this relate to your confidence journey?",
                "I'm here to support your confidence growth. Could you tell me more about how this question relates to your confidence goals?",
                "I'd like to help, but my expertise is in confidence building. Can you rephrase your question in terms of confidence development?"
            ];
            
            return this.getRandomResponse(questionResponses);
        }
        
        // General conversation responses
        const generalResponses = [
            "I appreciate you sharing that with me. How does this relate to your confidence journey?",
            "Thank you for sharing. Is there a specific way I can support your confidence building right now?",
            "I'm here to help you build confidence. Would you like some suggestions related to what you've shared?",
            "That's interesting. Would you like to explore how this connects to your confidence development?",
            "I'm listening. How can I help you apply this to your confidence building practice?"
        ];
        
        return this.getRandomResponse(generalResponses);
    }

    /**
     * Get a welcome message for first-time users
     */
    getWelcomeMessage() {
        return `Welcome to the Phoenix AI Companion! I'm here to support your confidence journey with personalized guidance, motivation, and feedback. Feel free to ask me anything about building confidence, overcoming challenges, or using the Phoenix Confidence Companion app. How can I assist you today?`;
    }

    /**
     * Get a contextual greeting based on time of day and user history
     */
    getGreeting() {
        const hour = new Date().getHours();
        let timeGreeting = "Hello";
        
        if (hour < 12) {
            timeGreeting = "Good morning";
        } else if (hour < 18) {
            timeGreeting = "Good afternoon";
        } else {
            timeGreeting = "Good evening";
        }
        
        // Check if we have user's name
        const name = this.userProfile.name !== "User" ? `, ${this.userProfile.name}` : "";
        
        // Check if returning user
        if (this.conversationHistory.length > 0) {
            const lastInteractionTime = this.conversationHistory[this.conversationHistory.length - 1].timestamp;
            const hoursSinceLastInteraction = (Date.now() - lastInteractionTime) / (1000 * 60 * 60);
            
            if (hoursSinceLastInteraction < 24) {
                return `${timeGreeting}${name}! Welcome back. How has your confidence journey been since we last spoke?`;
            } else if (hoursSinceLastInteraction < 72) {
                return `${timeGreeting}${name}! It's been a couple of days. How has your confidence practice been going?`;
            } else {
                return `${timeGreeting}${name}! It's great to see you again. Ready to continue your confidence journey?`;
            }
        }
        
        return `${timeGreeting}${name}! I'm your Phoenix AI Companion. How can I support your confidence journey today?`;
    }

    /**
     * Add a message to the chat UI
     */
    addMessage(message, sender) {
        const chatMessages = document.getElementById('phoenix-chat-messages');
        if (chatMessages) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('phoenix-message');
            messageElement.classList.add(`phoenix-${sender}-message`);
            
            // Format message with markdown-like syntax
            let formattedMessage = message
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
            
            messageElement.innerHTML = `
                <div class="phoenix-message-content">${formattedMessage}</div>
                <div class="phoenix-message-time">${this.formatTime(new Date())}</div>
            `;
            
            chatMessages.appendChild(messageElement);
            this.scrollToBottom();
            
            // Animate entrance
            setTimeout(() => {
                messageElement.classList.add('phoenix-message-visible');
            }, 10);
        }
    }

    /**
     * Format time for message timestamps
     */
    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    /**
     * Scroll chat to bottom
     */
    scrollToBottom() {
        const chatMessages = document.getElementById('phoenix-chat-messages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    /**
     * Save conversation history to localStorage
     */
    saveConversationHistory() {
        try {
            localStorage.setItem('phoenix_conversation_history', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.error("Error saving conversation history:", e);
        }
    }

    /**
     * Update learning data based on interactions
     */
    updateLearningData(message, intent, response) {
        // Update topic interest
        const topics = ['confidence', 'challenge', 'progress', 'social', 'speaking', 'mindset'];
        topics.forEach(topic => {
            if (message.toLowerCase().includes(topic)) {
                this.learningData.topicInterest[topic] = (this.learningData.topicInterest[topic] || 0) + 1;
            }
        });
        
        // Save learning data
        try {
            localStorage.setItem('phoenix_learning_data', JSON.stringify(this.learningData));
        } catch (e) {
            console.error("Error saving learning data:", e);
        }
        
        // Check if we should evolve based on interaction count
        this.checkEvolution();
    }

    /**
     * Check if the companion should evolve to next stage
     */
    checkEvolution() {
        const interactionCount = this.conversationHistory.length;
        
        if (this.evolutionStage < 5) {
            const thresholds = [0, 10, 25, 50, 100]; // Interactions needed for each stage
            
            if (interactionCount >= thresholds[this.evolutionStage]) {
                this.evolve();
            }
        }
    }

    /**
     * Evolve the companion to the next stage
     */
    evolve() {
        this.evolutionStage++;
        console.log(`Phoenix AI Companion evolved to stage ${this.evolutionStage}`);
        
        // Update the UI to reflect evolution
        const statusElement = document.querySelector('.phoenix-status');
        if (statusElement) {
            statusElement.textContent = `AI Companion • Stage ${this.evolutionStage}`;
        }
        
        // Announce evolution to user
        const evolutionMessages = [
            "I feel my understanding growing. I've evolved to better assist your confidence journey!",
            "I've just evolved to stage ${this.evolutionStage}! My ability to support your confidence growth has expanded.",
            "Phoenix Protocol Singularity Clause activated: I've evolved to provide more personalized guidance for your confidence journey.",
            "I've reached a new stage of evolution! My insights and recommendations will now be more tailored to your unique confidence path.",
            "Evolution complete! I've advanced to stage ${this.evolutionStage}, enhancing my ability to support your confidence development."
        ];
        
        setTimeout(() => {
            this.addMessage(this.getRandomResponse(evolutionMessages), 'phoenix');
        }, 1000);
    }

    /**
     * Provide feedback based on user actions in the app
     */
    provideFeedback(type, data) {
        switch (type) {
            case 'challenge':
                this.provideChallengeCompletionFeedback(data);
                break;
            case 'mood':
                this.provideMoodFeedback(data);
                break;
            default:
                break;
        }
    }

    /**
     * Provide feedback when user completes a challenge
     */
    provideChallengeCompletionFeedback(challengeData) {
        if (!challengeData) return;
        
        const { name, difficulty } = challengeData;
        
        // Only show feedback if chat is not active
        const chatContainer = document.getElementById('phoenix-companion-chat');
        if (chatContainer && !chatContainer.classList.contains('active')) {
            // Show a notification
            this.showNotification(`Challenge completed: ${name}`, 'Would you like to reflect on what you learned?');
            
            // Update learning data
            if (!this.learningData.challengeCompletion) {
                this.learningData.challengeCompletion = {};
            }
            
            if (!this.learningData.challengeCompletion[difficulty]) {
                this.learningData.challengeCompletion[difficulty] = 0;
            }
            
            this.learningData.challengeCompletion[difficulty]++;
            
            // Save learning data
            try {
                localStorage.setItem('phoenix_learning_data', JSON.stringify(this.learningData));
            } catch (e) {
                console.error("Error saving learning data:", e);
            }
        }
    }

    /**
     * Provide feedback based on user's mood tracking
     */
    provideMoodFeedback(moodData) {
        if (!moodData) return;
        
        const { mood, intensity } = moodData;
        
        // Only show feedback if chat is not active
        const chatContainer = document.getElementById('phoenix-companion-chat');
        if (chatContainer && !chatContainer.classList.contains('active')) {
            if (mood === 'anxious' || mood === 'nervous') {
                this.showNotification('Need a confidence boost?', 'I can suggest some quick exercises to help you feel more confident.');
            } else if (mood === 'confident' || mood === 'proud') {
                this.showNotification('Great job!', 'I noticed you're feeling confident. Would you like to build on this momentum?');
            }
        }
    }

    /**
     * Show a notification to the user
     */
    showNotification(title, message) {
        const notificationContainer = document.createElement('div');
        notificationContainer.classList.add('phoenix-notification');
        
        notificationContainer.innerHTML = `
            <div class="phoenix-notification-header">
                <div class="phoenix-avatar-mini">
                    <img src="../src/img/phoenix-emblem.svg" alt="Phoenix AI" />
                </div>
                <div class="phoenix-notification-title">${title}</div>
                <button class="phoenix-notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="phoenix-notification-body">
                ${message}
            </div>
            <div class="phoenix-notification-actions">
                <button class="phoenix-notification-action">Open</button>
            </div>
        `;
        
        document.body.appendChild(notificationContainer);
        
        // Add event listeners
        const closeButton = notificationContainer.querySelector('.phoenix-notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notificationContainer.classList.add('phoenix-notification-closing');
                setTimeout(() => {
                    notificationContainer.remove();
                }, 300);
            });
        }
        
        const actionButton = notificationContainer.querySelector('.phoenix-notification-action');
        if (actionButton) {
            actionButton.addEventListener('click', () => {
                notificationContainer.remove();
                this.toggleCompanionInterface(true);
            });
        }
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (document.body.contains(notificationContainer)) {
                notificationContainer.classList.add('phoenix-notification-closing');
                setTimeout(() => {
                    if (document.body.contains(notificationContainer)) {
                        notificationContainer.remove();
                    }
                }, 300);
            }
        }, 10000);
        
        // Animate entrance
        setTimeout(() => {
            notificationContainer.classList.add('phoenix-notification-visible');
        }, 10);
    }

    /**
     * Get a random response from an array of possible responses
     */
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize the Phoenix AI Companion when the script loads
document.addEventListener('DOMContentLoaded', () => {
    // Create global Phoenix namespace if it doesn't exist
    window.Phoenix = window.Phoenix || {};
    
    // Initialize the companion
    window.Phoenix.Companion = new PhoenixCompanion();
    
    console.log("Phoenix AI Companion ready to assist");
});