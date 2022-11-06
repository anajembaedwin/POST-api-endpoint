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
    const { operation_type, x, y } = req.body;

    let result;
    let operation = operation_type;
    switch (operation_type) {
        case "add": {
            result = Number(x) + Number(y);
            break;
        }
        case "subtract": {
            result = Number(x) - Number(y);
            break;
        }
        case "multiply": {
            result = Number(x) * Number(y);
            break;
        }
        default: {
            result = 0;
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

