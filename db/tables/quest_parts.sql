CREATE TABLE `quest_parts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest_id` int(11) NOT NULL,
  `partnum` int(11) NOT NULL,
  `part_image` varchar(2048) DEFAULT NULL,
  `part_video` varchar(2048) DEFAULT NULL,
  `part_text` varchar(2048) DEFAULT NULL,
  `part_answers` varchar(4096) DEFAULT NULL,
  `right_answer` varchar(1024) DEFAULT NULL,
  `part_success_text` varchar(1024) DEFAULT NULL,
  `part_fail_text` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
