//http
const https = require('https');


const options = {
    hostname: "jsonplaceholder.typicode.com",
    port: 443,
    path: '/posts',
    method: 'GET'
}
const req = https.request(options, res => {
    console.log("1", res);
    res.on('data', d => {
        console.log("2", d);
    })
})


req.on("error", err => {
    console.log("err", err);
})


//EventEmmitter example

// const EventEmmitter = require("events");
// const event = new EventEmmitter();
// event.on("start", (PORT) => {
//     console.log(`Server is Runing on Port ${PORT}`)

// });

// if (process.argv.slice(2)[0] === "port") {
//     event.emit("start", 3001);
// }

//Event Loop Test
// setImmediate(() => {
//     console.log("setImmediate");
// })
// Promise.resolve()
//     .then(() => {
//         console.log("Promise");
//     });
// setTimeout(() => {
//     console.log("setTimeout");
//     setTimeout(() => {
//         console.log("setTimeout 2");
//     })
// }, 0);
// setInterval(() => {
//     console.log("setInterval");
// });
// process.nextTick(() => {
//     console.log("nextTick");
// })




//########## dialog   =>readline
// const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// const user = {

// }
// readline.question(`Whats Your Name ?`, name => {
//     user[name] = name;
//     console.log("Hi " + name);
//     readline.question(`Whats your surname`, surname => {
//         user[surname] = surname;
//         console.log("your object", user);
//         readline.close();
//     })
// });