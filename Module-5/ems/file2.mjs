import a from "./file1.mjs";
import { a as num1 } from "./file3.mjs"
import { b as num2 } from "./file3.mjs"
import {add} from "./func.mjs"


console.log(num1, num2);


console.log(add(num1, num2));