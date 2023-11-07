const { Router } = require("express");
const memberRouter = Router();

const { addMember } = require("./controllers");

//When initially creating family members upon registering
memberRouter.post("/");

// load homepage for that member once the other get route and click prompt has been fulfilled
memberRouter.get("/getMemberDetails/:name");

// change name of the member.
memberRouter.put("/changeName");

module.exports = memberRouter;
