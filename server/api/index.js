const router = require('express').Router()
const {models:{Company,ScoreRecord}} = require("../db")

router.get("/percentile",async(req,res,next)=> {
    try{
        const candidateId = req.query.id
        const candidate = await ScoreRecord.findCandidate(candidateId)
        const fractalIndex = candidate.company.fractal_index
        const similarCompanyList =await Company.findSimilar(fractalIndex)
        const candidatesList = await ScoreRecord.findCandidates(similarCompanyList,"Engineer")
        const percentile = await ScoreRecord.calPercentile(candidatesList,candidate)
        res.status(200).send(percentile)
    
    }catch(er){
        next(er)
    }
}
)


router.get("/test/candidate",async(req,res,next)=> {
    try{
        const candidateId = req.query.id
        const candidate = await ScoreRecord.findCandidate(candidateId)
        res.status(200).send(candidate)
        
    }catch(er){
        next(er)
    }
}
)

router.get("/test/companies",async(req,res,next)=> {
    try{
        const candidateId = req.query.id
        const candidate = await ScoreRecord.findCandidate(candidateId)
        const fractalIndex = candidate.company.fractal_index
        const similarCompanyList =await Company.findSimilar(fractalIndex)
       
        res.status(200).send(similarCompanyList)
    
    }catch(er){
        next(er)
    }
}
)


router.get("/test/candidates",async(req,res,next)=> {
    try{
        const candidateId = req.query.id
        const candidate = await ScoreRecord.findCandidate(candidateId)
        const fractalIndex = candidate.company.fractal_index
        const similarCompanyList =await Company.findSimilar(fractalIndex)
        const candidatesList = await ScoreRecord.findCandidates(similarCompanyList,"Engineer")
        const candidateIdList = candidatesList.map(candidate=>candidate.candidate_id)
        res.status(200).send(candidateIdList)
    
    }catch(er){
        next(er)
    }
}
)

module.exports = router