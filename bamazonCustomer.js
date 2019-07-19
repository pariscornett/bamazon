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
      connection.end();
    });
}