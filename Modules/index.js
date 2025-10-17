// // const operation = require(`./module`);
// import { Add, Minus } from "./module.js";
// const [,, a, b] = process.argv;

import { rejects } from "assert";
import { resolve } from "path";

// const num1 = Number(a);
// const num2 = Number(b);

// // const answer = operation.Add(num1, num2)
// const answer = Minus(num1, num2)
// console.log(`The answer is ${answer}`);


// const {createUser} = require(`./user`);
// import { createUser } from "./user.js";

// const [,, firstInput, SecondInput ] = process.argv;

// const first = String(firstInput);
// const second = Number(SecondInput)

// const user = createUser(first, second);

// console.log(`My name is ${user.name}, I am ${user.age}`);
// console.log(user);


// function getUser(){
//     return new Promise((resolve, rejects) => {
//         setTimeout(() => {
//             resolve({name: 'Kay', age: 99})
//         }, 3000)
//     })
// }

// getUser().then(user => console.log(user))

// async function showUser (){
//     const user = await getUser();
//     console.log(`this is the normal function ${user}`);
// }

// showUser();

// async function fetchPost() {
//     try {
//         const res = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await res.json();
//         const limit = data.slice(0,5);
//         const names = limit.map(user => user.username);
//         console.log(limit);
//         console.log(names);
//     } catch (error) {
//         console.error(`Error fecthing post: ${error}`);
//     }
// }

// fetchPost();

// async function getData() {
//     try {
//         const res = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await res.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Something went wrong:', error.message)
//     } finally {
//         console.log('Fetch attempt finished');
//     }
// }

// getData();

// function divide(a, b) {
//     if (b === 0) {
//         throw new Error('Cannot divide by zero'); 
//     } else{
//         return a / b;
//     }
// }

// try {
//     console.log(divide(4, 1));
    
// } catch (error) {
//     console.log('Something went wrong:', error.message);
// }

console.log('start');

setTimeout(() => console.log('Timeout callback'), 0);

Promise.resolve().then(() => console.log('Promise resolved'))

console.log('end')