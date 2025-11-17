import { SpecializationModel } from "../models/specialization.model.js";

export const createdSpecialization = async (req, res) => {
  const { specialization } = req.body;
  try {
    const Create = await SpecializationModel.create({
      specialization: specialization,
    });
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllSpecialization = async (req, res) => {
  try {
    const getAll = await SpecializationModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkSpecialization = async (req, res) => {
  try {
    const getByID = await SpecializationModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "no se encontro la especializacion " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSpecialization = async (req, res) => {
  try {
    const [update] = await SpecializationModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatespecialization = await SpecializationModel.findByPk(
        req.params.id
      );
      res.json(updatespecialization);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedSpecialization = async (req, res) => {
  try {
    const deleted = await SpecializationModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro la especializacion requeridad" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
