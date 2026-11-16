// ! IIFE => Immediately Invoked Function Expression. syntax: ()()

//  block scope

(()=>{
    let a = 200;
    console.log(a);
})();

(()=> {
    let a = 700;
    console.log(a);
})()