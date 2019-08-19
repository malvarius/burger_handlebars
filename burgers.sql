
-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS burgers_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE burgers_db;
USE burgers_db;

-- Create the table tasks.
CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burger varchar(255) NOT NULL,
  devoured boolean default 0,
  PRIMARY KEY (id)
);

insert into burgers 
(burger,devoured)
values 
("double double",0),
("chili cheese", 1);

select * from burgers;


-- Insert a set of records.
