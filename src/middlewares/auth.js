const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return reject(err);

      resolve(decoded);
    });
  });
};

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informada" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await verifyToken(token);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
