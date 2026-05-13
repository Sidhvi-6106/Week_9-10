import { userTypeModel } from "../models/UserModel.js";

export const checkAuthor = async (req, res, next) => {
  const aid = req.body?.author || req.params?.authorId;
  const author = await userTypeModel.findById(aid);

  if (!author) {
    return res.status(401).json({ message: "Invalid Author" });
  }

  if (author.role !== "AUTHOR") {
    return res.status(403).json({ message: "User is not an Author" });
  }

  if (!author.isActive) {
    return res.status(403).json({ message: "Author account is not active" });
  }

  next();
};
