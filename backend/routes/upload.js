const express = require('express');
const multer = require('multer');
const fs = require('fs');
const uuid = require('uuid').v4();
const UploadController = require('../controllers/upload-controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.array('avatar'), (req, res) => res.json({
  status: '201',
  uploaded: req.files.length,
}));

// eslint-disable-next-line camelcase
function base64_encode(file) {
  console.log('file in base64_encode', file);
  // read binary data
  // const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  // eslint-disable-next-line no-buffer-constructor,new-cap
  // return new Buffer.from(file).toString('base64');
  // eslint-disable-next-line no-undef
  const varriable = window.btoa(String.fromCharCode(...new Uint8Array(file)));
  console.log('varriable', varriable);
  return varriable;
}

router.get('/download', (req, res) => {
  console.log('__dirname', __dirname);
  const img = `${__dirname}/../uploads/zx10r.jpg`;

  fs.access(img, fs.constants.F_OK, (err) => {
    // check that we can access  the file
    console.log(`${img} ${err ? 'does not exist' : 'exists'}`);
  });

  return fs.readFile(img, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-type': 'text/html' });
      return res.json({
        message: 'an error occur',
        status: 500,
      });
    }
    // specify the content type in the response will be an image
    // res.writeHead(200, { 'Content-type': 'image/jpg' });
    // res.end(content);
    const a = base64_encode(content);
    console.log('base 64 content+++++++++++', a);
    return res.json({
      file: a,
      status: 200,
    });
  });
});

module.exports = router;
