import { body, param } from "express-validator";
import { ModalityModel } from "../../models/modality.model.js";

export const createdModalityValidation = [
  body("modality")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la modalidad")
    .custom(async (value) => {
      const modalValid = await ModalityModel.findOne({
        where: { modality: value },
      });
      if (modalValid) {
        throw new Error("ya existe esta modalidad");
      }
    }),
];

export const updateModalityValidation = [
  param("id").custom(async (value) => {
    const exist = await ModalityModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro la modalidad");
    }
  }),
  body("modality")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la modalidad")
    .custom(async (value) => {
      const typeValid = await ModalityModel.findOne({ where: { type: value } });
      if (typeValid) {
        throw new Error("ya existe esta modalidad");
      }
    }),
];

export const deletedModalityValidations = [
  param("id").custom(async (value) => {
    const exist = await ModalityModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro la modalidad");
    }
  }),
];
