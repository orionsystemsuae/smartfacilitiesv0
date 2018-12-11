use tmsv1;
drop table device;
CREATE TABLE `device` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `uuid` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
 `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
 `key` varchar(100) COLLATE utf8_unicode_ci,
 `description` varchar(100) COLLATE utf8_unicode_ci,
 `type` int NOT NULL,
 `status` int NOT NULL,
 `facilityid` int(11),
 `facilityuuid` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;