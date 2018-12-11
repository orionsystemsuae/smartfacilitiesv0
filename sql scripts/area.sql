use tmsv1;
drop table area;
CREATE TABLE `area` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `uuid` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
 `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
 `abbr` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
 `description` varchar(100) COLLATE utf8_unicode_ci NULL,
 `gpslocation` varchar(20) COLLATE utf8_unicode_ci NULL,
 `type` int NULL,
 `status` int NOT NULL,
 `level` int NULL,
 `parrentid` int(11),
 `enterpriseid` int(11),
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;