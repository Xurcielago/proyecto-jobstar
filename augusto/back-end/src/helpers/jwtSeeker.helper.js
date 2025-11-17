import jwt from "jsonwebtoken";

export const generateTokenForSeeker = async (user) => {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        seekerID: user.seekerProfile.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token;
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
