import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
  const {name, email, password,username} = req.body;
  const existingEmail=await User.find({email});
  if(existingEmail){
    return res.status(400).json({message:"Email already exists"});
  }
  const existingUsername=await User.find({username});
  if(existingUsername){
    return res.status(400).json({message:"Username already exists"});
  }
  if(password.length<6){
    return res.status(400).json({message:"Password must be at least 6 characters"});
  }
  // Hash the password
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt);
  const newUser=new User({
    name,
    email,
    password:hashedPassword,
    username,
  });
  try {
    const user=await newUser.save();
    res.status(201).json({message:"User created successfully",user});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(201).json({message:"User created successfully",user,token});
    res.cookie("access_token",token,
      {httpOnly:true,//prevents client side js from accessing the cookie
      secure:process.env.NODE_ENV==="production",//only send cookie over https in production
      sameSite:"strict",//prevents CSRF attacks
      maxAge: 24*60*60*1000, // 1 day
    }).status(201).json({message:"User created successfully",user,token});
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
  

};
export const logout = (req, res) => {
  // In a real application, i would handle session termination here
  res.status(200).json({ message: 'Logout successful' });
};
export const login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

