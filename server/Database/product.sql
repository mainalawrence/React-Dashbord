CREATE TABLE product VALUE(
    uid varchar(64),
    name: varchar(10),
    price: Int,
    description: text,
    category: text,
    rating: int,
    supply: int
) ;


SELECT * FROM product;
INSERT INTO product VALUE('','name',1,'description','category',1,2);
UPDATE FROM product set name='example', price=0,description='',category='',rating=0,supply=0 WHERE uid='';
UPDATE FROM product set name='example' WHERE uid='';
UPDATE FROM product set price='example' WHERE uid='';
UPDATE FROM product set description='example' WHERE uid='';
UPDATE FROM product set price='example' WHERE uid='';
UPDATE FROM product set supply='example' WHERE uid='';
UPDATE FROM product set rating='example' WHERE uid='';

DELETE FROM product WHERE uid='';

