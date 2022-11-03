const express = require("express");
const imageController = require("../controllers/imageController");
const router = express.Router();
let multer = require("multer");

let uploadImage = multer({ storage: imageController.imageStorage });

router.get("/scan-receipt", imageController.scanReceipt);
router.post(
  "/upload-receipt",
  uploadImage.single("image"),
  imageController.scanReceipt
);

module.exports = router;
