const express = require("express");
const redis = require("redis");
const config = require("./config");

const app = express();

const client = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
});

app.get("/", (request, response) => {
  console.log(`Process ID is ${process.pid}`);
  let { num } = request.query;
  if (num % 2 === 0) client.publish("fib-subscription2", num);
  else client.publish("fib-subscription1", num);
  response.send("<h3>Notification sent to the respective subscribers!</h3>");
});

app.listen(3000, () => console.log("App is running on PORT : 3000"));
