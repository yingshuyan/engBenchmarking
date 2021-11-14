const db = require("../db")
const {FLOAT,Op, INTEGER} = require("sequelize")

const Company = db.define("company",{
    company_id:{
        type: INTEGER,
        primaryKey:true
    },
    fractal_index:{
        type:FLOAT,
        allowNull:false
    }

})

Company.findSimilar= async(fractalIndex)=>{
    const similarCompanyList = await Company.findAll({
        where:{
            fractal_index:{
                [Op.and]:[{[Op.gt]:fractalIndex-0.15},{[Op.lt]:fractalIndex+0.15}]
            }
        }
    })


    const companyIdList =similarCompanyList.map(company=>company.company_id)
    return companyIdList

    }



module.exports= Company