-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2022 at 01:24 PM
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
-- Database: `homies_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `applicant_id` varchar(36) NOT NULL,
  `job_post_id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix_name` varchar(255) DEFAULT NULL,
  `resume` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `evaluated_by` varchar(36) DEFAULT NULL,
  `evaluated_at` datetime DEFAULT NULL,
  `screened_by` varchar(36) DEFAULT NULL,
  `screened_at` datetime DEFAULT NULL,
  `hired_by` varchar(36) DEFAULT NULL,
  `hired_at` varchar(36) DEFAULT NULL,
  `rejected_by` varchar(36) DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`applicant_id`, `job_post_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `resume`, `contact_number`, `email`, `status`, `evaluated_by`, `evaluated_at`, `screened_by`, `screened_at`, `hired_by`, `hired_at`, `rejected_by`, `rejected_at`, `remarks`, `created_at`, `updated_at`) VALUES
('042e8280-913e-11ec-aea7-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Jim ', '', 'Vargas', '', 'd5daa56abacd4e9abc392954a7bbf242.pdf', '(521)-141-1459', 'jim.vargas@example.com', 'For interview', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-19 15:51:48', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 15:53:10', NULL, NULL, NULL, NULL, NULL, '2022-02-19 12:40:08', '2022-02-19 15:53:10'),
('17dd6322-93ad-11ec-978b-6c626d3a5d34', '9d01b6c0-8d8e-11ec-a6db-6c626d3a5d34', 'Gertrude ', '', 'Mitchelle', '', '616b19dfef304e6ab9177449af45f4a6.pdf', '(495)-604-2133', 'gertrude.mitchelle@example.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-22 15:00:18', '2022-02-22 15:00:18'),
('1ee99481-8e25-11ec-ab27-6c626d3a5d34', '01ed5350-8d8f-11ec-a6db-6c626d3a5d34', 'Jam', '', 'Torres', '', '8e7578d5cc994c46b62cfa98da8239c6.pdf', '1234568790', 'jamtorres@email.com', 'Contract signed', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-15 14:06:36', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 14:56:40', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 16:13:09', NULL, NULL, NULL, '2022-02-15 14:04:22', '2022-02-16 13:23:21'),
('22cc0de9-913e-11ec-aea7-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Ana ', '', 'Ross', '', '05e9d996b5eb4d2880447fb4bc051bea.pdf', '(713)-536-5675', 'ana.ross@example.com', 'Contract signed', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-19 15:51:33', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 15:53:04', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:24:39', NULL, NULL, NULL, '2022-02-19 12:40:59', '2022-02-23 17:31:45'),
('2a8a6bfa-93ad-11ec-978b-6c626d3a5d34', '9d01b6c0-8d8e-11ec-a6db-6c626d3a5d34', 'Flenn ', '', 'Spencer', '', '5250ceac5ddc4c16b54301b30d164fcc.pdf', '(148)-729-0014', 'flenn.spencer@example.com', 'Contract signed', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-23 19:21:21', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:22:45', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:25:37', NULL, NULL, NULL, '2022-02-22 15:00:49', '2022-02-23 19:41:08'),
('40c15e19-93ad-11ec-978b-6c626d3a5d34', '9d01b6c0-8d8e-11ec-a6db-6c626d3a5d34', 'Dolores ', '', 'Willis', '', '441807d4ed094f36a0620ee05615d505.pdf', '(801)-171-2936', 'dolores.willis@example.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, NULL, NULL, '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-22 15:06:29', 'Invalid resume is submitted', '2022-02-22 15:01:26', '2022-02-22 15:06:29'),
('4e4e381b-93ad-11ec-978b-6c626d3a5d34', '9d01b6c0-8d8e-11ec-a6db-6c626d3a5d34', 'Alicia ', '', 'Sanchez', '', '055a257b0b634a18868750cae80c6f51.pdf', '(361)-239-4848', 'alicia.sanchez@example.com', 'Contract signed', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-23 19:21:18', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:22:39', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:25:34', NULL, NULL, NULL, '2022-02-22 15:01:49', '2022-02-23 19:41:13'),
('5285221a-9469-11ec-b3e4-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Carter ', '', 'Wade', '', 'fea2912d4aee4b688bb6e9317df3f6b6.pdf', '(360)-202-1026', 'carter.wade@example.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, NULL, NULL, '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-23 17:21:13', 'Invalid resume is submitted', '2022-02-23 13:27:41', '2022-02-23 17:21:13'),
('671f4b14-93ad-11ec-978b-6c626d3a5d34', 'f6c129ed-8d8e-11ec-a6db-6c626d3a5d34', 'Wendy ', '', 'Meyer', '', 'cc49136f36e944d7a1ef8976e0e2e7f0.pdf', '(315)-172-0367', 'wendy.meyer@example.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-22 15:02:31', '2022-02-22 15:02:31'),
('68a66907-9469-11ec-b3e4-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Cameron ', '', 'Welch', '', 'dde948d216684f808c3b56dd2034882d.pdf', '(886)-558-5358', 'cameron.welch@example.com', 'For screening', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-23 17:21:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-23 13:28:18', '2022-02-23 17:21:01'),
('76373c8a-93ad-11ec-978b-6c626d3a5d34', 'f6c129ed-8d8e-11ec-a6db-6c626d3a5d34', 'Lucille ', '', 'Boyd', '', '5734b9254c2d49e08bfa65b2a3b6cb4f.pdf', '(783)-205-7109', 'lucille.boyd@example.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-22 15:02:56', '2022-02-22 15:02:56'),
('7c45d985-9469-11ec-b3e4-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Jessie ', '', 'Hale', '', '0976d4cd5de448aabfdc100b000e6e7a.pdf', '(466)-855-4215', 'jessie.hale@example.com', 'Contract signed', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-23 17:20:58', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:22:49', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:24:32', NULL, NULL, NULL, '2022-02-23 13:28:51', '2022-02-23 17:31:39'),
('95cc52de-9469-11ec-b3e4-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Laurie ', '', 'Richardson', '', '59bc09960c004915829f0a902ab797f9.pdf', '(809)-537-4463', 'laurie.richardson@example.com', 'For interview', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-23 17:20:54', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:22:44', NULL, NULL, NULL, NULL, NULL, '2022-02-23 13:29:34', '2022-02-23 17:22:44'),
('99799804-93ad-11ec-978b-6c626d3a5d34', 'f6c129ed-8d8e-11ec-a6db-6c626d3a5d34', 'Aubrey ', '', 'Reid', '', '809eb4c03325499381f53c024c697578.pdf', '(801)-456-5865', 'aubrey.reid@example.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-22 15:03:55', '2022-02-22 15:03:55'),
('e9b7fb48-913d-11ec-aea7-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', 'Dolores ', '', 'Gardner', '', '291ba38ef7454748ab6d24a4109de178.pdf', '(007)-272-6963', 'dolores.gardner@example.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-19 12:39:24', '2022-02-19 12:39:24');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('40accb96-8bda-11ec-88c9-6c626d3a5d34', 'Hospital Core Department', 'Hospital Core Department', '2022-02-12 16:03:24', '2022-02-12 16:03:24'),
('ea5d5b3b-8bd7-11ec-88c9-6c626d3a5d34', 'Human Resource (HR) Department', 'Human Resource (HR) Department', '2022-02-12 15:46:40', '2022-02-12 15:46:40'),
('ffb8fd3e-8bd7-11ec-88c9-6c626d3a5d34', 'Information Technology (IT) Department', 'Information Technology (IT) Department', '2022-02-12 15:47:16', '2022-02-12 15:47:16');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `extension_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) NOT NULL,
  `position_id` varchar(36) NOT NULL,
  `employment_type_id` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `middle_name`, `last_name`, `extension_name`, `contact_number`, `position_id`, `employment_type_id`, `status`, `created_at`, `updated_at`) VALUES
('3ffd2f46-8d52-11ec-a6db-6c626d3a5d34', 'Nathan', NULL, 'Andrews', NULL, '(218)-931-1689', 'f771dfa5-8d51-11ec-a6db-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-14 12:54:54', '2022-02-14 12:54:54'),
('62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 'Crystal', NULL, 'Rodriguez', NULL, '(355)-882-5784', 'bb021c23-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-14 14:14:36', '2022-02-14 14:14:36'),
('7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'Caleb', NULL, 'Ray', NULL, '(026)-502-6807', '4e64359d-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-14 11:44:57', '2022-02-14 11:44:57'),
('92239c6c-8bed-11ec-88c9-6c626d3a5d34', 'Carole', NULL, 'Martinez', NULL, '(009)-792-7145', '1789d150-8be5-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-12 18:21:41', '2022-02-12 18:21:41'),
('974523b2-8d49-11ec-a6db-6c626d3a5d34', 'Soham', NULL, 'Miles', NULL, '(683)-584-6498', 'e43b841d-8d48-11ec-a6db-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-14 11:52:55', '2022-02-14 11:52:55'),
('a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 'Nicole', NULL, 'Austine', NULL, '(582)-829-6206', '93d489e2-8be0-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-13 22:02:58', '2022-02-13 22:02:58'),
('a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'Sherry', NULL, 'McRogers', NULL, '(523)-381-6275', 'b2b030fa-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-14 12:57:49', '2022-02-14 12:57:49'),
('c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', 'Kaylee', NULL, 'Brooks', NULL, '(985)-974-2182', '1789d150-8be5-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-14 12:01:26', '2022-02-14 12:01:26'),
('f5fbb7ed-8cd4-11ec-8d3b-6c626d3a5d34', 'Beatrice', NULL, 'Perez', NULL, '(582)-829-6206', '489d836a-8be8-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-13 21:58:02', '2022-02-13 21:58:02'),
('fade7092-8cd2-11ec-8d3b-6c626d3a5d34', 'Alvin', NULL, 'Morrison', NULL, '(582)-829-6206', '53724726-8be3-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-13 21:43:52', '2022-02-13 21:43:52');

-- --------------------------------------------------------

--
-- Table structure for table `employment_types`
--

CREATE TABLE `employment_types` (
  `employment_type_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employment_types`
--

INSERT INTO `employment_types` (`employment_type_id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
('ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Full Time', 'Full Time', 1, '2022-02-12 17:53:49', '2022-02-12 17:53:49'),
('b2ce077a-8be9-11ec-88c9-6c626d3a5d34', 'Part Time', 'Part Time', 1, '2022-02-12 17:53:58', '2022-02-12 17:53:58'),
('c8913b14-8be9-11ec-88c9-6c626d3a5d34', 'Internship/On-Job Training (OJT)', 'Internship/On-Job Training (OJT)', 1, '2022-02-12 17:54:35', '2022-02-12 17:54:35'),
('ce23d0b2-8be9-11ec-88c9-6c626d3a5d34', 'Contractual', 'Contractual', 1, '2022-02-12 17:54:44', '2022-02-12 17:54:44');

-- --------------------------------------------------------

--
-- Table structure for table `interviewees`
--

CREATE TABLE `interviewees` (
  `interviewee_id` varchar(36) NOT NULL,
  `applicant_id` varchar(36) NOT NULL,
  `interview_schedule_id` varchar(36) DEFAULT NULL,
  `is_interviewed` tinyint(1) DEFAULT NULL,
  `interviewed_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `interviewees`
--

INSERT INTO `interviewees` (`interviewee_id`, `applicant_id`, `interview_schedule_id`, `is_interviewed`, `interviewed_at`, `remarks`, `created_at`, `updated_at`) VALUES
('00d7bd3c-949b-11ec-a5cb-6c626d3a5d34', '2a8a6bfa-93ad-11ec-978b-6c626d3a5d34', '00c14db7-949b-11ec-a5cb-6c626d3a5d34', 1, '2022-02-23 19:24:55', NULL, '2022-02-23 19:23:19', '2022-02-23 19:24:55'),
('00ef81f6-949b-11ec-a5cb-6c626d3a5d34', '4e4e381b-93ad-11ec-978b-6c626d3a5d34', '00c14db7-949b-11ec-a5cb-6c626d3a5d34', 1, '2022-02-23 19:25:10', NULL, '2022-02-23 19:23:19', '2022-02-23 19:25:10'),
('20117533-9159-11ec-aea7-6c626d3a5d34', '042e8280-913e-11ec-aea7-6c626d3a5d34', '1ff9610d-9159-11ec-aea7-6c626d3a5d34', NULL, NULL, NULL, '2022-02-19 15:54:11', '2022-02-19 15:54:11'),
('2036436e-9159-11ec-aea7-6c626d3a5d34', '22cc0de9-913e-11ec-aea7-6c626d3a5d34', '1ff9610d-9159-11ec-aea7-6c626d3a5d34', 1, '2022-02-19 16:16:35', NULL, '2022-02-19 15:54:12', '2022-02-19 16:16:35'),
('3e5830aa-948a-11ec-a5cb-6c626d3a5d34', '7c45d985-9469-11ec-b3e4-6c626d3a5d34', '3e4fc84c-948a-11ec-a5cb-6c626d3a5d34', 1, '2022-02-23 17:24:14', NULL, '2022-02-23 17:23:21', '2022-02-23 17:24:14'),
('3e5eb3dd-948a-11ec-a5cb-6c626d3a5d34', '95cc52de-9469-11ec-b3e4-6c626d3a5d34', '3e4fc84c-948a-11ec-a5cb-6c626d3a5d34', NULL, NULL, NULL, '2022-02-23 17:23:21', '2022-02-23 17:23:21'),
('bd4b7a1a-8e30-11ec-ab27-6c626d3a5d34', '1ee99481-8e25-11ec-ab27-6c626d3a5d34', 'bd3c42ed-8e30-11ec-ab27-6c626d3a5d34', 1, '2022-02-15 16:07:00', NULL, '2022-02-15 15:27:32', '2022-02-15 16:07:00');

-- --------------------------------------------------------

--
-- Table structure for table `interview_questions`
--

CREATE TABLE `interview_questions` (
  `interview_question_id` varchar(36) NOT NULL,
  `question` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `added_by` varchar(36) NOT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `interview_questions`
--

INSERT INTO `interview_questions` (`interview_question_id`, `question`, `type`, `added_by`, `updated_by`, `created_at`, `updated_at`) VALUES
('4058113e-8e36-11ec-ab27-6c626d3a5d34', 'What problems you think you can\'t solve but you find out you can?', 'Added', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 16:07:00', '2022-02-15 16:07:00'),
('5de7cc80-948a-11ec-a5cb-6c626d3a5d34', 'How do you see yourself after 5 years', 'Added', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:24:14', '2022-02-23 17:24:14'),
('82ac0b04-8e2f-11ec-ab27-6c626d3a5d34', 'Why should we hire you?', 'General', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 15:18:44', '2022-02-15 15:18:44'),
('ac894026-8e2f-11ec-ab27-6c626d3a5d34', 'What skills do you have that makes you fit for this job?', 'General', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 15:19:55', '2022-02-15 15:19:55'),
('b49e3260-8e2f-11ec-ab27-6c626d3a5d34', 'What are your strength and weaknesses?', 'General', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 15:20:08', '2022-02-23 13:34:44');

-- --------------------------------------------------------

--
-- Table structure for table `interview_schedules`
--

CREATE TABLE `interview_schedules` (
  `interview_schedule_id` varchar(36) NOT NULL,
  `job_post_id` varchar(36) NOT NULL,
  `scheduled_date` date NOT NULL,
  `start_session` time NOT NULL,
  `end_session` time NOT NULL,
  `set_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `interview_schedules`
--

INSERT INTO `interview_schedules` (`interview_schedule_id`, `job_post_id`, `scheduled_date`, `start_session`, `end_session`, `set_by`, `created_at`, `updated_at`) VALUES
('00c14db7-949b-11ec-a5cb-6c626d3a5d34', '9d01b6c0-8d8e-11ec-a6db-6c626d3a5d34', '2022-02-24', '10:30:00', '14:30:00', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:23:19', '2022-02-23 19:23:19'),
('1ff9610d-9159-11ec-aea7-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', '2022-02-20', '11:00:00', '13:00:00', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 15:54:11', '2022-02-19 15:54:11'),
('3e4fc84c-948a-11ec-a5cb-6c626d3a5d34', 'c5843f55-8d8e-11ec-a6db-6c626d3a5d34', '2022-02-24', '11:00:00', '13:30:00', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:23:21', '2022-02-23 17:23:21'),
('bd3c42ed-8e30-11ec-ab27-6c626d3a5d34', '01ed5350-8d8f-11ec-a6db-6c626d3a5d34', '2022-02-28', '15:30:00', '16:30:00', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 15:27:32', '2022-02-15 15:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `interview_scores`
--

CREATE TABLE `interview_scores` (
  `interview_score_id` varchar(36) NOT NULL,
  `interviewee_id` varchar(36) NOT NULL,
  `interview_question_id` varchar(36) DEFAULT NULL,
  `score` float DEFAULT NULL,
  `scored_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `interview_scores`
--

INSERT INTO `interview_scores` (`interview_score_id`, `interviewee_id`, `interview_question_id`, `score`, `scored_by`, `created_at`, `updated_at`) VALUES
('39c1be13-949b-11ec-a5cb-6c626d3a5d34', '00d7bd3c-949b-11ec-a5cb-6c626d3a5d34', '82ac0b04-8e2f-11ec-ab27-6c626d3a5d34', 92, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:24:55', '2022-02-23 19:24:55'),
('39c206ce-949b-11ec-a5cb-6c626d3a5d34', '00d7bd3c-949b-11ec-a5cb-6c626d3a5d34', 'b49e3260-8e2f-11ec-ab27-6c626d3a5d34', 94, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:24:55', '2022-02-23 19:24:55'),
('39c29a2b-949b-11ec-a5cb-6c626d3a5d34', '00d7bd3c-949b-11ec-a5cb-6c626d3a5d34', 'ac894026-8e2f-11ec-ab27-6c626d3a5d34', 91, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:24:55', '2022-02-23 19:24:55'),
('40568ce6-8e36-11ec-ab27-6c626d3a5d34', 'bd4b7a1a-8e30-11ec-ab27-6c626d3a5d34', '82ac0b04-8e2f-11ec-ab27-6c626d3a5d34', 95, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 16:07:00', '2022-02-15 16:07:00'),
('405721fe-8e36-11ec-ab27-6c626d3a5d34', 'bd4b7a1a-8e30-11ec-ab27-6c626d3a5d34', 'b49e3260-8e2f-11ec-ab27-6c626d3a5d34', 100, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 16:07:00', '2022-02-15 16:07:00'),
('40582065-8e36-11ec-ab27-6c626d3a5d34', 'bd4b7a1a-8e30-11ec-ab27-6c626d3a5d34', 'ac894026-8e2f-11ec-ab27-6c626d3a5d34', 100, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 16:07:00', '2022-02-15 16:07:00'),
('406ff8ab-8e36-11ec-ab27-6c626d3a5d34', 'bd4b7a1a-8e30-11ec-ab27-6c626d3a5d34', '4058113e-8e36-11ec-ab27-6c626d3a5d34', 99, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-15 16:07:00', '2022-02-15 16:07:00'),
('41342715-915c-11ec-aea7-6c626d3a5d34', '2036436e-9159-11ec-aea7-6c626d3a5d34', '82ac0b04-8e2f-11ec-ab27-6c626d3a5d34', 98, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 16:16:35', '2022-02-19 16:16:35'),
('41359fd8-915c-11ec-aea7-6c626d3a5d34', '2036436e-9159-11ec-aea7-6c626d3a5d34', 'b49e3260-8e2f-11ec-ab27-6c626d3a5d34', 96, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 16:16:35', '2022-02-19 16:16:35'),
('413f0ea3-915c-11ec-aea7-6c626d3a5d34', '2036436e-9159-11ec-aea7-6c626d3a5d34', 'ac894026-8e2f-11ec-ab27-6c626d3a5d34', 95, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 16:16:35', '2022-02-19 16:16:35'),
('431f06e1-949b-11ec-a5cb-6c626d3a5d34', '00ef81f6-949b-11ec-a5cb-6c626d3a5d34', '82ac0b04-8e2f-11ec-ab27-6c626d3a5d34', 99, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:25:10', '2022-02-23 19:25:10'),
('431f9dc4-949b-11ec-a5cb-6c626d3a5d34', '00ef81f6-949b-11ec-a5cb-6c626d3a5d34', 'b49e3260-8e2f-11ec-ab27-6c626d3a5d34', 89, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:25:10', '2022-02-23 19:25:10'),
('431ff6aa-949b-11ec-a5cb-6c626d3a5d34', '00ef81f6-949b-11ec-a5cb-6c626d3a5d34', 'ac894026-8e2f-11ec-ab27-6c626d3a5d34', 96, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 19:25:10', '2022-02-23 19:25:10'),
('5de6e4e1-948a-11ec-a5cb-6c626d3a5d34', '3e5830aa-948a-11ec-a5cb-6c626d3a5d34', '82ac0b04-8e2f-11ec-ab27-6c626d3a5d34', 97, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:24:14', '2022-02-23 17:24:14'),
('5de85636-948a-11ec-a5cb-6c626d3a5d34', '3e5830aa-948a-11ec-a5cb-6c626d3a5d34', 'ac894026-8e2f-11ec-ab27-6c626d3a5d34', 98, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:24:14', '2022-02-23 17:24:14'),
('5de87457-948a-11ec-a5cb-6c626d3a5d34', '3e5830aa-948a-11ec-a5cb-6c626d3a5d34', 'b49e3260-8e2f-11ec-ab27-6c626d3a5d34', 96, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-23 17:24:14', '2022-02-23 17:24:14');

-- --------------------------------------------------------

--
-- Table structure for table `job_categories`
--

CREATE TABLE `job_categories` (
  `job_category_id` varchar(36) NOT NULL,
  `name` varchar(36) NOT NULL,
  `description` text NOT NULL,
  `is_removed` tinyint(1) NOT NULL,
  `created_by` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_categories`
--

INSERT INTO `job_categories` (`job_category_id`, `name`, `description`, `is_removed`, `created_by`, `created_at`, `updated_at`) VALUES
('2d468441-914c-11ec-aea7-6c626d3a5d34', 'Medical Staff', 'This job category is all about recruitment', 0, '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-19 14:21:30', '2022-02-19 14:21:30'),
('589b0110-8d8d-11ec-a6db-6c626d3a5d34', 'Recruitment', 'This job category is all about recruitment', 0, '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-14 19:57:54', '2022-02-19 11:47:21'),
('820081e6-8d8b-11ec-a6db-6c626d3a5d34', 'Information Technology', 'This job category is all about information technology', 0, '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-14 19:44:45', '2022-02-19 11:47:37'),
('8d5efdc4-8d8b-11ec-a6db-6c626d3a5d34', 'Medical Nurses', 'This job category is all about medical nurses', 0, '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', '2022-02-14 19:45:04', '2022-02-19 11:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `job_post_id` varchar(36) NOT NULL,
  `manpower_request_id` varchar(36) NOT NULL,
  `is_salary_visible` tinyint(1) NOT NULL,
  `content` text NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `job_category_id` varchar(36) NOT NULL,
  `posted_by` varchar(36) NOT NULL,
  `views` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`job_post_id`, `manpower_request_id`, `is_salary_visible`, `content`, `expiration_date`, `job_category_id`, `posted_by`, `views`, `created_at`, `updated_at`) VALUES
('01ed5350-8d8f-11ec-a6db-6c626d3a5d34', 'd04b9bbd-8d48-11ec-a6db-6c626d3a5d34', 1, '<p>test</p>', NULL, '2d468441-914c-11ec-aea7-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 11, '2022-02-14 20:09:48', '2022-02-23 14:40:08'),
('1e5d7fa2-914c-11ec-aea7-6c626d3a5d34', 'd03f1dd7-912b-11ec-aea7-6c626d3a5d34', 0, '<p>Test</p>', '2022-02-23 19:59:21', '2d468441-914c-11ec-aea7-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 2, '2022-02-19 14:21:05', '2022-02-23 19:59:21'),
('3978d129-8d8e-11ec-a6db-6c626d3a5d34', '30f2b2b9-8d46-11ec-a6db-6c626d3a5d34', 1, '<p>Information Technology</p>', NULL, '820081e6-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 1, '2022-02-14 20:04:12', '2022-02-22 14:59:17'),
('9d01b6c0-8d8e-11ec-a6db-6c626d3a5d34', '50f0318f-8d46-11ec-a6db-6c626d3a5d34', 1, '<p>test</p>', '2022-04-30 20:06:00', '820081e6-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 1, '2022-02-14 20:06:59', '2022-02-22 14:59:20'),
('af3bed09-8d8e-11ec-a6db-6c626d3a5d34', 'bbb9a4bf-8d48-11ec-a6db-6c626d3a5d34', 1, '<p>Test</p>', NULL, '8d5efdc4-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 1, '2022-02-14 20:07:29', '2022-02-14 22:12:56'),
('c5843f55-8d8e-11ec-a6db-6c626d3a5d34', '6a2a8d33-8d46-11ec-a6db-6c626d3a5d34', 1, '<p>Test</p>', NULL, '820081e6-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 2, '2022-02-14 20:08:07', '2022-02-23 13:27:23'),
('cda092dc-913f-11ec-aea7-6c626d3a5d34', '382795a1-8d4a-11ec-a6db-6c626d3a5d34', 0, '<p>Test</p>', NULL, '8d5efdc4-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 0, '2022-02-19 12:52:56', '2022-02-19 12:52:56'),
('ce15bf55-8d8e-11ec-a6db-6c626d3a5d34', 'd845b74a-8d51-11ec-a6db-6c626d3a5d34', 0, '<p>Test</p>', NULL, '589b0110-8d8d-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 1, '2022-02-14 20:08:21', '2022-02-19 14:55:45'),
('dafa8c5a-913f-11ec-aea7-6c626d3a5d34', '2d86cf8a-8ef1-11ec-8742-6c626d3a5d34', 0, '<p>Test</p>', NULL, '2d468441-914c-11ec-aea7-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 0, '2022-02-19 12:53:18', '2022-02-19 14:55:21'),
('e5cc53f7-8d8e-11ec-a6db-6c626d3a5d34', '429dd76f-8d4a-11ec-a6db-6c626d3a5d34', 0, '<p>Test</p>', NULL, '2d468441-914c-11ec-aea7-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 0, '2022-02-14 20:09:01', '2022-02-19 14:55:38'),
('ee234ec3-8d8e-11ec-a6db-6c626d3a5d34', '2f54740f-8d4a-11ec-a6db-6c626d3a5d34', 0, '<p>Test</p>', NULL, '8d5efdc4-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 2, '2022-02-14 20:09:15', '2022-02-15 13:59:50'),
('f6c129ed-8d8e-11ec-a6db-6c626d3a5d34', '0f372972-8d4a-11ec-a6db-6c626d3a5d34', 1, '<p>Test</p>', NULL, '8d5efdc4-8d8b-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 5, '2022-02-14 20:09:29', '2022-02-23 19:51:57');

-- --------------------------------------------------------

--
-- Table structure for table `manpower_requests`
--

CREATE TABLE `manpower_requests` (
  `manpower_request_id` varchar(36) NOT NULL,
  `requisition_no` varchar(255) NOT NULL,
  `requested_by` varchar(36) NOT NULL,
  `position_id` varchar(36) NOT NULL,
  `employment_type_id` varchar(255) NOT NULL,
  `request_nature` varchar(255) NOT NULL,
  `staffs_needed` int(11) NOT NULL,
  `min_monthly_salary` float DEFAULT NULL,
  `max_monthly_salary` float DEFAULT NULL,
  `content` text NOT NULL,
  `request_status` varchar(255) NOT NULL,
  `deadline` datetime DEFAULT NULL,
  `signed_by` varchar(36) DEFAULT NULL,
  `signed_at` datetime DEFAULT NULL,
  `reviewed_by` varchar(36) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `rejected_by` varchar(36) DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manpower_requests`
--

INSERT INTO `manpower_requests` (`manpower_request_id`, `requisition_no`, `requested_by`, `position_id`, `employment_type_id`, `request_nature`, `staffs_needed`, `min_monthly_salary`, `max_monthly_salary`, `content`, `request_status`, `deadline`, `signed_by`, `signed_at`, `reviewed_by`, `reviewed_at`, `completed_at`, `rejected_by`, `rejected_at`, `remarks`, `created_at`, `updated_at`) VALUES
('0f372972-8d4a-11ec-a6db-6c626d3a5d34', 'REQ-KZM5WKCL-UFBS7T', '974523b2-8d49-11ec-a6db-6c626d3a5d34', '0709ba31-8d49-11ec-a6db-6c626d3a5d34', 'b2ce077a-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 4, 28650, 45800, '<p>Test</p>', 'Approved', NULL, 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', '2022-02-14 12:42:49', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:25:07', NULL, NULL, NULL, NULL, '2022-02-14 11:56:16', '2022-02-14 13:25:07'),
('2d86cf8a-8ef1-11ec-8742-6c626d3a5d34', 'REQ-KZP669NF-Y7PS3A', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '995f4383-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 2, NULL, NULL, '<p>Test</p>', 'Approved', NULL, '92239c6c-8bed-11ec-88c9-6c626d3a5d34', '2022-02-19 12:49:18', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 12:50:00', NULL, NULL, NULL, NULL, '2022-02-16 14:25:04', '2022-02-19 12:50:00'),
('2f54740f-8d4a-11ec-a6db-6c626d3a5d34', 'REQ-KZM5ZM12-NLJZT2', '974523b2-8d49-11ec-a6db-6c626d3a5d34', '51d613bf-8d49-11ec-a6db-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 4, NULL, NULL, '<p>Test</p>', 'Approved', NULL, 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', '2022-02-14 12:42:44', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:24:47', NULL, NULL, NULL, NULL, '2022-02-14 11:57:10', '2022-02-14 13:24:47'),
('30f2b2b9-8d46-11ec-a6db-6c626d3a5d34', 'REQ-KZM4ZCFT-KM22ZD', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', '8817f963-8be0-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 1, 25000, 58000, '<p>This is a test</p>', 'Approved', NULL, 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', '2022-02-14 13:14:49', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:26:45', NULL, NULL, NULL, NULL, '2022-02-14 11:28:35', '2022-02-14 13:26:45'),
('382795a1-8d4a-11ec-a6db-6c626d3a5d34', 'REQ-KZM60RZP-28EJ9L', '974523b2-8d49-11ec-a6db-6c626d3a5d34', '63f8a921-8d49-11ec-a6db-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Replacement', 1, NULL, NULL, '<p>Test</p>', 'Approved', NULL, '92239c6c-8bed-11ec-88c9-6c626d3a5d34', '2022-02-19 12:49:01', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 12:50:05', NULL, NULL, NULL, NULL, '2022-02-14 11:57:25', '2022-02-19 12:50:05'),
('429dd76f-8d4a-11ec-a6db-6c626d3a5d34', 'REQ-KZM612PD-8EHOQS', '974523b2-8d49-11ec-a6db-6c626d3a5d34', '2c7a275d-8d49-11ec-a6db-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 5, NULL, NULL, '<p>Test</p>', 'Approved', NULL, 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', '2022-02-14 12:29:40', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:25:01', NULL, NULL, NULL, NULL, '2022-02-14 11:57:42', '2022-02-14 13:25:01'),
('50f0318f-8d46-11ec-a6db-6c626d3a5d34', 'REQ-KZM500NF-DY6M09', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', '3c8e1a7b-8be0-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 1, 26000, 85000, '<p>Test</p>', 'Approved', '2022-05-31 12:30:00', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', '2022-02-14 13:14:44', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:26:40', NULL, NULL, NULL, NULL, '2022-02-14 11:29:28', '2022-02-14 13:26:40'),
('6a2a8d33-8d46-11ec-a6db-6c626d3a5d34', 'REQ-KZM51EPN-CUP8EN', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', '54f2385c-8be0-11ec-88c9-6c626d3a5d34', 'c8913b14-8be9-11ec-88c9-6c626d3a5d34', 'Replacement', 2, 12500, 20600, '<p>Test</p>', 'Approved', NULL, 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', '2022-02-14 13:14:40', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:26:36', NULL, NULL, NULL, NULL, '2022-02-14 11:30:11', '2022-02-14 13:26:36'),
('a0810804-8d47-11ec-a6db-6c626d3a5d34', 'REQ-KZM5CV90-HIPST8', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', '93d489e2-8be0-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Replacement', 1, NULL, NULL, '<p>Test</p>', 'Rejected for approval', NULL, 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', '2022-02-14 13:14:35', NULL, NULL, NULL, 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:26:30', 'Department Manager cannot be requested', '2022-02-14 11:38:51', '2022-02-14 13:26:30'),
('bbb9a4bf-8d48-11ec-a6db-6c626d3a5d34', 'REQ-KZM5MF3M-JY07EP', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '229c244f-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 5, 23600, 48560, '<p>Test</p>', 'Approved', '2022-03-31 00:00:00', 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', '2022-02-14 12:42:58', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:26:11', NULL, NULL, NULL, NULL, '2022-02-14 11:46:46', '2022-02-14 13:26:11'),
('c57904d9-912b-11ec-aea7-6c626d3a5d34', 'REQ-KZT82REG-BCWTRH', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '1231b264-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 3, 15200, 35418, '<p>test</p>', 'For signature', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-19 10:29:32', '2022-02-19 10:29:32'),
('d03f1dd7-912b-11ec-aea7-6c626d3a5d34', 'REQ-KZT83D2Q-JC0IYW', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7837cc9e-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 2, NULL, NULL, '<p>test</p>', 'Completed', NULL, '92239c6c-8bed-11ec-88c9-6c626d3a5d34', '2022-02-19 12:49:05', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-19 12:49:55', '2022-02-23 14:50:27', NULL, NULL, NULL, '2022-02-19 10:29:50', '2022-02-23 14:50:27'),
('d04b9bbd-8d48-11ec-a6db-6c626d3a5d34', 'REQ-KZM5NGX3-U25RPW', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '710b702c-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 1, 26000, 36500, '<p>Test</p>', 'Approved', NULL, 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', '2022-02-14 12:42:54', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:25:14', NULL, NULL, NULL, NULL, '2022-02-14 11:47:21', '2022-02-14 13:25:14'),
('d5bff2bf-8d4e-11ec-a6db-6c626d3a5d34', 'REQ-KZM77AOS-3RCRTE', '974523b2-8d49-11ec-a6db-6c626d3a5d34', 'e43b841d-8d48-11ec-a6db-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 1, NULL, NULL, '<p>Test</p>', 'Rejected for signing', NULL, NULL, NULL, NULL, NULL, NULL, 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', '2022-02-14 12:31:20', 'Department Manager cannot be replaced', '2022-02-14 12:30:27', '2022-02-14 12:31:20'),
('d845b74a-8d51-11ec-a6db-6c626d3a5d34', 'REQ-KZM7YO06-WU9600', 'f5fbb7ed-8cd4-11ec-8d3b-6c626d3a5d34', 'bb021c23-8be7-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 5, NULL, NULL, '<p>Test</p>', 'Approved', NULL, '3ffd2f46-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 12:56:40', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', '2022-02-14 13:24:57', NULL, NULL, NULL, NULL, '2022-02-14 12:52:00', '2022-02-14 13:24:57');

-- --------------------------------------------------------

--
-- Table structure for table `onboarding_employees`
--

CREATE TABLE `onboarding_employees` (
  `onboarding_employee_id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `position_id` varchar(36) NOT NULL,
  `employment_start_date` date DEFAULT NULL,
  `employment_contract` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `signed_by` varchar(36) NOT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `onboarding_employees`
--

INSERT INTO `onboarding_employees` (`onboarding_employee_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `contact_number`, `email`, `position_id`, `employment_start_date`, `employment_contract`, `status`, `signed_by`, `updated_by`, `created_at`, `updated_at`) VALUES
('673eabdf-948b-11ec-a5cb-6c626d3a5d34', 'Jessie ', '', 'Hale', '', '(466)-855-4215', 'jessie.hale@example.com', '54f2385c-8be0-11ec-88c9-6c626d3a5d34', '2022-02-24', '021080d73ee44a93af74336af2d514c2.pdf', 'Pending', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', NULL, '2022-02-23 17:31:39', '2022-02-23 18:58:17'),
('6af89995-948b-11ec-a5cb-6c626d3a5d34', 'Ana ', '', 'Ross', '', '(713)-536-5675', 'ana.ross@example.com', '54f2385c-8be0-11ec-88c9-6c626d3a5d34', '2022-02-23', '333b1b2c7a7b4d1dac56c040cd373452.pdf', 'Onboarding', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', NULL, '2022-02-23 17:31:45', '2022-02-23 17:33:21'),
('7e0af08a-949d-11ec-a5cb-6c626d3a5d34', 'Flenn ', '', 'Spencer', '', '(148)-729-0014', 'flenn.spencer@example.com', '3c8e1a7b-8be0-11ec-88c9-6c626d3a5d34', NULL, '987a1cd819ac4f40832364a00a817f2b.pdf', 'Pending', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', NULL, '2022-02-23 19:41:08', '2022-02-23 19:41:08'),
('811683e1-949d-11ec-a5cb-6c626d3a5d34', 'Alicia ', '', 'Sanchez', '', '(361)-239-4848', 'alicia.sanchez@example.com', '3c8e1a7b-8be0-11ec-88c9-6c626d3a5d34', NULL, '58bb8eea9a4640bb878a72e7634a5c5b.pdf', 'Pending', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', NULL, '2022-02-23 19:41:13', '2022-02-23 19:41:13'),
('8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', 'Jam', '', 'Torres', '', '1234568790', 'jamtorres@email.com', '710b702c-8be7-11ec-88c9-6c626d3a5d34', '2022-02-16', '7319e33c8e3941a5a02ab51c7dc2c609.pdf', 'Onboarding', '92239c6c-8bed-11ec-88c9-6c626d3a5d34', NULL, '2022-02-16 13:23:21', '2022-02-16 13:46:58');

-- --------------------------------------------------------

--
-- Table structure for table `onboarding_employee_task`
--

CREATE TABLE `onboarding_employee_task` (
  `onboarding_employee_task_id` varchar(36) NOT NULL,
  `onboarding_employee_id` varchar(36) NOT NULL,
  `onboarding_task_id` varchar(36) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `assigned_by` varchar(36) NOT NULL,
  `status` varchar(255) NOT NULL,
  `completed_at` datetime DEFAULT NULL,
  `completed_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `onboarding_employee_task`
--

INSERT INTO `onboarding_employee_task` (`onboarding_employee_task_id`, `onboarding_employee_id`, `onboarding_task_id`, `start_at`, `end_at`, `assigned_by`, `status`, `completed_at`, `completed_by`, `created_at`, `updated_at`) VALUES
('a98b01ef-9498-11ec-a5cb-6c626d3a5d34', '6af89995-948b-11ec-a5cb-6c626d3a5d34', 'a98357af-9498-11ec-a5cb-6c626d3a5d34', '2022-02-24 19:06:00', '2022-02-25 19:06:00', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 'Completed', '2022-02-23 19:13:29', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', '2022-02-23 19:06:34', '2022-02-23 19:13:29'),
('db15e9e7-8eeb-11ec-8742-6c626d3a5d34', '8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', '2c03ee83-8ee2-11ec-8742-6c626d3a5d34', '2022-02-17 13:46:00', '2022-02-18 13:46:00', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'On Going', NULL, NULL, '2022-02-16 13:46:58', '2022-02-16 14:17:46'),
('db16f79c-8eeb-11ec-8742-6c626d3a5d34', '8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', '3edaa7cb-8ee2-11ec-8742-6c626d3a5d34', '2022-02-17 13:46:00', '2022-02-18 13:46:00', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'On Going', NULL, NULL, '2022-02-16 13:46:58', '2022-02-16 14:17:58'),
('db1866d0-8eeb-11ec-8742-6c626d3a5d34', '8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', '5fd664e0-8ee2-11ec-8742-6c626d3a5d34', '2022-02-17 13:46:00', '2022-02-18 13:46:00', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'Completed', '2022-02-16 14:18:04', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '2022-02-16 13:46:58', '2022-02-16 14:18:04'),
('db18e2df-8eeb-11ec-8742-6c626d3a5d34', '8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', '7d37f543-8ee2-11ec-8742-6c626d3a5d34', '2022-02-17 13:46:00', '2022-02-18 13:46:00', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'Pending', NULL, NULL, '2022-02-16 13:46:58', '2022-02-19 11:21:50'),
('db191603-8eeb-11ec-8742-6c626d3a5d34', '8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', '4ebcc5d1-8ee2-11ec-8742-6c626d3a5d34', '2022-02-17 13:46:00', '2022-02-18 13:46:00', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'Pending', NULL, NULL, '2022-02-16 13:46:58', '2022-02-16 13:46:58'),
('db1992df-8eeb-11ec-8742-6c626d3a5d34', '8e30ebd6-8ee8-11ec-8742-6c626d3a5d34', '901d96f3-8ee2-11ec-8742-6c626d3a5d34', '2022-02-17 13:46:00', '2022-02-18 13:46:00', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'Pending', NULL, NULL, '2022-02-16 13:46:58', '2022-02-16 13:46:58');

-- --------------------------------------------------------

--
-- Table structure for table `onboarding_tasks`
--

CREATE TABLE `onboarding_tasks` (
  `onboarding_task_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `task_type` varchar(255) NOT NULL,
  `is_general` tinyint(1) NOT NULL,
  `sub_department_id` varchar(36) NOT NULL,
  `added_by` varchar(36) NOT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `onboarding_tasks`
--

INSERT INTO `onboarding_tasks` (`onboarding_task_id`, `title`, `description`, `task_type`, `is_general`, `sub_department_id`, `added_by`, `updated_by`, `is_deleted`, `created_at`, `updated_at`) VALUES
('2c03ee83-8ee2-11ec-8742-6c626d3a5d34', 'Meet the employees of the team', 'Meet the employees of the team', 'For new employees', 1, '624fac3b-8bde-11ec-88c9-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 0, '2022-02-16 12:37:39', '2022-02-16 12:37:39'),
('3edaa7cb-8ee2-11ec-8742-6c626d3a5d34', 'Work for the first activities', 'Work for the first activities as a new employee', 'For new employees', 1, '624fac3b-8bde-11ec-88c9-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 0, '2022-02-16 12:38:10', '2022-02-16 12:38:10'),
('4ebcc5d1-8ee2-11ec-8742-6c626d3a5d34', 'Sign the documents and papers for management', 'Sign the documents and papers for management', 'For new employees', 1, '624fac3b-8bde-11ec-88c9-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 0, '2022-02-16 12:38:37', '2022-02-16 12:38:37'),
('5fd664e0-8ee2-11ec-8742-6c626d3a5d34', 'Welcome the new employee', 'Welcome the new employee', 'For the team', 1, '624fac3b-8bde-11ec-88c9-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 0, '2022-02-16 12:39:06', '2022-02-16 12:39:06'),
('7d37f543-8ee2-11ec-8742-6c626d3a5d34', 'Introduce the new employee to the team', 'Introduce the new employee to the team', 'For department manager', 1, '624fac3b-8bde-11ec-88c9-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 0, '2022-02-16 12:39:55', '2022-02-16 12:39:55'),
('901d96f3-8ee2-11ec-8742-6c626d3a5d34', 'Assign the first tasks and activities', 'Assign the first tasks and activities', 'For department manager', 1, '624fac3b-8bde-11ec-88c9-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 0, '2022-02-16 12:40:27', '2022-02-16 12:40:27'),
('a98357af-9498-11ec-a5cb-6c626d3a5d34', 'sdf', 'sdfsdfsdfsd', 'For new employees', 0, '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 0, '2022-02-23 19:06:34', '2022-02-23 19:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` varchar(36) NOT NULL,
  `sub_department_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `sub_department_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('0709ba31-8d49-11ec-a6db-6c626d3a5d34', '4c151c72-8bde-11ec-88c9-6c626d3a5d34', 'Critical Nurse (ICU)', 'Critical Nurse (ICU)', '2022-02-14 11:48:53', '2022-02-14 11:48:53'),
('1231b264-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Outpatient Coder', 'Outpatient Coder', '2022-02-12 17:35:10', '2022-02-12 17:35:10'),
('1789d150-8be5-11ec-88c9-6c626d3a5d34', '0cb5bf67-8be5-11ec-88c9-6c626d3a5d34', 'Department Head', 'Department Head', '2022-02-12 17:21:00', '2022-02-12 17:21:00'),
('229c244f-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Nurse Practitioner', 'Nurse Practitioner', '2022-02-12 17:35:37', '2022-02-12 17:35:37'),
('2c7a275d-8d49-11ec-a6db-6c626d3a5d34', '4c151c72-8bde-11ec-88c9-6c626d3a5d34', 'ICU Administrator', 'ICU Administrator', '2022-02-14 11:49:55', '2022-02-14 11:49:55'),
('3c8e1a7b-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'Business Analyst', 'Business Analyst', '2022-02-12 16:46:14', '2022-02-12 16:46:14'),
('489d836a-8be8-11ec-88c9-6c626d3a5d34', '95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-12 17:43:50', '2022-02-12 17:43:50'),
('4e64359d-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-12 17:36:51', '2022-02-12 17:36:51'),
('51d613bf-8d49-11ec-a6db-6c626d3a5d34', '4c151c72-8bde-11ec-88c9-6c626d3a5d34', 'Pediatric Nurse (ICU)', 'Pediatric Nurse (ICU)', '2022-02-14 11:50:58', '2022-02-14 11:50:58'),
('53724726-8be3-11ec-88c9-6c626d3a5d34', '37c6b2d0-8be3-11ec-88c9-6c626d3a5d34', 'Department Head', 'Department Head', '2022-02-12 17:08:21', '2022-02-12 17:08:21'),
('54f2385c-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'System Analyst', 'System Analyst', '2022-02-12 16:46:55', '2022-02-12 16:46:55'),
('63f8a921-8d49-11ec-a6db-6c626d3a5d34', '4c151c72-8bde-11ec-88c9-6c626d3a5d34', 'Coronary Care Nurse (ICU)', 'Coronary Care Nurse (ICU)', '2022-02-14 11:51:29', '2022-02-14 11:51:29'),
('710b702c-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Physical Therapist', 'Physical Therapist', '2022-02-12 17:37:49', '2022-02-12 17:37:49'),
('7837cc9e-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Physician Assistant', 'Physician Assistant', '2022-02-12 17:38:01', '2022-02-12 17:38:01'),
('8817f963-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'IT Project Manager', 'IT Project Manager', '2022-02-12 16:48:21', '2022-02-12 16:48:21'),
('93d489e2-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-12 16:48:41', '2022-02-12 16:48:41'),
('995f4383-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Dietician', 'Dietician', '2022-02-12 17:38:56', '2022-02-12 17:38:56'),
('b2b030fa-8be7-11ec-88c9-6c626d3a5d34', '95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'Hiring Manager', 'Hiring Manager', '2022-02-12 17:39:39', '2022-02-12 17:39:39'),
('bb021c23-8be7-11ec-88c9-6c626d3a5d34', '95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'Talent Recruiter', 'Talent Recruiter', '2022-02-12 17:39:53', '2022-02-12 17:39:53'),
('e43b841d-8d48-11ec-a6db-6c626d3a5d34', '4c151c72-8bde-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-14 11:47:54', '2022-02-14 11:47:54'),
('f771dfa5-8d51-11ec-a6db-6c626d3a5d34', 'f2a11638-8be5-11ec-88c9-6c626d3a5d34', 'Department Head', 'Department Head', '2022-02-14 12:52:52', '2022-02-14 12:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` varchar(36) NOT NULL,
  `name` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `name`, `created_at`, `updated_at`) VALUES
('5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', 'Department Head', '2022-02-12 17:58:48', '2022-02-12 17:58:48'),
('743c3ae2-8bea-11ec-88c9-6c626d3a5d34', 'Department Manager', '2022-02-12 17:59:23', '2022-02-12 17:59:23'),
('7a3424c7-8bea-11ec-88c9-6c626d3a5d34', 'Hiring Manager', '2022-02-12 17:59:33', '2022-02-12 17:59:33'),
('84fdd034-8bea-11ec-88c9-6c626d3a5d34', 'Talent Recruiter', '2022-02-12 17:59:51', '2022-02-12 17:59:51');

-- --------------------------------------------------------

--
-- Table structure for table `sub_departments`
--

CREATE TABLE `sub_departments` (
  `sub_department_id` varchar(36) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_departments`
--

INSERT INTO `sub_departments` (`sub_department_id`, `department_id`, `name`, `description`, `location`, `created_at`, `updated_at`) VALUES
('04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'ffb8fd3e-8bd7-11ec-88c9-6c626d3a5d34', 'IT Management & Administration Department', 'IT Management & Administration Department', 'Punturin, Valenzuela City', '2022-02-12 16:37:31', '2022-02-12 16:37:31'),
('0cb5bf67-8be5-11ec-88c9-6c626d3a5d34', '40accb96-8bda-11ec-88c9-6c626d3a5d34', 'Hospital Core Department', 'Hospital Core Department', 'Don Fabian St., Commonwealth, Quezon City', '2022-02-12 17:20:41', '2022-02-12 17:20:41'),
('37c6b2d0-8be3-11ec-88c9-6c626d3a5d34', 'ffb8fd3e-8bd7-11ec-88c9-6c626d3a5d34', 'Information Technology (IT) Department', 'Information Technology (IT) Department', 'Punturin, Valenzuela City', '2022-02-12 17:07:35', '2022-02-12 17:07:35'),
('4c151c72-8bde-11ec-88c9-6c626d3a5d34', '40accb96-8bda-11ec-88c9-6c626d3a5d34', 'Intensive Care Unit (ICU) Department', 'Intensive Care Unit (ICU) Department', 'Don Fabian St., Commonwealth, Quezon City', '2022-02-12 16:32:21', '2022-02-12 16:32:21'),
('624fac3b-8bde-11ec-88c9-6c626d3a5d34', '40accb96-8bda-11ec-88c9-6c626d3a5d34', 'Out-Patient (OPD) Department', 'Out-Patient (OPD) Department', 'Tandang Sora, Quezon City', '2022-02-12 16:32:59', '2022-02-12 16:32:59'),
('95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'ea5d5b3b-8bd7-11ec-88c9-6c626d3a5d34', 'Recruitment Management Department', 'Recruitment Management Department', 'North Fairview, Quezon City', '2022-02-12 16:34:25', '2022-02-12 16:34:25'),
('f2a11638-8be5-11ec-88c9-6c626d3a5d34', 'ea5d5b3b-8bd7-11ec-88c9-6c626d3a5d34', 'Human Resource (HR) Department', 'Human Resource (HR) Department', 'North Fairview, Quezon City', '2022-02-12 17:27:07', '2022-02-12 17:27:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `employee_id`, `email`, `password`, `created_at`, `updated_at`) VALUES
('15ff06af-8cd3-11ec-8d3b-6c626d3a5d34', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', 'it.head@homies.com', '$2b$12$WSJ0EFvUDWuS94JE5ryUaO.IzCnnyXfjA5OIBK6HgbJzSSp17PteS', '2022-02-13 21:44:37', '2022-02-13 21:44:37'),
('16905375-8cd6-11ec-8d3b-6c626d3a5d34', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 'it.mngt.manager@homies.com', '$2b$12$NNZ/CEMaH87c5hPcWGLyiub1goEgfo9VSpKZvX9./3YRrWYHjVLOe', '2022-02-13 22:06:07', '2022-02-13 22:06:07'),
('20ddf0b0-8cd5-11ec-8d3b-6c626d3a5d34', 'f5fbb7ed-8cd4-11ec-8d3b-6c626d3a5d34', 'hr.recruit.manager@homies.com', '$2b$12$Pedg7Ai6a9l/FZjdV44lR.GdN9Zwv9SiDpK5TxddepJdXqf8EH/pG', '2022-02-13 21:59:14', '2022-02-13 21:59:14'),
('49aaca6d-8d52-11ec-a6db-6c626d3a5d34', '3ffd2f46-8d52-11ec-a6db-6c626d3a5d34', 'hr.head@homies.com', '$2b$12$Cag14vRq91IldBqORi8dme9OHOCfBTS30F5Sr7n5Y0ezMUP1N4AGa', '2022-02-14 12:55:10', '2022-02-14 12:55:10'),
('4f665ff4-8bef-11ec-88c9-6c626d3a5d34', '92239c6c-8bed-11ec-88c9-6c626d3a5d34', 'hospital.core.head@homies.com', '$2b$12$taQP8mrB5GyPap35JZMr8Os/WF/vHMfsP5FGEe7GtanFJABPC2H1e', '2022-02-12 18:34:08', '2022-02-12 18:34:08'),
('7ef3790c-8d5d-11ec-a6db-6c626d3a5d34', '62ca1c7d-8d5d-11ec-a6db-6c626d3a5d34', 'hr.recruit.recruiter@homies.com', '$2b$12$LoYwrTke/Q2LnFSZ.NSNYeBuTAbleyrEzg57fXXMf7U6dLuFG4bfu', '2022-02-14 14:15:23', '2022-02-14 14:15:23'),
('8bcfe3b2-8d48-11ec-a6db-6c626d3a5d34', '7aaa5807-8d48-11ec-a6db-6c626d3a5d34', 'opd.manager@homies.com', '$2b$12$JV.mNSA1C5tu9rClfwKFvOGq76IEFTr4Gwgia4U6Wk8xD5dzXJhha', '2022-02-14 11:45:26', '2022-02-14 11:45:26'),
('a0d6df83-8d49-11ec-a6db-6c626d3a5d34', '974523b2-8d49-11ec-a6db-6c626d3a5d34', 'icu.manager@homies.com', '$2b$12$0HISrDr9yZdvNegi8BNANOL2u4fnG13SAU6s9mipr0IPfP0Q5n3I.', '2022-02-14 11:53:11', '2022-02-14 11:53:11'),
('bde6f60c-8d52-11ec-a6db-6c626d3a5d34', 'a89cdb12-8d52-11ec-a6db-6c626d3a5d34', 'hr.recruit.hiremngr@homies.com', '$2b$12$M9HPDULvKUPdfLX1pU51o./XaWhxP7g4S3sZ02gy6ddqRwqp9E4vm', '2022-02-14 12:58:25', '2022-02-14 12:58:25'),
('daede201-8d4a-11ec-a6db-6c626d3a5d34', 'c80dbb20-8d4a-11ec-a6db-6c626d3a5d34', 'hospital.head@homies.com', '$2b$12$J9nyX10T953VpJ0g3ZIY2.GOzHb8yDiR57ZhBCdm/1K.LjQ7aroim', '2022-02-14 12:01:58', '2022-02-14 12:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `user_role_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_role_id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
('1fbf67ad-8cd6-11ec-8d3b-6c626d3a5d34', '16905375-8cd6-11ec-8d3b-6c626d3a5d34', '743c3ae2-8bea-11ec-88c9-6c626d3a5d34', '2022-02-13 22:06:22', '2022-02-13 22:06:22'),
('21b0fa09-8cd3-11ec-8d3b-6c626d3a5d34', '15ff06af-8cd3-11ec-8d3b-6c626d3a5d34', '5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', '2022-02-13 21:44:57', '2022-02-13 21:44:57'),
('28c42ba9-8cd5-11ec-8d3b-6c626d3a5d34', '20ddf0b0-8cd5-11ec-8d3b-6c626d3a5d34', '743c3ae2-8bea-11ec-88c9-6c626d3a5d34', '2022-02-13 21:59:28', '2022-02-13 21:59:28'),
('50080620-8d52-11ec-a6db-6c626d3a5d34', '49aaca6d-8d52-11ec-a6db-6c626d3a5d34', '5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', '2022-02-14 12:55:21', '2022-02-14 12:55:21'),
('8c28400a-8d5d-11ec-a6db-6c626d3a5d34', '7ef3790c-8d5d-11ec-a6db-6c626d3a5d34', '84fdd034-8bea-11ec-88c9-6c626d3a5d34', '2022-02-14 14:15:45', '2022-02-14 14:15:45'),
('9477874c-8d48-11ec-a6db-6c626d3a5d34', '8bcfe3b2-8d48-11ec-a6db-6c626d3a5d34', '743c3ae2-8bea-11ec-88c9-6c626d3a5d34', '2022-02-14 11:45:40', '2022-02-14 11:45:40'),
('a52c492a-8d49-11ec-a6db-6c626d3a5d34', 'a0d6df83-8d49-11ec-a6db-6c626d3a5d34', '743c3ae2-8bea-11ec-88c9-6c626d3a5d34', '2022-02-14 11:53:18', '2022-02-14 11:53:18'),
('ce0d4437-8d52-11ec-a6db-6c626d3a5d34', 'bde6f60c-8d52-11ec-a6db-6c626d3a5d34', '7a3424c7-8bea-11ec-88c9-6c626d3a5d34', '2022-02-14 12:58:52', '2022-02-14 12:58:52'),
('d3fc516e-8bf1-11ec-88c9-6c626d3a5d34', '4f665ff4-8bef-11ec-88c9-6c626d3a5d34', '5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', '2022-02-12 18:52:10', '2022-02-12 18:52:10'),
('eef137bd-8d4a-11ec-a6db-6c626d3a5d34', 'daede201-8d4a-11ec-a6db-6c626d3a5d34', '5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', '2022-02-14 12:02:31', '2022-02-14 12:02:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`applicant_id`),
  ADD UNIQUE KEY `resume` (`resume`),
  ADD KEY `job_post_id` (`job_post_id`),
  ADD KEY `evaluated_by` (`evaluated_by`),
  ADD KEY `screened_by` (`screened_by`),
  ADD KEY `hired_by` (`hired_by`),
  ADD KEY `rejected_by` (`rejected_by`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `employment_type_id` (`employment_type_id`);

--
-- Indexes for table `employment_types`
--
ALTER TABLE `employment_types`
  ADD PRIMARY KEY (`employment_type_id`);

--
-- Indexes for table `interviewees`
--
ALTER TABLE `interviewees`
  ADD PRIMARY KEY (`interviewee_id`),
  ADD KEY `applicant_id` (`applicant_id`),
  ADD KEY `interview_schedule_id` (`interview_schedule_id`);

--
-- Indexes for table `interview_questions`
--
ALTER TABLE `interview_questions`
  ADD PRIMARY KEY (`interview_question_id`),
  ADD KEY `added_by` (`added_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `interview_schedules`
--
ALTER TABLE `interview_schedules`
  ADD PRIMARY KEY (`interview_schedule_id`),
  ADD KEY `job_post_id` (`job_post_id`),
  ADD KEY `set_by` (`set_by`);

--
-- Indexes for table `interview_scores`
--
ALTER TABLE `interview_scores`
  ADD PRIMARY KEY (`interview_score_id`),
  ADD KEY `interviewee_id` (`interviewee_id`),
  ADD KEY `interview_question_id` (`interview_question_id`),
  ADD KEY `scored_by` (`scored_by`);

--
-- Indexes for table `job_categories`
--
ALTER TABLE `job_categories`
  ADD PRIMARY KEY (`job_category_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`job_post_id`),
  ADD KEY `manpower_request_id` (`manpower_request_id`),
  ADD KEY `job_category_id` (`job_category_id`),
  ADD KEY `posted_by` (`posted_by`);

--
-- Indexes for table `manpower_requests`
--
ALTER TABLE `manpower_requests`
  ADD PRIMARY KEY (`manpower_request_id`),
  ADD UNIQUE KEY `requisition_no` (`requisition_no`),
  ADD KEY `requested_by` (`requested_by`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `employment_type_id` (`employment_type_id`),
  ADD KEY `signed_by` (`signed_by`),
  ADD KEY `reviewed_by` (`reviewed_by`),
  ADD KEY `rejected_by` (`rejected_by`);

--
-- Indexes for table `onboarding_employees`
--
ALTER TABLE `onboarding_employees`
  ADD PRIMARY KEY (`onboarding_employee_id`),
  ADD UNIQUE KEY `employment_contract` (`employment_contract`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `signed_by` (`signed_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `onboarding_employee_task`
--
ALTER TABLE `onboarding_employee_task`
  ADD PRIMARY KEY (`onboarding_employee_task_id`),
  ADD KEY `onboarding_employee_id` (`onboarding_employee_id`),
  ADD KEY `onboarding_task_id` (`onboarding_task_id`),
  ADD KEY `assigned_by` (`assigned_by`),
  ADD KEY `completed_by` (`completed_by`);

--
-- Indexes for table `onboarding_tasks`
--
ALTER TABLE `onboarding_tasks`
  ADD PRIMARY KEY (`onboarding_task_id`),
  ADD KEY `sub_department_id` (`sub_department_id`),
  ADD KEY `added_by` (`added_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `sub_department_id` (`sub_department_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `sub_departments`
--
ALTER TABLE `sub_departments`
  ADD PRIMARY KEY (`sub_department_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `applicants_ibfk_1` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`job_post_id`),
  ADD CONSTRAINT `applicants_ibfk_2` FOREIGN KEY (`evaluated_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `applicants_ibfk_3` FOREIGN KEY (`screened_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `applicants_ibfk_4` FOREIGN KEY (`hired_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `applicants_ibfk_5` FOREIGN KEY (`rejected_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`employment_type_id`) REFERENCES `employment_types` (`employment_type_id`);

--
-- Constraints for table `interviewees`
--
ALTER TABLE `interviewees`
  ADD CONSTRAINT `interviewees_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicants` (`applicant_id`),
  ADD CONSTRAINT `interviewees_ibfk_2` FOREIGN KEY (`interview_schedule_id`) REFERENCES `interview_schedules` (`interview_schedule_id`);

--
-- Constraints for table `interview_questions`
--
ALTER TABLE `interview_questions`
  ADD CONSTRAINT `interview_questions_ibfk_1` FOREIGN KEY (`added_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `interview_questions_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `interview_schedules`
--
ALTER TABLE `interview_schedules`
  ADD CONSTRAINT `interview_schedules_ibfk_1` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`job_post_id`),
  ADD CONSTRAINT `interview_schedules_ibfk_2` FOREIGN KEY (`set_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `interview_scores`
--
ALTER TABLE `interview_scores`
  ADD CONSTRAINT `interview_scores_ibfk_1` FOREIGN KEY (`interviewee_id`) REFERENCES `interviewees` (`interviewee_id`),
  ADD CONSTRAINT `interview_scores_ibfk_2` FOREIGN KEY (`interview_question_id`) REFERENCES `interview_questions` (`interview_question_id`),
  ADD CONSTRAINT `interview_scores_ibfk_3` FOREIGN KEY (`scored_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `job_categories`
--
ALTER TABLE `job_categories`
  ADD CONSTRAINT `job_categories_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `job_posts_ibfk_1` FOREIGN KEY (`manpower_request_id`) REFERENCES `manpower_requests` (`manpower_request_id`),
  ADD CONSTRAINT `job_posts_ibfk_2` FOREIGN KEY (`job_category_id`) REFERENCES `job_categories` (`job_category_id`),
  ADD CONSTRAINT `job_posts_ibfk_3` FOREIGN KEY (`posted_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `manpower_requests`
--
ALTER TABLE `manpower_requests`
  ADD CONSTRAINT `manpower_requests_ibfk_1` FOREIGN KEY (`requested_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `manpower_requests_ibfk_2` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  ADD CONSTRAINT `manpower_requests_ibfk_3` FOREIGN KEY (`employment_type_id`) REFERENCES `employment_types` (`employment_type_id`),
  ADD CONSTRAINT `manpower_requests_ibfk_4` FOREIGN KEY (`signed_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `manpower_requests_ibfk_5` FOREIGN KEY (`reviewed_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `manpower_requests_ibfk_6` FOREIGN KEY (`rejected_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `onboarding_employees`
--
ALTER TABLE `onboarding_employees`
  ADD CONSTRAINT `onboarding_employees_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  ADD CONSTRAINT `onboarding_employees_ibfk_2` FOREIGN KEY (`signed_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `onboarding_employees_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `onboarding_employee_task`
--
ALTER TABLE `onboarding_employee_task`
  ADD CONSTRAINT `onboarding_employee_task_ibfk_1` FOREIGN KEY (`onboarding_employee_id`) REFERENCES `onboarding_employees` (`onboarding_employee_id`),
  ADD CONSTRAINT `onboarding_employee_task_ibfk_2` FOREIGN KEY (`onboarding_task_id`) REFERENCES `onboarding_tasks` (`onboarding_task_id`),
  ADD CONSTRAINT `onboarding_employee_task_ibfk_3` FOREIGN KEY (`assigned_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `onboarding_employee_task_ibfk_4` FOREIGN KEY (`completed_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `onboarding_tasks`
--
ALTER TABLE `onboarding_tasks`
  ADD CONSTRAINT `onboarding_tasks_ibfk_1` FOREIGN KEY (`sub_department_id`) REFERENCES `sub_departments` (`sub_department_id`),
  ADD CONSTRAINT `onboarding_tasks_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `onboarding_tasks_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`sub_department_id`) REFERENCES `sub_departments` (`sub_department_id`);

--
-- Constraints for table `sub_departments`
--
ALTER TABLE `sub_departments`
  ADD CONSTRAINT `sub_departments_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
