let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

let requestData = {
  totalPeopleInvolved: ["Sam", "Ram", "Sham", "Param", "Sharuk"],
  totalBillAmount: "500",
  data: [
    {
      people_count: 2,
      price: "15",
      people_involved: ["Sam", "Sham"],
      itemName: "Apple",
    },

    {
      people_count: 1,
      price: "20",
      people_involved: ["Sam"],
      itemName: "Banana",
    },
    {
      people_count: 2,
      price: "30",
      people_involved: ["Sham", "Param", "Sharuk"],
      itemName: "grapes",
    },
    {
      people_count: 2,
      price: "30",
      people_involved: ["Sham", "Param", "Sharuk"],
      itemName: "watermelon",
    },
    {
      people_count: 2,
      price: "30",
      people_involved: ["Sam", "Ram", "Sham"],
      itemName: "pear",
    },
    {
      people_count: 2,
      price: "150",
      people_involved: ["Ram", "Sham", "Param"],
      itemName: "pineapple",
    },
    {
      people_count: 2,
      price: "225",
      people_involved: ["Sham", "Ram"],
      itemName: "nuts",
    },
  ],
};

describe("Post request to SplitBill function", () => {
  it("it should return a response", (done) => {
    chai
      .request(server)
      .post("/clicknsplit/api/split-bill")
      .send(requestData)
      .end((err, res) => {
        should.exist(res.status);
        res.should.have.status(200);
        res.body.length.should.be.eql(5);
        res.body.should.be.a("array");
        done();
      });
  });
});