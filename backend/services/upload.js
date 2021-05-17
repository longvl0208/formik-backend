const db = require('../sql/db');
const multer = require('multer');
const uuid = require('uuid').v4();

const uploadFunc = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const { originalname } = file;
      cb(null, originalname);
    },
  });
  const upload = multer({ dest: 'uploads/' });
};

module.exports = {
  uploadFunc,
};
