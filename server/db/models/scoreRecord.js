const db = require("../db")
const {STRING,FLOAT,Op, INTEGER} = require("sequelize")


const ScoreRecord = db.define("scoreRecord",{
    candidate_id:{
        type:INTEGER,
        primaryKey:true
    },
    communication_score:{
        type:INTEGER,
        allowNull:false
    },
    coding_score:{
        type:INTEGER,
        allowNull:false
    },
    title:{
        type:STRING,
        allowNull:false
    }
})

ScoreRecord.findCandidate=async (candidateId)=>{
    const candidate = (await ScoreRecord.findByPk(candidateId,{
        include:{all:true}
    }))
    return candidate

}

ScoreRecord.findCandidates = async(similarCompanyList,title)=>{
    const candidatesList = ScoreRecord.findAll({
        where:{
            company_id:similarCompanyList,
            title:title
        }
    })
    return candidatesList
}


ScoreRecord.calPercentile= (candidatesList,candidate)=>{
    const comScoreList = candidatesList.map(candidate=>candidate.communication_score)
    const codeScoreList = candidatesList.map(candidate=>candidate.coding_score)
    const comPercentile =  calPercentile(comScoreList,candidate.communication_score)
    const codePercentile = calPercentile(codeScoreList,candidate.coding_score)
    return [comPercentile,codePercentile]
}


const calPercentile = (listOfData,x)=> {
   const numOfDataBelowX = listOfData.filter(num=>num<x).length
   const p= numOfDataBelowX/listOfData.length * 100
   return Number.parseFloat(p).toFixed(2)
   

}

module.exports=ScoreRecord