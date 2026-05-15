const Users = require("../models/userModel");

class UserRepository {
  async createUser(user) {
     try {
      const newUser = new Users(user); 
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error; 
    }
  }
}

module.exports = new UserRepository();
