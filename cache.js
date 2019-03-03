var NodeCache = require('node-cache');
var myCache = new NodeCache();
var md5 = require('md5');

module.exports = {
    TTL_SECS_DEFAULT: 600,
    get: function(key, callback) {
        myCache.get(md5(key), (err, data) => {
            callback(err, data);
        })
    },
    set: function(key, val, ttl, callback) {
        myCache.set(md5(key), val, ttl, (err, success) => {
            if(callback) {
                callback(err, success);
            }
        })
    },
    keys: function(callback) {
        myCache.keys((err, keys) => {
            callback(err, keys);
        })
    }
};
