const p5 = new Promise(res => setTimeout(res, 500, "fast"));
const p6 = new Promise(res => setTimeout(res, 1000, "slow"));

Promise.race([p5, p6]).then(console.log); // "fast"
