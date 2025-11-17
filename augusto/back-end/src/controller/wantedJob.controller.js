import { WantedJobModel } from "../models/wantedJob.model.js";

/*EL USUARIO GRADUATED DEBE PODER CREAR SU WANTED JOB
DEBEN COINCIDIR CON LOS DATOS PREVIAMENTE CARGADOS A LA BASE DE DATOS
*/

export const createdWantedJob = async (req, res) => {
  const { occupation, job_location } = req.body;
  try {
    const Create = await WantedJobModel.create({
      occupation: occupation,
      job_location: job_location,
    });
    res.status(201).json({ Create });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getAllWantedJob = async (req, res) => {
  try {
    const getAll = await WantedJobModel.findAll();
    res.status(200).json({ getAll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkWantedJob = async (req, res) => {
  try {
    const getByID = await WantedJobModel.findByPk(req.params.id);
    if (getByID) {
      res.status(200).json({ getByID });
    } else {
      res.status(404).json({ message: "no se encontro el trabajo buscado " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateWatendJob = async (req, res) => {
  try {
    const [update] = await WantedJobModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatewatendjob = await WantedJobModel.findByPk(req.params.id);
      res.json(updatewatendjob);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletedWantendJob = async (req, res) => {
  try {
    const deleted = await WantedJobModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "se elimino correctamente" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro el trabajo buscado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
