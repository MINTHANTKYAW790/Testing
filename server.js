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
        res.end();
    } else if (req.url === "/style.css") {
        const data = fs.readFileSync("style.css");
        res.writeHead(200, { "content-type": "text/css" });
        res.write(data);
        res.end();
    } else if (req.url === "/script.js") {
        const data = fs.readFileSync("script.js");
        res.writeHead(200, { "content-type": "text/javascript" });
        res.write(data);
        res.end();
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
                res.write(JSON.stringify(users));
                res.end();
            });
        } else if (req.method === "GET") {
            res.write(JSON.stringify(users));
            res.end();
        } else if (req.method === "PUT") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                const newData = JSON.parse(data);
                console.log(newData);
                const foundUser = users.find((user) => user.id === newData.id);
                const newName = newData.name;
                if (foundUser) {
                    foundUser.name = newName;
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(users));
                }
                /*users.push(newUser);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.write(JSON.stringify(users));*/
                res.end();
            });
        } else if (req.method === "DELETE") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                const deletedUser = JSON.parse(data);
                const foundUser = users.find(
                    (user) => user.id === deletedUser.id
                );
                if (foundUser) {
                    const userWantToDelete = users.indexOf(foundUser);
                    users.splice(userWantToDelete, 1);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(users));
                    res.end();
                } else if (!users.id) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify("users bad request"));
                    res.end();
                }
            });
        }
    }
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
