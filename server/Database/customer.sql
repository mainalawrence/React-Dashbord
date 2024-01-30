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
insert into customer values(
    'rtyuiopid','name','email','0700000000','company','nairobi','manager',1
);

delete from customer where uid='id';

update from customer set name email phone company role where uid='';

delete from customer where uid='';

drop TABLE customer;

select * from customer;