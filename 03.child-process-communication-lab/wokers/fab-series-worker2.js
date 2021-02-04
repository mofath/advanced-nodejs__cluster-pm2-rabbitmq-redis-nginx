const fabObj = require("../fibonacci-series");

process.on("message", (num) => {
  let fabNum = fabObj.calculateFibonacciValue(num);
  console.log('\x1b[33m%s\x1b[0m', `Fab-worker - 2 PID ${process.pid}`);
  process.send(fabNum);
});