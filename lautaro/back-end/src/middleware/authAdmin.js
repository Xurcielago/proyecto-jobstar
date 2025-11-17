export const authAdminMiddleware = (req, res, next) => {
  const decode = req.user;
  if (!decode.role === "admin") {
    res
      .status(401)
      .json({ message: "usted no tienes los permisos requeridos" });
  }
  next();
};
//esta para la idea no sirve ahora mismo
