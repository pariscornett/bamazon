//require necessary packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//set up connection parameters 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HoloGraph4!$",
    database: "bamazon_db"
});

//establish connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manage();
});

//function to show products for sale
function manage(){
    inquirer.prompt([
        {
            type:"checkbox",
            name: "options",
            message: "Select an option: ",
            choices: [
                {
                    name: "View products for sale"
                },
                {
                    name: "View low inventory"
                },
                {
                    name: "Add to inventory"
                },
                {
                    name: "Add new product"
                }
            ]
        }
    ]).then(function(selection){
        console.log(selection);
    })
}

