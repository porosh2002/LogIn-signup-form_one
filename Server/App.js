const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const saltRounds = 10;
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const RegisterUserModel = require("./Register");
//
// const whitelist = ['https://wecubs.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
const fileupload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});
//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(helmet());
//
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  RegisterUserModel.findOne({ email: md5(email) }, (error, result) => {
    if (result) {
      bcrypt.compare(password, result.password, function (err, Passok) {
        if (Passok) {
          res.json(email);
        } else {
          res.sendStatus(400);
        }
      });
    } else {
      res.sendStatus(400);
    }
  });
});
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, saltRounds).then(function (Passwordhash) {
    const Register = new RegisterUserModel({
      email: md5(email),
      password: Passwordhash,
      name,
    });
    Register.save((err, noerr) => {
      if (err) {
        res.sendStatus(400);
      }
      if (noerr) {
        res.sendStatus(200);
      }
    });
  });
});
//
app.listen(process.env.DB_PORT, async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/BoilerPlate_DB", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected & App is running`);
  } catch {
    console.log(`Database is't Connected & App is't running `);
  }
});
