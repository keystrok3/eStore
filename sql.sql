DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username varchar(100) NOT NULL,
  fname varchar(100),
  lname varchar(100),
  email varchar(100),
  password varchar(250) NOT NULL,
  role ENUM('user','admin'),
  status ENUM('active', 'pending'),
  confirmationToken varchar(250) UNIQUE,
  PRIMARY KEY (username)
);


--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS product_categories;

CREATE TABLE `product_categories` (
  category_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (category_id)
);


--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id varchar(250) NOT NULL,
  name varchar(50) DEFAULT NULL,
  unit_price decimal(10,2) NOT NULL DEFAULT '0.00',
  quantity int(11) NOT NULL DEFAULT '0',
  category_id int(11) DEFAULT NULL,
  PRIMARY KEY (product_id),
  FOREIGN KEY (category_id) REFERENCES product_categories (category_id)
);


--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS purchases;

CREATE TABLE purchases (
  purchase_id int(11) NOT NULL AUTO_INCREMENT,
  product_id varchar(250) DEFAULT NULL,
  quantity int(11) DEFAULT NULL,
  unit_price decimal(10,2) DEFAULT NULL,
  delivery_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (purchase_id),
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);


--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS sales;

CREATE TABLE `sales` (
  sale_id int(11) NOT NULL AUTO_INCREMENT,
  product_id varchar(250),
  quantity int(11),
  unit_price decimal(10,2),
  sale_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  username varchar(100) NOT NULL,
  PRIMARY KEY (sale_id),
  FOREIGN KEY (product_id) REFERENCES products (product_id),
  FOREIGN KEY (username) REFERENCES users (username)
);