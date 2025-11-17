import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error al hashear la contraseña " + error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
    // console.log(comparePassword)
  } catch (error) {
    throw new Error("Error al comparar la contraseña " + error);
  }
};
