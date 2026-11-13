const {a, b} = require("./file1")

console.log(a, b);

const add = require("./utils/add.js");

console.log("addition:", add(a, b));