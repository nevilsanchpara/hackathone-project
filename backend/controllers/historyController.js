const AWS = require("aws-sdk");
const config = require("../utills/config");
const {v4: uuidv4} = require("uuid");

AWS.config.update({
  region: config.aws_remote_config.region,
  accessKeyId: config.aws_remote_config.accessKeyId,
  secretAccessKey: config.aws_remote_config.secretAccessKey,
});

const addHistory = async (req, res, next) => {
  try {
    AWS.config.update({
      region: config.aws_remote_config.region,
      accessKeyId: config.aws_remote_config.accessKeyId,
      secretAccessKey: config.aws_remote_config.secretAccessKey,
    });

    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    let id = uuidv4();
    var _saved = {
      streetLightId: req.body.streetLightId,
      cost: req.body.cost,
      issue: req.body.issue,
      village: req.body.village,
      taluka: req.body.taluka,
      district: req.body.district,
      pincode: req.body.pincode,
      repairedBy: req.body.repairedBy,
      workerId: req.body.workerId,
      id,
    };

    var data = {
      TableName: "History",
      Item: _saved,
    };
    let user = await dynamoClient.put(data).promise();
    console.log(user);
    console.log("IF with saved");
    // console.log(_saved);
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

const getHistory = async (req, res, next) => {
  try {
    // console.log(req.query.type==="general");
    if (req.query.type === "worker") {
      console.log("IF");
      const workerId = req.query.id;
      console.log(workerId);
      const dynamoClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: "History",
        FilterExpression: "workerId = :e",
        ExpressionAttributeValues: {
          ":e": workerId,
        },
      };
      const user = await dynamoClient.scan(params).promise();
      // console.log(user);
      return res.json({
        data: user.Items,
        status: 200,
      });
    } else {
      console.log("ELSE");
      const district = req.query.district;
      const taluka = req.query.taluka;
      if (district) {
        const dynamoClient = new AWS.DynamoDB.DocumentClient();
        const params = {
          TableName: "History",
          FilterExpression: "district = :e",
          ExpressionAttributeValues: {
            ":e": district,
          },
        };
        console.log("district");
        const user = await dynamoClient.scan(params).promise();
        console.log(user);
        return res.json({
          data: user.Items,
          status: 200,
        });
      }
      if (taluka) {
        const dynamoClient = new AWS.DynamoDB.DocumentClient();
        const params = {
          TableName: "History",
          FilterExpression: "taluka = :e",
          ExpressionAttributeValues: {
            ":e": taluka,
          },
        };
        console.log("taluka");
        const user = await dynamoClient.scan(params).promise();
        console.log(user);
        return res.json({
          data: user.Items,
          status: 200,
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addHistory,
  getHistory,
};
