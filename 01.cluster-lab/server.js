const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const fibObj = require("./fibonacci-series");

if (cluster.isMaster) {
  console.log("Number of cores: " + numCPUs);

  //Fork the workers, one per CPU core
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (deadWorker, code, signal) => {
    const worker = cluster.fork();
    console.log(`worker ${deadWorker.process.pid} died.`);
    console.log(`worker ${worker.process.pid} born.`);
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    console.log(`Worker process ID - ${cluster.worker.process.pid} has accepted the request`);
    let number = fibObj.calculateFibonacciValue(parseInt(req.query.num));
    return res.send(`<h1>${number}</h1>`);
  });

  app.listen(3000, () => console.log(`express app is running on port 300 and by worker ${cluster.worker.process.pid} `));
}
