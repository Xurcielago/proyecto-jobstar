import { TagModel } from "../models/tag.model.js";

export const createdTag = async (req, res) => {
  const { tag_name } = req.body;
  try {
    const Create = await TagModel.create({
      tag_name: tag_name,
    });
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllTag = async (req, res) => {
  try {
    const getAll = await TagModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkTag = async (req, res) => {
  try {
    const getByID = await TagModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res
        .status(404)
        .json({ message: "no se encontro la etiquete requerida " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const [update] = await TagModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updateTag = await TagModel.findByPk(req.params.id);
      res.json(updateTag);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedTag = async (req, res) => {
  try {
    const deleted = await TagModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro la etiqueta requerida" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
