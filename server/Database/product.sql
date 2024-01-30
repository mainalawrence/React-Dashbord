CREATE TABLE product VALUE(
    uid varchar(64),
    name: varchar(10),
    description: text,
    category: text,
    supply: int,
    visible:int,
    date timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
) ;


SELECT * FROM product;
INSERT INTO product VALUE('','name',1,'description','category',1,2);
UPDATE FROM product set name='example', price=0,description='',category='',supply=0 WHERE uid='';
UPDATE FROM product set name='example' WHERE uid='';
UPDATE FROM product set price='example' WHERE uid='';
UPDATE FROM product set description='example' WHERE uid='';
UPDATE FROM product set price='example' WHERE uid='';
UPDATE FROM product set supply='example' WHERE uid='';

DELETE FROM product WHERE uid='';

