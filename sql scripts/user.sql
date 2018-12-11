use tmsv1;
drop table user;
CREATE TABLE `user` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `uuid` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
 `firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `lastname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `mobileno` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `status` int NOT NULL,
 `role` int NOT NULL,
 `gender` int NOT NULL,
 `image` varchar(255) NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 `createdby` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;