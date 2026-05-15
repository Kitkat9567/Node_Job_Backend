const Company = require("../models/companyModel");


class CompanyRepository{

    async createCompany(company){
        try {
            const newCompany = new Company(company);
            const result = await newCompany.save();
            return result;
        } catch (error) {
            throw error;
        }
    } 

    async findCompanyById(id){
        try{
            const company = await Company.findById(id)
            return company;
        }catch(error){
            throw error
        }
    }
}

module.exports = new CompanyRepository();