import { JobSeekerProfileModel } from "../models/jobSeekerProfile.models.js";

//ESTOS CONTROLADORES SON REFERIDOS A LO QUE PUEDEN HACER LOS ADMINS DE LA PÁGINA//

export const getAllJobSeekerProfile = async (req, res) => {
  try {
    const getAll = await JobSeekerProfileModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkJobSeekerProfile = async (req, res) => {
  try {
    const getByID = await JobSeekerProfileModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res
        .status(404)
        .json({ message: "No se encontro el perfil de buscador de trabajo " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateJobSeekerProfile = async (req, res) => {
  try {
    const [update] = await JobSeekerProfileModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatejobseekerprofile = await JobSeekerProfileModel.findByPk(
        req.params.id
      );
      res.json(updatejobseekerprofile);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedJobSeekerProfile = async (req, res) => {
  try {
    const deleted = await JobSeekerProfileModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "No se encontro el perfil de buscador de trabajo" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
