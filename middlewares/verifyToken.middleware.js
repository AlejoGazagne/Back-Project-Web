const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = decoded.role;

    const url = req.url
    console.log("probando: ", url)

    if (url.includes(role)) {
      console.log("autorizado")
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ message: "No autorizado para la accion" })
    }

  } catch (error) {
    return res.status(403).json({ message: "No autorizado para la accion" });
  }

};

module.exports = { verifyToken };