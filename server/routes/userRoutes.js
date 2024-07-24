<<<<<<< HEAD
const express = require("express")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/authMiddleware")
const EmailHelper = require("../utils/emailSender")

const router = express.Router()

const otpGenerator = function () {
  return Math.floor(Math.random() * 10000 + 90000)
=======
const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const EmailHelper = require("../utils/emailSender");

const router = express.Router();

//Function for otp generation

const otpGenerator = function () {
  return Math.floor((Math.random() * 10000) + 90000);
>>>>>>> origin/main
}

router.post("/register", async (req, res) => {
  try {
<<<<<<< HEAD
    const userExists = await User.findOne({ email: req.body.email })

=======
    const userExists = await User.findOne({ email: req.body.email });
>>>>>>> origin/main
    if (userExists) {
      res.send({
        success: false,
        message: "The user already exists!",
<<<<<<< HEAD
      })
    }

    const salt = await bcrypt.genSalt(10)

    console.log(salt)
    const hashPwd = bcrypt.hashSync(req.body.password, salt)

    req.body.password = hashPwd

    const { name, email, password, role } = req.body

    const userRole = role == false ? "user" : "partner"

    const newUser = await User({
      name,
      email,
      password,
      role: "admin",
    })

    await newUser.save()

    res.send({
      success: true,
      message: "You've successfully signed up, please login now!",
    })
  } catch (err) {
    console.log(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
=======
      });
    }
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    console.log(hashPwd);
    req.body.password = hashPwd;
    

    const newUser = await User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "You've successfully signed up, please login now!",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
>>>>>>> origin/main

    if (!user) {
      res.send({
        success: false,
        message: "user does not exist Please Register",
<<<<<<< HEAD
      })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
=======
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
>>>>>>> origin/main

    if (!validPassword) {
      res.send({
        success: false,
        message: "Sorry, invalid password entered!",
<<<<<<< HEAD
      })
    }

    const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
      expiresIn: "1d",
    })
=======
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.secretKey, {
      expiresIn: "1d",
    });
>>>>>>> origin/main

    res.send({
      success: true,
      message: "You've successfully logged in!",
      token: token,
<<<<<<< HEAD
    })
  } catch (error) {
    console.error(error)
  }
})
=======
    });
  } catch (error) {
    console.error(error);
  }
});
>>>>>>> origin/main

// router-level-middleware

router.get("/get-current-user", authMiddleware, async (req, res) => {
<<<<<<< HEAD
  const user = await User.findById(req.body.userId).select("-password")

  res.send({
    success: true,
    message: "You are authorized to go to the protected route!",
    data: user,
  })
})
=======
  const user = await User.findById(req.body.userId).select("-password");

  res.send({
    success: true,
    message: 'You are authorized to go to the protected route!',
    data: user
   })
});
>>>>>>> origin/main

// forgot password

router.patch("/forgetpassword", async function (req, res) {
  try {
    /****
<<<<<<< HEAD
     * 1. You can ask for email
     * 2. check if email is present or not
     *  * if email is not present -> send a response to the user(user not found)
     * 3. if email is present -> create basic otp -> and send to the email
     * 4. also store that otp -> in the userModel
     * 5. to avoid that collison
     *      response -> unique url with id of the user and that will form your reset password
     *
     * ***/
    if (req.body.email == undefined) {
      return res.status(401).json({
        status: "failure",
        message: "Please enter the email for forget Password",
      })
    }
    // find the user -> going db -> getting it for the server
    let user = await User.findOne({ email: req.body.email })
    if (user == null) {
      return res.status(404).json({
        status: "failure",
        message: "user not found for this email",
      })
    }
    // got the user -> on your server
    const otp = otpGenerator()
    user.otp = otp
    user.otpExpiry = Date.now() + 10 * 60 * 1000
    // those updates will be send to the db
    await user.save()
    res.status(200).json({
      status: "success",
      message: "otp sent to your email",
    })
    // send the mail to there email -> otp
    await EmailHelper("otp.html", user.email, {
      name: user.name,
      otp: otp,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
=======
            * 1. You can ask for email
            * 2. check if email is present or not
            *  * if email is not present -> send a response to the user(user not found)
            * 3. if email is present -> create basic otp -> and send to the email 
            * 4. also store that otp -> in the userModel
            * 5. to avoid that collison
            *      response -> unique url with id of the user and that will form your reset password 
            * 
            * ***/
    if (req.body.email == undefined) {
      return res.status(401).json({
        status: "failure",
        message: "Please enter the email for forget Password"
      })
    }
    // find the user -> going db -> getting it for the server
    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(404).json({
        status: "failure",
        message: "user not found for this email"
      })
    }
    // got the user -> on your server
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    // those updates will be send to the db
    await user.save();
    res.status(200).json({
      status: "success",
      message: "otp sent to your email",
    });
    // send the mail to there email -> otp
    await EmailHelper(
      "otp.html"
      , user.email,
      {
        name: user.name,
        otp: otp
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure"
>>>>>>> origin/main
    })
  }
  //  email
})

<<<<<<< HEAD
router.patch("/resetpassword", async function (req, res) {
  //  -> otp
  //  newPassword and newConfirmPassword
  // -> params -> id
  try {
    let resetDetails = req.body
    // required fields are there or not
    if (!resetDetails.password == true || !resetDetails.otp == true) {
      return res.status(401).json({
        status: "failure",
        message: "invalid request",
      })
    }
    // i will serach with the id -> user
    const user = await User.findOne({ otp: req.body.otp })
=======

router.patch("/resetpassword", async function (req, res) {
  //  -> otp 
  //  newPassword and newConfirmPassword 
  // -> params -> id 
  try {
    let resetDetails = req.body;
    // required fields are there or not 
    if (!resetDetails.password == true || !resetDetails.otp == true) {
     return res.status(401).json({
        status: "failure",
        message: "invalid request"
      })
    }
    // i will serach with the id -> user
    const user = await User.findOne({ otp: req.body.otp });
>>>>>>> origin/main
    // if user is not present
    if (user == null) {
      return res.status(404).json({
        status: "failure",
<<<<<<< HEAD
        message: "user not found",
=======
        message: "user not found"
>>>>>>> origin/main
      })
    }
    // if otp is expired
    if (Date.now() > user.otpExpiry) {
      return res.status(401).json({
        status: "failure",
<<<<<<< HEAD
        message: "otp expired",
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPwd = bcrypt.hashSync(req.body.password, salt)
    user.password = hashPwd
    // remove the otp from the user
    user.otp = undefined
    user.otpExpiry = undefined
    await user.save()
    res.status(200).json({
      status: "success",
      message: "password reset successfully",
=======
        message: "otp expired"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    user.password = hashPwd;
    // remove the otp from the user
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "password reset successfully"
>>>>>>> origin/main
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
<<<<<<< HEAD
      status: "failure",
    })
  }
})

module.exports = router
=======
      status: "failure"
    })
  }


})

module.exports = router;
>>>>>>> origin/main
