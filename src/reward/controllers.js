const Reward = require("./model");
const Family = require("../family/model");
const jwt = require("jsonwebtoken");

const addNewReward = async (req, res) => {
  try {
    const FamilyId = req.verification.id;
    const result = await Reward.create({
      FamilyId: FamilyId,
      tier: req.body.tier,
      rewardPoints: req.body.rewardPoints,
    });

    res.status(201).json({ message: "success", result });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error: error });
    }
    res.status(500).json({ message: error.message, error: error });
  }
};

const getRewards = async (req, res) => {
  try {
    const result = await Reward.findAll({
      where: {
        FamilyId: req.verification.id,
      },
    });

    res.status(201).json({ message: "success", result });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const deleteReward = async (req, res) => {
  try {
    const result = await Reward.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(201).json({ message: "Task deleted", result });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const editReward = async (req, res) => {
  try {
    const result = await Reward.update(
      { tier: req.body.tier, rewardPoints: req.body.rewardPoints },
      { where: { id: req.body.id } }
    );

    res.status(201).json({ message: "Success!", result });
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  addNewReward,
  getRewards,
  editReward,
  deleteReward,
};
