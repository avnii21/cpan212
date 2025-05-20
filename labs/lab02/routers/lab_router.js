import express from "express";

const router = express.Router();

router.get("/name", (req, res)=>{
    res.send("Avni Patel")
});


router.get("/greeting", (req, res)=>{
    res.send("Hello I'm Avni")
});

router.get("/add/:x/:y", (req, res)=>{
    console.log(req.params.x);
    let left = parseFloat(req.params.x);
    let right = parseFloat(req.params.y);
    res.send(`${x + y}`);

});

router.get("/calculate/:x/:y/:operator", (req, res)=>{
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);
    let operator = req.params.operator;

    switch (operator) {
        case "+":
            return res.send(`${x + y}`);
        case "-":
            return res.send(`${x - y}`);
        case "*":
            return res.send(`${x * y}`);
        case "/":
            if (y != 0) {
                return res.send(`${ x / y}`);
            } else {
                return res.send("y cannot be 0");
            }

            default:
                break;
    }

});


export default router;

