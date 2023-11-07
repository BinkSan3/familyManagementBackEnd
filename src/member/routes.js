const { Router } = require("express");
const memberRouter = Router();

//When initially creating family members upon registering
memberRouter.post("/");

// load homepage for that member once the other get route and click prompt has been fulfilled
memberRouter.get("/getMemberDetails/:name");

// This will map the users upon persistent login so they can click on their user
memberRouter.get("/");

// change name of the member.
memberRouter.put("/changeName");

module.exports = memberRouter;
