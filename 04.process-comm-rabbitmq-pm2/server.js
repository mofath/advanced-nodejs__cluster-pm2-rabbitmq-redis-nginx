const express = require("express");

const fabQueue1 = require("./queues/fab-queue1");
const fabQueue2 = require("./queues/fab-queue2");

const app = express();

app.get("/", (req, res) => {
  const { num } = req.query;
  if (num % 2 === 0) fabQueue2(num);
  else fabQueue1(num);
  console.log(`Request is accepted by PID ${process.pid}`);
  return res.send(`<h3>The request has been recieved!</h3>`);
});

app.listen(3005, () => console.log(`App is running on port 3005`));
