// load up the express framework
const express = require("express");


// create an instance of express to serve our end points
const app = express();

const cors = require('cors');
const users = require('./users.json')
const fs = require('fs');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded());

app.use(cors({
    methods: ['POST'],
    origin: '*'
}));



app.get("/", function (req, res) {
    res.send("Hello World");
})

app.post("/", function (req, res) {

  res.send("This is a post Request");
})

app.get("/users", (req, res) => {
    //fetch all users
    //send user array as response to the client
    return res.json(users)
})

app.post("/users", (req, res) => {
    const { operation_type } = req.body;
    let getNumber = operation_type.match(/\d+/g)
    let getAdd = operation_type.match(/add/gi)
    let getSubtract = operation_type.match(/subtract/gi)
    let getMultiply = operation_type.match(/multiply/gi)
    let x = Number(getNumber[0]);
    let y = Number(getNumber[1]);
    let result;
    let operation = operation_type.match(/(add?[^\s]+)|(subtract?[^\s]+)|(multiply?[^\s]+)/g)[0]
    switch (operation) {
        case "add": {
            result = x + y;
            break;
        }
        case "subtract": {
            result = x - y;
            break;
        }
        case "multiply": {
            result = x * y;
            break;
        }
        default: {
            result = "No value found";
        }
    }


    users.push(req.body);

    let stringedData = JSON.stringify(users, null, 2)
    fs.writeFile("users.json", stringedData, function(err) {
        if (err) {
            return res.status(500).json({message: err})
        }
    })

    return res.status(200).json({"slackUsername": "iSommie", "result": result,  "operation_type": operation})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

