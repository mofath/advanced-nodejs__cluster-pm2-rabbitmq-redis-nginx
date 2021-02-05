const redisClient = require("../lib/redis-client");

const redisMiddleware = (req, res, next) => {
  switch (req.url) {
    case "/posts":
      redisClient.get("posts", (err, reply) => {
        if (err) res.status(500).send(`<h4>Something went wrong</h4>`);
        if (reply !== null) {
          res.send(reply);
          console.log("from redis");
        } else next();
      });
      break;
    case "/users":
      redisClient.get("users", (err, reply) => {
        if (err) res.status(500).send(`<h4>Something went wrong</h4>`);
        if (reply !== null) {
          res.send(reply);
          console.log("from redis");
        } else next();
      });
      break;
    case "/comments":
      redisClient.get("comments", (err, reply) => {
        if (err) res.status(500).send(`<h4>Something went wrong</h4>`);
        if (reply !== null) {
          res.send(reply);
          console.log("from redis");
        } else next();
      });
      break;
  }
};

module.exports = { redisMiddleware };
