const { Router } = require("express");
const familyRouter = Router();

const {
  getAllFamilies,
  getSingleFamily,
  registerFamily,
  loginFamily,
  updateFamilyUsername,
  updateFamilyPassword,
  deleteFamily,
} = require("./controllers");

const { hashPass, comparePass, tokenCheck } = require("../middleware");

// get all users, mainly used for testing on backend
familyRouter.get("/", getAllFamilies);

// get a family by username
familyRouter.get("/search/:username", getSingleFamily);

// register user in the body
familyRouter.post("/register", hashPass, registerFamily);

// login user, no pass hash or token check
familyRouter.post("/login", comparePass, loginFamily);

// token check for persistent login
familyRouter.get("/authCheck", tokenCheck, loginFamily);

// update username
familyRouter.put("/account/updateUsername", updateFamilyUsername);

// update password
familyRouter.put("/account/updatePassword", updateFamilyPassword);

// delete user
familyRouter.delete("/account/delete", deleteFamily);

module.exports = familyRouter;
