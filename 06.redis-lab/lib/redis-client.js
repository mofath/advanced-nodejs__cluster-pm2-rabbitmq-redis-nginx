const redis = require("redis");
const config = require("../config");

module.exports = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
});
