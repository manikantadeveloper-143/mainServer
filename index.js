const { createServer } = require('http');
const {readFile} = require('fs');
const {join} = require('path');
const { insertOne } = require('./db/crud');
const { json } = require('stream/consumers');
const PORT = 4000;
const hostName = "127.0.0.8";
const app = createServer();
app.on('request',(req,res) => {
    const {url,method} = req;
    console.log(url);
    if(url === '/') {
        readFile(join(__dirname,'html','index.html'),'utf-8',(err,data) => {
            if(data) {
                res.end(data);
            } else {
                res.end("sorry unable to process");
            }
        });
    } else if(url === "/css/index.css") {
        readFile(join(__dirname,'css','index.css'),'utf-8',(err,data) => {
            if(data) {
                res.end(data);
            } else {
                res.end();
            }
        })
    } else if (url === '/user') {
        if(method === "POST") {
            req.on('data',(user) => {
                try {
                    insertOne(JSON.parse(user.toString()));
                    res.statusCode = 200;
                    // res.end("Data stored in DB");
                    console.log(user.toString)
                    res.end(JSON.stringify({msg:"data stored in"}))

                } catch (err) {
                    res.end("");
                }
            })
        }

    } else {
        res.end();
    }
});
app.listen(PORT,hostName,() => {
    console.log(`server started with ${hostName}:${PORT}`);
})
