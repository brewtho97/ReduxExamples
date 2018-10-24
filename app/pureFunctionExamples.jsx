const redux = require('redux');

console.log('Starting redux example...');

//Pure function...
function add(a,b) {
  return a + b;
}

//Not pure...
//Relies on variables outside of itself.
let a = 3;
function add(b) {
  return a + b;
}

//Changes a value outside of itself.
let result;
function add(a, b) {
  result = a + b;
}

//Given the same inputs it would return different results.
function add(a, b) {
  return a + b + new Date().getSeconds();
}

//Must not change the values passed into it.
function changeProp(obj) {
  obj.name = 'Jen';
  return obj;
}

//Pure change prop
function pureChangeProp(obj) {
  return {
    ...obj,
    name:'Jen'
  };
}

let startingValue = ({
  name: 'Andrew',
  age: 25
});

let res = pureChangeProp(startingValue);
console.log(startingValue);
console.log(res);
