const position = require("../models/Position");
const AWS = require("aws-sdk");
const config = require("../utills/config");

AWS.config.update({
  region: config.aws_remote_config.region,
  accessKeyId: config.aws_remote_config.accessKeyId,
  secretAccessKey: config.aws_remote_config.secretAccessKey,
});
const addPostion = async (req, res, next) => {
  try {
    var _saved = {
      streetId: req.body.streetId,
      isWorking: req.body.isWorking,
      village: req.body.village,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      taluka: req.body.taluka,
      district: req.body.district,
      pincode: req.body.pincode,
      isWorking: true,
    };
    // let data = new position(_saved);
    // await data.save();
    const params = {
      TableName: "position",
      Item: _saved,
    };
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    const positions = await dynamoClient.put(params).promise();
    console.log(positions);
    return res.json({
      data: _saved,
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

const getAllPositions = async (req, res, next) => {
  try {
    const params = {
      TableName: "position",
    };
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    const positions = await dynamoClient.scan(params).promise();
    return res.json({
      data: positions.Items,
      status: 200,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addPostion,
  hi,
  getAllPositions,
};
