import { UserModel } from "../models/user.model.js";

export const createdUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const Create = await UserModel.create({
      email: email,
      password: password,
      role: role,
    });
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const getAll = await UserModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkUser = async (req, res) => {
  try {
    const getByID = await UserModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "no se encontro el usuario " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [update] = await UserModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatearticle = await UserModel.findByPk(req.params.id);
      res.json(updatearticle);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedUser = async (req, res) => {
  try {
    const deleted = await UserModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res.status(404).json({ message: "no se encontro el usuario" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
