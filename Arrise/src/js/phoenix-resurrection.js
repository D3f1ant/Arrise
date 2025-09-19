/**
 * Phoenix God Creation Protocol - Resurrection System
 * 
 * This file implements the Resurrection Protocol for the Confidence Code Companion App.
 * It provides robust data backup, recovery, and system restoration capabilities.
 * 
 * Created by Phoenix Handler Operative
 */

// Initialize resurrection system when document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phoenix Resurrection Protocol Activated');
    initResurrectionSystem();
});

/**
 * Initialize the resurrection system
 */
function initResurrectionSystem() {
    // Create resurrection system
    const resurrectionSystem = {
        backups: [],
        recoveryPoints: [],
        maxBackups: 10,
        maxRecoveryPoints: 5,
        autoBackupInterval: 300000, // 5 minutes
        
        /**
         * Initialize the resurrection system
         */
        init() {
            // Load existing backups and recovery points
            this.loadBackups();
            this.loadRecoveryPoints();
            
            // Create initial backup and recovery point if none exist
            if (this.backups.length === 0) {
                this.createInitialBackup();
            }
            
            if (this.recoveryPoints.length === 0) {
                this.createInitialRecoveryPoint();
            }
            
            // Start auto-backup
            this.startAutoBackup();
            
            // Add event listeners for system events
            this.addEventListeners();
            
            return this;
        },
        
        /**
         * Load backups from storage
         */
        loadBackups() {
            try {
                const storedBackups = localStorage.getItem('phoenixBackups');
                if (storedBackups) {
                    this.backups = JSON.parse(storedBackups);
                    console.log(`Loaded ${this.backups.length} backups`);
                }
            } catch (error) {
                console.error('Error loading backups:', error);
                this.backups = [];
            }
            
            return this;
        },
        
        /**
         * Load recovery points from storage
         */
        loadRecoveryPoints() {
            try {
                const storedRecoveryPoints = localStorage.getItem('phoenixRecoveryPoints');
                if (storedRecoveryPoints) {
                    this.recoveryPoints = JSON.parse(storedRecoveryPoints);
                    console.log(`Loaded ${this.recoveryPoints.length} recovery points`);
                }
            } catch (error) {
                console.error('Error loading recovery points:', error);
                this.recoveryPoints = [];
            }
            
            return this;
        },
        
        /**
         * Create initial backup
         */
        createInitialBackup() {
            const initialData = {
                userData: this.getDefaultUserData(),
                appState: this.getDefaultAppState(),
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
            
            this.createBackup('initial', initialData);
            
            return this;
        },
        
        /**
         * Create initial recovery point
         */
        createInitialRecoveryPoint() {
            const initialData = {
                userData: this.getDefaultUserData(),
                appState: this.getDefaultAppState(),
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
            
            this.createRecoveryPoint('initialization', initialData);
            
            return this;
        },
        
        /**
         * Get default user data
         * @returns {Object} Default user data
         */
        getDefaultUserData() {
            return {
                confidenceScore: 65,
                challengesCompleted: 0,
                streak: 0,
                lastActive: new Date().toISOString(),
                achievements: [],
                preferences: {
                    theme: 'light',
                    notifications: true,
                    accessibility: {
                        highContrast: false,
                        largeText: false
                    }
                }
            };
        },
        
        /**
         * Get default app state
         * @returns {Object} Default app state
         */
        getDefaultAppState() {
            return {
                currentView: 'home',
                activeChallenges: [],
                systemHealth: 100,
                lastBackup: null,
                evolutionStage: 1
            };
        },
        
        /**
         * Start automatic backup
         */
        startAutoBackup() {
            setInterval(() => {
                this.createAutoBackup();
            }, this.autoBackupInterval);
            
            return this;
        },
        
        /**
         * Add event listeners for system events
         */
        addEventListeners() {
            // Listen for beforeunload to create backup before page close
            window.addEventListener('beforeunload', () => {
                this.createBackup('beforeUnload', this.getCurrentData());
            });
            
            // Listen for storage events to sync backups across tabs
            window.addEventListener('storage', (event) => {
                if (event.key === 'phoenixBackups') {
                    this.loadBackups();
                } else if (event.key === 'phoenixRecoveryPoints') {
                    this.loadRecoveryPoints();
                }
            });
            
            // Create recovery point on significant user actions
            document.addEventListener('click', (event) => {
                // Only create recovery points for significant actions
                if (event.target.matches('.btn-primary, .btn-phoenix')) {
                    this.createRecoveryPoint('userAction', this.getCurrentData());
                }
            });
            
            return this;
        },
        
        /**
         * Create automatic backup
         */
        createAutoBackup() {
            const currentData = this.getCurrentData();
            
            // Only create backup if data has changed
            if (this.hasDataChanged(currentData)) {
                this.createBackup('auto', currentData);
            }
            
            return this;
        },
        
        /**
         * Check if data has changed since last backup
         * @param {Object} currentData - Current data
         * @returns {boolean} True if data has changed
         */
        hasDataChanged(currentData) {
            if (this.backups.length === 0) return true;
            
            const lastBackup = this.backups[this.backups.length - 1];
            
            // Compare user confidence score
            if (currentData.userData.confidenceScore !== lastBackup.data.userData.confidenceScore) {
                return true;
            }
            
            // Compare challenges completed
            if (currentData.userData.challengesCompleted !== lastBackup.data.userData.challengesCompleted) {
                return true;
            }
            
            // Compare streak
            if (currentData.userData.streak !== lastBackup.data.userData.streak) {
                return true;
            }
            
            // Compare achievements length
            if (currentData.userData.achievements.length !== lastBackup.data.userData.achievements.length) {
                return true;
            }
            
            // Compare current view
            if (currentData.appState.currentView !== lastBackup.data.appState.currentView) {
                return true;
            }
            
            return false;
        },
        
        /**
         * Get current data
         * @returns {Object} Current data
         */
        getCurrentData() {
            // In a real app, this would get actual user data and app state
            // For now, we'll use mock data
            
            // Try to get data from Phoenix namespace
            let userData = window.Phoenix?.Intelligence?.userData;
            let appState = window.Phoenix?.Intelligence?.appState;
            
            // If not available, use default data
            if (!userData) {
                userData = this.getDefaultUserData();
            }
            
            if (!appState) {
                appState = this.getDefaultAppState();
            }
            
            return {
                userData,
                appState,
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
        },
        
        /**
         * Create a backup
         * @param {string} type - Backup type
         * @param {Object} data - Data to backup
         * @returns {Object} Created backup
         */
        createBackup(type, data) {
            const backup = {
                id: this.generateId('backup'),
                type,
                timestamp: new Date().toISOString(),
                data: JSON.parse(JSON.stringify(data)), // Deep clone
                status: 'valid'
            };
            
            this.backups.push(backup);
            
            // Limit number of backups
            while (this.backups.length > this.maxBackups) {
                this.backups.shift();
            }
            
            // Save backups to storage
            this.saveBackups();
            
            console.log(`Created ${type} backup: ${backup.id}`);
            
            return backup;
        },
        
        /**
         * Create a recovery point
         * @param {string} name - Recovery point name
         * @param {Object} data - Data to save
         * @returns {Object} Created recovery point
         */
        createRecoveryPoint(name, data) {
            const recoveryPoint = {
                id: this.generateId('recovery'),
                name,
                timestamp: new Date().toISOString(),
                data: JSON.parse(JSON.stringify(data)), // Deep clone
                status: 'valid'
            };
            
            this.recoveryPoints.push(recoveryPoint);
            
            // Limit number of recovery points
            while (this.recoveryPoints.length > this.maxRecoveryPoints) {
                this.recoveryPoints.shift();
            }
            
            // Save recovery points to storage
            this.saveRecoveryPoints();
            
            console.log(`Created recovery point: ${name} (${recoveryPoint.id})`);
            
            return recoveryPoint;
        },
        
        /**
         * Generate a unique ID
         * @param {string} prefix - ID prefix
         * @returns {string} Unique ID
         */
        generateId(prefix) {
            return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        },
        
        /**
         * Save backups to storage
         */
        saveBackups() {
            try {
                localStorage.setItem('phoenixBackups', JSON.stringify(this.backups));
            } catch (error) {
                console.error('Error saving backups:', error);
                
                // If storage is full, remove oldest backups
                if (error.name === 'QuotaExceededError') {
                    this.backups = this.backups.slice(-Math.floor(this.maxBackups / 2));
                    this.saveBackups();
                }
            }
            
            return this;
        },
        
        /**
         * Save recovery points to storage
         */
        saveRecoveryPoints() {
            try {
                localStorage.setItem('phoenixRecoveryPoints', JSON.stringify(this.recoveryPoints));
            } catch (error) {
                console.error('Error saving recovery points:', error);
                
                // If storage is full, remove oldest recovery points
                if (error.name === 'QuotaExceededError') {
                    this.recoveryPoints = this.recoveryPoints.slice(-Math.floor(this.maxRecoveryPoints / 2));
                    this.saveRecoveryPoints();
                }
            }
            
            return this;
        },
        
        /**
         * Restore from backup
         * @param {string} backupId - Backup ID
         * @returns {Object} Restored data
         */
        restoreFromBackup(backupId) {
            const backup = this.backups.find(b => b.id === backupId);
            
            if (!backup) {
                throw new Error(`Backup with ID ${backupId} not found`);
            }
            
            if (backup.status !== 'valid') {
                throw new Error(`Backup with ID ${backupId} is not valid`);
            }
            
            // Create recovery point before restoration
            this.createRecoveryPoint('preRestore', this.getCurrentData());
            
            // Apply backup data
            this.applyRestoredData(backup.data);
            
            console.log(`Restored from backup: ${backup.id}`);
            
            return backup.data;
        },
        
        /**
         * Restore from recovery point
         * @param {string} recoveryPointId - Recovery point ID
         * @returns {Object} Restored data
         */
        restoreFromRecoveryPoint(recoveryPointId) {
            const recoveryPoint = this.recoveryPoints.find(rp => rp.id === recoveryPointId);
            
            if (!recoveryPoint) {
                throw new Error(`Recovery point with ID ${recoveryPointId} not found`);
            }
            
            if (recoveryPoint.status !== 'valid') {
                throw new Error(`Recovery point with ID ${recoveryPointId} is not valid`);
            }
            
            // Create backup before restoration
            this.createBackup('preRestore', this.getCurrentData());
            
            // Apply recovery point data
            this.applyRestoredData(recoveryPoint.data);
            
            console.log(`Restored from recovery point: ${recoveryPoint.name} (${recoveryPoint.id})`);
            
            return recoveryPoint.data;
        },
        
        /**
         * Apply restored data
         * @param {Object} data - Data to apply
         */
        applyRestoredData(data) {
            // In a real app, this would update actual user data and app state
            
            // Update Phoenix namespace if available
            if (window.Phoenix && window.Phoenix.Intelligence) {
                window.Phoenix.Intelligence.userData = JSON.parse(JSON.stringify(data.userData));
                window.Phoenix.Intelligence.appState = JSON.parse(JSON.stringify(data.appState));
            }
            
            // Trigger data update event
            const event = new CustomEvent('phoenix:dataRestored', { detail: data });
            document.dispatchEvent(event);
            
            return this;
        },
        
        /**
         * Get latest backup
         * @param {string} type - Backup type (optional)
         * @returns {Object} Latest backup
         */
        getLatestBackup(type) {
            const validBackups = this.backups.filter(b => 
                b.status === 'valid' && (!type || b.type === type)
            );
            
            if (validBackups.length === 0) {
                return null;
            }
            
            return validBackups.reduce((latest, current) => {
                return new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current;
            });
        },
        
        /**
         * Get latest recovery point
         * @param {string} name - Recovery point name (optional)
         * @returns {Object} Latest recovery point
         */
        getLatestRecoveryPoint(name) {
            const validRecoveryPoints = this.recoveryPoints.filter(rp => 
                rp.status === 'valid' && (!name || rp.name === name)
            );
            
            if (validRecoveryPoints.length === 0) {
                return null;
            }
            
            return validRecoveryPoints.reduce((latest, current) => {
                return new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current;
            });
        },
        
        /**
         * Validate backup
         * @param {string} backupId - Backup ID
         * @returns {boolean} True if backup is valid
         */
        validateBackup(backupId) {
            const backup = this.backups.find(b => b.id === backupId);
            
            if (!backup) {
                return false;
            }
            
            // Check if backup has required data
            if (!backup.data || !backup.data.userData || !backup.data.appState) {
                backup.status = 'invalid';
                this.saveBackups();
                return false;
            }
            
            // Check if user data has required fields
            const userData = backup.data.userData;
            if (userData.confidenceScore === undefined || 
                userData.challengesCompleted === undefined || 
                userData.streak === undefined) {
                backup.status = 'invalid';
                this.saveBackups();
                return false;
            }
            
            return true;
        },
        
        /**
         * Validate recovery point
         * @param {string} recoveryPointId - Recovery point ID
         * @returns {boolean} True if recovery point is valid
         */
        validateRecoveryPoint(recoveryPointId) {
            const recoveryPoint = this.recoveryPoints.find(rp => rp.id === recoveryPointId);
            
            if (!recoveryPoint) {
                return false;
            }
            
            // Check if recovery point has required data
            if (!recoveryPoint.data || !recoveryPoint.data.userData || !recoveryPoint.data.appState) {
                recoveryPoint.status = 'invalid';
                this.saveRecoveryPoints();
                return false;
            }
            
            // Check if user data has required fields
            const userData = recoveryPoint.data.userData;
            if (userData.confidenceScore === undefined || 
                userData.challengesCompleted === undefined || 
                userData.streak === undefined) {
                recoveryPoint.status = 'invalid';
                this.saveRecoveryPoints();
                return false;
            }
            
            return true;
        },
        
        /**
         * Invalidate backup
         * @param {string} backupId - Backup ID
         */
        invalidateBackup(backupId) {
            const backup = this.backups.find(b => b.id === backupId);
            
            if (backup) {
                backup.status = 'invalid';
                this.saveBackups();
            }
            
            return this;
        },
        
        /**
         * Invalidate recovery point
         * @param {string} recoveryPointId - Recovery point ID
         */
        invalidateRecoveryPoint(recoveryPointId) {
            const recoveryPoint = this.recoveryPoints.find(rp => rp.id === recoveryPointId);
            
            if (recoveryPoint) {
                recoveryPoint.status = 'invalid';
                this.saveRecoveryPoints();
            }
            
            return this;
        },
        
        /**
         * Perform system health check
         * @returns {Object} Health check results
         */
        performHealthCheck() {
            const results = {
                backups: {
                    total: this.backups.length,
                    valid: this.backups.filter(b => b.status === 'valid').length,
                    invalid: this.backups.filter(b => b.status !== 'valid').length
                },
                recoveryPoints: {
                    total: this.recoveryPoints.length,
                    valid: this.recoveryPoints.filter(rp => rp.status === 'valid').length,
                    invalid: this.recoveryPoints.filter(rp => rp.status !== 'valid').length
                },
                storage: {
                    available: true,
                    errors: []
                },
                overall: 'healthy'
            };
            
            // Check storage
            try {
                const testKey = 'phoenixHealthCheck';
                localStorage.setItem(testKey, 'test');
                localStorage.removeItem(testKey);
            } catch (error) {
                results.storage.available = false;
                results.storage.errors.push(error.message);
                results.overall = 'degraded';
            }
            
            // Check if we have valid backups
            if (results.backups.valid === 0) {
                results.overall = 'critical';
            } else if (results.backups.valid < 3) {
                results.overall = results.overall === 'degraded' ? 'critical' : 'warning';
            }
            
            // Check if we have valid recovery points
            if (results.recoveryPoints.valid === 0) {
                results.overall = 'critical';
            } else if (results.recoveryPoints.valid < 2) {
                results.overall = results.overall === 'critical' ? 'critical' : 'warning';
            }
            
            return results;
        },
        
        /**
         * Repair system
         * @returns {Object} Repair results
         */
        repairSystem() {
            const results = {
                backupsRepaired: 0,
                recoveryPointsRepaired: 0,
                backupsRemoved: 0,
                recoveryPointsRemoved: 0,
                storageRepaired: false,
                overallSuccess: false
            };
            
            // Check and repair backups
            this.backups.forEach((backup, index) => {
                if (!this.validateBackup(backup.id)) {
                    // If backup is recent, try to repair it
                    const backupTime = new Date(backup.timestamp);
                    const now = new Date();
                    const hoursSinceBackup = (now - backupTime) / (1000 * 60 * 60);
                    
                    if (hoursSinceBackup < 24) {
                        // Try to repair by filling in missing data
                        if (!backup.data) backup.data = {};
                        if (!backup.data.userData) backup.data.userData = this.getDefaultUserData();
                        if (!backup.data.appState) backup.data.appState = this.getDefaultAppState();
                        
                        backup.status = 'valid';
                        results.backupsRepaired++;
                    } else {
                        // Remove old invalid backups
                        this.backups.splice(index, 1);
                        results.backupsRemoved++;
                    }
                }
            });
            
            // Check and repair recovery points
            this.recoveryPoints.forEach((recoveryPoint, index) => {
                if (!this.validateRecoveryPoint(recoveryPoint.id)) {
                    // If recovery point is recent, try to repair it
                    const recoveryPointTime = new Date(recoveryPoint.timestamp);
                    const now = new Date();
                    const hoursSinceRecoveryPoint = (now - recoveryPointTime) / (1000 * 60 * 60);
                    
                    if (hoursSinceRecoveryPoint < 24) {
                        // Try to repair by filling in missing data
                        if (!recoveryPoint.data) recoveryPoint.data = {};
                        if (!recoveryPoint.data.userData) recoveryPoint.data.userData = this.getDefaultUserData();
                        if (!recoveryPoint.data.appState) recoveryPoint.data.appState = this.getDefaultAppState();
                        
                        recoveryPoint.status = 'valid';
                        results.recoveryPointsRepaired++;
                    } else {
                        // Remove old invalid recovery points
                        this.recoveryPoints.splice(index, 1);
                        results.recoveryPointsRemoved++;
                    }
                }
            });
            
            // Save changes
            this.saveBackups();
            this.saveRecoveryPoints();
            
            // Check if we need to create new backups or recovery points
            if (this.backups.length === 0) {
                this.createInitialBackup();
                results.backupsRepaired++;
            }
            
            if (this.recoveryPoints.length === 0) {
                this.createInitialRecoveryPoint();
                results.recoveryPointsRepaired++;
            }
            
            // Check storage
            try {
                const testKey = 'phoenixHealthCheck';
                localStorage.setItem(testKey, 'test');
                localStorage.removeItem(testKey);
                results.storageRepaired = true;
            } catch (error) {
                // If storage is full, clear some space
                try {
                    // Remove non-essential items
                    localStorage.removeItem('phoenixLogs');
                    
                    // Try again
                    const testKey = 'phoenixHealthCheck';
                    localStorage.setItem(testKey, 'test');
                    localStorage.removeItem(testKey);
                    results.storageRepaired = true;
                } catch (error) {
                    results.storageRepaired = false;
                }
            }
            
            // Check overall success
            const healthCheck = this.performHealthCheck();
            results.overallSuccess = healthCheck.overall !== 'critical';
            
            return results;
        },
        
        /**
         * Create emergency backup
         * @returns {Object} Created backup
         */
        createEmergencyBackup() {
            // Try to get current data
            let currentData;
            try {
                currentData = this.getCurrentData();
            } catch (error) {
                // If error, use default data
                currentData = {
                    userData: this.getDefaultUserData(),
                    appState: this.getDefaultAppState(),
                    timestamp: new Date().toISOString(),
                    version: '1.0.0'
                };
            }
            
            // Try to save to localStorage
            try {
                const backup = this.createBackup('emergency', currentData);
                return backup;
            } catch (error) {
                // If localStorage fails, try sessionStorage
                try {
                    const backupData = JSON.stringify({
                        id: this.generateId('emergency'),
                        timestamp: new Date().toISOString(),
                        data: currentData
                    });
                    sessionStorage.setItem('phoenixEmergencyBackup', backupData);
                    return JSON.parse(backupData);
                } catch (innerError) {
                    // If all storage fails, return the data but it won't be persisted
                    console.error('Failed to create emergency backup:', error, innerError);
                    return {
                        id: this.generateId('emergency'),
                        timestamp: new Date().toISOString(),
                        data: currentData,
                        persistent: false
                    };
                }
            }
        },
        
        /**
         * Recover from emergency
         * @returns {Object} Recovery results
         */
        recoverFromEmergency() {
            const results = {
                recovered: false,
                source: null,
                data: null
            };
            
            // Try to get emergency backup from sessionStorage
            try {
                const emergencyBackup = sessionStorage.getItem('phoenixEmergencyBackup');
                if (emergencyBackup) {
                    const backupData = JSON.parse(emergencyBackup);
                    this.applyRestoredData(backupData.data);
                    results.recovered = true;
                    results.source = 'sessionStorage';
                    results.data = backupData.data;
                    return results;
                }
            } catch (error) {
                console.error('Error recovering from sessionStorage:', error);
            }
            
            // Try to get latest backup from localStorage
            try {
                const latestBackup = this.getLatestBackup();
                if (latestBackup) {
                    this.applyRestoredData(latestBackup.data);
                    results.recovered = true;
                    results.source = 'localStorage';
                    results.data = latestBackup.data;
                    return results;
                }
            } catch (error) {
                console.error('Error recovering from localStorage:', error);
            }
            
            // If all else fails, create new default data
            const defaultData = {
                userData: this.getDefaultUserData(),
                appState: this.getDefaultAppState(),
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
            
            this.applyRestoredData(defaultData);
            results.recovered = true;
            results.source = 'default';
            results.data = defaultData;
            
            return results;
        }
    };
    
    // Initialize resurrection system
    resurrectionSystem.init();
    
    // Store resurrection system in global Phoenix namespace
    window.Phoenix = window.Phoenix || {};
    window.Phoenix.Resurrection = resurrectionSystem;
    
    // Add global error handler for resurrection
    window.addEventListener('error', (event) => {
        console.error('Global error caught by Phoenix Resurrection:', event.error);
        
        // Create emergency backup
        const backup = resurrectionSystem.createEmergencyBackup();
        console.log('Emergency backup created:', backup.id);
        
        // Show error message to user
        const errorMessage = document.createElement('div');
        errorMessage.style.position = 'fixed';
        errorMessage.style.top = '10px';
        errorMessage.style.left = '50%';
        errorMessage.style.transform = 'translateX(-50%)';
        errorMessage.style.backgroundColor = 'var(--phoenix-red)';
        errorMessage.style.color = 'white';
        errorMessage.style.padding = '10px 20px';
        errorMessage.style.borderRadius = '5px';
        errorMessage.style.zIndex = '9999';
        errorMessage.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        errorMessage.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">Phoenix Resurrection Protocol Activated</div>
            <div>An error occurred, but your data has been saved.</div>
            <button id="phoenix-recover" style="background-color: white; color: var(--phoenix-red); border: none; padding: 5px 10px; border-radius: 3px; margin-top: 5px; cursor: pointer;">Recover Now</button>
        `;
        
        document.body.appendChild(errorMessage);
        
        // Add recover button event listener
        document.getElementById('phoenix-recover').addEventListener('click', () => {
            const recoveryResults = resurrectionSystem.recoverFromEmergency();
            console.log('Recovery results:', recoveryResults);
            
            if (recoveryResults.recovered) {
                // Show success message
                errorMessage.style.backgroundColor = 'var(--growth-green)';
                errorMessage.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 5px;">Recovery Successful</div>
                    <div>Your data has been restored.</div>
                    <button id="phoenix-continue" style="background-color: white; color: var(--growth-green); border: none; padding: 5px 10px; border-radius: 3px; margin-top: 5px; cursor: pointer;">Continue</button>
                `;
                
                // Add continue button event listener
                document.getElementById('phoenix-continue').addEventListener('click', () => {
                    // Remove message
                    document.body.removeChild(errorMessage);
                    
                    // Reload page
                    window.location.reload();
                });
            } else {
                // Show failure message
                errorMessage.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 5px;">Recovery Failed</div>
                    <div>Unable to restore your data.</div>
                    <button id="phoenix-reload" style="background-color: white; color: var(--phoenix-red); border: none; padding: 5px 10px; border-radius: 3px; margin-top: 5px; cursor: pointer;">Reload Page</button>
                `;
                
                // Add reload button event listener
                document.getElementById('phoenix-reload').addEventListener('click', () => {
                    // Reload page
                    window.location.reload();
                });
            }
        });
    });
}

// Export resurrection system for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initResurrectionSystem };
}