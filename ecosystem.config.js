module.exports = {
  apps : [{
    name: 'API',
    script: 'boot-build.js',
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
