const Card = require("../models/cardModel");

class CardController {
  async index(req, res) {
    const search = req.query.search || "";
    let config = {};

    if (search) {
      config = {
        title: new RegExp(search, "i"),
      };
    }

    const cards = await Card.find(config);

    res.status(200).json(cards);
  }

  async store(req, res) {
    const { userId } = req;
    const { description, title, image } = req.body;

    console.log(userId);

    try {
      const card = await Card.create({
        description,
        title,
        image,
        createdBy: userId,
      });

      res.status(200).json(card);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Não foi possível criar o card" });
    }
  }
}

module.exports = new CardController();
