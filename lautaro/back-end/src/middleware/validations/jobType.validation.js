import { body, param } from "express-validator";
import { JobTypeModel } from "../../models/jobType.model.js";

export const createdJobTypeValidation = [
  body("type")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir el tipo")
    .custom(async (value) => {
      const typeValid = await JobTypeModel.findOne({ where: { type: value } });
      if (typeValid) {
        throw new Error("ya existe este tipo");
      }
    }),
];

export const updateJobTypeValidation = [
  param("id").custom(async (value) => {
    const exist = await JobTypeModel.findByPk(value);
    if (!exist) {
      throw new Error("el tipo de trabajo no existe");
    }
  }),
  body("type")
    .notEmpty()
    .withMessage("es obligatorio añadir el tipo")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .custom(async (value) => {
      const typeValid = await JobTypeModel.findOne({ where: { type: value } });
      if (typeValid) {
        throw new Error("ya existe este tipo");
      }
    }),
];

export const deletedJobTypeValidation = [
  param("id").custom(async (value) => {
    const exist = await JobTypeModel.findByPk(value);
    if (!exist) {
      throw new Error("el tipo de trabajo no existe");
    }
  }),
];
