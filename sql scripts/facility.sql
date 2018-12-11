use tmsv1;
CREATE TABLE `facility` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `uuid` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
 `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
 `description` varchar(100) COLLATE utf8_unicode_ci,
 `type` int NOT NULL,
 `status` int NOT NULL,
 `areaid` int(11),
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;