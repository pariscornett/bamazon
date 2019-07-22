//require necessary packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//global variables
var itemId = 0;
var newQuantity = 0;

//set up connection parameters 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HoloGraph4!$",
    database: "bamazon_db"
});

//use connection variable to actually link up to mysql database and show table products
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

//function to show the table products
function readProducts() {
    console.log("Items on Bamazon...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      inquirer.prompt ([
        {
          type: "input",
          name: "id",
          message: "What is the id of the item you'd like to purchase?"
        },
        {
          type: "input",
          name: "quantity",
          message: "How many units of this item would you like to purchase?"
        }
      ]).then(function(answers){
        var itemId = parseFloat(answers.id);
        console.log("Id selected: " + itemId);
        var itemQuantity = parseFloat(answers.quantity);
        console.log("You selected " + itemQuantity + " units for purchase");
        //runs function to check availability of product
        connection.query("SELECT stock_quantity FROM products WHERE item_id=?", [itemId], function(err, res){
          if(err)throw(err);
          var availability = res[0].stock_quantity;
          //console.log(availability);
          if(availability >= itemQuantity){
            console.log("Your order has been accepted!");
            var newQuantity = availability - itemQuantity;
          }else{
            console.log("Sorry, we do not have enough of this item in stock to complete your order. There are only " + availability + " available");
            connection.end();
            return;
          };
          connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newQuantity, itemId], function(err, res){
            if(err) throw(err);
            console.log("\n\n Stock updated!");
          });
          // connection.query("SELECT * FROM products", function(err, res){
          //   console.log(res);
          // });
          connection.end();
        })
      })
    });
}
