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
fn();

function loopTest() {
    for (var i = 1; i <= 5; i++) {
        setTimeout((i)=>{
            console.log("the value of i", i);
        }, 1000, i);
    }
}
loopTest();

function scope() {
    var scopeVar = 10;
}
scope();

// console.log(scopeVar);  // error