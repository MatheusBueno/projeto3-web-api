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
      if(error.errors && (error.errors.email || error.errors.password)){
        res.status(500).json({ message: ` ${error.errors.password && error.errors.password.message || ''}${error.errors.password && '; ' || ''}${error.errors.email && error.errors.email.message || ''}` });
      }else{
        res.status(500).json({ message: "Não foi possível criar o usuário" });
      }
    }
  }
}

module.exports = new UserController();
