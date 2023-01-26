const fs = require("fs");
const http = require("http");

const users = [
    { name: "user1", id: 1 },
    { name: "user2", id: 2 },
    { name: "user3", id: 3 },
];

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    if (req.url === "/" || req.url === "/index.html") {
        const data = fs.readFileSync("index.html");
        res.writeHead(200, { "content-type": "text/html" });
        res.write(data);
    } else if (req.url === "/style.css") {
        const data = fs.readFileSync("style.css");
        res.writeHead(200, { "content-type": "text/css" });
        res.write(data);
    } else if (req.url === "/script.js") {
        const data = fs.readFileSync("script.js");
        res.writeHead(200, { "content-type": "text/javascript" });
        res.write(data);
    } else if (req.url === "/users") {
        //res.writeHead(200, { "content-type": "text/javascript" });
        if (req.method === "POST") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                console.log(data);
                const newData = JSON.parse(data);
                users.push(newData);
                res.writeHead(200, { "content-type": "application/json" });
                res.write(JSON.stringify({ status: "Success" }));
            });
        } else {
            res.write(JSON.stringify(users));
        }
    }
    return res.end();
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
