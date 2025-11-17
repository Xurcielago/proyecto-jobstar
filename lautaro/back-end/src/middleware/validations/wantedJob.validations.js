import { body, param } from "express-validator";
import { WantedJobModel } from "../../models/wantedJob.model.js";
import { JobTypeModel } from "../../models/jobType.model.js";

export const createdWantedJobValidation = [
  body("occupation")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la ocupacion")
    .withMessage("debe de ser de tipo email")
    .isLength({ max: 50 })
    .withMessage("solamente se permiten como maximo 50 caracteresS"),
  body("job_location")
    .isString()
    .withMessage("solamente se permite caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir el lugar de trabajo")
    .isLength({ max: 50 })
    .withMessage("solamente se permiten como maximo 50 caracteres"),
  body("job_type_id")
    .notEmpty()
    .withMessage("se debe colocar el tipo de trabajo")
    .custom(async (value) => {
      const typexit = await JobTypeModel.findByPk(value);
      if (!typexit) {
        throw new Error("no se encontro el tipo de trabajo indicado");
      }
    }),
];

export const updateWatendJobValidation = [
  param("id").custom(async (value) => {
    const exist = await WantedJobModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro el puesto de trabajo");
    }
  }),
  body("occupation")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la ocupacion")
    .withMessage("debe de ser de tipo email")
    .isLength({ max: 50 })
    .withMessage("solamente se permiten como maximo 50 caracteresS"),
  body("job_location")
    .isString()
    .withMessage("solamente se permite caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir el lugar de trabajo")
    .isLength({ max: 50 })
    .withMessage("solamente se permiten como maximo 50 caracteres"),
  body("job_type_id")
    .notEmpty()
    .withMessage("se debe colocar el tipo de trabajo")
    .custom(async (value) => {
      const typexit = await JobTypeModel.findByPk(value);
      if (!typexit) {
        throw new Error("no se encontro el tipo de trabajo indicado");
      }
    }),
];

export const deletedWantendJobValidation = [
  param("id").custom(async (value) => {
    const exist = await WantedJobModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro el puesto de trabajo");
    }
  }),
];
