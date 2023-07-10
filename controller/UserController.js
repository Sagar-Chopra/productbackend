const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

// Controller for registration
const registration = async (req, res, next) => {
  try {
    const { name, email, password, cpassword } = req.body.body;

    if (!name || !email || !password || !cpassword) {
      return res.status(401).json({ error: "Please Fill All Fields" });
    }

    const existingEmail = await User.findOne({
      email: email,
    });

    if (existingEmail) {
      // email already exists, send an error response
      return res.status(401).json({ error: "Email already registered" });
    } else if (password != cpassword) {
      return res
        .status(401)
        .json({ error: "Password and Confirm Password is not same" });
    } else {
      const addingUser = new User({
        name,
        email,
        password,
        cpassword,
      });

      // hashing the password

      const addingUsers = await addingUser.save();
      res.status(201).json({ success: "Successfull registered" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

// controller for signin
const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body.body;
        if (!email || !password) {
          return res.status(401).json({ error: "Please Fill All Fields" });
        }
    
        const userLogin = await User.findOne({ email });
    
        if (!userLogin) {
          res.status(400).json({ error: "Invalid Credentials" });
        } else {
          const isMatch = await bcrypt.compare(password, userLogin.password);
          const token = await userLogin.generateToken();
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });
          if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials" });
          } else {
            res.json({ message: "Signin Successfull", jwtoken: token });
          }
        }
      } catch (e) {
        res.status(400).send(e);
      }
  };

module.exports = {
   registration,
   signin
};
