import User from "../Models/auth.model.js";
import { createHash, compareHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";


import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    const hashedPassword = await createHash({
      plaintext: password,
    });

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userData = user.toJSON();
    delete userData.password;

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: userData,
    });

  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await compareHash({ plaintext: password, hashValue: user.password });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = generateToken(user.id, user.email, user.username, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = generateToken(user.id, user.email, user.username, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
    res.json({ data: { user, accessToken, refreshToken }, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

