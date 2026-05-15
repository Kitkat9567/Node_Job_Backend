const Users = require("../models/userModel");
const Company = require("../models/companyModel");

class AuthRepository {
  async findUserbyEmail(email) {
    try {
      const result = await Users.findOne({email});
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findCompbyEmail(email){
    try {
        const result = Company.findOne({email});
        return result;
    } catch (error) {
        throw error;
    }
  }
}

module.exports = new AuthRepository();
