import { Job_Tag_Model } from "../models/job_tag.model.js";

export const createdJobTag = async (req, res) => {
  const {} = req.body;
  try {
    const Create = await Job_Tag_Model.create({});
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllJobTag = async (req, res) => {
  try {
    const getAll = await Job_Tag_Model.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkJobTag = async (req, res) => {
  try {
    const getByID = await Job_Tag_Model.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "no se encontro el usuario " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateJobTag = async (req, res) => {
  try {
    const [update] = await Job_Tag_Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatejobtag = await Job_Tag_Model.findByPk(req.params.id);
      res.json(updatejobtag);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedJobTag = async (req, res) => {
  try {
    const deleted = await Job_Tag_Model.destroy({
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
