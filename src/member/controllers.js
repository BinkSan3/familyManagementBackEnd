const Member = require("./model");
const jwt = require("jsonwebtoken");

const addMember = async (req, res) => {
  try {
    const result = await Member.create(req.body);

    res.status(201).json({ message: "success", result });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error: error });
    }
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addMember };
