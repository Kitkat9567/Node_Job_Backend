const CompanyRepository = require("../repository/companyRepository");
const UserRepository = require("../repository/userRepository");

// const createNewCompany = async (req, res, next) => {
//   const company = req.body;
//   try {
//     const response = await CompanyRepository.createCompany(company);
//     const compObj = response.toObject();
//     const { password, ...withoutPassword } = compObj;
//     return res
//       .status(201)
//       .json({ message: "New Account Created", company: withoutPassword });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

const createNewUser = async (req, res, next) => {
  const type = req.query.type;
  const data = req.body;
  try {
    if (type === "candidate") {
      const response = await UserRepository.createUser(data);
      const userObj = response.toObject();
      const { password, ...userWithoutPassword } = userObj;
      return res.status(201).json({
        message: "New user created",
        user: userWithoutPassword,
      });
    }
    if (type === "employer") {
      const response = await CompanyRepository.createCompany(data);
      const compObj = response.toObject();
      const { password, ...withoutPassword } = compObj;
      return res
        .status(201)
        .json({ message: "New Account Created", company: withoutPassword });
    }
    return res.status(404).json({ message: "Unauthorized" });
  } catch (error) {
    console.error("Error in createNewUser:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createNewUser,
};
