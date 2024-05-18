const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const verifyTokenUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = decoded.role;

    if (role !== 'user') {
      return res.status(403).json({ message: "No autorizado para la accion" })
    }

    req.token = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "No autorizado para la accion" });
  }

};

const verifyTokenSeller = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = decoded.role;

    if (role !== 'seller') {
      return res.status(403).json({ message: "No autorizado para la accion" })
    }

    req.token = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "No autorizado para la accion" });
  }
}

module.exports = { verifyTokenUser, verifyTokenSeller };