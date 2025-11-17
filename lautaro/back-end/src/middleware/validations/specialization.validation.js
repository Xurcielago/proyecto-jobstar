import { body, param } from "express-validator";
import { SpecializationModel } from "../../models/specialization.model.js";

export const createdSpecializationValidation = [
  body("specialization")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la especializacion"),
];

export const updateSpecializationValidation = [
  param("id").custom(async (value) => {
    const exist = await SpecializationModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro la especializacion");
    }
  }),
  body("specialization")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la especializacion"),
];

export const deletedSpecializationValidation = [
  param("id").custom(async (value) => {
    const exist = await SpecializationModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro la especializacion");
    }
  }),
];
