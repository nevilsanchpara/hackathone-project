const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const positionRoute = require("./routes/postion-routes");
const userRoute = require("./routes/user-routes");
const commonRoute = require("./routes/common-routes");
const db = require("./config/db.config.js");
const logger = require("morgan");
const historyRoutes = require("./routes/history-routes");

const app = express();
app.use(logger("dev"));

// morgan(":method :url :status :res[content-length] - :response-time ms");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
db();
app.use("/api/position", positionRoute.routes);
app.use("/api/user", userRoute.routes);
app.use("/api/testing", userRoute.routes);
app.use("/api/common", commonRoute.routes);
app.use("/api/history", historyRoutes.routes);

// app.listen(8080, () =>
app.listen(process.env.PORT || 8080, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);

// transport: {
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'contact@gmail.com',
//     pass: 'app password',
//   },
// },
// console.log(password);
// var mailOptions = {
//   from: "aakalp.team@gmail.com",
//   to: "manvi.savani@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: `Here is your password to access website ${password}`,
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
