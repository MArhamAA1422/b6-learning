function callThis(x) {
    console.log("hello from callThis", x);
}
function test() {
    let x = 5;
    const fn = function() {
        console.log("the value of x is ", x);
        callThis(x);
    }
    x = 10;
    return fn;
}

const fn = test();
// fn();

function loopTest() {
    for (var i = 1; i <= 5; i++) {
        setTimeout((i)=>{
            console.log("the value of i", i);
        }, 1000, i);
    }
}
// loopTest();

function scope() {
    var scopeVar = 10;
}
// scope();

// console.log(scopeVar);  // error

function outer() {
    function inner() {
        console.log(a);
    }
    const a = 5;
    return inner;
}

// outer()();

(function scopeTest() {
    const fn = function() {
        console.log(a);
    }
    const a = 10;
    fn();
});

function Counter() {  // constructor function
  var count = 0;
  this.incCounter = function() {
    count++;
    console.log(count);
  }
  this.decCounter = function() {
    count--;
    console.log(count);
  }
}

// const counter = new Counter();
// counter.incCounter();
// counter.decCounter();

const rad = [1, 2, 3];
const area = function (r) {
    return Math.PI * r * r;
}

// every array will get this function, can access it, using prototype
Array.prototype.calculate = function(logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
}

// console.log(rad.calculate(area));

const arr = [1, 5, 2, 3, 1];

// console.log(arr.reduce((acc, curr) => {
//     if (curr > acc) acc = curr;
//     return acc
// }, 0));

const users = [
    { first: "a", last: "aa", age: 26 },
    { first: "b", last: "bb", age: 75 },
    { first: "c", last: "cc", age: 50 },
    { first: "d", last: "dd", age: 26 }
];

// console.log(users.reduce((acc, curr) => {
//     if (curr.age <= 30) {
//         acc.push(curr.first);
//     }
//     return acc
// }, []));

var hoistingIntro = "Hi there, I am a string one.";
function hoistingFunc() {
	console.log(hoistingIntro);
	var hoistingIntro = "Hi there, I am a string two";
	console.log(hoistingIntro);
}

// hoistingFunc();

// console.log(BigInt(5));

let ob1 = { name: "app" };
let ob2 = { name: "app" };

// console.log(ob1 === ob2);  // false

var test = (function test() {
    function add(a, b) {
        return a+b;
    }
    function sub(a, b) {
        return a-b;
    }

    return {
        add,
        sub
    }
})();

// console.log(test.sub(2, 3));

object = { name: "app" };
// console.log(object);

let person = {
    name: "app"
};

let getInfo =  function (id, id1) {
    return `Welcome ${this.name}, your roll is ${id}, ${id1}`;
}

// console.log(getInfo.apply(person, [1, 2]));

function argTest(a, b, c) {
    console.log(arguments);
}

// argTest(1, 2, 3);