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
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` varchar(36) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `department_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('09ee6d56-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'IT Project Manager', 'IT Project Manager', '2021-01-18 21:10:41', '2022-01-18 21:10:41'),
('13c19c7c-7861-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Critical Care Technician', 'Critical Care Technician', '2021-01-18 21:18:07', '2022-01-18 21:18:07'),
('1b8395b3-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Enterprise Architect', 'Enterprise Architect', '2021-01-18 21:11:11', '2022-01-18 21:11:11'),
('294f4cf1-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Application Analyst', 'Application Analyst', '2021-01-18 21:11:34', '2022-01-18 21:11:34'),
('3ab36dae-7861-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Pediatric Nurse', 'Pediatric Nurse', '2021-01-18 21:19:13', '2022-01-18 21:19:13'),
('3f8fa73d-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Information Security Analyst', 'Information Security Analyst', '2021-01-18 21:12:11', '2022-01-18 21:12:11'),
('51312fde-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'IT Department Head', 'IT Department Head', '2021-01-18 21:12:41', '2022-01-18 21:12:41'),
('5a519cbb-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'IT Department Manager', 'IT Department Manager', '2021-01-18 21:12:56', '2022-01-18 21:12:56'),
('67bfe6c3-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Clinical Nurse, OPD', 'Clinical Nurse, OPD', '2021-01-18 21:27:38', '2022-01-18 21:27:38'),
('7de06c92-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Pediatric Nurse, OPD', 'Pediatric Nurse, OPD', '2021-01-18 21:28:15', '2022-01-18 21:28:15'),
('92957000-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'OPD Department Head', 'OPD Department Head', '2021-01-18 21:28:49', '2022-01-18 21:28:49'),
('935ed1d6-785f-11ec-ba80-6c626d3a5d34', '1ba3a3a6-785f-11ec-ba80-6c626d3a5d34', 'Hiring Manager, HR', 'Hiring Manager, HR', '2021-01-18 21:07:22', '2022-01-18 21:07:22'),
('953b89be-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'OPD Department Manager', 'OPD Department Manager', '2021-01-18 21:28:54', '2022-01-18 21:28:54'),
('a7ac288f-7861-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Travel Nurse, ICU', 'Travel Nurse, ICU', '2021-01-18 21:22:15', '2022-01-18 21:22:15'),
('bb67fffa-785f-11ec-ba80-6c626d3a5d34', '1ba3a3a6-785f-11ec-ba80-6c626d3a5d34', 'Talent Recruiter, HR', 'Talent Recruiter, HR', '2021-01-18 21:08:29', '2022-01-18 21:08:29'),
('e1b6c82e-7860-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Registered Nurse, ICU', 'Registered Nurse, ICU', '2021-01-18 21:16:43', '2022-01-18 21:16:43'),
('e6c81adf-7861-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Registered Nurse, OPD', 'Registered Nurse, OPD', '2021-01-18 21:24:01', '2022-01-18 21:24:01'),
('ed8f05fc-7860-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'ICU Department Head', 'ICU Department Head', '2021-01-18 21:17:03', '2022-01-18 21:17:03'),
('f065294b-7860-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'ICU Department Manager', 'ICU Department Manager', '2021-01-18 21:17:08', '2022-01-18 21:17:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
