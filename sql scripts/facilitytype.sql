
drop table facilitytype;
CREATE TABLE `facilitytype` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
 `code` varchar(10) COLLATE utf8_unicode_ci,
 `icon` varchar(40) COLLATE utf8_unicode_ci,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;