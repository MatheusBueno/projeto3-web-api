require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const uri = process.env.MONGO_CONNECT;

const routes = require("./src/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/", routes);

app.use(express.static("public"));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, function () {
      console.log(`Listen on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));
