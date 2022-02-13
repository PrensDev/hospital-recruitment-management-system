-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2022 at 03:32 PM
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
('92239c6c-8bed-11ec-88c9-6c626d3a5d34', 'Carole', NULL, 'Martinez', NULL, '(009)-792-7145', '1789d150-8be5-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-12 18:21:41', '2022-02-12 18:21:41'),
('a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 'Nicole', NULL, 'Austine', NULL, '(582)-829-6206', '93d489e2-8be0-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'Active', '2022-02-13 22:02:58', '2022-02-13 22:02:58'),
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
('9b7742a6-8cd9-11ec-8d3b-6c626d3a5d34', 'REQ-KZLD7W3X-8Q5F15', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', '3c8e1a7b-8be0-11ec-88c9-6c626d3a5d34', 'ad44c6cd-8be9-11ec-88c9-6c626d3a5d34', 'New/Addition', 2, NULL, NULL, '<p>Test</p>', 'For signature', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-13 22:31:18', '2022-02-13 22:31:18');

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
('1231b264-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Outpatient Coder', 'Outpatient Coder', '2022-02-12 17:35:10', '2022-02-12 17:35:10'),
('1789d150-8be5-11ec-88c9-6c626d3a5d34', '0cb5bf67-8be5-11ec-88c9-6c626d3a5d34', 'Department Head', 'Department Head', '2022-02-12 17:21:00', '2022-02-12 17:21:00'),
('229c244f-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Nurse Practitioner', 'Nurse Practitioner', '2022-02-12 17:35:37', '2022-02-12 17:35:37'),
('3c8e1a7b-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'Business Analyst', 'Business Analyst', '2022-02-12 16:46:14', '2022-02-12 16:46:14'),
('489d836a-8be8-11ec-88c9-6c626d3a5d34', '95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-12 17:43:50', '2022-02-12 17:43:50'),
('4e64359d-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-12 17:36:51', '2022-02-12 17:36:51'),
('53724726-8be3-11ec-88c9-6c626d3a5d34', '37c6b2d0-8be3-11ec-88c9-6c626d3a5d34', 'Department Head', 'Department Head', '2022-02-12 17:08:21', '2022-02-12 17:08:21'),
('54f2385c-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'System Analyst', 'System Analyst', '2022-02-12 16:46:55', '2022-02-12 16:46:55'),
('710b702c-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Physical Therapist', 'Physical Therapist', '2022-02-12 17:37:49', '2022-02-12 17:37:49'),
('7837cc9e-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Physician Assistant', 'Physician Assistant', '2022-02-12 17:38:01', '2022-02-12 17:38:01'),
('8817f963-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'IT Project Manager', 'IT Project Manager', '2022-02-12 16:48:21', '2022-02-12 16:48:21'),
('93d489e2-8be0-11ec-88c9-6c626d3a5d34', '04dff98e-8bdf-11ec-88c9-6c626d3a5d34', 'Department Manager', 'Department Manager', '2022-02-12 16:48:41', '2022-02-12 16:48:41'),
('995f4383-8be7-11ec-88c9-6c626d3a5d34', '624fac3b-8bde-11ec-88c9-6c626d3a5d34', 'Dietician', 'Dietician', '2022-02-12 17:38:56', '2022-02-12 17:38:56'),
('b2b030fa-8be7-11ec-88c9-6c626d3a5d34', '95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'Hiring Manager', 'Hiring Manager', '2022-02-12 17:39:39', '2022-02-12 17:39:39'),
('bb021c23-8be7-11ec-88c9-6c626d3a5d34', '95f5c29a-8bde-11ec-88c9-6c626d3a5d34', 'Talent Recruiter', 'Talent Recruiter', '2022-02-12 17:39:53', '2022-02-12 17:39:53');

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
('15ff06af-8cd3-11ec-8d3b-6c626d3a5d34', 'fade7092-8cd2-11ec-8d3b-6c626d3a5d34', 'it_head@homies.com', '$2b$12$WSJ0EFvUDWuS94JE5ryUaO.IzCnnyXfjA5OIBK6HgbJzSSp17PteS', '2022-02-13 21:44:37', '2022-02-13 21:44:37'),
('16905375-8cd6-11ec-8d3b-6c626d3a5d34', 'a61b1699-8cd5-11ec-8d3b-6c626d3a5d34', 'it_mngt_manager@homies.com', '$2b$12$NNZ/CEMaH87c5hPcWGLyiub1goEgfo9VSpKZvX9./3YRrWYHjVLOe', '2022-02-13 22:06:07', '2022-02-13 22:06:07'),
('20ddf0b0-8cd5-11ec-8d3b-6c626d3a5d34', 'f5fbb7ed-8cd4-11ec-8d3b-6c626d3a5d34', 'hr_head@homies.com', '$2b$12$Pedg7Ai6a9l/FZjdV44lR.GdN9Zwv9SiDpK5TxddepJdXqf8EH/pG', '2022-02-13 21:59:14', '2022-02-13 21:59:14'),
('4f665ff4-8bef-11ec-88c9-6c626d3a5d34', '92239c6c-8bed-11ec-88c9-6c626d3a5d34', 'hospital_core_head@homies.com', '$2b$12$taQP8mrB5GyPap35JZMr8Os/WF/vHMfsP5FGEe7GtanFJABPC2H1e', '2022-02-12 18:34:08', '2022-02-12 18:34:08');

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
('28c42ba9-8cd5-11ec-8d3b-6c626d3a5d34', '20ddf0b0-8cd5-11ec-8d3b-6c626d3a5d34', '5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', '2022-02-13 21:59:28', '2022-02-13 21:59:28'),
('d3fc516e-8bf1-11ec-88c9-6c626d3a5d34', '4f665ff4-8bef-11ec-88c9-6c626d3a5d34', '5fb7fb8a-8bea-11ec-88c9-6c626d3a5d34', '2022-02-12 18:52:10', '2022-02-12 18:52:10');

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
