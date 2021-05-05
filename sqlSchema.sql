create database testDetails;
use testDetails;
CREATE TABLE candidate ( id INT PRIMARY KEY AUTO_INCREMENT  , name VARCHAR(50) NOT NULL , email VARCHAR(50));
CREATE TABLE test ( id INT PRIMARY KEY AUTO_INCREMENT  , candidate_id INT, round INT(1) NOT NULL , score INT, FOREIGN KEY (candidate_id) REFERENCES candidate(id));


//Sample Data
INSERT INTO `candidate` (`id`, `name`, `email`) VALUES (NULL, 'raghav', 'raghav@gmail.com'), (NULL, 'aman', 'aman@gmail.com');

INSERT INTO `test` (`id`, `candidate_id`, `round`, `score`) VALUES (NULL, '2', '1', '8'), (NULL, '1', '1', '8'), (NULL, '1', '2', '9'), (NULL, '2', '2', '5'), (NULL, '1', '3', '6'), (NULL, '2', '3', '7');