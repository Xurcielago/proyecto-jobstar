import { JobSeekerProfileModel } from "../models/jobSeekerProfile.models.js";

export const adminCreateJSProfile = async (req, res) => {
  const {
    first_name,
    last_name,
    about_me,
    location,
    repository_url,
    avatar_url,
    contact,
    ambitions,
    specialization_id,
    wanted_job_id,
  } = req.body;
  try {
    // console.log(req.user.id);
    const Create = await JobSeekerProfileModel.create({
      first_name: first_name,
      last_name: last_name,
      about_me: about_me,
      location: location,
      repository_url: repository_url,
      avatar_url: avatar_url,
      contact: contact,
      ambitions: ambitions,
      specialization_id,
      wanted_job_id,
      user_id: req.user.id,
    });
    res.status(201).json({
      msg: "Perfil creado exitosamente",
      Create,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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
