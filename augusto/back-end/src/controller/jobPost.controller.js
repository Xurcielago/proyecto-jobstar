import { JobPostModel } from "../models/jobPost.model.js";

/* SE REQUIERE REFACTORIZAR CONTROLADORES PARA QUE COMPANY PUEDA:
POSTEAR TRABAJOS: createJobPost
VER SUS POSTS: getAllJobPost
ACTUALIZAR SUS POSTS: updateJobPost
ELIMINAR SUS POSTS: deleteJobPost
*/

export const createdJobPost = async (req, res) => {
  const { job_name, job_description } = req.body;
  try {
    const Create = await JobPostModel.create({
      job_name: job_name,
      job_description: job_description,
      company_id: req.user.companyID,
    });
    res.status(201).json({
      msg: "Creada solicitud de trabajo",
      Trabajo: { Create },
    });
  } catch (error) {
    return res.status(500).json("Error al crear la solicitud " + error);
  }
};

export const getMyJobPosts = async (req, res) => {
  try {
    const getAll = await JobPostModel.findAll({
      where: { company_id: req.user.profileID },
    });
    res.status(200).json({
      msg: "Listando todas sus solicitudes",
      Solicitudes: { getAll },
    });
  } catch (error) {
    return res.status(500).json("Error al listar solicitudes " + error);
  }
};

export const getByPkJobPost = async (req, res) => {
  try {
    const getByID = await JobPostModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res
        .status(404)
        .json({ message: "no se encontro el posteo de trabajo pedido " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateJobPost = async (req, res) => {
  try {
    const [update] = await JobPostModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatejobPost = await JobPostModel.findByPk(req.params.id);
      res.json(updatejobPost);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedJobPost = async (req, res) => {
  try {
    const deleted = await JobPostModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro el posteo sobre trabajo requerido" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
