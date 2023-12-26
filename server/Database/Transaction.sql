CREATE TABLE transaction(
   uid varchar(64),
   invoice varchar(64),
   userId varchar(64),
   cost varchar(64),
   products varchar(64),
   date timestamp,
   visible int
);

insert into transaction values(
    'uid','invoice','userid','cost','product','date'
);

delete from transaction where uid='uid';

update from transaction set invoice='', userId='',cost='', products='' ,date='' where uid='uid';
