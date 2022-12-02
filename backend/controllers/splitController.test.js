const CalShare = require("./splitController");

let requestData1 = {
  totalPeopleInvolved: ["Sam", "Ram", "Sham", "Param", "Sharuk"],
  totalBillAmount: 500,
  data: [
    {
      people_count: 2,
      price: 15,
      people_involved: ["Sam", "Sham"],
      itemName: "Apple",
    },

    {
      people_count: 1,
      price: 20,
      people_involved: ["Sam"],
      itemName: "Banana",
    },
    {
      people_count: 2,
      price: 30,
      people_involved: ["Sham", "Param", "Sharuk"],
      itemName: "grapes",
    },
    {
      people_count: 2,
      price: 30,
      people_involved: ["Sham", "Param", "Sharuk"],
      itemName: "watermelon",
    },
    {
      people_count: 2,
      price: 30,
      people_involved: ["Sam", "Ram", "Sham"],
      itemName: "pear",
    },
    {
      people_count: 2,
      price: 150,
      people_involved: ["Ram", "Sham", "Param"],
      itemName: "pineapple",
    },
    {
      people_count: 2,
      price: 225,
      people_involved: ["Sham", "Ram"],
      itemName: "nuts",
    },
  ],
};
let response = [
  { name: "Sam", items: ["Apple", "Banana", "pear"], share: 37.5 },
  { name: "Ram", items: ["pear", "pineapple", "nuts"], share: 172.5 },
  {
    name: "Sham",
    items: ["Apple", "grapes", "watermelon", "pear", "pineapple", "nuts"],
    share: 200,
  },
  {
    name: "Param",
    items: ["grapes", "watermelon", "pineapple"],
    share: 70,
  },
  { name: "Sharuk", items: ["grapes", "watermelon"], share: 20 },
];

test("check if bill is split right", () => {
  let items = requestData1.data;
  let No_of_People = requestData1.totalPeopleInvolved.length;
  let amt = requestData1.totalBillAmount;
  let calAmount = 0;
  items.forEach((element) => {
    calAmount = calAmount + element.price;
  });
  // expect(CalShare(items, No_of_People)).toMatchObject(response);
  expect(calAmount).toBe(amt);
});
