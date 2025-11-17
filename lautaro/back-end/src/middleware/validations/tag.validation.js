import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createdTagValidation = [
  body("tag_name")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir el nombre de la tag")
    .custom(async (value) => {
      const namevalidad = await TagModel.findOne({
        where: { tag_name: value },
      });
      if (namevalidad) {
        throw new Error("ya existe una tag con ese nombre");
      }
    }),
];

export const updateTagValidation = [
  param("id").custom(async (value) => {
    const exist = await TagModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro la tag");
    }
  }),
  body("tag_name")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir la tag")
    .custom(async (value) => {
      const namevalidad = await TagModel.findOne({
        where: { tag_name: value },
      });
      if (namevalidad) {
        throw new Error("ya existe una tag con ese nombre");
      }
    }),
];

export const deletedTagValidation = [
  param("id").custom(async (value) => {
    const exist = await TagModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro la tag");
    }
  }),
];
