-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2022 at 04:46 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix_name` varchar(255) DEFAULT NULL,
  `position_id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `position_id`, `email`, `password`, `user_type`, `created_at`, `updated_at`) VALUES
('21c485c1-7866-11ec-ba80-6c626d3a5d34', 'Hayden', NULL, 'Glover', NULL, '935ed1d6-785f-11ec-ba80-6c626d3a5d34', 'hr_manager@homies.com', '$2b$12$kdGf8QZE.djgUhoAjZEZye8xUPXX4tVgqqFlP0BYUujcS.t4jK.Gy', 'Hiring Manager', '2021-01-20 21:54:18', '2022-01-18 21:54:18'),
('24fec4e3-7865-11ec-ba80-6c626d3a5d34', 'Loren', NULL, 'Whitehead', NULL, '92957000-7862-11ec-ba80-6c626d3a5d34', 'opd_head@homies.com', '$2b$12$kZMVqpEGd2/vWsHLd48esef3HKn6buAmE1aNR9rWTYWVIcXUrPQzS', 'Department Head', '2021-01-18 21:47:14', '2022-01-18 21:47:14'),
('3d4174f0-7865-11ec-ba80-6c626d3a5d34', 'Ava', NULL, 'Bennett', NULL, '953b89be-7862-11ec-ba80-6c626d3a5d34', 'opd_manager@homies.com', '$2b$12$5Lf2YdkowOOOnvzE03epCOOL8VeBOuYdiv.f5TKj7CYlQMFHOD6yC', 'Department Manager', '2021-01-18 21:47:55', '2022-01-18 21:47:55'),
('74366c72-7866-11ec-ba80-6c626d3a5d34', 'Vivian', NULL, 'Olsen', NULL, 'bb67fffa-785f-11ec-ba80-6c626d3a5d34', 'hr_recruiter@homies.com', '$2b$12$yRoqY6kGEXyk8T6AlDvqre2TvQehelOh07pOz1FTu1VfQIvUN51fu', 'Recruiter', '2021-01-18 21:56:37', '2022-01-18 21:56:37'),
('993a8d5b-7864-11ec-ba80-6c626d3a5d34', 'Melville', NULL, 'Ellison', NULL, 'ed8f05fc-7860-11ec-ba80-6c626d3a5d34', 'icu_head@homies.com', '$2b$12$Uiqe0PlW4K3eDKlkl7hn0.J3nPSekbc2XnpNFf91VGpwx1CFv8NKO', 'Department Head', '2021-01-18 21:43:20', '2022-01-18 21:43:20'),
('9fa5dc93-7865-11ec-ba80-6c626d3a5d34', 'Robbie', NULL, 'Gordon', NULL, '5a519cbb-7860-11ec-ba80-6c626d3a5d34', 'it_manager@homies.com', '$2b$12$EKM0Ak/BUnz.8xwurZcCJuYo70rEPpS6QiBUFF4xtjaDVm/28GG/W', 'Department Manager', '2021-01-18 21:50:40', '2022-01-18 21:50:40'),
('c690884e-7864-11ec-ba80-6c626d3a5d34', 'Sydney', NULL, 'Hogan', NULL, 'f065294b-7860-11ec-ba80-6c626d3a5d34', 'icu_manager@homies.com', '$2b$12$Xnj0JGcoUAiyxWHRZ0B.v.rdscB.0lbYeV.D9VcsSEnZigZ/ok7hC', 'Department Manager', '2021-01-18 21:44:36', '2022-01-18 21:44:36'),
('ec5f7346-7865-11ec-ba80-6c626d3a5d34', 'Winfred', NULL, 'Carroll', NULL, '51312fde-7860-11ec-ba80-6c626d3a5d34', 'it_head@homies.com', '$2b$12$OTQ3.ywmoCHxWZRi6UjsUO76qPYzAJNI1vh8Cldo.YvIYswGDYXe2', 'Department Head', '2021-01-18 21:52:49', '2022-01-18 21:52:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `position_id` (`position_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
