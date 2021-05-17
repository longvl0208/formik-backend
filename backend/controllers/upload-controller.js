const uploadServices = require('../services/upload');

const upload = async (req, res) => {
  await uploadServices.uploadFunc();
};

module.exports = {
  upload,
};
