-- tables.sql

-- Table for Customer
CREATE TABLE customer (
    uid VARCHAR(64) PRIMARY KEY,
    name VARCHAR(15),
    email VARCHAR(20),
    phone VARCHAR(10),
    company VARCHAR(20),
    role VARCHAR(20),
    visible INT,
    date TIMESTAMP
);

-- Table for Product
CREATE TABLE product (
    uid VARCHAR(64) PRIMARY KEY,
    name VARCHAR(10),
    price INT,
    description TEXT,
    category TEXT,
    rating INT,
    supply INT,
    visible INT,
    date TIMESTAMP
);

-- Table for Invoice
CREATE TABLE invoice (
    uid VARCHAR(64) PRIMARY KEY,
    invoice VARCHAR(64),
    userId VARCHAR(64),
    cost VARCHAR(64),
    products VARCHAR(64)[],
    date TIMESTAMP,
    visible INT
);

-- Table for Users
CREATE TABLE users (
    uid VARCHAR(64) PRIMARY KEY,
    name VARCHAR(15),
    password VARCHAR(15),
    email VARCHAR(20),
    phone VARCHAR(10),
    company VARCHAR(20),
    role VARCHAR(20),
    date TIMESTAMP,
    visible INT
);

