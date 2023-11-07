const { Router } = require("express");
const memberRouter = Router();

const { addMember } = require("./controllers");

//When initially creating family members upon registering
//Needs protecting? or potentially use the json web token on logging in to assign relationship ids in which case wil be protected.
memberRouter.post("/");

// load homepage for that member once the other get route and click prompt has been fulfilled
//once the family get request that includes members has been mapped into buttons this route will be part of a function that runs when said family is clicked?
memberRouter.get("/getMemberDetails/:name");

// change name of the member.
memberRouter.put("/changeName");

module.exports = memberRouter;
