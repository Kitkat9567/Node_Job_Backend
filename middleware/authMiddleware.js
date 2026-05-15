const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/userRepository");
const CompanyRepository = require("../repository/companyRepository");

const protectUser = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
            console.log('auth',authHeader);
            
        if(!authHeader){
            return res.status(401).json({message:"No Authorization header provided"});
        }
        
        const token = authHeader.split(" ")[1];
        
        if(!token){
            return res.status(401).json({message:"Unauthorized Request - Invalid token format"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('token',decoded);
        
        req.user = await UserRepository.findUserById(decoded.id);
        next();
    } catch (error) {
        console.log('Auth Error:', error.message);
        return res.status(401).json({message:"Invalid Request", error: error.message});
    }
}

const protectCompany = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).json({message:"No Authorization header provided"});
        }
        
        const token = authHeader.split(" ")[1];
        if(!token) {
            return res.status(401).json({message:"Unauthorized Request"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.company = await CompanyRepository.findCompanyById(decoded.id); // Use CompanyRepository
        next();
    } catch (error) {
        console.log('Auth Error:', error.message);
        return res.status(401).json({message:"Invalid Request", error: error.message});
    }
}


module.exports = {
    protectUser,
    protectCompany
}
