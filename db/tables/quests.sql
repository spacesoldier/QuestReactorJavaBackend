CREATE TABLE `quests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hashnum` varchar(255) NOT NULL,
  `quest_name` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `quest_status` varchar(45) NOT NULL,
  `is_private` int(11) DEFAULT NULL,
  `quest_success_text` varchar(255) DEFAULT NULL,
  `quest_fail_text` varchar(255) DEFAULT NULL,
  `expire_timestamp` datetime NOT NULL,
  `curr_part` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
