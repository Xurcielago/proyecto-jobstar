import { body, param } from "express-validator";
import { SpecializationModel } from "../../models/specialization.model.js";
import { JobSeekerProfileModel } from "../../models/jobSeekerProfile.models.js";
import { WantedJobModel } from "../../models/wantedJob.model.js";

export const adminCreateJSProfileValidation = [
  body("first_name")
    .isString()
    .withMessage("el campo debe de ser de tipo string")
    .notEmpty()
    .withMessage("es obligatorio el campo primer nombre")
    .isLength({ min: 3, max: 50 })
    .withMessage("solamente se permiten entre 3 a 50 caracteres"),
  body("last_name")
    .isString()
    .withMessage("solamente se permite de tipo string en los campos")
    .notEmpty()
    .withMessage("es obligatorio el apellido del usuario")
    .isLength({ min: 3, max: 50 }),
  body("about_me")
    .optional()
    .notEmpty()
    .withMessage("se debe completar el campo acerca de mi")
    .isString()
    .withMessage("solamente se permite letras")
    .isLength({ min: 2, max: 700 })
    .withMessage("solamente se permiten mas de 700 caracteres"),
  body("location")
    .notEmpty()
    .withMessage("el campo location no puede estar vacio")
    .isString()
    .withMessage("solamente se permiten caracteres"),
  body("repository_url")
    .optional()
    .notEmpty()
    .withMessage("no se permite que el repositorio este vacio")
    .isURL()
    .withMessage("debe de ser valida la url"),
  body("avatar_url")
    .optional()
    .notEmpty()
    .withMessage("el campo no debe estar vacio")
    .isURL()
    .withMessage("para añadir el avatar debe de ser valido la url"),
  body("contact")
    .notEmpty()
    .withMessage("se debe añadir el contacto")
    .isEmail()
    .withMessage("el correo no es valido"),
  body("ambitions")
    .optional()
    .notEmpty()
    .withMessage("las ambiciones no puede estar en blanco")
    .isString()
    .withMessage("solamente se permiten caracteres en las ambiciones")
    .isLength({ max: 700 })
    .withMessage("solamente se permiten como maximo 700 caracteres"),
  body("specialization_id")
    .notEmpty()
    .withMessage("es obligatorio el indicar la especializacion")
    .custom(async (value) => {
      const SpecializationExist = await SpecializationModel.findByPk(value);
      if (!SpecializationExist) {
        throw new Error("No existe esa especializacion");
      }
    }),
  body("wanted_job_id")
    .notEmpty()
    .withMessage("no se puede añadir un campo vacio")
    .custom(async (value) => {
      const WantedJobExist = await WantedJobModel.findByPk(value);
      if (!WantedJobExist) {
        throw new Error("No se encontro el wanted_job_id indicado");
      }
    }),
];

export const updateJobSeekerProfileValidation = [
  param("id").custom(async (value) => {
    const exist = JobSeekerProfileModel.findByPk(value);
    if (!exist) {
      throw new Error("el perfil no existe");
    }
  }),
  body("first_name")
    .isString()
    .withMessage("el campo debe de ser de tipo string")
    .notEmpty()
    .withMessage("es obligatorio el campo primer nombre")
    .isLength({ min: 3, max: 50 })
    .withMessage("solamente se permiten entre 3 a 50 caracteres"),
  body("last_name")
    .isString()
    .withMessage("solamente se permite de tipo string en los campos")
    .notEmpty()
    .withMessage("es obligatorio el apellido del usuario")
    .isLength({ min: 3, max: 50 }),
  body("about_me")
    .optional()
    .notEmpty()
    .withMessage("se debe completar el campo acerca de mi")
    .isString()
    .withMessage("solamente se permite letras")
    .isLength({ min: 2, max: 700 })
    .withMessage("solamente se permiten mas de 700 caracteres"),
  body("location")
    .notEmpty()
    .withMessage("el campo locacion no puede estar vacio")
    .isString()
    .withMessage("solamente se permiten caractere"),
  body("repositorio_url")
    .notEmpty()
    .withMessage("no se permite que el repositorio este vacio")
    .isURL()
    .withMessage("debe de ser valida la url"),
  body("avatar_url")
    .notEmpty()
    .withMessage("el campo no debe estar vacio")
    .isURL()
    .withMessage("para añadir el avatar debe de ser valido la url"),
  body("contact")
    .notEmpty()
    .withMessage("se debe añadir el contacto")
    .isEmail()
    .withMessage("el correo no es valido"),
  body("ambitions")
    .notEmpty()
    .withMessage("las ambiciones no puede estar en blanco")
    .isString()
    .withMessage("solamente se permiten caracteres en el campo ambicion")
    .isLength({ max: 700 })
    .withMessage("solamente se permiten como maximo 700 caracteres"),
  body("specialization_id")
    .notEmpty()
    .withMessage("es obligatorio el indicar la especializacion")
    .custom(async (value) => {
      console.log(value);
      const SpecializationExist = await SpecializationModel.findByPk(value);
      if (!SpecializationExist) {
        throw new Error("No existe esa especializacion");
      }
    }),
  body("wanted_job_id")
    .notEmpty()
    .withMessage("no se puede añadir un campo vacio")
    .custom(async (value) => {
      const WantedJobExist = await WantedJobModel.findByPk(value);
      if (!WantedJobExist) {
        throw new Error("No existe el wanted_job_id indicado");
      }
    }),
];

export const deletedJobSeekerProfileValidation = [
  param("id").custom(async (value) => {
    const exist = await JobSeekerProfileModel.findByPk(value);
    if (!exist) {
      throw new Error("no se encontro el perfil del jobseeker");
    }
  }),
];
