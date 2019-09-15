const NodeCache = require('node-cache');

const myCache = new NodeCache();
const md5 = require('md5');

/**
 * Cache to store key value pairs, retrieve values by key, and get current list of keys
 * Provides a default TTL in seconds as TTL_SECS_DEFAULT
 */
class Cache {
  static instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new Cache();
    }
    return this.INSTANCE;
  }

  /**
   * Get cached value for key
   * @param {String} key Key to retrieve
   * @param {Function} callback Callback function
   * @returns Value for key, or undefined if key is not found
   */
  get(key, callback) {
    return myCache.get(md5(key), (err, data) => {
      if (callback) {
        callback(err, data);
      }
    });
  }

  /**
   * Set cached value
   * @param {String} key key for cached value
   * @param {any} val Value to cache
   * @param {number} ttl Time-to-live; expires value after value is exceeded
   * @param {Function} callback Callback function
   * @returns true if successful, else false
   */
  set(key, val, ttl, callback) {
    return myCache.set(md5(key), val, ttl, (err, success) => {
      if (callback) {
        callback(err, success);
      }
    });
  }

  /**
   * Gets array of currently saved keys
   * @param {Function} callback Callback function
   * @returns Array of keys
   */
  keys(callback) {
    return myCache.keys((err, keys) => {
      if (callback) {
        callback(err, keys);
      }
    });
  }
}

Cache.TTL_SECS_DEFAULT = 600;

module.exports = Cache;
