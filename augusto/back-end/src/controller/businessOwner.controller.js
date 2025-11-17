import { BusinessOwnerModel } from "../models/businessOwner.model.js";

//ESTOS CONTROLADORES SON REFERIDOS A LO QUE PUEDEN HACER LOS ADMINS DE LA PÁGINA//

export const getAllBusiness = async (req, res) => {
  try {
    const getAll = await BusinessOwnerModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkBusiness = async (req, res) => {
  try {
    const getByID = await BusinessOwnerModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "No se encontró la compañía" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const [update] = await BusinessOwnerModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatebusiness = await BusinessOwnerModel.findByPk(req.params.id);
      res.json(updatebusiness);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const deleted = await BusinessOwnerModel.destroy({
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
