const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const createToken = require("../utills/createToken");
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
const config = require("../utills/config");
const {v4: uuidv4} = require("uuid");

const addUser = async (req, res, next) => {
  try {
    AWS.config.update({
      region: config.aws_remote_config.region,
      accessKeyId: config.aws_remote_config.accessKeyId,
      secretAccessKey: config.aws_remote_config.secretAccessKey,
    });

    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      FilterExpression: "email = :e",
      ExpressionAttributeValues: {
        ":e": req.body.email,
      },
    };
    const ifMainExist = await dynamoClient.scan(params).promise();
    console.log(ifMainExist.Items);
    console.log(ifMainExist.Items.length);
    console.log(ifMainExist.Items.length > 0);
    if (!(ifMainExist.Items.length > 0)) {
      var id = uuidv4();
      console.log(id);
      var _saved = {
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        pincode: req.body.pincode,
        village: req.body.village,
        district: req.body.district,
        state: req.body.state,
        taluka: req.body.taluka,
        roleId: req.body.roleId,
      };
      var password = generator.generate({
        length: 6,
        numbers: true,
      });
      _saved.password = password;
      let transporter = nodemailer.createTransport({
        service: "sntp@gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "aakalp.team@gmail.com",
          pass: "icqstbcudxhqutje",
        },
      });
      var mailOptions = {
        from: "aakalp.team@gmail.com",
        to: req.body.email,
        subject: "Welcome to street-light",
        html: `<body style="background-color:#d3d3d3;text-align:center">

<h3 style="color:white;margin-top:20px">Here is your valid credentials..Please do login from below credentials</h3>
<img src="https://i.pinimg.com/564x/d8/d3/0a/d8d30a625eba6f22770d84603c299f7e.jpg" height="80%" width="80%" />
<h4 style="color:black">Email: ${req.body.email}</h4>
<h4 style="color:black;margin-bottom:20px">password: ${password}</h4>
</body>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      var data = {
        TableName: config.aws_table_name,
        Item: _saved,
      };
      let user = dynamoClient.put(data).promise();
      // console.log(user);
      console.log("IF with saved");
      console.log(_saved);
      return res.json({
        data: _saved,
        status: 200,
      });
    } else {
      console.log("else");
      return res.json({
        data: {},
        message: "user already exists!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.errors);
  }
};

//login for every user
const login = async (req, res) => {
  try {
    AWS.config.update({
      region: config.aws_remote_config.region,
      accessKeyId: config.aws_remote_config.accessKeyId,
      secretAccessKey: config.aws_remote_config.secretAccessKey,
    });

    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      FilterExpression: "email = :e",
      ExpressionAttributeValues: {
        ":e": req.body.email,
      },
    };
    const user = await dynamoClient.scan(params).promise();
    console.log(user.Items[0].password);

    if (user) {
      const password = req.body.password;
      const validpassword = password === user.Items[0].password;
      if (validpassword) {
        var data = {
          email: user.email,
          _id: user._id,
          phone: user.phone,
        };
        const token = await createToken(data);
        return res.json({
          data: {...user.Items[0], token: token},
          status: 200,
        });
      } else {
        return res.json({
          data: {error: "please enter valid password"},
          status: 400,
        });
      }
    } else {
      return res.json({
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const hi = async (req, res, next) => {
  // res.json({name: "yash"});

  AWS.config.update({
    region: config.aws_remote_config.region,
    accessKeyId: config.aws_remote_config.accessKeyId,
    secretAccessKey: config.aws_remote_config.secretAccessKey,
  });
  console.log("hello");
  const dynamoClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: config.aws_table_name,
  };
  const users = await dynamoClient.scan(params).promise();
  console.log(users);
};

module.exports = {
  addUser,
  hi,
  login,
};

// const params = {
//   TableName: config.aws_table_name,
//   FilterExpression: "roleId = :r AND pincode = :s",
//   // Key: {
//   //   email,
//   // },
//   ExpressionAttributeValues: {
//     ":r": 1,
//     ":s": 395004,
//   },
// };
