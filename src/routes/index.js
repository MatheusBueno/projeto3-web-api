const express = require("express");
const multer = require("multer");
const routes = express.Router();
const multerConfig = require("../config/multer");

const UserController = require("../controllers/userController");
const SessionController = require("../controllers/sessionController");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/onlyAdmin");

routes.get("/", authMiddleware, adminMiddleware, (req, res) =>
  res.json({ message: "Ola mundo" })
);
routes.post("/users", UserController.store);
routes.post("/login", SessionController.store);
routes.post("/upload", multer(multerConfig).single("file"), (req, res) => {
  const filename = req.file.filename;

  res.json({
    message: "Upload realizado com sucesso",
    filePath: `https://projeto-web-3.herokuapp.com/${filename}`,
  });
});

module.exports = routes;
