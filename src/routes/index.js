const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/userController");
const SessionController = require("../controllers/sessionController");

routes.get("/", (req) => req.json({ message: "Ola mundo" }));
routes.post("/users", UserController.store);
routes.post("/login", SessionController.store);

module.exports = routes;
