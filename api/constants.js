module.exports = {
    development: 'development',
    getEnv: function() {
        return process.env.NODE_ENV || this.development;
    }
}