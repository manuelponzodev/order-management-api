-- Runs once, on first container start (empty volume).
-- Add tables here or move to a migrations tool later.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS healthcheck (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE customers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0,
  CHECK (stock >= 0),
  deleted_at TIMESTAMP
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status ENUM("requested", "sent", "completed", "cancelled") NOT NULL DEFAULT "requested",
  shipping_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  deleted_at TIMESTAMP,
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  order_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  CHECK (unit_price >= 0),
  quantity INT NOT NULL DEFAULT 1,
  CHECK (quantity > 0),
  deleted_at TIMESTAMP
);

