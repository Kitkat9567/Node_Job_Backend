const companyRepository = require("../repository/companyRepository")


const createNewCompany = async (req, res, next) => {
    const company = req.body;
    try {
        const response = await companyRepository.createCompany(company);
        const compObj = response.toObject();
        const {password, ...withoutPassword} = compObj;
        return res.status(201).json({message:"New Account Created",company:withoutPassword});
    } catch (error) {
        if (error.code === 11000) { 
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


module.exports = {
    createNewCompany
}