CREATE TABLE `quest_db`.`quests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hashnum` VARCHAR(255) NOT NULL,
  `quest_name` VARCHAR(255) NULL,
  `author_id` INT NOT NULL,
  `player_id` INT NULL,
  `status` VARCHAR(45) NOT NULL,
  `is_private` INT NULL,
  `quest_success_text` VARCHAR(255) NULL,
  `quest_fail_text` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
