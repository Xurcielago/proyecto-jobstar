import { body, param } from "express-validator";
import { JobPostModel } from "../../models/jobPost.model.js";
import { ModalityModel } from "../../models/modality.model.js";
import { JobTypeModel } from "../../models/jobType.model.js";

export const createdJobPostValidation = [
  body("job_name")
    .notEmpty()
    .withMessage("Ingrese el nombre del trabajo")
    .isString()
    .withMessage("Solamente se permite texto"),
  body("job_description")
    .notEmpty()
    .withMessage("Se requiere la descripcion")
    .isString()
    .withMessage("Solamente se admiten texto"),
  body("modality_id")
    .notEmpty()
    .withMessage("es obligatorio la modalidad")
    .custom(async (value) => {
      const modality = await ModalityModel.findByPk(value);
      if (!modality) {
        throw new Error("la modalidad indicada no existe ");
      }
    }),
  body("job_type_id")
    .notEmpty()
    .withMessage("el obligatorio añadir el tipo trabajo")
    .custom(async (value) => {
      const JobType = await JobTypeModel.findByPk(value);
      if (!JobType) {
        throw new Error("el tipo de trabajo indicado no existe");
      }
    }),
];

export const getByPkBusiness = [];

export const updateJobPostValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id es requerido para la busqueda del jobpost")
    .custom(async (value) => {
      const jobpost = await JobPostModel.findByPk(value);
      if (!jobpost) {
        throw new Error("No se encontro el posteo de trabajo");
      }
    }),
  body("job_name")
    .optional()
    .notEmpty()
    .withMessage("Ingrese el nombre del trabajo"),
  body("job_description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacia.")
    .isString()
    .withMessage("Solamente se permite datos de tipo string"),
  body("modality_id")
    .notEmpty()
    .withMessage("es obligatorio la modalidad")
    .custom(async (value) => {
      const modality = await ModalityModel.findByPk(value);
      if (!modality) {
        throw new Error("la modalidad indicada no existe ");
      }
    }),
  body("job_type_id")
    .notEmpty()
    .withMessage("el obligatorio añadir el tipo trabajo")
    .custom(async (value) => {
      const JobType = await JobTypeModel.findByPk(value);
      if (!JobType) {
        throw new Error("el tipo de trabajo indicado no existe");
      }
    }),
];

export const deletedJobPostValidation = [
  param("id")
    .notEmpty()
    .withMessage("el id es requerido para el endpoint")
    .custom(async (value) => {
      const jobPost = await JobPostModel.findByPk(value);
      if (!jobPost) {
        throw new Error("No se encontro el jobpost");
      }
    }),
];
