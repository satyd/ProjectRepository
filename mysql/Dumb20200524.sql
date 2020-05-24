CREATE DATABASE  IF NOT EXISTS `upludok` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `upludok`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: upludok
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `POST_ID` int NOT NULL,
  `USER_ID` int NOT NULL,
  `DESCRIPTION` varchar(45) NOT NULL,
  `CREATED_AT` datetime NOT NULL,
  ` PHOTO_LINK` varchar(200) DEFAULT NULL,
  `POINTS` int DEFAULT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  CONSTRAINT `USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,11,'they stole this posts text!','2020-05-18 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser1',2),(2,10,'hello !','2020-05-19 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser2',0),(3,9,'some text!','2020-05-13 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser3',12),(4,8,'i m g r o o t','2020-04-18 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser4',4),(5,1,'hello my fellow programmers','2020-05-18 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser5',-1),(6,7,'believe in nothing','2020-03-12 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser6',2),(7,6,'#mudM','2020-05-20 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser7',4),(8,5,'they stole this posts text!','2020-05-17 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser8',7),(9,4,'they stole this posts text!','2020-05-12 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser9',3),(10,3,'they stole this posts text!','2020-05-18 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser10',2),(11,10,'hello im brood!','2020-05-20 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser2',2),(12,10,'NOhello !','2020-05-18 00:00:00','C:UsersAdminIdeaProjectsverM	argetverM\resimagesuser2',2);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `idTags` int NOT NULL,
  `tagName` varchar(45) NOT NULL,
  PRIMARY KEY (`idTags`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `USER_ID` int NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Pechenich'),(3,'Perovich'),(4,'Petovich'),(5,'Jopich'),(6,'Pivasich'),(7,'Petrovich'),(8,'Jmih'),(9,'JmihuPetrovich'),(10,'JmihePetrovich'),(11,'JmihPetrovich');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-24 19:09:13
