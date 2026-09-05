// ============================================
// CARROM POOL ASSISTANT - UTILITIES & HELPERS
// Pro AI Edition - Free Features Unlocked
// ============================================

/**
 * Utility Functions for Carrom Pool Assistant
 * Contains helper functions, math calculations, and common operations
 */

// ============================================
// MATH & PHYSICS UTILITIES
// ============================================

const MathUtils = {
    /**
     * Convert degrees to radians
     * @param {number} degrees - Angle in degrees
     * @returns {number} Angle in radians
     */
    degreesToRadians: (degrees) => {
        return (degrees * Math.PI) / 180;
    },

    /**
     * Convert radians to degrees
     * @param {number} radians - Angle in radians
     * @returns {number} Angle in degrees
     */
    radiansToDegrees: (radians) => {
        return (radians * 180) / Math.PI;
    },

    /**
     * Calculate distance between two points
     * @param {number} x1 - First point X coordinate
     * @param {number} y1 - First point Y coordinate
     * @param {number} x2 - Second point X coordinate
     * @param {number} y2 - Second point Y coordinate
     * @returns {number} Distance between points
     */
    distance: (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },

    /**
     * Calculate angle between two points
     * @param {number} x1 - First point X coordinate
     * @param {number} y1 - First point Y coordinate
     * @param {number} x2 - Second point X coordinate
     * @param {number} y2 - Second point Y coordinate
     * @returns {number} Angle in degrees
     */
    angleBetweenPoints: (x1, y1, x2, y2) => {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        return MathUtils.radiansToDegrees(angle);
    },

    /**
     * Calculate trajectory endpoint
     * @param {number} startX - Starting X position
     * @param {number} startY - Starting Y position
     * @param {number} angle - Angle in degrees
     * @param {number} distance - Distance to travel
     * @returns {object} End position {x, y}
     */
    getTrajectoryEnd: (startX, startY, angle, distance) => {
        const radians = MathUtils.degreesToRadians(angle);
        return {
            x: startX + distance * Math.cos(radians),
            y: startY + distance * Math.sin(radians)
        };
    },

    /**
     * Calculate velocity components
     * @param {number} speed - Total speed
     * @param {number} angle - Direction angle in degrees
     * @returns {object} Velocity components {vx, vy}
     */
    getVelocityComponents: (speed, angle) => {
        const radians = MathUtils.degreesToRadians(angle);
        return {
            vx: speed * Math.cos(radians),
            vy: speed * Math.sin(radians)
        };
    },

    /**
     * Clamp value between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Linear interpolation
     * @param {number} a - Start value
     * @param {number} b - End value
     * @param {number} t - Interpolation factor (0-1)
     * @returns {number} Interpolated value
     */
    lerp: (a, b, t) => {
        return a + (b - a) * t;
    },

    /**
     * Normalize angle to 0-360 range
     * @param {number} angle - Angle in degrees
     * @returns {number} Normalized angle
     */
    normalizeAngle: (angle) => {
        return ((angle % 360) + 360) % 360;
    }
};

// ============================================
// GAME STATE UTILITIES
// ============================================

const GameStateUtils = {
    /**
     * Initialize game state
     * @returns {object} Default game state
     */
    getDefaultState: () => ({
        gameActive: false,
        currentPlayer: 1,
        score: { player1: 0, player2: 0 },
        balls: { potted: 0, remaining: 9 },
        turn: 1,
        foul: false,
        breakshot: true
    }),

    /**
     * Reset game statistics
     * @returns {object} Reset statistics
     */
    getDefaultStats: () => ({
        totalGames: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        totalPoints: 0,
        accuracy: 0,
        shots: 0,
        successfulShots: 0,
        currentStreak: 0,
        bestStreak: 0
    }),

    /**
     * Calculate win rate
     * @param {number} wins - Number of wins
     * @param {number} totalGames - Total games played
     * @returns {number} Win rate percentage
     */
    calculateWinRate: (wins, totalGames) => {
        return totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    },

    /**
     * Calculate accuracy
     * @param {number} successful - Successful shots
     * @param {number} total - Total shots
     * @returns {number} Accuracy percentage
     */
    calculateAccuracy: (successful, total) => {
        return total > 0 ? Math.round((successful / total) * 100) : 0;
    }
};

// ============================================
// STORAGE UTILITIES
// ============================================

const StorageUtils = {
    /**
     * Save data to localStorage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     */
    save: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },

    /**
     * Load data from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    load: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    },

    /**
     * Remove data from localStorage
     * @param {string} key - Storage key
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },

    /**
     * Clear all data from localStorage
     */
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },

    /**
     * Check if key exists
     * @param {string} key - Storage key
     * @returns {boolean} True if exists
     */
    exists: (key) => {
        return localStorage.getItem(key) !== null;
    }
};

// ============================================
// TIME UTILITIES
// ============================================

const TimeUtils = {
    /**
     * Format time in milliseconds to readable format
     * @param {number} ms - Milliseconds
     * @returns {string} Formatted time string
     */
    formatTime: (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    },

    /**
     * Get current timestamp
     * @returns {number} Current timestamp in milliseconds
     */
    now: () => Date.now(),

    /**
     * Calculate elapsed time
     * @param {number} startTime - Start timestamp
     * @returns {number} Elapsed time in milliseconds
     */
    getElapsed: (startTime) => TimeUtils.now() - startTime,

    /**
     * Format date to readable string
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    formatDate: (date) => {
        return date.toLocaleString();
    }
};

// ============================================
// ARRAY & COLLECTION UTILITIES
// ============================================

const CollectionUtils = {
    /**
     * Shuffle array
     * @param {array} array - Array to shuffle
     * @returns {array} Shuffled array
     */
    shuffle: (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * Get random item from array
     * @param {array} array - Source array
     * @returns {*} Random item
     */
    getRandomItem: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Get random number in range
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    getRandomInRange: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Remove duplicates from array
     * @param {array} array - Source array
     * @returns {array} Array without duplicates
     */
    removeDuplicates: (array) => {
        return [...new Set(array)];
    },

    /**
     * Group array by key
     * @param {array} array - Source array
     * @param {string} key - Property key to group by
     * @returns {object} Grouped object
     */
    groupBy: (array, key) => {
        return array.reduce((result, item) => {
            const group = item[key];
            if (!result[group]) {
                result[group] = [];
            }
            result[group].push(item);
            return result;
        }, {})
    }
};

// ============================================
// VALIDATION UTILITIES
// ============================================

const ValidationUtils = {
    /**
     * Check if value is number
     * @param {*} value - Value to check
     * @returns {boolean} True if number
     */
    isNumber: (value) => typeof value === 'number' && !isNaN(value),

    /**
     * Check if value is string
     * @param {*} value - Value to check
     * @returns {boolean} True if string
     */
    isString: (value) => typeof value === 'string',

    /**
     * Check if value is array
     * @param {*} value - Value to check
     * @returns {boolean} True if array
     */
    isArray: (value) => Array.isArray(value),

    /**
     * Check if value is object
     * @param {*} value - Value to check
     * @returns {boolean} True if object
     */
    isObject: (value) => value !== null && typeof value === 'object',

    /**
     * Check if value is empty
     * @param {*} value - Value to check
     * @returns {boolean} True if empty
     */
    isEmpty: (value) => {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim().length === 0;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    },

    /**
     * Validate angle
     * @param {number} angle - Angle in degrees
     * @returns {boolean} True if valid
     */
    isValidAngle: (angle) => {
        return ValidationUtils.isNumber(angle) && angle >= 0 && angle <= 360;
    },

    /**
     * Validate power
     * @param {number} power - Power percentage
     * @returns {boolean} True if valid
     */
    isValidPower: (power) => {
        return ValidationUtils.isNumber(power) && power >= 0 && power <= 100;
    }
};

// ============================================
// STRING UTILITIES
// ============================================

const StringUtils = {
    /**
     * Capitalize first letter
     * @param {string} str - Input string
     * @returns {string} Capitalized string
     */
    capitalize: (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Convert to uppercase
     * @param {string} str - Input string
     * @returns {string} Uppercase string
     */
    toUpperCase: (str) => str.toUpperCase(),

    /**
     * Convert to lowercase
     * @param {string} str - Input string
     * @returns {string} Lowercase string
     */
    toLowerCase: (str) => str.toLowerCase(),

    /**
     * Truncate string
     * @param {string} str - Input string
     * @param {number} length - Max length
     * @param {string} suffix - Suffix for truncated text
     * @returns {string} Truncated string
     */
    truncate: (str, length, suffix = '...') => {
        return str.length > length ? str.substring(0, length) + suffix : str;
    },

    /**
     * Pad string with character
     * @param {string} str - Input string
     * @param {number} length - Target length
     * @param {string} char - Padding character
     * @returns {string} Padded string
     */
    padStart: (str, length, char = ' ') => {
        return String(str).padStart(length, char);
    }
};

// ============================================
// FORMAT UTILITIES
// ============================================

const FormatUtils = {
    /**
     * Format number with thousand separators
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber: (num) => {
        return num.toLocaleString();
    },

    /**
     * Format percentage
     * @param {number} value - Percentage value
     * @param {number} decimals - Decimal places
     * @returns {string} Formatted percentage
     */
    formatPercentage: (value, decimals = 0) => {
        return `${value.toFixed(decimals)}%`;
    },

    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code
     * @returns {string} Formatted currency
     */
    formatCurrency: (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    /**
     * Format bytes to readable size
     * @param {number} bytes - Number of bytes
     * @returns {string} Readable size
     */
    formatBytes: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }
};

// ============================================
// PERFORMANCE UTILITIES
// ============================================

const PerformanceUtils = {
    /**
     * Measure execution time
     * @param {function} fn - Function to measure
     * @returns {object} Result and timing {result, time}
     */
    measureTime: (fn) => {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        return {
            result,
            time: end - start
        };
    },

    /**
     * Throttle function
     * @param {function} fn - Function to throttle
     * @param {number} delay - Throttle delay in ms
     * @returns {function} Throttled function
     */
    throttle: (fn, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                return fn(...args);
            }
        };
    },

    /**
     * Debounce function
     * @param {function} fn - Function to debounce
     * @param {number} delay - Debounce delay in ms
     * @returns {function} Debounced function
     */
    debounce: (fn, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }
};

// ============================================
// LOGGING UTILITIES
// ============================================

const LoggerUtils = {
    /**
     * Log info message
     * @param {string} message - Message to log
     * @param {*} data - Optional data
     */
    info: (message, data = null) => {
        console.log(`ℹ️ [INFO] ${message}`, data || '');
    },

    /**
     * Log success message
     * @param {string} message - Message to log
     * @param {*} data - Optional data
     */
    success: (message, data = null) => {
        console.log(`✅ [SUCCESS] ${message}`, data || '');
    },

    /**
     * Log warning message
     * @param {string} message - Message to log
     * @param {*} data - Optional data
     */
    warn: (message, data = null) => {
        console.warn(`⚠️ [WARNING] ${message}`, data || '');
    },

    /**
     * Log error message
     * @param {string} message - Message to log
     * @param {*} data - Optional data
     */
    error: (message, data = null) => {
        console.error(`❌ [ERROR] ${message}`, data || '');
    }
};

// ============================================
// EXPORT UTILITIES
// ============================================

const ExportUtils = {
    /**
     * Export data as JSON file
     * @param {object} data - Data to export
     * @param {string} filename - Output filename
     */
    exportJSON: (data, filename) => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Export data as CSV file
     * @param {array} data - Array of objects
     * @param {string} filename - Output filename
     */
    exportCSV: (data, filename) => {
        if (!Array.isArray(data) || data.length === 0) {
            console.error('Invalid data for CSV export');
            return;
        }

        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => headers.map(h => row[h]).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
};

// ============================================
// INITIALIZE UTILITIES
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MathUtils,
        GameStateUtils,
        StorageUtils,
        TimeUtils,
        CollectionUtils,
        ValidationUtils,
        StringUtils,
        FormatUtils,
        PerformanceUtils,
        LoggerUtils,
        ExportUtils
    };
}

// Make available globally
window.CarromPoolUtils = {
    MathUtils,
    GameStateUtils,
    StorageUtils,
    TimeUtils,
    CollectionUtils,
    ValidationUtils,
    StringUtils,
    FormatUtils,
    PerformanceUtils,
    LoggerUtils,
    ExportUtils
};

// Log initialization
LoggerUtils.success('Carrom Pool Assistant Utilities loaded', window.CarromPoolUtils);
