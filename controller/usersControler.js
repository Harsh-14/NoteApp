const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const OTP = require("../models/otp");
const nodemailer = require("nodemailer");
const otp = require("../models/otp");

var html = ``;

const mailFunction = (userMail, subject, text, confirmationCode, html) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "notekaro.lk@gmail.com",
      pass: "90embe%vmr*y$6vb98@214BInJAM",
    },
  });

  var mailOptions = {
    from: "notekaro.lk@gmail.com",
    to: userMail,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }
    const _user = await User.findOne({ email });
    if (_user) {
      return res.status(400).json({ error: "User already there" });
    } else {
      const token = jwt.sign({ email: req.body.email }, JWT_SECRET);

      const user = new User({
        username,
        email,
        password,
        confirmationCode: token,
      });
      let confirmationCode = token;
      html = `<h1>Email Confirmation</h1>

      <h2>Hello ${email}</h2>
      <p>Thank you for SignUp. Please confirm your email by clicking on the following link</p>
      <a href=https://noteapp-zeta.vercel.app//NOTE_PAD/confirm/${confirmationCode}> Click here</a>
      </div>`;

//       mailFunction(email, "Verification", "click Link", confirmationCode, html);

      user.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          return res.status(200).json({
            message:
              "please Verify your email,email send to your email address",
          }).send(mailFunction(email, "Verification", "click Link", confirmationCode, html));
        }
      });
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: "Something went wrong" });
  }
};
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }

    var _user = await User.findOne({ username });
    if (!_user) {
      var email = username;

      const _email = await User.findOne({ email });
      if (!_user && !_email) {
        return res.status(400).json({ error: "User Not Found Please SignUp" });
      }
      _user = _email;
    }
    if (_user) {
      if (_user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      } else {
        if (_user.authenticate(password)) {
          const token = jwt.sign({ _id: _user.id }, JWT_SECRET, {
            // expiresIn: "1h", token limit
          });
          const { _id, username, email } = _user;
          res.status(200).json({
            token,
            user: {
              _id,
              username,
              email,
            },
            message: "User Login sucessfully",
          });
        } else {
          res.status(400).json({ error: "Invalid usernme or password" });
        }
      }
    }
  } catch (e) {
    res.status(400).json({ error: "please Signup" });
  }
};

exports.requireSignin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    // const verifyUser = await jwt.verify(token, process.env.JWT_SECRET);
    const verifyUser = await jwt.verify(token, JWT_SECRET);
    req.user = verifyUser;
    next();
  } catch (e) {
    res.status(400).json({ error: "please Signin" });
  }
};

exports.emailSend = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Fill field" });
    }
    const _user = await User.findOne({ email });
    if (_user) {
      let otpcode = Math.floor(Math.random() * 100000 + 1);
      let otpdata = new OTP({
        email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000, // expire in 5 minute
      });
      const otpRes = await otpdata.save();
      html = `
      <p>OTP will be destroy in 5 minutes </p>
      <h2>Your OTP : ${otpcode}<h2>`;

      mailFunction(email, `OTP`, String(otpdata.code), html);
      res.status(200).json({ message: "Otp send in Your email" });
    } else {
      return res.status(400).json({ error: "No user Found please signup" });
    }
  } catch (e) {
    console.log(e);
  }
  // res.status(200).json('ok')
};

exports.changePassword = async (req, res) => {
  
  if (!req.body.email) {
    return res.status(400).json({ error: "fill up field" });
  }
  try{
  const data = await otp.findOne({email:req.body.email,code:req.body.code})
  if (data ) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      return res.status(400).json({ error: "token expire" });
    } else {
      let user = await User.findOne({email:req.body.email });
      
      user.password = req.body.password;
      user.save();
      res.status(200).json({ message: "Password change  successfully" });
    }
  } else {
    return res.status(400).json({ error: "Enter Correct OTP " });
  }
}
catch(e)
{
  console.log(e)
  return res.status(400).json({error:"Enter Register email id"})
}
};

exports.verifyUser = (req, res, next) => {
  try {
    res.redirect("https://noteapp-zeta.vercel.app/");
    User.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        user.status = "Active";

        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      })
      .catch((e) => console.log("error", e));
  } catch (e) {
    console.log(e);
  }
};

exports.deleteAcc = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "Something is wrong" });
    } else {
      const del = await User.findByIdAndRemove({ _id: id });

      res.status(200).json({ message: "user delete successfully!" });
    }
  } catch (e) {
    console.log(e);
  }
};
