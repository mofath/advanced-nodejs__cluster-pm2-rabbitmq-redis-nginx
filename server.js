const express = require("express");
const fibObj = require("./math-logic/fibonacci-series");

const app = express();

app.get("/", (req, res) => {
  let number = fibObj.calculateFibonacciValue(parseInt(req.query.num));
  return res.send(`<h1>${number}</h1>`);
});

app.listen(3000, () => console.log("express is running on port 3000"));
