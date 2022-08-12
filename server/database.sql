-- makes writing commands more visually pleasing.
--create database called jwttutorial
-- CREATE DATABASE jwttutorial;

--create table schema:
--remember to set extension (download) for 'uuid_generate_v4()' to function: run command -> 'create extension if not exists "uuid-ossp";' inside database.
-- CREATE TABLE users(
--     -- 'uuid' creates a complex id; 'uuid_generate_v4()' is a function that runs to create the uuid
--     user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     --sets max character limit of 255
--     user_name VARCHAR(255) NOT NULL,
--     user_email VARCHAR(255) NOT NULL,
--     user_password VARCHAR(255) NOT NULL
-- );

--can check to see if it works:
--insert fake users (use single quotes to add data (unable to do so with double quotes)).
-- INSERT INTO users (user_name, user_email, user_password) VALUES ('tunisia', 'tartope@gmail.com', '123');


--new database below:

CREATE DATABASE authtodolist;

--users 
--DEFAULT because PRIMARY KEY can never be empty
CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);


--todos 
--SERIAL means it auto increments
CREATE TABLE todos (
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--can check to see if it works:

--fake user data
INSERT INTO users (user_name, user_email, user_password) VALUES ('Buddy', 'buddy@gmail.com', '123');
INSERT INTO users (user_name, user_email, user_password) VALUES ('Tunisia', 'tartope@gmail.com', '123');
INSERT INTO users (user_name, user_email, user_password) VALUES ('Sponge Bob', 'sb@gmail.com', '123');

--fake todos data
INSERT INTO todos (user_id, description) VALUES ('e98ffbf0-96e4-457e-b59d-37bbf772ce78', 'meow!');
INSERT INTO todos (user_id, description) VALUES ('ab467e85-6387-4582-9727-7b54de7b6936', 'Feed the cat.');
INSERT INTO todos (user_id, description) VALUES ('ab467e85-6387-4582-9727-7b54de7b6936', 'Buy cat food.');