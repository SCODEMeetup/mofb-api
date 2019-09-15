module.exports = {
  development: 'development',
  getEnv() {
    return process.env.NODE_ENV || this.development;
  },
};
