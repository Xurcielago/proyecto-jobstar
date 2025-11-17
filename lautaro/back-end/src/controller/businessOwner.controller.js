import { BusinessOwnerModel } from "../models/businessOwner.model.js";

export const createBusiness = async (req, res) => {
  const {
    company_name,
    about_us,
    location,
    website_url,
    business_size,
    headquarters,
    extended_desc,
    contact,
  } = req.body;
  try {
    const Create = await BusinessOwnerModel.create({
      company_name: company_name,
      about_us: about_us,
      location: location,
      website_url: website_url,
      business_size: business_size,
      headquarters: headquarters,
      extended_desc: extended_desc,
      contact: contact,
      user_id: req.user.id,
    });
    res.status(201).json({ Create, msg: "Perfil creado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCurrentProfile = async (req, res) => {
  try {
    const currentProfile = await BusinessOwnerModel.findOne({
      where: { user_id: req.user.id },
    });
    res.status(200).json({
      msg: "Perfil de Empresa:",
      currentProfile,
    });
  } catch (error) {
    return res.status(500).json("Error al mostrar datos de perfil " + error);
  }
};

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
