// global imports
import path from "path";
import express from "express";
import multer from "multer";
// authMiddleware
import { protect } from "../middlewares/authMiddleware.js";
// roles
import { grantAccess } from "../middlewares/roleMiddleware.js";

// init route
const router = express.Router();

// create Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check filte type (STACK overflow)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Nur Bilder der formate jpg, jpeg oder png sind erlaubt");
  }
}

// upload with multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Post an image
router.route("/").post(
  // protect,
  // grantAccess("createAny", "uploads"),
  upload.single("image"),
  (req, res) => {
    res.send(`/${req.file.path}`);
  }
);

export default router;
