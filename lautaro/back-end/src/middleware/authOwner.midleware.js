import { JobPostModel } from "../models/jobPost.model.js";

export const ownerMiddleware = async (req, res, next) => {
  const owner = req.user;
  const IdUser = await JobPostModel.findByPk(req.params.id);
  if (!IdUser) {
    return res.status(404).json({ message: "no se encontro el post" });
  }
  if (
    IdUser.company_id !== null &&
    owner.companyid !== IdUser.company_id &&
    owner.role !== "admin"
  ) {
    return res.status(401).json({ message: "no eres el dueño de este post" });
  }
  next();
};
