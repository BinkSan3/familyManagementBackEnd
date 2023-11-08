const Member = require("./model");
const jwt = require("jsonwebtoken");

const addMember = async (req, res) => {
  try {
    if (!req.verfication) {
      throw new Error("Not signed in");
    }
    const MemberId = req.verfication.id;
    const result = await Member.create({
      MemberId: MemberId,
      name: req.body.name,
    });

    res.status(201).json({ message: "success", result });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error: error });
    }
    res.status(500).json({ message: error.message, error: error });
  }
};

const deleteMember = async (req, res) => {
  try {
    if (!req.verfication) {
      throw new Error("Not signed in");
    }
    const result = await Member.destroy({
      where: {
        id: req.body.id,
      },
    });

    const successResponse = {
      message: "success",
      result,
    };
    res.send(successResponse);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addMember, deleteMember };
