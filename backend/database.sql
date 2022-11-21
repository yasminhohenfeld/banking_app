create table if not exists accounts (
  id serial primary key, 
  balance integer not null
);

create table if not exists users(
  id serial primary key, 
  username text not null,
  password text not null,
  accountId bigint references accounts (id)
);

create table if not exists transactions (
  id serial primary key, 
  debitedAccountId integer references accounts (id) not null,
  creditedAccountId integer references accounts (id) not null,
  value integer not null,
  createdAt date not null default now()
);
