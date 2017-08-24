CREATE DATABASE POP_db;
USE POP_db;

CREATE TABLE `humans` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `first_name` VARCHAR( 255) NOT NULL,
  `last_name` VARCHAR( 255 ) NOT NULL,
  `formatted_address` VARCHAR( 255) NOT NULL,
  `address_lat` DECIMAL( 18,14 ) NOT NULL,
  `address_lng` DECIMAL( 18,14 ) NOT NULL,
  `created_at` DATETIME NOT NULL,

INSERT INTO humans (first_name, last_name, formatted_address, address_lat, address_lng)
  VALUES ( `Mayat`, `Smolnik`, `1320 Quitman St Denver Co 80204`, ) );
