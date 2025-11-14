-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: cooktaste
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `user_id` int unsigned NOT NULL,
  `recipe_id` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`recipe_id`),
  KEY `fk_fav_recipe` (`recipe_id`),
  CONSTRAINT `fk_fav_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,'wk1','2025-11-13 21:40:26'),(1,'wk2','2025-11-13 21:40:27'),(2,'wk4','2025-11-13 21:36:11'),(2,'wk8','2025-11-13 21:36:34'),(2,'wk9','2025-11-13 21:36:36');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `time_label` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `description` text,
  `ingredients` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES ('wk1','Sheet Pan Salmon and Broccoli with Miso Butter','FAMILY DINNERS','45 mins','/Images/Sheet Pan Salmon and Broccoli .webp','/recipes/sheet-pan-salmon',4.50,'Quick sheet-pan salmon','[\"salmon\", \"broccoli\", \"miso\", \"butter\"]','2025-11-13 14:16:53'),('wk2',' Quick Beef Stir Fry with Bell Peppers','Quick Dinners','40 mins','/Images/Quick Beef Stir Fry with Bell Peppers.webp','/recipes/sausage-potato-soup',4.70,'Fast stir fry','[\"beef\", \"pepper\", \"garlic\", \"soy\"]','2025-11-13 14:16:53'),('wk3','My Granny\'s 5-Ingredient Party Pie','Easy Pies','20 mins','/Images/Party Pie.webp','/recipes/Party Pie',4.60,'Retro pie','[\"chocolate\", \"cream\", \"cookie\"]','2025-11-13 14:16:53'),('wk4','4-Ingredient Chicken Dinner','Easy Slow Cooker','30 mins','/Images/4-Ingredient Chicken Dinner.webp','/recipes/4-Ingredient Chicken Dinner',4.80,'Cozy chicken','[\"chicken\", \"potato\", \"onion\"]','2025-11-13 14:16:53'),('wk5','Vegetarian Spinach and Mushroom Lasagna','VEGETARIAN','30 mins','/Images/Vegetarian Spinach and Mushroom Lasagna.webp','/recipes/Vegetarian Spinach and Mushroom Lasagna',4.40,'Veg lasagna','[\"spinach\", \"mushroom\", \"pasta\", \"tomato\"]','2025-11-13 14:16:53'),('wk6','Peanut Butter Chocolate Chip Banana Bread','Dessert','22 mins','/Images/Peanut Butter Chocolate Chip Banana Bread.webp','/recipes/Peanut Butter Chocolate Chip Banana Bread',4.60,'Moist loaf','[\"banana\", \"chocolate\", \"peanut butter\"]','2025-11-13 14:16:53'),('wk7','Boozy Hot Chocolate','Drinks','15 mins','/Images/Boozy Hot Chocolate.webp','/recipes/Boozy Hot Chocolate',4.80,'Winter drink','[\"chocolate\"]','2025-11-13 14:16:53'),('wk8','Strawberry Lemonade','Drinks','5 mins','/Images/Strawberry Lemonade.webp','/recipes/Strawberry Lemonade',4.40,'Fresh','[\"strawberry\", \"lemon\"]','2025-11-13 14:16:53'),('wk9','Blueberry Smoothie','Healthy Smoothies','5 mins','/Images/Blueberry Smoothie.webp','/recipes/Blueberry Smoothie',4.60,'Healthy smoothie','[\"blueberry\", \"yogurt\"]','2025-11-13 14:16:53');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(190) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES (1,'bektashirea@gmail.com','2025-11-03 21:01:51'),(2,'driole@gmail.com','2025-11-04 13:01:41'),(3,'erza@gmail.com','2025-11-04 19:26:55'),(4,'reabektashi@gmail.com','2025-11-05 14:04:13'),(5,'rronukimeraj43@gmail.com','2025-11-05 14:06:08'),(6,'anida@gmail.com','2025-11-06 12:40:25'),(7,'fbektashi@gmail.com','2025-11-06 19:21:46'),(8,'anidaakadriu@gmail.com','2025-11-10 11:32:42'),(9,'erzarea11@gmail.com','2025-11-12 16:13:39');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'edina@gmail.com','$2b$10$Ym.SMurUIzwGWpLhIsIWtOInabAgHbzQwO37knfevw3kVMvflqNWu','user','2025-11-13 19:54:47'),(2,'bektashirea@gmail.com','$2b$10$SLaQDfbKHB/BQ6S6S4C9IeMO3c87tsgwza0qEmeypfP.aJ0OSRmI2','admin','2025-11-13 20:01:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 19:11:52
