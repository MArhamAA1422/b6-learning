const myArray = [1,2,3];
console.log(typeof myArray[Symbol.iterator]);
console.log(myArray[Symbol.iterator]().next());