CREATE TABLE IF NOT EXISTS cards (
  id integer PRIMARY KEY AUTOINCREMENT,
  number integer UNIQUE,
  name varchar(255) COLLATE NOCASE,
  description text,
  map text,
  isLost boolean(1) NOT NULL,
  isDuplicate boolean(1) NOT NULL,
  floors integer,
  phoneList text DEFAULT "[]",
  area text,
  address text COLLATE NOCASE,
  url text,
  hasIssues boolean(1) NOT NULL DEFAULT(0),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  hidden boolean NOT NULL DEFAULT(0)
);

CREATE INDEX IF NOT EXISTS number ON cards (number);

CREATE TABLE IF NOT EXISTS groups (
  id integer PRIMARY KEY AUTOINCREMENT,
  number integer,
  address text,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  publisherId integer
);

CREATE TABLE IF NOT EXISTS proclaimers (
  id integer PRIMARY KEY AUTOINCREMENT,
  name varchar(255) NOT NULL,
  surname varchar(255) NOT NULL,
  age integer,
  status integer,
  isPioneer boolean(1) NOT NULL DEFAULT(0),
  gender integer NOT NULL,
  description text,
  address text,
  location text,
  phone text,
  isHidden boolean(1) NOT NULL DEFAULT(0),
  unreliable boolean(1) NOT NULL DEFAULT(0),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  groupId integer
);

CREATE INDEX IF NOT EXISTS group_index ON proclaimers (groupId);

CREATE TABLE IF NOT EXISTS proclaimers_cards (
  id integer PRIMARY KEY AUTOINCREMENT,
  beginDate time NOT NULL,
  endDate time,
  qualitatively tinyint(1),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  cardId integer,
  cardNumber integer,
  proclaimerId integer,
  isCompany integer DEFAULT(0)
);

CREATE INDEX IF NOT EXISTS pc_date ON proclaimers_cards (beginDate, endDate);

CREATE INDEX IF NOT EXISTS pc_index ON proclaimers_cards (cardNumber, proclaimerId);
