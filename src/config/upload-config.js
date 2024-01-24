import multer from "multer";
import path from "path";

const storagePath = () => "storage/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath());
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadStorage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.code = "INVALID_FILE_TYPE";

      return cb(error, false);
    }

    cb(null, true);
  },
});

export { uploadStorage, storagePath };
