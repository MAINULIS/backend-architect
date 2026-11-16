(() => {
    function fi () {
    console.log("busy");
}
fi()
})();

( () => {
    function fi () {
    console.log("free");
}
fi()
})()

