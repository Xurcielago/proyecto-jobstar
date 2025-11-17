import { BusinessOwnerModel } from "../models/businessOwner.model.js";

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

export const updateBusiness = async (req, res) => {
  try {
    const [update] = await BusinessOwnerModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatebusiness = await BusinessOwnerModel.findByPk(req.params.id);
      res.status(200).json(updatebusiness);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
