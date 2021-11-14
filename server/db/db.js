const Sequelize = require('sequelize')
const db = new Sequelize("postgres://localhost:5432/benchmarking",{logging:false})

module.exports=db
