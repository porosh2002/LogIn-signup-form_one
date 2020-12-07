const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const saltRounds = 10;
require("dotenv").config();
const mongoose = require("mongoose");
// const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const RegisterUserModel = require("./Schema/Register");
const VideoModel = require ('./Schema/Video');
const { json } = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(helmet());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.mp4') {
          return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
      }
      cb(null, true)
  }
})
var upload = multer({ storage: storage }).single("file")
app.post('/api/VideoData',(req,res)=>{
  const {Title,Des,fileName,filePath} = req.body;
  const VideoData = new VideoModel({
    Title,Des,fileName,filePath
  })
  VideoData.save((err, noerr) => {
    if (err) {
      res.sendStatus(400);
      console.log(err);
    }
    if (noerr) {
      res.sendStatus(200);
    }
  });
})
app.post('/api/Video', (req, res) => {
  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err })
      }
      return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

});
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
app.get("/api/video",(req,res)=>{
  VideoModel.find({},(err,data)=>{
    if(err){
      console.log(err);
    }
    if(data){
      res.json(data)
    }
  })
})
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
