
import exp from "express";
import { authenticate } from "../services/authService.js";
import { userTypeModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../middlewares/verfiyToken.js";
export const commonRouter = exp.Router();

//login
commonRouter.post("/login", async (req, res) => {
  try {
    //get user cred object
    let userCred = req.body;
    //call authenticate service
    let { token, user } = await authenticate(userCred);
    //save token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: 'none',
      maxAge:24*60*60*1000
    });
    //send res
    res.status(200).json({ message: "login success", payload: user, token });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Login failed" });
  }
});

//logout for User, Author and Admin
commonRouter.get("/logout", (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie("token", {
    httpOnly: true, // Must match original  settings
    secure: true, // Must match original  settings
    sameSite: "none", // Must match original  settings
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//Change password(Protected route)
commonRouter.put("/change-password", async (req, res) => {
  //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await userTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
});
commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const user = await userTypeModel.findById(req.user.userId).select("-password");
  if (!user) {
    return res.status(401).json({ message: "Account not found. Please login again" });
  }

  res.status(200).json({
    message: "authenticated",
    payload: user,
  });
});

commonRouter.put("/profile", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const { displayName, bio, location, theme, profileImageUrl } = req.body;

  const updatedUser = await userTypeModel
    .findByIdAndUpdate(
      req.user.userId,
      { $set: { displayName, bio, location, theme, profileImageUrl } },
      { new: true, runValidators: true },
    )
    .select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.status(200).json({ message: "profile updated", payload: updatedUser });
});
