const Family = require("./model");

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

module.exports = {
  getAllFamilies,
  getSingleFamily,
};
