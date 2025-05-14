/* 
C(create) - Post
R(read)- Get
U(update) - Put / patch
D (delete)- delete
*/

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === "/"){
        res.end("Hello World");
    }

else if (req.url === "/about"){
    res.end("Hello to the About page!")
}
else if (req.url === "/contact"){
   const data = fs.readFileSync("labs/lab01/html/contact.html")
    res.end(data)
}
else if (req.url === "/methods"){
    if (req.method === "GET") {
        res.end("Hello to the GET Method");

    } else if (req.method === "POST") {
        res.end("Hello to the POST Method");
  
    } else if (req.method === "PUT") {
        res.end("Hello to the PUT Method");
        
}
} else {
    res.end("404 page not found");
}
});
server.listen(8000, () => {
    console.log(`http://localhost:8000`);

});