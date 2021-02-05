const router = require("express").Router();
const redisClient = require("../lib/redis-client");

const { redisMiddleware } = require("../middleware/redis-middleware");

const commentApi = require("../api/comment.api");
const postApi = require("../api/post.api");
const userApi = require("../api/user.api");

router.use(redisMiddleware);


router.get("/comments", (req, res, next) => {
  commentApi
    .fetchComments()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      (data) => {
        console.log(`Data Fetched with process ID - ${process.pid}`);
        redisClient.set("comments", JSON.stringify(data));
        res.send(data);
      },
      (reason) => res.status(500).send("Something went wrong!")
    );
});

router.get("/posts", (req, res, next) => {
  postApi
    .fetchPosts()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      (data) => {
        console.log(`Data Fetched with process ID - ${process.pid}`);
        redisClient.set("posts", JSON.stringify(data));
        res.send(data);
      },
      (reason) => res.status(500).send("Something went wrong!")
    );
});

router.get("/users", (req, res, next) => {
  console.log("users");
  userApi
    .fetchUsers()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      (data) => {
        console.log(`Data Fetched with process ID - ${process.pid}`);
        redisClient.set("users", JSON.stringify(data));
        res.send(data);
      },
      (reason) => res.status(500).send("Something went wrong!")
    );
});

module.exports = router;
