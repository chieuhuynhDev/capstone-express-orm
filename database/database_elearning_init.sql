/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `CourseCategories` (
  `courseCategories_id` int NOT NULL AUTO_INCREMENT,
  `categoryCode` varchar(50) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`courseCategories_id`),
  UNIQUE KEY `categoryCode` (`categoryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Courses` (
  `courses_id` int NOT NULL AUTO_INCREMENT,
  `courseCode` varchar(50) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `description` text,
  `views` int DEFAULT '0',
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdDate` date NOT NULL,
  `studentCount` int DEFAULT '0',
  `creatorId` int DEFAULT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`courses_id`),
  UNIQUE KEY `courseCode` (`courseCode`),
  KEY `creatorId` (`creatorId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `Courses_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `Users` (`users_id`) ON DELETE SET NULL,
  CONSTRAINT `Courses_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `CourseCategories` (`courseCategories_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `users_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `userTypeId` int NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `email` (`email`),
  KEY `userTypeId` (`userTypeId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `UserTypes` (`userTypes_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserTypes` (
  `userTypes_id` int NOT NULL AUTO_INCREMENT,
  `userTypeCode` varchar(10) NOT NULL,
  `userTypeName` varchar(100) NOT NULL,
  PRIMARY KEY (`userTypes_id`),
  UNIQUE KEY `userTypeCode` (`userTypeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `CourseCategories` (`courseCategories_id`, `categoryCode`, `categoryName`) VALUES
(1, 'BackEnd', 'Lập trình Backend');
INSERT INTO `CourseCategories` (`courseCategories_id`, `categoryCode`, `categoryName`) VALUES
(2, 'FrontEnd', 'Lập trình Front end');


INSERT INTO `Courses` (`courses_id`, `courseCode`, `alias`, `courseName`, `description`, `views`, `imageUrl`, `createdDate`, `studentCount`, `creatorId`, `categoryId`) VALUES
(1, 'JS001', 'javascriptt', 'Javascriptt', 'absolutely amazing', 0, 'https://picsum.photos/300/200?random=1', '2024-12-04', 0, 1, 1);
INSERT INTO `Courses` (`courses_id`, `courseCode`, `alias`, `courseName`, `description`, `views`, `imageUrl`, `createdDate`, `studentCount`, `creatorId`, `categoryId`) VALUES
(2, 'WEB002', '123n', '123n', 'string', 1001, 'https://picsum.photos/300/200?random=2', '2025-01-09', 0, 2, 1);
INSERT INTO `Courses` (`courses_id`, `courseCode`, `alias`, `courseName`, `description`, `views`, `imageUrl`, `createdDate`, `studentCount`, `creatorId`, `categoryId`) VALUES
(3, 'NODE003', 'nodejs', 'Node.js Basics', 'Learn Node.js from scratch', 150, 'https://picsum.photos/300/200?random=3', '2024-11-15', 5, 1, 2);
INSERT INTO `Courses` (`courses_id`, `courseCode`, `alias`, `courseName`, `description`, `views`, `imageUrl`, `createdDate`, `studentCount`, `creatorId`, `categoryId`) VALUES
(4, 'DB004', 'mysql', 'MySQL Essentials', 'Database fundamentals', 300, 'https://picsum.photos/300/200?random=4', '2024-10-20', 10, 4, 1),
(5, 'API005', 'restapi', 'REST API Design', 'Build RESTful services', 50, 'https://picsum.photos/300/200?random=5', '2025-02-01', 2, 5, 2);

INSERT INTO `Users` (`users_id`, `password`, `fullName`, `phoneNumber`, `email`, `userTypeId`) VALUES
(1, 'password123', 'admin', NULL, 'admin@example.com', 1);
INSERT INTO `Users` (`users_id`, `password`, `fullName`, `phoneNumber`, `email`, `userTypeId`) VALUES
(2, 'pass456', 'bao 34', NULL, 'bao34@example.com', 1);
INSERT INTO `Users` (`users_id`, `password`, `fullName`, `phoneNumber`, `email`, `userTypeId`) VALUES
(3, 'pass789', 'hehe', '111111', '111111a@gmail.com', 2);
INSERT INTO `Users` (`users_id`, `password`, `fullName`, `phoneNumber`, `email`, `userTypeId`) VALUES
(4, 'pass101', 'bao', '0900000001', 'wozaqunu1@mailinator.com', 1),
(5, 'pass112', 'aaaaaaaa', '123412312', 'a2222@gmail.com', 1);

INSERT INTO `UserTypes` (`userTypes_id`, `userTypeCode`, `userTypeName`) VALUES
(1, 'GV', 'Giáo vụ');
INSERT INTO `UserTypes` (`userTypes_id`, `userTypeCode`, `userTypeName`) VALUES
(2, 'HV', 'Học viên');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;