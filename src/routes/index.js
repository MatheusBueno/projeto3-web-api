const express = require("express");
const multer = require("multer");
const routes = express.Router();
const multerConfig = require("../config/multer");

const UserController = require("../controllers/userController");
const SessionController = require("../controllers/sessionController");
const UploadController = require("../controllers/uploadController");
const CardController = require("../controllers/cardController");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/onlyAdmin");

routes.get("/", authMiddleware, adminMiddleware, (req, res) =>
  res.json({ message: "Ola mundo" })
);
routes.post("/users", UserController.store);
routes.post("/login", SessionController.store);
routes.post(
  "/upload",
  multer(multerConfig).single("file"),
  UploadController.store
);
routes.post("/cards", authMiddleware, adminMiddleware, CardController.store);
routes.get("/cards", authMiddleware, CardController.index);

module.exports = routes;
