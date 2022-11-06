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




app.post("/", (req, res) => {
    const { operation_type } = req.body;
    let getNumber = operation_type.match(/\d+/g)

    let x = Number(getNumber[0]);
    let y = Number(getNumber[1]);
    let result;
    let getOperation = operation_type.match(/(add?[^\s]+)|(addition?[^\s]+)|(subtract?[^\s]+)|(subtraction?[^\s]+)|(multiply?[^\s]+)|(multiplication?[^\s]+)/gi)
    let operation = getOperation[0]
  
    switch (operation) {
        case "add": {
            result = x + y;
            break;
        }
        case "Add": {
            result = x + y;
            break;
        }
        case "addition": {
            result = x + y;
            break;
        }
        case "Addition": {
            result = x + y;
            break;
        }
        case "subtract": {
            result = x - y;
            break;
        }
        case "Subtract": {
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


    
    res.setHeader('Content-Type', 'application/json');
    let stringedData = JSON.stringify(users, null, 2)
    fs.writeFile("users.json", stringedData, function(err) {
        if (err) {
            return res.json({message: err})
        }
    })

    let user = {"slackUsername": "iSommie", "result": result, "operation_type": operation}
    users.push(user);
    return res.send(user)
})

app.get("/", (req, res) => {
    //fetch all users
    //send user array as response to the client
    return res.json(users)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

