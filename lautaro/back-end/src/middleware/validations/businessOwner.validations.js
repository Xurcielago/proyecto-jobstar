import { body, param } from "express-validator";
import { BusinessOwnerModel } from "../../models/businessOwner.model.js";

export const createBussinessOwnerValidation = [
  body("company_name")
    .notEmpty()
    .withMessage("Ingrese el nombre de su compania o emprendimiento.")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede superar los 50 caracteres.")
    .custom(async (value) => {
      const user = await BusinessOwnerModel.findOne({
        where: { company_name: value },
      });
      if (user) {
        throw new Error("Ese nombre de empresa ya existe.");
      }
    }),
  body("about_us")
    .notEmpty()
    .withMessage("La descripción no puede estar vacia.")
    .isLength({ max: 400 })
    .withMessage("La descripción no puede superar los 400 caracteres"),
  body("location")
    .notEmpty()
    .withMessage("Por favor, seleccione la localidad de ubicación.")
    .isIn(["Patiño", "Formosa-Capital", "Pirane", "Laishi"])
    .withMessage("Las locaciones son exclusivas de La Provincia de Formosa"),
  body("website_url")
    .isLength({ max: 500 })
    .withMessage("El url proporcionado excede el limite permitido")
    .custom(async (value) => {
      const userExists = await BusinessOwnerModel.findOne({
        where: {
          website_url: value,
        },
      });
      if (userExists) {
        throw new Error("La pagina web proporcionada ya esta en uso.");
      }
    }),
  body("business_size") // y esto?
    .notEmpty()
    .withMessage("El campo business_size no puede estar vacio.")
    .isFloat({ min: 2, max: 20 })
    .withMessage("debe de contener como minimo 2 y maximo de 20 "),
  body("headquarters") // bajo desarrollo, hay que crear tabla de contactos (email,celular,telefono )
    .notEmpty()
    .withMessage(),
  body("extended_desc")
    .isLength({ max: 600 })
    .withMessage("solamente se permiten como maximo 600 caracteres"),
];

export const getByPkBusiness = [];

export const updateBusinessValidation = [
  param("id")
    .notEmpty()
    .withMessage("el id es requerido para el endpoint")
    .custom(async (value) => {
      const Businnes = await BusinessOwnerModel.findByPk(value);
      if (!Businnes) {
        throw new Error("la empresa no se encontro");
      }
    }),
  body("company_name")
    .optional()
    .notEmpty()
    .withMessage("Ingrese el nombre de su compañia o emprendimiento.")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede superar los 50 caracteres.")
    .custom(async (value) => {
      const user = await BusinessOwnerModel.findOne({
        where: { company_name: value },
      });
      if (user) {
        throw new Error("Ese nombre de empresa ya existe.");
      }
    }),
  body("about_us")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacia.")
    .isLength({ max: 400 })
    .withMessage("La descripción no puede superar los 400 caracteres"),
  body("location")
    .optional()
    .notEmpty()
    .withMessage("Por favor, seleccione la localidad de ubicación.")
    .isIn(["Patiño", "Formosa-Capital", "Pirane", "Laishi"])
    .withMessage("Las locaciones son exclusivas de La Provincia de Formosa"),
  body("website_url")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El url proporcionado execede el limite permitido")
    .custom(async (value) => {
      const userExists = await BusinessOwnerModel.findOne({
        where: {
          website_url: value,
        },
      });
      if (userExists) {
        throw new Error("La pagina web proporcionada ya esta en uso.");
      }
    }),
  body("business_size")
    .optional() // y esto?
    .notEmpty()
    .withMessage("El campo business_size no puede estar vacio.")
    .isFloat({ min: 2, max: 20 })
    .withMessage("debe de contener como minimo 2 y maximo de 20 "),
  body("headquarters") // bajo desarrollo, hay que crear tabla de contactos (email,celular,telefono )
    .optional()
    .notEmpty()
    .withMessage(),
  body("extended_desc")
    .optional()
    .isLength({ max: 600 })
    .withMessage("solamente se permiten como maximo 600 caracteres"),
];

export const deletedBusinessValidation = [
  param("id")
    .notEmpty()
    .withMessage("el id es requerido para el endpoint")
    .custom(async (value) => {
      const Businnes = await BusinessOwnerModel.findByPk(value);
      if (!Businnes) {
        throw new Error("no se encontro a la empresa");
      }
    }),
];
