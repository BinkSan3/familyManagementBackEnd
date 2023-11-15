const { Router } = require("express");
const memberRouter = Router();

const {
  addMember,
  deleteMember,
  getAllMembers,
  getFamilyMembers,
  updatePoints,
} = require("./controllers");
const { tokenCheck } = require("../middleware");

//When initially creating family members upon registering
//Needs protecting? or potentially use the json web token on logging in to assign relationship ids in which case wil be protected.
memberRouter.post("/", tokenCheck, addMember);

//Delete member
memberRouter.delete("/", tokenCheck, deleteMember);

//Get family members as in just the members in a specific family
memberRouter.get("/familyMembers",tokenCheck, getFamilyMembers); 

//Get all members
memberRouter.get("/", getAllMembers);

//Update Points
memberRouter.put("/pointsUpdate", updatePoints);

// change name of the member.
// memberRouter.put("/changeName");

module.exports = memberRouter;
