import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createdUserValidation = [
  body("email")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir el nombre de la tag")
    .isEmail()
    .withMessage("debe de ser de tipo email")
    .custom(async (value) => {
      const emailvalidad = await UserModel.findOne({ where: { email: value } });
      if (emailvalidad) {
        throw new Error("ya hay un usuario que utiliza este email");
      }
    }),
  body("password")
    .isString()
    .withMessage("solamente se permite caracteres")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "debe de contener como minimo 8 letras,minuscula,mayuscula,un numero y simbolo"
    ),
  body("role")
    .notEmpty()
    .withMessage("es obligatorio añadir el rol")
    .custom(async (value) => {
      const roleEnu = await UserModel.findOne({ where: { role: value } });
      if (!roleEnu === "graduated" && !roleEnu === "company") {
        throw new Error(
          "solemente se permite las opciones graduado y compania"
        );
      }
    }),
];

export const updateUserValidation = [
  param("id").custom(async (value) => {
    const exist = await UserModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro al usuario");
    }
  }),
  body("email")
    .isString()
    .withMessage("solamente se permiten caracteres")
    .notEmpty()
    .withMessage("es obligatorio añadir el nombre de la tag")
    .isEmail()
    .withMessage("debe de ser de tipo email")
    .custom(async (value) => {
      const emailvalidad = await UserModel.findOne({ where: { email: value } });
      if (emailvalidad) {
        throw new Error("ya existe un usuario que utiliza este email");
      }
    }),
  body("password")
    .isString()
    .withMessage("solamente se permite caracteres")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "debe de contener como minimo 8 letras,minuscula,mayuscula,un numero y simbolo"
    ),
  body("role")
    .notEmpty()
    .withMessage("es obligatorio añadir el rol")
    .custom(async (value) => {
      const roleEnu = await UserModel.findOne({ where: { role: value } });
      if (!roleEnu === "graduated" && !roleEnu === "company") {
        throw new Error(
          "solemente se permite las opciones graduado y compania"
        );
      }
    }),
];

export const deletedUserValidation = [
  param("id").custom(async (value) => {
    const exist = await UserModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro al usuario");
    }
  }),
];
