const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const passportVerificator = passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
    },
    async (payload, done) => {
      try {
        let userFounded = await User.findOne({ email: payload.email });
        if (userFounded) {
          return done(null, userFounded);
        } else {
          return done(null);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

const hashPassword = (req, res, next) => {
  try {
    const passwordPlain = req.body.password;
    const hashPassword = bcrypt.hashSync(passwordPlain, 10);
    req.body.password = hashPassword;
    next();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const verifyPassword = (req, res, next) => {
  const passwordPlain = req.body.password;
  const hashPassword = req.user.password;
  const isValid = bcrypt.compareSync(passwordPlain, hashPassword);
  if (isValid) {
    next();
  } else {
    res.status(400).json({ message: "Wrong password" });
  }
};

const verifyUserExist = async (req, res, next) => {
  const { email } = req.body;
  const userFounded = await User.findOne({ email: email });

  if (userFounded) {
    req.user = userFounded;
    next();
  } else {
    res.status(400).json({ message: "User not founded" });
  }
};

const generateToken = (req, res, next) => {
  try {
    let secretKay = "secretKey";
    let token = jwt.sign({ email: req.user.email }, secretKay, {
      expiresIn: 60 * 3,
    });
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyUserExist,
  generateToken,
  passportVerificator,
};
