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

  async findUserById(id){
    try {
      const result = await Users.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new UserRepository();
