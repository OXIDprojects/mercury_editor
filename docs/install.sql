CREATE TABLE IF NOT EXISTS `agmercurysnippets` (
  `oxid` char(32) NOT NULL,
  `objectid` char(32) NOT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `options` mediumtext NOT NULL,
  PRIMARY KEY  (`oxid`)
);
