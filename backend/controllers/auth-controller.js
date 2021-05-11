const authenticateUser = require('../services/user');

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  console.log('email, password', email, password);
  const user = await authenticateUser.authenticateUser(email, password);
  return user ? res.status(200).send(user) : res.status(401).send({
    message: 'Bad Credential',
    status: 401,
  });
};

module.exports = {
  authenticate,
};
