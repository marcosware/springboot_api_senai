CREATE DATABASE imageBank IF NOT EXISTS

Use imageBank

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `url` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
)