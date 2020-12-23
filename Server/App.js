const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const saltRounds = 10;
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const RegisterUserModel = require("./Schema/Register");
const VideoModel = require("./Schema/Video");
const ThumbModel = require("./Schema/Thumb");
const ActivityModel = require("./Schema/likeUnlike")
const Thumbnail = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(helmet());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});
var upload = multer({ storage: storage }).single("file");
app.post("/api/VideoData", (req, res) => {
  const {
    Title,
    Des,
    fileName,
    filePath,
    ThumbnailID,
    UploaderName,
    UploadDetails,
  } = req.body;
  const VideoData = new VideoModel({
    Title,
    Des,
    fileName,
    filePath,
    ThumbnailID,
    UploaderName,
    UploadDetails,
    Views: 0,
    Likes: 0,
    UnLike: 0,
  });
  VideoData.save((err, noerr) => {
    if (err) {
      res.sendStatus(400);
      console.log(err);
    }
    if (noerr) {
      res.sendStatus(200);
    }
  });
});
app.post("/api/Video", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
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
app.post("/api/Thumb/:id", Thumbnail.single("Thumbnail"), (req, res) => {
  const Thumbnail = req.file.buffer;
  const ThumbnailID = req.params.id;
  const Thumb = new ThumbModel({
    Thumbnail,
    ThumbnailID,
  });
  Thumb.save((err, noerr) => {
    if (err) {
      res.sendStatus(400);
      console.log(err);
    }
    if (noerr) {
      res.sendStatus(200);
    }
  });
});
//
app.get("/api/video", (req, res) => {
  VideoModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.json(data);
    }
  });
});
app.get("/api/video/:id", (req, res) => {
  VideoModel.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.json(data);
    }
  });
});
app.get("/api/thumbnail/:id", (req, res) => {
  ThumbModel.find({ ThumbnailID: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(result[0].Thumbnail);
    }
  });
});
app.post("/api/getname", (req, res) => {
  RegisterUserModel.findOne({ email: md5(req.body.id) }, (error, result) => {
    if (result) {
      res.json(result.name);
    } else {
      res.status(400);
    }
  });
});
app.post("/api/viewsUpdate/:id", (req, response) => {
  if (req.params.id) {
    VideoModel.findOne({ _id: req.params.id }, (err, data) => {
      const newViews = Number(data.Views) + 1;
      VideoModel.updateOne(
        { _id: req.params.id },
        { Views: newViews },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            response.sendStatus(200);
          }
        }
      );
    });
  } else {
    res.sendStatus(400);
  }
});
app.post("/api/LikeUpdate/:id", (req, response) => {
  const { userID } = req.body;
  if (req.params.id) {
    VideoModel.findOne({ _id: req.params.id }, (err, data) => {
      const newLikes = Number(data.Likes) + 1;
      VideoModel.updateOne(
        { _id: req.params.id },
        { Likes: newLikes },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            ActivityModel.findOne({ userID:userID,ContentID: req.params.id}, (err, data) => {
              if (err) {
                console.log(err);
              }
              if (data === null) {
                const Activity = new ActivityModel({
                  Liked: true,
                  UnLiked: false,
                  userID: req.body.userID,
                  ContentID: req.params.id
                });
                Activity.save((err, noerr) => {
                  if (err) {
                    console.log(err);
                  }
                  if (noerr) {
                    response.json(newLikes);
                  }
                });
              }
              if (data !== null) {
                ActivityModel.updateOne({ userID: req.body.userID , ContentID: req.params.id }, { Liked: true }, (err, res) => {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    response.json(newLikes);
                  }
                })
              }
            })
            // 
          }
        }
      );
    });
  } else {
    res.sendStatus(400);
  }
});
app.post("/api/UNLikeUpdate/:id", (req, response) => {
  if (req.params.id) {
    VideoModel.findOne({ _id: req.params.id }, (err, data) => {
      const newUnLikes = Number(data.UnLike) + 1;
      VideoModel.updateOne(
        { _id: req.params.id },
        { UnLike: newUnLikes },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {




            ActivityModel.findOne({ userID: req.body.userID,ContentID: req.params.id}, (err, data) => {
              if (err) {
                console.log(err);
              }
              if (data === null) {
                const Activity = new ActivityModel({
                  Liked: false,
                  UnLiked: true,
                  userID: req.body.userID,
                  ContentID: req.params.id
                });
                Activity.save((err, noerr) => {
                  if (err) {
                    console.log(err);
                  }
                  if (noerr) {
                    response.json(newUnLikes);
                  }
                });
              }
              if (data !== null) {
                ActivityModel.updateOne({ userID: req.body.userID,ContentID: req.params.id}, { UnLiked: true }, (err, res) => {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    response.json(newUnLikes);
                  }
                })
              }
            })
          }
        }
      );
    });
  } else {
    res.sendStatus(400);
  }
});
app.get("/uploads/:id", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.id);
});
app.get("/api/activity/:id/:Userid", (req, res) => {
  const { id, Userid } = req.params;
  ActivityModel.findOne({ContentID: id,userID: Userid}, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.json(data)
    }
  })
})
app.get("/api/activity/:id", (req, res) => {
  const { id} = req.params;
  ActivityModel.findOne({ContentID: id}, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
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
