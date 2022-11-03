const { Butler } = require("butler-sdk");
const apiKey = process.env.APIKEY;
const queueId = process.env.QUEUEID;
const client = new Butler(apiKey);
const fs = require("fs");
var multer = require("multer");
const upload = multer({ dest: process.env.DEFAULT_IMAGE_PATH });

exports.scanReceipt = (req, res) => {
  if (req.file.path && typeof req.file.path != undefined) {
    const file = fs.createReadStream(req.file.path);

    client
      .extractDocument(queueId, file)
      .then((response) => {
        console.log(response);
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.send("File does not exist");
  }
};

exports.uploadreceipt = (req, res) => {
  console.log(req.body);
  res.send("Image has been uploaded here : " + req.file.path);
};

exports.imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(process.env.NEW);
    cb(null, process.env.DEFAULT_IMAGE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
