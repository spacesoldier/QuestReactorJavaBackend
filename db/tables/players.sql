CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` int(11) NOT NULL,
  `login` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `vk_id` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fb_id` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gplus_id` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
