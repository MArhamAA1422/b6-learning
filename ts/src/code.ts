let age: number = 20;
if (age < 50) {
    age += 10;
}

let s = "hello";
let an;

an = 5;
// console.log(an, typeof an);
an = 'a';
// console.log(an, typeof an);

let arr: number[];
arr = [];
arr[0] = 5;

let user: [number, string] = [1, 'app'];
user.push(1);
// console.log(user);

function calc(inc: number, tax?: number): number {
  if (tax || 10 < 10) return inc;
  return inc*10;
}
// console.log(calc(5));

let emp: {
    readonly id: number,
    name: string

    retire: (date: Date) => void

} = {
    id : 1,
    name: 'app',
    retire: (date: Date) => {
        console.log(date);
    }
};

type Emp = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let emp1: Emp = {
    id: 1,
    name: 'app',
    retire: (date: Date) => {
        console.log(date);
    }
}
// emp1.retire(new Date());