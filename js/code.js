function test() {
    console.log(this);
}

const user = { name: "name", age: 5 };
test.call(user);