-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2021 at 05:11 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

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
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('915793d0-ff07-11eb-9644-d8c497916dda', 'Human Resource Department', 'Human Resource Department', '2021-08-17 11:02:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` varchar(36) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `department_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('a1a89db0-ff07-11eb-9644-d8c497916dda', '915793d0-ff07-11eb-9644-d8c497916dda', 'Department Head', 'Department Head', '2021-08-17 11:03:00', NULL),
('ad7044a3-ff07-11eb-9644-d8c497916dda', '915793d0-ff07-11eb-9644-d8c497916dda', 'Hiring Manager', 'Hiring Manager', '2021-08-17 11:03:20', NULL),
('b9610b90-ff07-11eb-9644-d8c497916dda', '915793d0-ff07-11eb-9644-d8c497916dda', 'Recruiter', 'Recruiter', '2021-08-17 11:03:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requisitions`
--

CREATE TABLE `requisitions` (
  `requisition_id` varchar(36) NOT NULL,
  `requested_by` varchar(36) NOT NULL,
  `position_id` varchar(36) NOT NULL,
  `employment_type` varchar(255) NOT NULL,
  `request_nature` varchar(255) NOT NULL,
  `staffs_needed` int(11) NOT NULL,
  `min_monthly_salary` float DEFAULT NULL,
  `max_monthly_salary` float DEFAULT NULL,
  `content` text NOT NULL,
  `request_status` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `reviewed_by` varchar(36) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requisitions`
--

INSERT INTO `requisitions` (`requisition_id`, `requested_by`, `position_id`, `employment_type`, `request_nature`, `staffs_needed`, `min_monthly_salary`, `max_monthly_salary`, `content`, `request_status`, `deadline`, `reviewed_by`, `reviewed_at`, `completed_at`, `remarks`, `created_at`, `updated_at`) VALUES
('0fbde148-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Intern/OJT', 'Replacement', 4, 18000, 25000, '<p>dsfdsfsdf</p>', 'Approved', '2021-09-30 00:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-21 14:12:30', NULL, NULL, '2021-08-21 13:24:30', '2021-08-21 22:38:18'),
('1cc92c3f-002f-11ec-becb-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 1, 25000, 35000, 'Lorem impsum dolor sit amet', 'Rejected', '2021-08-29 14:14:51', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-21 14:12:30', NULL, 'Information is not enough', '2021-08-18 22:18:08', '2021-08-21 22:56:11'),
('2007be20-0232-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 4, NULL, NULL, 'Lorem', 'For Review', '2021-08-21 03:24:04', NULL, NULL, NULL, NULL, '2021-08-21 11:44:45', '2021-08-21 11:44:45'),
('2ffb8ef8-0230-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 4, NULL, NULL, 'Lorem', 'For Review', '2021-08-21 03:24:04', NULL, NULL, NULL, NULL, '2021-08-21 11:30:52', '2021-08-21 11:30:52'),
('9de5b6d9-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Part Time', 'Replacement', 5, 18000, 25000, '<p><b>Job Description</b></p><p>Lorem inpsum dolor sit amet consectetur.&nbsp;<span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.</span></p>', 'For Review', '2021-10-01 00:00:00', NULL, NULL, NULL, NULL, '2021-08-21 13:28:29', '2021-08-21 13:28:29'),
('c1e392c9-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Contract', 'Replacement', 6, 18000, 25000, '<p>sdfsd</p>', 'For Review', '2021-10-30 00:00:00', NULL, NULL, NULL, NULL, '2021-08-21 13:29:29', '2021-08-21 13:29:29'),
('fa26f87d-01d2-11ec-b603-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Part Time', 'Replacement', 1, 12000, 18000, '<h1>Test</h1>', 'For Review', '2021-09-01 16:22:35', NULL, NULL, NULL, NULL, '2021-08-21 00:23:39', '2021-08-21 00:23:39');

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
('99363496-ff0b-11eb-9644-d8c497916dda', 'Jetsun Prince', '', 'Torres', '', 'a1a89db0-ff07-11eb-9644-d8c497916dda', 'departmenthead@email.com', '$2b$12$0GRgLDXjlKEtHS5eEMkii.4GzK9WHznvvJGAp4f4OZRSMrJ50fogy', 'Department Head', '2021-08-17 11:31:24', NULL),
('d23e5f3c-ff0c-11eb-9644-d8c497916dda', 'Vanessah', '', 'Buenaventura', '', 'ad7044a3-ff07-11eb-9644-d8c497916dda', 'hiringmanager@email.com', '$2b$12$1hyj/cv/BlqcBUdPaMeMJ.RKp8FhGpezwZqw0N5J9seJkm5Q1U1Wa', 'Hiring Manager', '2021-08-17 11:40:09', '2021-08-17 11:40:09'),
('f87dd92a-ff0c-11eb-9644-d8c497916dda', 'Neil Ira', '', 'Concepcion', '', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'recruiter@email.com', '$2b$12$6dmvpE8NJEvaiYO.aC8X6.e4mvqHtSYV/H0FwTf.rKZPdtFkKDpRu', 'Recruiter', '2021-08-17 11:41:13', '2021-08-17 11:41:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `requisitions`
--
ALTER TABLE `requisitions`
  ADD PRIMARY KEY (`requisition_id`),
  ADD KEY `requested_by` (`requested_by`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `reviewed_by` (`reviewed_by`);

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
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `requisitions`
--
ALTER TABLE `requisitions`
  ADD CONSTRAINT `requisitions_ibfk_1` FOREIGN KEY (`requested_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `requisitions_ibfk_2` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  ADD CONSTRAINT `requisitions_ibfk_3` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
