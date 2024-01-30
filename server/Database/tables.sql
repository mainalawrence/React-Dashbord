-- tables.sql

-- Table for Customer
CREATE TABLE customer(
    uid varchar(64),
    name varchar(150),
    email varchar(50),
    phone varchar(15),
    company varchar(50),
    location varchar(50),
    role varchar(50),
    visible int,
    date timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Product
CREATE TABLE product (
    uid VARCHAR(64) PRIMARY KEY,
    name VARCHAR(150),
    price INT,
    description TEXT,
    category TEXT,
    supply INT,
    visible INT,
    date timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- drop table invoice;


-- Table for Invoice
CREATE TABLE invoice (
    uid VARCHAR(64) PRIMARY KEY,
    invoice VARCHAR(64),
    userId VARCHAR(64),
    price DOUBLE PRECISION,
    cost DOUBLE PRECISION,
    quantity INT,
    productsUid VARCHAR(64),
    date timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    visible INT
);

-- Table for Users
CREATE TABLE users (
    uid VARCHAR(64) PRIMARY KEY,
    name VARCHAR(150),
    password VARCHAR(64),
    email VARCHAR(20),
    phone VARCHAR(10),
    company VARCHAR(20),
    role VARCHAR(20),
    date timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    visible INT
);

