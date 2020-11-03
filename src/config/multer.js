const multer = require("multer");
const path = require("path");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "public", "uploads"),
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "public", "uploads"));
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
