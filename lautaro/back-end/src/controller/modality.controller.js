import { ModalityModel } from "../models/modality.model.js";
export const createdModality = async (req, res) => {
  const { modality } = req.body;
  try {
    const Create = await ModalityModel.create({
      modality: modality,
    });
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllModality = async (req, res) => {
  try {
    const getAll = await ModalityModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkModality = async (req, res) => {
  try {
    const getByID = await ModalityModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "no se encontro la modaldad requerida" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateModality = async (req, res) => {
  try {
    const [update] = await ModalityModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updateModality = await ModalityModel.findByPk(req.params.id);
      res.json(updateModality);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedModality = async (req, res) => {
  try {
    const deleted = await ModalityModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro la modalidad requerida" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
