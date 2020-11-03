class UploadController {
  async store(req, res) {
    const filename = req.file.filename;

    res.status(200).json({
      message: "Upload realizado com sucesso",
      filePath: `https://projeto-web-3.herokuapp.com/${filename}`,
    });
  }
}

module.exports = new UploadController();
