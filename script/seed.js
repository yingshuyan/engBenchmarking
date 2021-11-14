const fs = require('fs');
const Papa = require('papaparse');
const companyCSVPath = 'script/companies.csv';
const scoreRecordCSVPath= 'script/score-records.csv';

const {db,models:{Company,ScoreRecord}} = require("../server/db")

//Function to exact data from cvs into variabels 
let companyCSVList,scoreRecordCSVList;

const readCSV = async (filePath,term) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
   await Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        console.log(`Complete extracting ${results.data.length} records from ${term}.csv`); 
        term==="companies"?companyCSVList=results.data:scoreRecordCSVList=results.data
      }
    });
};

readCSV(companyCSVPath,"companies")
readCSV(scoreRecordCSVPath,"scoreRecords")


async function seed() {
    await db.sync({ force: true }) // clears database
    console.log('db synced!')
    await Company.bulkCreate(companyCSVList)
    await ScoreRecord.bulkCreate(scoreRecordCSVList)

}

async function runSeed() {
    console.log('seeding...')
    try {
      await seed()
    } catch (err) {
      console.error(err)
      process.exitCode = 1
    } finally {
      console.log('closing db connection')
      await db.close()
      console.log('db connection closed')
    }
  }
  
  if (module === require.main) {
    runSeed()
  }


module.exports =seed
