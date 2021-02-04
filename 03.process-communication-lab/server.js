const express = require("express");
const cluster = require("cluster");
const child_process = require("child_process");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master process PID is ${process.pid}`);

  const worker1 = child_process.fork("./wokers/fab-series-worker1");
  const worker2 = child_process.fork("./wokers/fab-series-worker2");

  console.log(`Worker1 PID is ${worker1.pid}`);
  console.log(`Worker2 PID is ${worker2.pid}`);

  worker1.on("message", (num) => {
    // recieve results from child process 1
    console.log("\x1b[36m%s\x1b[0m", `Result => ${num} from Fab-worker - 1`);
  });

  worker2.on("message", (num) => {
    // recieve results from child process 2
    console.log("\x1b[36m%s\x1b[0m", `Result => ${num} from Fab-worker - 2`);
  });

  // when a worker is created,
  // the worker needs to pass a message to the master
  cluster.on("online", (worker) => {
    console.log(`Message is recieved from - ${worker.process.pid}`);
    // master will recieve the message
    // by listening to the message event
    // the event callback function will recieve the date
    // which in our case the query string value
    worker.on("message", (num) => {
      if (num % 2 === 0) worker2.send(num);
      else worker1.send(num);
    });
  });

  for (let i = 0; i < numCPUs - 10; i++) {
    // the master process will fork into
    // two processes which will be responsible 
    // for accepting the requests from the client
    const worker = cluster.fork();
    console.log(`Worker started on PID - ${worker.process.pid}`);
  }
  console.log(`Total number of CPU cores ${numCPUs}`);
} else {
  const app = express();
  app.get("/", (req, res) => {
    process.send(req.query.num);
    console.log(`Request is accepted by PID ${process.pid}`);
    return res.send(`<h3>The request has been recieved!</h3>`);
  });

  app.listen(3001, () =>
    console.log("\x1b[32m%s\x1b[0m", `Express app is running on port 3001`)
  );
}
