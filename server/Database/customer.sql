CREATE TABLE customer(
    uid varchar(64),
    name varchar(15),
    email varchar(20),
    phone varchar(10),
    company varchar(20),
    location varchar(20),
    role varchar(20),
    visible int,
    date timestamp,
);
insert into customer values(
    'uid','name','email','0700000000','company','manager','date::now'
);

delete from customer where uid='uid';

update from customer set name email phone company role where uid='';

delete from customer where uid='';
