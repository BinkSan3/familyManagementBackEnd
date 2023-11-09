const Family = require("./model");
const jwt = require("jsonwebtoken");
const { findMissingRequiredFields } = require("../utils/utils.js");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const getAllFamilies = async (req, res) => {
  try {
    const result = await Family.findAll({});
    if (result.length >= 1) {
      res
        .status(201)
        .json({ message: "Families successfully retrieved!", result });
      return;
    }
    res.status(404).json({ message: "Families not found." });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getSingleFamily = async (req, res) => {
  try {
    const result = await Family.findOne({
      where: {
        username: req.params.username,
      },
    });
    res.status(201).json({ message: "Family successfully found!", result });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const registerFamily = async (req, res) => {
  try {
    const requiredFields = ["username", "email", "password"];
    const missingFields = findMissingRequiredFields(requiredFields, req.body);
    if (missingFields.length >= 1) {
      res.status(409).json({
        message: `${missingFields} is missing. The fields cannot be left blank.`,
      });
      return;
    }
    const result = await Family.create(req.body);
    res.status(201).json({ message: "Account successfully created!", result });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error: error });
      return;
    }
    res.status(500).json({ message: error.message, error: error });
  }
};

const loginFamily = async (req, res) => {
  try {
    if (req.family) {
      const token = await jwt.sign(
        { id: req.family.id },
        process.env.SECRET_KEY
      );
      res.status(201).json({
        message: "Successful Token Check!",
        family: {
          username: req.family.username,
          email: req.family.email,
          token,
        },
      });
      return;
    }
    if (req.authCheck) {
      res.status(200).json({ message: "Successful Login!", family });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const updateFamilyUsername = async (req, res) => {
  try {
    const result = await Family.update(
      { username: req.body.newUsername },
      { where: { username: req.body.username } }
    );
    res
      .status(201)
      .json({ message: "Family username successfully updated!", result });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const updateFamilyPassword = async (req, res) => {
  try {
    const { newPassword, username } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log(
      `Input - Username: ${username}, New Password: ${newPassword}, Hashed Password: ${hashedPassword}`
    );

    const result = await Family.update(
      {
        password: newPassword,
      },
      {
        where: {
          username: username,
        },
      }
    );
    console.log("HELLO FROM RESULT", result);
    if (result[0] === 1) {
      res
        .status(201)
        .json({ message: "Family password successfully updated!", result });
    } else {
      res
        .status(404)
        .json({ message: "Family not found or password incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const deleteFamily = async (req, res) => {
  try {
    const result = await Family.destroy({
      where: { username: req.body.username },
    });
    res.status(201).json({
      message:
        "Family account successfully deleted. Hope to see you again soon!",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  getAllFamilies,
  getSingleFamily,
  registerFamily,
  loginFamily,
  updateFamilyUsername,
  updateFamilyPassword,
  deleteFamily,
};
