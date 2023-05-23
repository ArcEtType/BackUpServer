import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

/* READ */
export const getAllUsers = async (req, res) => {
  try {
    const customers = await User.find().select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

/* UPDATE */

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).send("Invalid user ID: " + userId);

    const { 
      firstName,
      lastName,
      pseudo,
      email,
      password,    
      role, } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { 
      
      firstName,
      lastName,
      pseudo,
      email,
      password,    
      role,

     }, { new: true });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found." });

    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
  
/* DELETE */

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).send("Invalid user ID: " + userId);

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found." });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error: Mismatched user ID." });
  }
};

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      pseudo,
      email,
      password,    
      role,
    } = req.body;

      const savedUser = await User.create(
      {
        firstName,
        lastName,
        pseudo,
        email,
        password,
        role,
        
      }
    );
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { pseudo, password } = req.body;
    const user = await User.findOne({ pseudo: pseudo });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGOUT */
export const logout = (req, res) => {
  try {
    
    res.status(200).json({ message: "Logout successful." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};