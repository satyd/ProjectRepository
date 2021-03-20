SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE TABLE `user`;
TRUNCATE TABLE `post`;
SET FOREIGN_KEY_CHECKS = 1;
INSERT INTO `user` (`USER_ID`, `Name`)
VALUES
(11,'JmihPetrovich'),
(10,'JmihePetrovich'),
(9,'JmihuPetrovich'),
(8,'Jmih'),
(7,'Petrovich'),
(6,'Pivasich'),
(1,'Pechenich'),
(5,'Jopich'),
(4,'Petovich'),
(3,'Perovich');

INSERT INTO `post` (`POST_ID`, `USER_ID`, `DESCRIPTION`,`CREATED_AT`,` PHOTO_LINK`,`POINTS`)
VALUES
 (1, 11, 'they stole this posts text!','2020-05-18','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user1',2),
 (2, 10, 'hello !','2020-05-19','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user2',0),
 (11, 10, 'hello im brood!','2020-05-20','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user2',2),
 (12, 10, 'NOhello !','2020-05-18','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user2',2),
 (3, 9, 'some text!','2020-05-13','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user3',12),
 (4, 8, 'i m g r o o t','2020-04-18','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user4',4),
 (5, 1, 'hello my fellow programmers','2020-05-18','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user5',-1),
 (6, 7, 'believe in nothing','2020-03-12','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user6',2),
 (7, 6, '#mudM','2020-05-20','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user7',4),
 (8, 5, 'they stole this posts text!','2020-05-17','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user8',7),
 (9, 4, 'they stole this posts text!','2020-05-12','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user9',3),
 (10, 3, 'they stole this posts text!','2020-05-18','C:\Users\Admin\IdeaProjects\verM\target\verM\res\images\user10',2);
 
 
 
 