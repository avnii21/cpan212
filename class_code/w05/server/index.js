import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//home route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/data", (req, res) => {
   let user01 = {
    name: "Avni",
    email: "avni.patel13@yahoo.com",
    age: "25",
    bio: "idk"
   }
  res.status(404).json(user01);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("404 page not found");
});







app.post("/register", (req, res)=>{
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)

    res.json({message: "I stole your information"})

});