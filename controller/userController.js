const UserRepository = require("../repository/userRepository");
const User = require("../models/userModel");


const createNewUser = async (req, res, next) => {
  const user = req.body;
  try {
    const response = await UserRepository.createUser(user);
    const userObj = response.toObject();
    const { password, ...userWithoutPassword } = userObj; 
    return res.status(201).json({ 
      message: "New user created", 
      user: userWithoutPassword  
    });
  } catch (error) {
    console.error("Error in createNewUser:", error);
    if (error.code === 11000) { 
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
    createNewUser
}