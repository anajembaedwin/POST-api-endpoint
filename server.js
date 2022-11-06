// load up the express framework
const express = require("express");


// create an instance of express to serve our end points
const app = express();

const cors = require('cors');
const users = require('./users.json')
const fs = require('fs');

app.use(express.json()); // for parsing application/json

app.use(cors({
    origin: '*'
}));



// app.get("/", function (req, res) {
//     res.send("Hello World");
// })

// app.post("/", function (req, res) {

//   res.send("This is a post Request");
// })

app.get("/", (req, res) => {
    //fetch all users
    //send user array as response to the client
    return res.json(users)
})

app.post("/", (req, res) => {
    const { operator_type } = req.body;
    let getNumber = operator_type.match(/\d+/g)

    let x = Number(getNumber[0]);
    let y = Number(getNumber[1]);
    let result;
    let getOperation = operator_type.match(/(add?[^\s]+)|(addition?[^\s]+)|(subtract?[^\s]+)|(subtraction?[^\s]+)|(multiply?[^\s]+)|(multiplication?[^\s]+)/gi)
    let operation = getOperation[0]
  
    switch (operation) {
        case "add": {
            result = x + y;
            break;
        }
        case "addition": {
            result = x + y;
            break;
        }
        case "subtract": {
            result = x - y;
            break;
        }
        case "subtraction": {
            result = x - y;
            break;
        }
        case "multiply": {
            result = x * y;
            break;
        }
        case "multiplication": {
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

    return res.json({"slackUsername": "iSommie", "result": result,  "operator_type": operation})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

