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
})();

function counter() {
  var count = 0;
  return function incCounter() {
    count++;
    console.log(count);
  }
}
const counter1 = counter();
counter1();  // 1
counter1();  // 2
const counter2 =  counter();
counter2();  // 1