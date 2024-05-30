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

const validateAnyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = decoded.role;

    if (role === 'seller') return res.status(200).json({ message: "seller" })
    if (role === 'user') return res.status(200).json({ message: "user" })

  } catch (error) {
    return res.status(500).json({ message: "No se pudo validar el token" })
  }
}

module.exports = { verifyTokenUser, verifyTokenSeller, validateAnyToken };