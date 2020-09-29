create table users (
    id int,
    login varchar(255),
    money_amount int,
    card_number varchar(255),
    status int
);

create table passwords (
    user_id int,
    password varchar(255)
);

insert into users (id, login, money_amount, card_number, status)
values (1, 'admin', 999999, '5179483607205228', 1);

insert into users (id, login, money_amount, card_number, status)
values (2, 'sver', 2408, '4485581207066338', 1);

insert into users (id, login, money_amount, card_number, status)
values (3, 'steffuld', 3943, '4024007112215693', 1);

insert into users (id, login, money_amount, card_number, status)
values (4, 'warnachinka', 13850, '6011984025064360', 1);

insert into users (id, login, money_amount, card_number, status)
values (5, 'darkangelofhell', 666666, '371387415883596', 0);

insert into users (id, login, money_amount, card_number, status)
values (6, 'simp', 1029, '6011023323547428', 0);

insert into passwords (user_id, password)
values (1, 'admin');

insert into passwords (user_id, password)
values (2, 'GeTOutoFHeREU32');

insert into passwords (user_id, password)
values (3, 'SsSssSTaSsSsSssS304');

insert into passwords (user_id, password)
values (4, 'JoJoisAGreaTAnIMeXDXD');

insert into passwords (user_id, password)
values (5, '666IamTHEdArkANgelOfHeLL666');

insert into passwords (user_id, password)
values (6, '123456qwerty');