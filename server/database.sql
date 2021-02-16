CREATE DATABASE pernstack;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

UPDATE todo 
SET description = 'JESUS IS LORD'
WHERE todo_id = 2;
SELECT * FROM todo ORDER BY todo_id ASC;