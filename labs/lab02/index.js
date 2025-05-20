import express from "express";
import lab_router from "./routers/lab_router.js"
const app = express();
const PORT = process.env.PORT || 8000

app.use("/lab", lab_router);

app.get("/name", (req, res)=>{
    res.send("Avni Patel")
});

app.listen(PORT, ()=>{
    console.log(`open site on: http://localhost:${PORT}`)
})
