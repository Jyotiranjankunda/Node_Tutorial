console.log('Notes page loaded.');

var age = 22;

function addNumber(a, b) {
  return a + b;
}

// In module.exports we write those entities that we want to export
// This is in commonJS syntax
// ES6 syntax : export default {age, addNumber}
module.exports = {
  age,
  addNumber,
};
