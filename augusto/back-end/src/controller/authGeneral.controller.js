import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { BusinessOwnerModel } from "../models/businessOwner.model.js";
import { JobSeekerProfileModel } from "../models/jobSeekerProfile.models.js";
import { generateTokenForCompany } from "../helpers/jwtCompany.helper.js";
import { generateTokenForSeeker } from "../helpers/jwtSeeker.helper.js";

export const registerCompany = async (req, res) => {
  const {
    email,
    password,
    role,
    company_name,
    about_us,
    location,
    website_url,
    busines_size,
    headquarters,
    extended_desc,
    contact,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
      role: role,
    });
    await BusinessOwnerModel.create({
      company_name,
      about_us,
      location,
      website_url,
      busines_size,
      headquarters,
      extended_desc,
      contact,
      user_id: newUser.id,
    });
    res.status(201).json({
      msg: "Usuario registrado correctamente",
      newUser,
    });
  } catch (error) {
    return res.status(500).json("Error al registrar el usuario " + error);
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({
      where: { email: email },
      include: [{ model: BusinessOwnerModel, as: "companyProfile" }],
    });
    console.log(password);
    console.log(findUser.password);
    if (!findUser) {
      return res.status(404).json({
        msg: "No se puedo encontrar el usuario",
      });
    }
    const validPassword = await comparePassword(password, findUser.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Credenciales inválidas",
      });
    }
    const token = await generateTokenForCompany(findUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    console.log(findUser);
    res.status(200).json({
      msg: "Sesión iniciada con éxito",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al iniciar la sesión " + error,
    });
  }
};

export const registerGraduated = async (req, res) => {
  const {
    email,
    password,
    role,
    first_name,
    last_name,
    about_me,
    location,
    repository_url,
    avatar_url,
    contact,
    ambitions,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
      role: role,
    });
    await JobSeekerProfileModel.create({
      first_name: first_name,
      last_name: last_name,
      about_me: about_me,
      location: location,
      repository_url: repository_url,
      avatar_url: avatar_url,
      contact: contact,
      ambitions: ambitions,
      user_id: newUser.id,
    });
    res.status(201).json({
      msg: "Usuario registrado exitosamente",
      newUser,
    });
  } catch (error) {
    return res.status(500).json("Error al registrar el perfil " + error);
  }
};

export const loginGraduated = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({
      where: { email: email },
      include: [{ model: JobSeekerProfileModel, as: "seekerProfile" }],
    });
    const validPassword = comparePassword(password, findUser.password);
    if (!validPassword) {
      return res.status(401).json("Credenciales inválidas");
    }
    const token = await generateTokenForSeeker(findUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    console.log(findUser);
    res.status(200).json("Sesión iniciada con éxito");
  } catch (error) {
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
