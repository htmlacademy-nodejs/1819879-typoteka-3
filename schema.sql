CREATE TABLE categories
(
  id   integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) NOT NULL
);
CREATE TABLE users
(
  id            integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email         varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255)        NOT NULL,
  first_name    varchar(255)        NOT NULL,
  last_name     varchar(255)        NOT NULL,
  avatar        varchar(50)         NOT NULL,
  is_admin      boolean             NOT NULL
);
CREATE TABLE articles
(
  id        integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title     varchar(255)  NOT NULL,
  announce  varchar(2000) NOT NULL,
  full_text text          NOT NULL,
  image     varchar(50)   NOT NULL,
  user_id   integer       NOT NULL,
  create_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE TABLE comments
(
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text       text    NOT NULL,
  user_id    integer NOT NULL,
  article_id integer NOT NULL,
  create_at  timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
);
CREATE TABLE article_categories
(
  article_id  integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);
CREATE INDEX ON articles(title);
