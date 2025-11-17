import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { BusinessOwnerModel } from "../models/businessOwner.model.js";

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json({
      msg: "Usuario registrado correctamente",
      newUser,
    });
  } catch (error) {
    return res.status(500).json("Error al registrar el usuario " + error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({
      where: { email },
      include: [{ model: BusinessOwnerModel, as: "companyProfile" }],
    });
    console.log(User);
    if (!User) {
      return res.status(401).json("Credenciales invalidas");
    }
    const validPassword = await comparePassword(password, User.password);
    // console.log(password);
    if (!validPassword) {
      return res.status(401).json("Credenciales inválidas ");
    }

    const token = await generateToken({
      id: User.id,
      role: User.role,
      email,
      companyID: null || User.companyProfile?.id,
    });
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    res.status(200).json({ token, msg: "Sesión iniciada con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error al iniciar la sesión " + error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Sesión cerrada");
  } catch (error) {
    return res.status(500).json("Error al cerrar sesión " + error);
  }
};
