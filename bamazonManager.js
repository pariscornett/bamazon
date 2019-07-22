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
        var selection = selection.options;
        console.log(selection);
        if (selection == "View products for sale"){
            viewProducts();
        }
        else if(selection == "View low inventory"){
            lowInventory();
        }
        else if (selection == "Add to inventory"){
            addInventory();
        }
        else if (selection == "Add new product"){
            addProduct();
        }  
    })
}

//function to view products
function viewProducts(){
    console.log("\n Products currently available: \n");
    connection.query("SELECT product_name FROM products", function(err, res){
        if(err) throw(err);
        for (i = 0; i < res.length; i++){
            console.log(res[i].product_name);
        };
        inquirer.prompt([
            {
                type:"checkbox",
                name: "options",
                message: "Select an option: ",
                choices: [
                    {
                        name: "Exit"
                    },
                    {
                        name: "Return to main menu"
                    }
                ]
            }
        ]).then(function(selection){
            var decision = selection.options;
            // console.log(decision);
            if(decision == "Exit"){
                console.log("Goodbye");
                connection.end();
                return;
            }else{
                manage();
            }
        })
    });
};

//function to view low inventory
function lowInventory(){
    console.log("\n These items are low in stock \n");
    connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity<=10", function(err, res){
        if (err) throw (err);
        for (i = 0; i < res.length; i++){
            console.log(res[i].stock_quantity + " units left of " + res[i].product_name);
        };
        inquirer.prompt([
            {
                type:"checkbox",
                name: "options",
                message: "Select an option: ",
                choices: [
                    {
                        name: "Exit"
                    },
                    {
                        name: "Return to main menu"
                    }
                ]
            }
        ]).then(function(selection){
            var decision = selection.options;
            // console.log(decision);
            if(decision == "Exit"){
                console.log("Goodbye");
                connection.end();
                return;
            }else{
                manage();
            }
        })
        
    })
};

//function to add inventory
function addInventory(){
    console.log("\n You're about to add inventory \n");
};

//function to add a new product
function addProduct(){
    console.log("\n You're about to add a new product \n");
};

