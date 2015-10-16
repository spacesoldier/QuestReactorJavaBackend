CREATE TABLE `quest_db`.`sessions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quest_id` VARCHAR(255) NOT NULL,
  `author_id` INT NULL,
  `player_id` INT NULL,
  `curr_part` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NULL,
  `status` INT NULL,
  PRIMARY KEY (`id`));
