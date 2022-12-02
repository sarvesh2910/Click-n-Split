let t = {
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

let items = t.data;

let people = t.totalPeopleInvolved;

let No_of_People = t.totalPeopleInvolved.length;

// let ShareObj = CreateEmptyObj(No_of_People);

const CalShare = (items, No_of_People) => {
  let ShareObj = CreateEmptyObj(No_of_People);
  let price = 0;
  items.forEach((element) => {
    price = element.price / element.people_involved.length;

    for (var j = 0; j < element.people_involved.length; j++) {
      for (var k = 0; k < ShareObj.length; k++) {
        if (element.people_involved[j] === ShareObj[k].name) {
          ShareObj[k].items.push(element.itemName);
          ShareObj[k].share = ShareObj[k].share + price;
        }
      }
    }
  });
  return ShareObj;
};

function CreateEmptyObj(n) {
  let obj = [];
  let a = {};
  for (var i = 0; i < n; i++) {
    a = { name: people[i], items: [], share: 0 };
    obj.push(a);
    a = {};
  }
  return obj;
}
let ShareObjFinal = CalShare(items, No_of_People);

console.log(ShareObjFinal);
// export { CreateEmptyObj, CalShare };
module.exports = CalShare;
