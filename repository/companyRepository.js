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
}

module.exports = new CompanyRepository();