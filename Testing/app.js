const exp = require("constants");

const users = [
  {
    name: "Richa",
    age: 24,
  },
  {
    name: "Abhinav",
    age: 29,
  },
  {
    name: "Anjali",
    age: 25,
  },
  {
    name: "Lalit",
    age: 18,
  },
];

function sortingByAge() {
    const data = users.sort((a, b) => a.age - b.age);
    return data;
}

console.log(sortingByAge());


module.exports = sortingByAge;

// read about jsdom