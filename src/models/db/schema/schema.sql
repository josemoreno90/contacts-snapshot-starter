DROP TABLE IF EXISTS contacts, members;

CREATE TABLE members (
  id serial,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  salt varchar(60) NOT NULL,
  role varchar(255) DEFAULT 'regular'
);

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);
