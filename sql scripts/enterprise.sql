use tmsv1;
drop table enterprise;
CREATE TABLE `enterprise` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `uuid` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
 `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
 `abbr` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
 `description` varchar(100) COLLATE utf8_unicode_ci,
 `status` int NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 `createdby` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

 "id", "uuid", "name", "abbr", "description", "gpslocation", "type", "status", "level", "parrentid", "enterpriseid", "created", "modified",
 "id", "uuid", "name", "abbr", "description", "status", "created", "modified", "createdby"