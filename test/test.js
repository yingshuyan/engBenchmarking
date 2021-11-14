const { expect } = require("chai");
const request = require("supertest");
const {db,models:{Company,ScoreRecord}} = require("../server/db")
const seed =require("../script/seed")
const app= require("../server/app")
describe("pencentile", () => {
    beforeEach(async () => {
      await seed();
    });
    describe("candidate & similar company list", () => {
      it("GET /api/test/candidate", async () => {
        const res = await request(app).get("/api/test/candidate").query({id:893}).expect(200);
        expect(res.body).to.be.an("object");
        expect(res.body.candidate_id).to.equal(893);
        
      });


      it("GET /api/test/companies", async () => {
        const res = await request(app).get("/api/test/companies").query({id:893}).expect(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(4);
        expect(res.body).to.deep.equal([1,2,3,4]);
      });

      it("GET /api/test/candidates", async () => {
        const res = await request(app).get("/api/test/candidates").query({id:893}).expect(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(31);
        expect(res.body).to.deep.equal([
          889, 890, 891, 892, 893, 894,
          895, 903, 904, 905, 906, 907,
          908, 909, 910, 911, 912, 913,
          914, 922, 923, 924, 925, 926,
          927, 928, 929, 930, 931, 932,
          933
        ]);
      });


    })

    describe("percentile calculation", () => {
        it("GET /api/percentile", async () => {
          const res = await request(app).get("/api/percentile").query({id:893}).expect(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(2);
        });

        it("returns correct percentile", async () => {
          const res = await request(app).get("/api/percentile").query({id:893}).expect(200);
          expect(res.body[0]).to.equal('38.71');
          expect(res.body[1]).to.equal('35.48');
        });

    });


})