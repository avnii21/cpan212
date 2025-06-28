import express from "express";

const app = express();
const logger = (req, res, next) =>{
    console.log(req.url)
    console.log(req.method)
    console.log(Date())
    next();

}

const newMiddleware = (req, res, next) =>{
    console.log("hello")
    next();
}
app.use(logger);

app.get("/", newMiddleware, logger, (req, res)=>{

    res.send("Welcome to the Server");
});

app.get("/about", (req, res)=>{
    res.send("Welcome to the Server");
});

app.get("/data", (req, res)=>{
    res.send("Welcome to the Server");
});

app.listen(3000)