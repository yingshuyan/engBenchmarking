const db = require('./db');
const Company= require('./models/company');
const ScoreRecord = require('./models/scoreRecord');

Company.hasMany(ScoreRecord,{foreignKey:"company_id"});
ScoreRecord.belongsTo(Company,{foreignKey:"company_id"});

module.exports = {
db,
models:{
    Company,
    ScoreRecord
},
}