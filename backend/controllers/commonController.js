const positionModel = require("../models/Position");
const userModel = require("../models/User");

const getCommonData = async (req, res, next) => {
  try {
    const district = req.query.district;
    // console.log("_______________________", district);
    console.log("_______________________");
    // console.log(district);
    const totalStreetLight = await userModel.find({
      district: district,
    });
    const currentWorkingStreetLight = await positionModel.find({
      isWorking: true,
      district: district,
    });
    // console.log(currentWorkingStreetLight);
    const currentFaultStreetLight = await positionModel.find({
      isWorking: false,
      district: district,
    });
    const totalSupervisors = await positionModel.find({
      isWorking: false,
      district: district,
    });
    const totalWorkers = await positionModel.find({
      isWorking: false,
      district: district,
    });
    // console.log(currentFaultStreetLight);
    let user = {
      totalStreetLight: totalStreetLight.length,
      currentWorkingStreetLight: currentWorkingStreetLight.length,
      currentFaultStreetLight: currentFaultStreetLight.length,
      totalSupervisors: totalSupervisors.length,
      totalSupervisors: totalSupervisors.length,
    };
    return res.json({
      data: user,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.errors);
  }
};
const hi = async (req, res, next) => {
  res.send("hi");
};

module.exports = {
  getCommonData,
  hi,
};
