import express from "express";
const app = express();
const PORT = process.env.PORT || 8001

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})

app.get("/", (req, res)=>{
    res.send("Hello from the server");
});

app.post("/", (req, res)=>{
    res.send("Hello from POST request");
});

app.put("/", (req, res)=>{
    res.send("Hello from PUT server");
});

/* DOMAIN: https://www.youtube.com
ENDPOINt: /watch
? - query object
v=FSAz556s0fM

req: {
ip, OS, URL, Method
query (?) - for searching information on database, params, body
}
*/
// for watch

app.get("/watch", (req, res)=>{
    console.log(req.url); // /watch
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    res.send("You got to the watch endpoint")
})

// for params
app.get("/params:itemID", (req, res)=>{
    console.log(req.url); 
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    res.send("You got to the params endpoint")
})