const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const generateToken = ({ name, email, _id }) => {
  const token = jwt.sign({ name, email, _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const registerNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({success:false,message:"email and password required"});
    }
    if (!validator.isEmail(email)) {
      return res
        .status(500)
        .send({success:false, message: "email is not valid email address" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(500).send({success:false, message: "Enter Strong Password" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(500).send({
        success:false,
        message: `User with this email ${email} already exists!`,
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });
    res.send({
      success: true,
      message: "Registration Successful",
    });
  } catch (err) {
    res.status(500).send({success:false,message:"Registration failed"});
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Payload: ", email, password);
    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "Email and Password required" });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .send({ success: false, message: "Register First" });
    }

    let isSame = await bcrypt.compare(password, user.password);

    if (!isSame) {
      return res
        .status(500)
        .send({ success: false, message: "Wrong Password" });
    }

    let token = generateToken(user);
    res.send({
      success: true,
      message: "Login Successful",
      user: {
        isAuth: true,
        name: user.name,
        email: user.email,
      },
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: "Login failed" });
  }
};

const getUser = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(404).send("User id is not provided");
    }
    const userdata = await User.findById(id, { password: false });
    res.send({
      data: userdata,
    });
  } catch (err) {
    res.status(500).send("User is not logged In");
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  getUser,
};
