console.log([] + []);    // ""   (empty string)
console.log([] + {});    // "[object Object]"
console.log({} + []);    // "[object Object]"
console.log(null + 1);   // 1   (null → 0)
console.log(undefined + 1); // NaN (undefined → NaN)
