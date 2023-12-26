CREATE TABLE users(
    uid varchar(64),
    name varchar(15),
    password varchar(15),
    email varchar(20),
    phone varchar(10),
    company varchar(20),
    role varchar(20),
    date timestamp,
    avatar varchar(50),
    visible int
);
insert into users values(
    'uid','name','email','0700000000','company','manager','date::now'
);

delete from users where uid='uid';

update from users set name email phone company role where uid='';

delete from users where uid='';
