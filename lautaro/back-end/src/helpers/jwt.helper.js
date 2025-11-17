import jwt from "jsonwebtoken";

export const generateToken = async (paylod) => {
  try {
    return jwt.sign(paylod, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new Error("Error al generar token " + error);
  }
};

export const verifyToken = async (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken;
  } catch (error) {
    throw new Error("Error al verificar el token " + error);
  }
};
