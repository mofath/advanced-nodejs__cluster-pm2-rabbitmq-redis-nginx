const express = require("express");
const router = require("./routes/jph");

const app = express();

app.use("/jph", router);

app.listen(3000, () => console.log(`App is running on port 3000`));
