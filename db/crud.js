const { readFileSync,writeFileSync } = require('fs');
const { getDefaultSettings } = require('http2');
const {join} = require('path');

function getData() {
    // let data = readFileSync(join(__dirname,"db",'userData.json'),'utf-8');
    // let users = JSON.parse(data);
    // return users;
    try {
        return JSON.parse(readFileSync(join(__dirname,'userData.json'),'utf-8'));
    } catch (err) {
        writeFileSync(join(__dirname,'userData.json'),JSON.stringify([]),'utf-8');
        return [];
    }
    
}

function insertOne(data) {
    writeFileSync(join(__dirname,"userData.json"),JSON.stringify([...getData(),data]),'utf-8');
}
function insertMany(users) {
    writeFileSync(join(__dirname,"userData.json"),JSON.stringify([...getData(),...users]),'utf-8')
}

module.exports = {insertOne,insertMany};