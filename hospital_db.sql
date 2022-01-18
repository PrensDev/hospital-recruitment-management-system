-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2022 at 02:59 PM
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
('0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Out-Patient (OPD) Department', 'Out-Patient (OPD) Department', '2022-01-18 21:03:42', '2022-01-18 21:03:42'),
('1ba3a3a6-785f-11ec-ba80-6c626d3a5d34', 'Human Resource (HR) Department', 'Human Resource (HR) Department', '2022-01-18 21:04:01', '2022-01-18 21:04:01'),
('edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Information Technology (IT) Department', 'Information Technology (IT) Department', '2022-01-18 21:02:45', '2022-01-18 21:02:45'),
('fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Intensive Care Unit (ICU) Department', 'Intensive Care Unit (ICU) Department', '2022-01-18 21:03:12', '2022-01-18 21:03:12');

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
  `requisition_id` varchar(36) NOT NULL,
  `salary_is_visible` tinyint(1) NOT NULL,
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
  `department_id` varchar(36) NOT NULL,
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
('09ee6d56-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'IT Project Manager', 'IT Project Manager', '2022-01-18 21:10:41', '2022-01-18 21:10:41'),
('13c19c7c-7861-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Critical Care Technician', 'Critical Care Technician', '2022-01-18 21:18:07', '2022-01-18 21:18:07'),
('1b8395b3-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Enterprise Architect', 'Enterprise Architect', '2022-01-18 21:11:11', '2022-01-18 21:11:11'),
('294f4cf1-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Application Analyst', 'Application Analyst', '2022-01-18 21:11:34', '2022-01-18 21:11:34'),
('3ab36dae-7861-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Pediatric Nurse', 'Pediatric Nurse', '2022-01-18 21:19:13', '2022-01-18 21:19:13'),
('3f8fa73d-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'Information Security Analyst', 'Information Security Analyst', '2022-01-18 21:12:11', '2022-01-18 21:12:11'),
('51312fde-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'IT Department Head', 'IT Department Head', '2022-01-18 21:12:41', '2022-01-18 21:12:41'),
('5a519cbb-7860-11ec-ba80-6c626d3a5d34', 'edd3166b-785e-11ec-ba80-6c626d3a5d34', 'IT Department Manager', 'IT Department Manager', '2022-01-18 21:12:56', '2022-01-18 21:12:56'),
('67bfe6c3-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Clinical Nurse, OPD', 'Clinical Nurse, OPD', '2022-01-18 21:27:38', '2022-01-18 21:27:38'),
('7de06c92-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Pediatric Nurse, OPD', 'Pediatric Nurse, OPD', '2022-01-18 21:28:15', '2022-01-18 21:28:15'),
('92957000-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'OPD Department Head', 'OPD Department Head', '2022-01-18 21:28:49', '2022-01-18 21:28:49'),
('935ed1d6-785f-11ec-ba80-6c626d3a5d34', '1ba3a3a6-785f-11ec-ba80-6c626d3a5d34', 'Hiring Manager, HR', 'Hiring Manager, HR', '2022-01-18 21:07:22', '2022-01-18 21:07:22'),
('953b89be-7862-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'OPD Department Manager', 'OPD Department Manager', '2022-01-18 21:28:54', '2022-01-18 21:28:54'),
('a7ac288f-7861-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Travel Nurse, ICU', 'Travel Nurse, ICU', '2022-01-18 21:22:15', '2022-01-18 21:22:15'),
('bb67fffa-785f-11ec-ba80-6c626d3a5d34', '1ba3a3a6-785f-11ec-ba80-6c626d3a5d34', 'Talent Recruiter, HR', 'Talent Recruiter, HR', '2022-01-18 21:08:29', '2022-01-18 21:08:29'),
('e1b6c82e-7860-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'Registered Nurse, ICU', 'Registered Nurse, ICU', '2022-01-18 21:16:43', '2022-01-18 21:16:43'),
('e6c81adf-7861-11ec-ba80-6c626d3a5d34', '0fcd515e-785f-11ec-ba80-6c626d3a5d34', 'Registered Nurse, OPD', 'Registered Nurse, OPD', '2022-01-18 21:24:01', '2022-01-18 21:24:01'),
('ed8f05fc-7860-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'ICU Department Head', 'ICU Department Head', '2022-01-18 21:17:03', '2022-01-18 21:17:03'),
('f065294b-7860-11ec-ba80-6c626d3a5d34', 'fe6ec3ab-785e-11ec-ba80-6c626d3a5d34', 'ICU Department Manager', 'ICU Department Manager', '2022-01-18 21:17:08', '2022-01-18 21:17:08');

-- --------------------------------------------------------

--
-- Table structure for table `requisitions`
--

CREATE TABLE `requisitions` (
  `requisition_id` varchar(36) NOT NULL,
  `requisition_no` varchar(255) NOT NULL,
  `requested_by` varchar(36) NOT NULL,
  `position_id` varchar(36) NOT NULL,
  `employment_type` varchar(255) NOT NULL,
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
('21c485c1-7866-11ec-ba80-6c626d3a5d34', 'Hayden', NULL, 'Glover', NULL, '935ed1d6-785f-11ec-ba80-6c626d3a5d34', 'hr_manager@homies.com', '$2b$12$kdGf8QZE.djgUhoAjZEZye8xUPXX4tVgqqFlP0BYUujcS.t4jK.Gy', 'Hiring Manager', '2022-01-18 21:54:18', '2022-01-18 21:54:18'),
('24fec4e3-7865-11ec-ba80-6c626d3a5d34', 'Loren', NULL, 'Whitehead', NULL, '92957000-7862-11ec-ba80-6c626d3a5d34', 'opd_head@homies.com', '$2b$12$kZMVqpEGd2/vWsHLd48esef3HKn6buAmE1aNR9rWTYWVIcXUrPQzS', 'Department Head', '2022-01-18 21:47:14', '2022-01-18 21:47:14'),
('3d4174f0-7865-11ec-ba80-6c626d3a5d34', 'Ava', NULL, 'Bennett', NULL, '953b89be-7862-11ec-ba80-6c626d3a5d34', 'opd_manager@homies.com', '$2b$12$5Lf2YdkowOOOnvzE03epCOOL8VeBOuYdiv.f5TKj7CYlQMFHOD6yC', 'Department Manager', '2022-01-18 21:47:55', '2022-01-18 21:47:55'),
('74366c72-7866-11ec-ba80-6c626d3a5d34', 'Vivian', NULL, 'Olsen', NULL, 'bb67fffa-785f-11ec-ba80-6c626d3a5d34', 'hr_recruiter@homies.com', '$2b$12$yRoqY6kGEXyk8T6AlDvqre2TvQehelOh07pOz1FTu1VfQIvUN51fu', 'Recruiter', '2022-01-18 21:56:37', '2022-01-18 21:56:37'),
('993a8d5b-7864-11ec-ba80-6c626d3a5d34', 'Melville', NULL, 'Ellison', NULL, 'ed8f05fc-7860-11ec-ba80-6c626d3a5d34', 'icu_head@homies.com', '$2b$12$Uiqe0PlW4K3eDKlkl7hn0.J3nPSekbc2XnpNFf91VGpwx1CFv8NKO', 'Department Head', '2022-01-18 21:43:20', '2022-01-18 21:43:20'),
('9fa5dc93-7865-11ec-ba80-6c626d3a5d34', 'Robbie', NULL, 'Gordon', NULL, '5a519cbb-7860-11ec-ba80-6c626d3a5d34', 'it_manager@homies.com', '$2b$12$EKM0Ak/BUnz.8xwurZcCJuYo70rEPpS6QiBUFF4xtjaDVm/28GG/W', 'Department Manager', '2022-01-18 21:50:40', '2022-01-18 21:50:40'),
('c690884e-7864-11ec-ba80-6c626d3a5d34', 'Sydney', NULL, 'Hogan', NULL, 'f065294b-7860-11ec-ba80-6c626d3a5d34', 'icu_manager@homies.com', '$2b$12$Xnj0JGcoUAiyxWHRZ0B.v.rdscB.0lbYeV.D9VcsSEnZigZ/ok7hC', 'Department Manager', '2022-01-18 21:44:36', '2022-01-18 21:44:36'),
('ec5f7346-7865-11ec-ba80-6c626d3a5d34', 'Winfred', NULL, 'Carroll', NULL, '51312fde-7860-11ec-ba80-6c626d3a5d34', 'it_head@homies.com', '$2b$12$OTQ3.ywmoCHxWZRi6UjsUO76qPYzAJNI1vh8Cldo.YvIYswGDYXe2', 'Department Head', '2022-01-18 21:52:49', '2022-01-18 21:52:49');

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
  ADD KEY `requisition_id` (`requisition_id`),
  ADD KEY `job_category` (`job_category_id`),
  ADD KEY `posted_by` (`posted_by`);

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
  ADD KEY `department_id` (`department_id`),
  ADD KEY `added_by` (`added_by`),
  ADD KEY `updated_by` (`updated_by`);

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
  ADD UNIQUE KEY `requisition_no` (`requisition_no`),
  ADD KEY `requested_by` (`requested_by`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `signed_by` (`signed_by`),
  ADD KEY `reviewed_by` (`reviewed_by`),
  ADD KEY `rejected_by` (`rejected_by`);

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
-- Constraints for table `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `applicants_ibfk_1` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`job_post_id`),
  ADD CONSTRAINT `applicants_ibfk_2` FOREIGN KEY (`evaluated_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `applicants_ibfk_3` FOREIGN KEY (`screened_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `applicants_ibfk_4` FOREIGN KEY (`hired_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `applicants_ibfk_5` FOREIGN KEY (`rejected_by`) REFERENCES `users` (`user_id`);

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
  ADD CONSTRAINT `interview_questions_ibfk_1` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `interview_questions_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `interview_schedules`
--
ALTER TABLE `interview_schedules`
  ADD CONSTRAINT `interview_schedules_ibfk_1` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`job_post_id`),
  ADD CONSTRAINT `interview_schedules_ibfk_2` FOREIGN KEY (`set_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `interview_scores`
--
ALTER TABLE `interview_scores`
  ADD CONSTRAINT `interview_scores_ibfk_1` FOREIGN KEY (`interviewee_id`) REFERENCES `interviewees` (`interviewee_id`),
  ADD CONSTRAINT `interview_scores_ibfk_2` FOREIGN KEY (`interview_question_id`) REFERENCES `interview_questions` (`interview_question_id`),
  ADD CONSTRAINT `interview_scores_ibfk_3` FOREIGN KEY (`scored_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `job_categories`
--
ALTER TABLE `job_categories`
  ADD CONSTRAINT `job_categories_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `job_posts_ibfk_1` FOREIGN KEY (`requisition_id`) REFERENCES `requisitions` (`requisition_id`),
  ADD CONSTRAINT `job_posts_ibfk_2` FOREIGN KEY (`job_category_id`) REFERENCES `job_categories` (`job_category_id`),
  ADD CONSTRAINT `job_posts_ibfk_3` FOREIGN KEY (`posted_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `onboarding_employees`
--
ALTER TABLE `onboarding_employees`
  ADD CONSTRAINT `onboarding_employees_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  ADD CONSTRAINT `onboarding_employees_ibfk_2` FOREIGN KEY (`signed_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `onboarding_employees_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `onboarding_employee_task`
--
ALTER TABLE `onboarding_employee_task`
  ADD CONSTRAINT `onboarding_employee_task_ibfk_1` FOREIGN KEY (`onboarding_employee_id`) REFERENCES `onboarding_employees` (`onboarding_employee_id`),
  ADD CONSTRAINT `onboarding_employee_task_ibfk_2` FOREIGN KEY (`onboarding_task_id`) REFERENCES `onboarding_tasks` (`onboarding_task_id`),
  ADD CONSTRAINT `onboarding_employee_task_ibfk_3` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `onboarding_employee_task_ibfk_4` FOREIGN KEY (`completed_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `onboarding_tasks`
--
ALTER TABLE `onboarding_tasks`
  ADD CONSTRAINT `onboarding_tasks_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `onboarding_tasks_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `onboarding_tasks_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

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
  ADD CONSTRAINT `requisitions_ibfk_3` FOREIGN KEY (`signed_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `requisitions_ibfk_4` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `requisitions_ibfk_5` FOREIGN KEY (`rejected_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
