import { JobSeekerProfileModel } from "../models/jobSeekerProfile.models.js";

export const getCurrentProfile = async (req, res) => {
  try {
    const currentProfile = await JobSeekerProfileModel.findOne({
      where: { user_id: req.user.id },
    });
    res.status(200).json({
      msg: "Mi perfil:",
      currentProfile,
    });
  } catch (error) {
    return res.status(500).json("Error al mostrar datos de perfil " + error);
  }
};
