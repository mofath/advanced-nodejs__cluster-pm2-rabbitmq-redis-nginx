module.exports = {
  apps: [
    {
      name: "EXPRESS APP",
      script: "server.js",
      instances: "MAX",
      autorestart: true,
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy:{
    production:{
      user:"node",
      host:"212.83.163.1",
      ref:"origin/master",
      repo:"git@github.com:repo.git",
      path:"/var/www/production",
      "post-deploy":"npm install && pm2 rload ecosystem.config.js --env production"
    }
  }
};
