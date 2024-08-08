const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const { port } = require("../config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, response) => {
  response.status(StatusCodes.OK).json({
    message: "Welcome to Task Trail Api",
    version: process.env.npm_package_version,
  });
});

app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
