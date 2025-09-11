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

const counter = new Counter();
counter.incCounter();
counter.decCounter();

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

console.log(rad.calculate(area));