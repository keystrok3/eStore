
-- users table
CREATE TABLE users (
    username VARCHAR(100) UNIQUE,
    fname VARCHAR(100),
    lname VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(250),
    role ENUM('user', 'admin'),
    PRIMARY KEY (username)
);


-- categories of products sold
CREATE TABLE product_categories (
    category_id INT AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (category_id)
);


-- products sold
CREATE TABLE products (
    product_id VARCHAR(250),
    name VARCHAR(50),
    unit_price DECIMAL(10, 2),
    quantity INT,
    category_id INT,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES product_categories (category_id)
);

-- admin stock purchases
CREATE TABLE purchases (
    purchase_id INT AUTO_INCREMENT,
    product_id VARCHAR(250),
    quantity INT,
    unit_price DECIMAL(10, 2),
    delivery_date Datetime,
    PRIMARY KEY (purchase_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);


-- sales to customers
CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT,
    product_id VARCHAR(250),
    quantity INT,
    unit_price DECIMAL(10, 2),
    sale_date Datetime,
    PRIMARY KEY (sale_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);