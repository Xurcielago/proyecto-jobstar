import { JobTypeModel } from "../models/jobType.model.js";

export const createdJobType = async (req, res) => {
  const { type } = req.body;
  try {
    const Create = await JobTypeModel.create({
      type: type,
    });
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllJobType = async (req, res) => {
  try {
    const getAll = await JobTypeModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkJobType = async (req, res) => {
  try {
    const getByID = await JobTypeModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res
        .status(404)
        .json({ message: "no se encontro el tipo de trabajo requerido" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateJobType = async (req, res) => {
  try {
    const [update] = await JobTypeModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatejobtype = await JobTypeModel.findByPk(req.params.id);
      res.json(updatejobtype);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedJobType = async (req, res) => {
  try {
    const deleted = await JobTypeModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro el tipo de trabajo requerido" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
