const User = require("../models/userModel");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrádo" });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    return res.json({
      token: User.generateToken(user),
    });
  }
}

module.exports = new SessionController();
