export const authCompany = async (req, res, next) => {
  try {
    const validCompany = req.user;
    if (toString(validCompany.role) !== "company") {
      throw new Error("No autorizado");
    }
    next();
  } catch (error) {
    return res.status(500).json("Error al comprobar rol");
  }
};
