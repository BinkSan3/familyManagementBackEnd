const Member = require("./model");
const Family = require("../family/model");
const jwt = require("jsonwebtoken");

const addMember = async (req, res) => {
  try {
    if (!req.verification) {
      throw new Error("Not signed in");
    }
    const FamilyId = req.verification.id;
    const result = await Member.create({
      FamilyId: FamilyId,
      name: req.body.name,
      url: req.body.url,
      admin: req.body.admin,
      colour: req.body.colour,
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
    if (!req.verification) {
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

const getAllMembers = async (req, res) => {
  try {
    const result = await Member.findAll();

    if (result.length >= 1) {
      res.status(201).json({ message: "success", result });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getFamilyMembers = async (req, res) => {
  try {
    if (!req.verification) {
      throw new Error("Not signed in");
    }

    const result = await Member.findAll({
      where: {
        FamilyId: req.verification.id,
      },
    });

    if (result.length >= 1) {
      res.status(201).json({ message: "success", result });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addMember, deleteMember, getAllMembers, getFamilyMembers };
