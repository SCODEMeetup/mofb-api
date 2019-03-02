var NodeCache = require('node-cache');
var myCache = new NodeCache();
var md5 = require('md5');
var ttl_secs = 600;

module.exports = {
    get: function(key, callback) {
        myCache.get(md5(key), (err, data) => {
            callback(err, data);
        })
    },
    set: function(key, val, callback) {
        myCache.set(md5(key), val, ttl_secs, (err, success) => {
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
