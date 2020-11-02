const User = require("../models/userModel");

class UserController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res
          .status(400)
          .json({ message: "Esse email já está sendo utilizado" });
      }

      const user = await User.create({ email, password });

      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
