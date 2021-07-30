const LoginSuccessFul = (req, res) => res.status(200).json({ token: req.token });

module.exports = LoginSuccessFul;
