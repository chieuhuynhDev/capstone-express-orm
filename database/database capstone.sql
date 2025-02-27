
-- Create table UserTypes
CREATE TABLE UserTypes (
    userTypes_id INT AUTO_INCREMENT PRIMARY KEY, 
    userTypeCode VARCHAR(10) UNIQUE NOT NULL, 
    userTypeName VARCHAR(100) NOT NULL 
);

-- Create table Users
CREATE TABLE Users (
    users_id INT AUTO_INCREMENT PRIMARY KEY, 
    
    password VARCHAR(255) NOT NULL, 
    fullName VARCHAR(255) NOT NULL, 
    phoneNumber VARCHAR(20), 
    email VARCHAR(255) UNIQUE NOT NULL, 
    userTypeId INT NOT NULL, 
    FOREIGN KEY (userTypeId) REFERENCES UserTypes(userTypes_id) ON DELETE RESTRICT
);

-- Create table CourseCategories
CREATE TABLE CourseCategories (
    courseCategories_id INT AUTO_INCREMENT PRIMARY KEY,
    categoryCode VARCHAR(50) UNIQUE NOT NULL, 
    categoryName VARCHAR(255) NOT NULL 
);

-- Create table Courses
CREATE TABLE Courses (
    courses_id INT AUTO_INCREMENT PRIMARY KEY, 
    courseCode VARCHAR(50) UNIQUE NOT NULL, 
    alias VARCHAR(255) NOT NULL, 
    courseName VARCHAR(255) NOT NULL, 
    description TEXT, 
    views INT DEFAULT 0, 
    imageUrl VARCHAR(255), 
    createdDate DATE NOT NULL, 
    studentCount INT DEFAULT 0, 
    creatorId INT , 
    categoryId INT NOT NULL, 
    FOREIGN KEY (creatorId) REFERENCES Users(users_id) ON DELETE SET NULL,
    FOREIGN KEY (categoryId) REFERENCES CourseCategories(courseCategories_id) ON DELETE RESTRICT
);

-- Insert sample data into UserTypes
INSERT INTO UserTypes (userTypeCode, userTypeName) VALUES
('GV', 'Giáo vụ'),
('HV', 'Học viên');

-- Insert sample data into Users
INSERT INTO Users ( password, fullName, phoneNumber, email, userTypeId) VALUES
( 'password123', 'admin', NULL,  'admin@example.com', 1),
('pass456', 'bao 34', NULL, 'bao34@example.com', 1),
('pass789', 'hehe', '111111', '111111a@gmail.com', 2), 
('pass101', 'bao', '0900000001',  'wozaqunu1@mailinator.com', 1), 
('pass112', 'aaaaaaaa', '123412312',  'a2222@gmail.com', 1); 

-- Insert sample data into CourseCategories
INSERT INTO CourseCategories (categoryCode, categoryName) VALUES
('BackEnd', 'Lập trình Backend'),
('FrontEnd', 'Lập trình Front end');

-- Insert sample data into Courses
INSERT INTO Courses (courseCode, alias, courseName, description, views, imageUrl,  createdDate, studentCount, creatorId, categoryId) VALUES
('JS001', 'javascriptt', 'Javascriptt', 'absolutely amazing', 0, 'https://picsum.photos/300/200?random=1',  '2024-12-04', 0, 1, 1),
('WEB002', '123n', '123n', 'string', 1001, 'https://picsum.photos/300/200?random=2',  '2025-01-09', 0, 2, 1),
('NODE003', 'nodejs', 'Node.js Basics', 'Learn Node.js from scratch', 150, 'https://picsum.photos/300/200?random=3', '2024-11-15', 5, 1, 2),
('DB004', 'mysql', 'MySQL Essentials', 'Database fundamentals', 300, 'https://picsum.photos/300/200?random=4',  '2024-10-20', 10, 4, 1),
('API005', 'restapi', 'REST API Design', 'Build RESTful services', 50, 'https://picsum.photos/300/200?random=5', '2025-02-01', 2, 5, 2);