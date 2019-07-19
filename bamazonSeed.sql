DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT (10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Revel Queen Mattress", "Home", 355.25, 12), ("Denman Brush", "Beauty", 12.35, 50), ("Eno Hammock","Outdoor", 79.89, 3), ("Adidas Falcon Running Shoes", "Sports", 64.15, 24), ("Crystal Cat Litter", "Pet Supplies", 16.50, 32), ("The Writing's on the Wall by Destiny's Child", "Music", 19.99, 300), ("Sims 4", "Software", 39.99, 12), ("Yale Assure Lock", "Tools, Home", 325.75, 10), ("Sula by Toni Morrison", "Books", 11.85, 4), ("6 pack GTS Watermelon Wonder Kombucha", "Grocery", 35.00, 8);

SELECT * FROM products