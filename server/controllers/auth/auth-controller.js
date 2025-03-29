import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Register
export const register = async (req, res) => {
  // console.log("Incoming Data:", req.body);
  const { userName, email, password } = req.body;

  try {
    if (!userName) {
      return res
        .status(400)
        .json({ success: false, message: "User Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    if (userName) {
      const userNameExists = await User.findOne({ userName });
      if (userNameExists) {
        return res
          .status(400)
          .json({ success: false, message: "User Name already exists" });
      }
    }
    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName,
      },
      process.env.JWT_SCERET,
      { expiresIn: "60m" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          userName: checkUser.userName,
          email: checkUser.email,
          role: checkUser.role,
          userName: checkUser.userName,
          token,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// logout

export const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "User logged out successfully",
  });
};

// auth Middleware

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SCERET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
