-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2021 at 11:18 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

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

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`applicant_id`, `job_post_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `resume`, `contact_number`, `email`, `status`, `evaluated_by`, `evaluated_at`, `screened_by`, `screened_at`, `hired_by`, `hired_at`, `rejected_by`, `rejected_at`, `remarks`, `created_at`, `updated_at`) VALUES
('1527f04b-2f16-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Janet', '', 'Jennings', '', '7186450b586b480aa753695cdafcf4bc.pdf', '(153)-173-0915', 'janet.jennings@gmail.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, NULL, NULL, '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:48:49', 'Invalid Resume had been submitted', '2021-10-17 14:47:23', '2021-10-17 14:48:49'),
('7b18e51b-2f1a-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Caroline', '', 'Khun', '', '65715407f7124534b20cb1c38d89efff.pdf', '(196)-423-6001', 'caroline.khun@gmail.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, NULL, NULL, '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:22:57', 'Invalid details in resume', '2021-10-17 15:18:52', '2021-10-17 15:22:57'),
('8f062058-2f1b-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Max', '', 'Martinez', '', 'c20e90b4e1f647e5a8f05143eff39bee.pdf', '(159)-010-2937', 'max.martinez@gmail.com', 'For screening', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:27:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-10-17 15:26:35', '2021-10-17 15:27:31'),
('977aca29-2f1a-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Billie', '', 'Berry', '', '648a9ecec1c64fce8db28168f3142729.pdf', '(049)-278-1099', 'billie.berry@gmail.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-10-17 15:19:39', '2021-10-17 15:19:39'),
('a44c7ad0-2f16-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Sean', '', 'Rodriguez', 'III', '336e4e05839b422eac3e04140494635b.pdf', '(442)-077-4217', 'sean.rodriguez@gmail.com', 'Contract signed', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:52:25', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:52:50', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:02:43', NULL, NULL, NULL, '2021-10-17 14:51:23', '2021-10-17 15:04:12'),
('a644d17f-2f1b-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Guy', '', 'Peterson', '', '9ff1684db7dc4fb387d09ce0a0c1ca6e.pdf', '(376)-982-6855', 'guy.peterson@email.com', 'Rejected from screening', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:27:24', NULL, NULL, NULL, NULL, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:28:03', 'Invalid details had been provided', '2021-10-17 15:27:14', '2021-10-17 15:28:03'),
('b1711185-2f1a-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Russell', 'Cunningham', 'Soto', '', '767675f407b148d48dd7e6f3e68a1252.pdf', '(972)-944-6253', 'russell.soto@gmail.com', 'For interview', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:23:13', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:23:33', NULL, NULL, NULL, NULL, NULL, '2021-10-17 15:20:23', '2021-10-17 15:23:33'),
('c2deecc7-2f15-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Kevin', '', 'Martin', 'Jr.', '7b84850917224a2c95b976602a0806b1.pdf', '(339)-720-9416', 'kevin.martin@gmail.com', 'Hired', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:49:16', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:53:02', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:02:35', NULL, NULL, NULL, '2021-10-17 14:45:05', '2021-10-17 15:02:35'),
('dbca3914-2f1a-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Justin', '', 'Alexander', '', '3885b1efba334155bf9cb2b54955eec0.pdf', '(258)-860-7293', 'justin.alexander@gmail.com', 'For interview', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:23:09', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:23:46', NULL, NULL, NULL, NULL, NULL, '2021-10-17 15:21:34', '2021-10-17 15:23:46'),
('e28b86fc-2f15-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'William', 'Santos', 'Rivera', '', '088f0be7d4384419b72f925bdd1739f2.pdf', '(889)-573-1037', 'william.rivera@gmail.com', 'Contract signed', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:49:11', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:52:58', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:02:31', NULL, NULL, NULL, '2021-10-17 14:45:58', '2021-10-17 15:04:41'),
('f4c90323-2f15-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Ana', '', 'Perkins', '', 'a7a2eeef3f4645fc9382a91c072d96c8.pdf', '(123)-343-0603', 'ana.perkins@gmail.com', 'Contract signed', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:49:07', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:52:54', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:02:47', NULL, NULL, NULL, '2021-10-17 14:46:28', '2021-10-17 15:04:21'),
('feeb1e00-2f1a-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', 'Hazel', '', 'Caroll', '', '59993aad31414a6587d67f71b684d114.pdf', '(750)-217-7781', 'hazel.caroll@gmail.com', 'For interview', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:23:06', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:23:29', NULL, NULL, NULL, NULL, NULL, '2021-10-17 15:22:33', '2021-10-17 15:23:29');

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
('36afdca4-268c-11ec-816e-6c626d3a5d34', 'Out-Patient Department', 'Out-Patient Department', '2021-10-06 18:00:19', '2021-10-06 18:00:19'),
('649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'Intensive Care Unit (ICU) Department', 'Intensive Care Unit (ICU) Department', '2021-09-22 15:55:02', '2021-09-22 15:55:02'),
('849a92b6-1b7a-11ec-9d57-6c626d3a5d34', 'Human Resource (HR) Department', 'Human Resource (HR) Department', '2021-09-22 15:55:56', '2021-09-22 15:55:56');

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
('0701766e-2f17-11ec-83ec-6c626d3a5d34', 'a44c7ad0-2f16-11ec-83ec-6c626d3a5d34', '06ebfb15-2f17-11ec-83ec-6c626d3a5d34', 1, '2021-10-17 14:55:27', NULL, '2021-10-17 14:54:09', '2021-10-17 14:55:27'),
('0710f051-2f17-11ec-83ec-6c626d3a5d34', 'c2deecc7-2f15-11ec-83ec-6c626d3a5d34', '06ebfb15-2f17-11ec-83ec-6c626d3a5d34', 1, '2021-10-17 14:56:39', NULL, '2021-10-17 14:54:09', '2021-10-17 14:56:39'),
('073cff0d-2f17-11ec-83ec-6c626d3a5d34', 'f4c90323-2f15-11ec-83ec-6c626d3a5d34', '06ebfb15-2f17-11ec-83ec-6c626d3a5d34', 1, '2021-10-17 14:57:50', NULL, '2021-10-17 14:54:09', '2021-10-17 14:57:50'),
('07415d17-2f17-11ec-83ec-6c626d3a5d34', 'e28b86fc-2f15-11ec-83ec-6c626d3a5d34', '06ebfb15-2f17-11ec-83ec-6c626d3a5d34', 1, '2021-10-17 14:59:13', NULL, '2021-10-17 14:54:09', '2021-10-17 14:59:14'),
('3e4f3c05-2f1b-11ec-83ec-6c626d3a5d34', 'b1711185-2f1a-11ec-83ec-6c626d3a5d34', '3e3b8ab1-2f1b-11ec-83ec-6c626d3a5d34', NULL, NULL, NULL, '2021-10-17 15:24:19', '2021-10-17 15:24:19'),
('3e63c87d-2f1b-11ec-83ec-6c626d3a5d34', 'feeb1e00-2f1a-11ec-83ec-6c626d3a5d34', '3e3b8ab1-2f1b-11ec-83ec-6c626d3a5d34', 1, '2021-10-17 15:25:29', NULL, '2021-10-17 15:24:19', '2021-10-17 15:25:30');

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
('2d80c8c4-2a46-11ec-a2be-6c626d3a5d34', 'Lorem ipsum dolot sit amet?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-11 11:49:04', '2021-10-11 11:49:04'),
('33d553ed-2a46-11ec-a2be-6c626d3a5d34', 'Consectrture feliz navidad?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-11 11:49:14', '2021-10-11 11:49:14'),
('35c7ab58-2f17-11ec-83ec-6c626d3a5d34', 'How do you see yourself after 10 years?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:55:27', '2021-10-17 14:55:27'),
('36652f56-2f17-11ec-83ec-6c626d3a5d34', 'What knowledge and experiences do you have that makes you fit for this job?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:55:28', '2021-10-17 14:55:28'),
('492106f0-29a8-11ec-a0b9-6c626d3a5d34', 'What skills do you have that you can contribute to our company?', 'General', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-10 16:58:49', '2021-10-10 16:58:49'),
('60a8d77a-2f17-11ec-83ec-6c626d3a5d34', 'What experiences and knowledge do you have that makes you fit for this job?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('60be69a4-2f17-11ec-83ec-6c626d3a5d34', 'How do you see yourself after 5 years?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('68333ba3-2f1b-11ec-83ec-6c626d3a5d34', 'Do you have soft skills that makes you unique than others?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:25:30', '2021-10-17 15:25:30'),
('6a8c3051-2f03-11ec-83ec-6c626d3a5d34', 'After 10 years, how do you visualize yourself?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 12:33:46', '2021-10-17 12:33:46'),
('6a9653ed-2f03-11ec-83ec-6c626d3a5d34', 'What knowledge and experiences you earned that may give contribution to our company?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 12:33:46', '2021-10-17 12:33:46'),
('8ad016bc-2f17-11ec-83ec-6c626d3a5d34', 'What knowledge and experiences do you have that makes you fit for this job?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('8ae1deb3-2f17-11ec-83ec-6c626d3a5d34', 'How do you see yourself after 20 years?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('a5bf8cf6-29a8-11ec-a0b9-6c626d3a5d34', 'What experiences you already had that makes you have the advantage from other applicants?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-10 17:01:25', '2021-10-10 17:01:25'),
('a5da2b3b-29a8-11ec-a0b9-6c626d3a5d34', 'How do you come up with pressures given to you?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-10 17:01:25', '2021-10-10 17:01:25'),
('bcdecdd5-2f17-11ec-83ec-6c626d3a5d34', 'What skills do you have that makes you fit for this job?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:14', '2021-10-17 14:59:14'),
('bce7d172-2f17-11ec-83ec-6c626d3a5d34', 'How you do see your self after 15 years?', 'Added', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:14', '2021-10-17 14:59:14'),
('d8da0511-29a7-11ec-a0b9-6c626d3a5d34', 'Tell me about yourself.', 'General', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-10 16:55:41', '2021-10-10 16:55:41'),
('f19e6568-29a7-11ec-a0b9-6c626d3a5d34', 'What are your strength and weaknesses?', 'General', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-10 16:56:23', '2021-10-10 16:56:23');

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
('06ebfb15-2f17-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', '2021-10-20', '14:00:00', '15:00:00', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:54:08', '2021-10-17 14:54:08'),
('3e3b8ab1-2f1b-11ec-83ec-6c626d3a5d34', '273d454f-2689-11ec-816e-6c626d3a5d34', '2021-10-31', '13:00:00', '15:00:00', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:24:19', '2021-10-17 15:24:19');

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
('35a074fb-2f17-11ec-83ec-6c626d3a5d34', '0701766e-2f17-11ec-83ec-6c626d3a5d34', '492106f0-29a8-11ec-a0b9-6c626d3a5d34', 96, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:55:27', '2021-10-17 14:55:27'),
('3609d3c2-2f17-11ec-83ec-6c626d3a5d34', '0701766e-2f17-11ec-83ec-6c626d3a5d34', 'f19e6568-29a7-11ec-a0b9-6c626d3a5d34', 94, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:55:27', '2021-10-17 14:55:27'),
('3659e6ae-2f17-11ec-83ec-6c626d3a5d34', '0701766e-2f17-11ec-83ec-6c626d3a5d34', 'd8da0511-29a7-11ec-a0b9-6c626d3a5d34', 97, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:55:28', '2021-10-17 14:55:28'),
('3681c35e-2f17-11ec-83ec-6c626d3a5d34', '0701766e-2f17-11ec-83ec-6c626d3a5d34', '35c7ab58-2f17-11ec-83ec-6c626d3a5d34', 95, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:55:28', '2021-10-17 14:55:28'),
('6082b56b-2f17-11ec-83ec-6c626d3a5d34', '0710f051-2f17-11ec-83ec-6c626d3a5d34', '492106f0-29a8-11ec-a0b9-6c626d3a5d34', 97, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('6087c2c9-2f17-11ec-83ec-6c626d3a5d34', '0710f051-2f17-11ec-83ec-6c626d3a5d34', 'd8da0511-29a7-11ec-a0b9-6c626d3a5d34', 96, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('60a1c7bf-2f17-11ec-83ec-6c626d3a5d34', '0710f051-2f17-11ec-83ec-6c626d3a5d34', 'f19e6568-29a7-11ec-a0b9-6c626d3a5d34', 97, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('60c9422e-2f17-11ec-83ec-6c626d3a5d34', '0710f051-2f17-11ec-83ec-6c626d3a5d34', '60a8d77a-2f17-11ec-83ec-6c626d3a5d34', 98, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('60dec040-2f17-11ec-83ec-6c626d3a5d34', '0710f051-2f17-11ec-83ec-6c626d3a5d34', '60be69a4-2f17-11ec-83ec-6c626d3a5d34', 97, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:56:39', '2021-10-17 14:56:39'),
('680c5288-2f1b-11ec-83ec-6c626d3a5d34', '3e63c87d-2f1b-11ec-83ec-6c626d3a5d34', '492106f0-29a8-11ec-a0b9-6c626d3a5d34', 96, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:25:29', '2021-10-17 15:25:29'),
('681cba71-2f1b-11ec-83ec-6c626d3a5d34', '3e63c87d-2f1b-11ec-83ec-6c626d3a5d34', 'd8da0511-29a7-11ec-a0b9-6c626d3a5d34', 95, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:25:29', '2021-10-17 15:25:29'),
('6824fed9-2f1b-11ec-83ec-6c626d3a5d34', '3e63c87d-2f1b-11ec-83ec-6c626d3a5d34', 'f19e6568-29a7-11ec-a0b9-6c626d3a5d34', 94, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:25:29', '2021-10-17 15:25:29'),
('686912c5-2f1b-11ec-83ec-6c626d3a5d34', '3e63c87d-2f1b-11ec-83ec-6c626d3a5d34', '68333ba3-2f1b-11ec-83ec-6c626d3a5d34', 94, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:25:30', '2021-10-17 15:25:30'),
('8ac3538e-2f17-11ec-83ec-6c626d3a5d34', '073cff0d-2f17-11ec-83ec-6c626d3a5d34', '492106f0-29a8-11ec-a0b9-6c626d3a5d34', 95, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('8aca10ce-2f17-11ec-83ec-6c626d3a5d34', '073cff0d-2f17-11ec-83ec-6c626d3a5d34', 'f19e6568-29a7-11ec-a0b9-6c626d3a5d34', 91, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('8ad3b5de-2f17-11ec-83ec-6c626d3a5d34', '073cff0d-2f17-11ec-83ec-6c626d3a5d34', 'd8da0511-29a7-11ec-a0b9-6c626d3a5d34', 94, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('8af8dfae-2f17-11ec-83ec-6c626d3a5d34', '073cff0d-2f17-11ec-83ec-6c626d3a5d34', '8ad016bc-2f17-11ec-83ec-6c626d3a5d34', 95, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('8b02a04e-2f17-11ec-83ec-6c626d3a5d34', '073cff0d-2f17-11ec-83ec-6c626d3a5d34', '8ae1deb3-2f17-11ec-83ec-6c626d3a5d34', 94, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:57:50', '2021-10-17 14:57:50'),
('bc9e5580-2f17-11ec-83ec-6c626d3a5d34', '07415d17-2f17-11ec-83ec-6c626d3a5d34', '492106f0-29a8-11ec-a0b9-6c626d3a5d34', 98, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:13', '2021-10-17 14:59:13'),
('bcb9b29e-2f17-11ec-83ec-6c626d3a5d34', '07415d17-2f17-11ec-83ec-6c626d3a5d34', 'd8da0511-29a7-11ec-a0b9-6c626d3a5d34', 97, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:13', '2021-10-17 14:59:13'),
('bce3968f-2f17-11ec-83ec-6c626d3a5d34', '07415d17-2f17-11ec-83ec-6c626d3a5d34', 'f19e6568-29a7-11ec-a0b9-6c626d3a5d34', 95, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:14', '2021-10-17 14:59:14'),
('bcf74b3e-2f17-11ec-83ec-6c626d3a5d34', '07415d17-2f17-11ec-83ec-6c626d3a5d34', 'bcdecdd5-2f17-11ec-83ec-6c626d3a5d34', 96, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:14', '2021-10-17 14:59:14'),
('bd03b5aa-2f17-11ec-83ec-6c626d3a5d34', '07415d17-2f17-11ec-83ec-6c626d3a5d34', 'bce7d172-2f17-11ec-83ec-6c626d3a5d34', 99, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 14:59:14', '2021-10-17 14:59:14');

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
  `posted_by` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`job_post_id`, `requisition_id`, `salary_is_visible`, `content`, `expiration_date`, `posted_by`, `created_at`, `updated_at`) VALUES
('01345e43-268f-11ec-816e-6c626d3a5d34', '85d432f2-268d-11ec-816e-6c626d3a5d34', 0, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', NULL, '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 18:20:18', '2021-10-06 18:20:18'),
('06323ee1-268f-11ec-816e-6c626d3a5d34', '5eb47c60-268e-11ec-816e-6c626d3a5d34', 0, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', NULL, '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 18:20:26', '2021-10-06 19:49:25'),
('273d454f-2689-11ec-816e-6c626d3a5d34', 'b68282a7-2684-11ec-816e-6c626d3a5d34', 1, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', '2021-12-01 12:00:00', '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 17:38:25', '2021-10-06 17:38:25'),
('e09ef8f4-251c-11ec-94e2-6c626d3a5d34', '83946187-1dd0-11ec-8b6c-6c626d3a5d34', 0, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', NULL, '898c51c6-1b87-11ec-9d57-6c626d3a5d34', '2021-10-04 22:10:49', '2021-10-06 18:20:01');

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
('6efe6267-2f18-11ec-83ec-6c626d3a5d34', 'Sean', '', 'Rodriguez', 'III', '(442)-077-4217', 'sean.rodriguez@gmail.com', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', NULL, 'c7438804552b407f932ded3d19c96671.pdf', 'Pending', '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', NULL, '2021-10-17 15:04:12', '2021-10-17 15:04:12'),
('743752b8-2f18-11ec-83ec-6c626d3a5d34', 'Ana', '', 'Perkins', '', '(123)-343-0603', 'ana.perkins@gmail.com', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', '2021-10-18', 'b9d6fef6ef4247f0b4f4faacb92d3fa8.pdf', 'Onboarding', '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', NULL, '2021-10-17 15:04:21', '2021-10-17 15:12:13'),
('801f56d8-2f18-11ec-83ec-6c626d3a5d34', 'William', 'Santos', 'Rivera', '', '(889)-573-1037', 'william.rivera@gmail.com', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', '2021-10-17', '5528485d56e34cd9ae0a411bb765a5f2.pdf', 'Onboarding', '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', NULL, '2021-10-17 15:04:41', '2021-10-17 15:11:16');

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
('6b395a22-2f19-11ec-83ec-6c626d3a5d34', '801f56d8-2f18-11ec-83ec-6c626d3a5d34', '0f12f9b0-2f19-11ec-83ec-6c626d3a5d34', '2021-10-18 15:09:00', '2021-10-18 15:12:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Pending', NULL, NULL, '2021-10-17 15:11:16', '2021-10-17 15:11:16'),
('6b4a8615-2f19-11ec-83ec-6c626d3a5d34', '801f56d8-2f18-11ec-83ec-6c626d3a5d34', '1f85f38d-2f19-11ec-83ec-6c626d3a5d34', '2021-10-18 19:10:00', '2021-10-19 15:12:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Pending', NULL, NULL, '2021-10-17 15:11:16', '2021-10-17 15:11:16'),
('6b763c3e-2f19-11ec-83ec-6c626d3a5d34', '801f56d8-2f18-11ec-83ec-6c626d3a5d34', 'e69f3c1b-2f18-11ec-83ec-6c626d3a5d34', '2021-10-18 15:10:00', '2021-12-01 15:10:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'On Going', NULL, NULL, '2021-10-17 15:11:16', '2021-10-17 15:11:16'),
('6b82d821-2f19-11ec-83ec-6c626d3a5d34', '801f56d8-2f18-11ec-83ec-6c626d3a5d34', 'b1cc327e-2f18-11ec-83ec-6c626d3a5d34', '2021-10-18 15:09:00', '2021-10-20 15:09:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'On Going', NULL, NULL, '2021-10-17 15:11:16', '2021-10-17 15:11:16'),
('6b97d663-2f19-11ec-83ec-6c626d3a5d34', '801f56d8-2f18-11ec-83ec-6c626d3a5d34', 'ff70327c-2f18-11ec-83ec-6c626d3a5d34', '2021-10-18 15:10:00', '2021-10-18 16:10:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Completed', '2021-10-17 15:15:41', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:11:16', '2021-10-17 15:11:16'),
('8d3eefb4-2f19-11ec-83ec-6c626d3a5d34', '743752b8-2f18-11ec-83ec-6c626d3a5d34', '0f12f9b0-2f19-11ec-83ec-6c626d3a5d34', '2021-10-18 15:11:00', '2021-10-20 15:11:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Completed', '2021-10-17 15:15:46', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:12:13', '2021-10-17 15:12:13'),
('8d505293-2f19-11ec-83ec-6c626d3a5d34', '743752b8-2f18-11ec-83ec-6c626d3a5d34', '1f85f38d-2f19-11ec-83ec-6c626d3a5d34', '2021-10-19 15:11:00', '2021-10-20 15:11:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Completed', '2021-10-17 15:15:54', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:12:13', '2021-10-17 15:12:13'),
('8d68ef0d-2f19-11ec-83ec-6c626d3a5d34', '743752b8-2f18-11ec-83ec-6c626d3a5d34', 'b1cc327e-2f18-11ec-83ec-6c626d3a5d34', '2021-10-20 15:11:00', '2021-10-21 15:11:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Completed', '2021-10-17 15:15:56', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:12:13', '2021-10-17 15:12:13'),
('8d8cbe1f-2f19-11ec-83ec-6c626d3a5d34', '743752b8-2f18-11ec-83ec-6c626d3a5d34', 'ff70327c-2f18-11ec-83ec-6c626d3a5d34', '2021-10-28 15:12:00', '2021-10-29 15:12:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Completed', '2021-10-17 15:16:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:12:13', '2021-10-17 15:12:13'),
('8dbb374d-2f19-11ec-83ec-6c626d3a5d34', '743752b8-2f18-11ec-83ec-6c626d3a5d34', 'e69f3c1b-2f18-11ec-83ec-6c626d3a5d34', '2021-10-21 15:11:00', '2021-10-22 15:12:00', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Completed', '2021-10-17 15:16:02', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:12:14', '2021-10-17 15:12:14');

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
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `onboarding_tasks`
--

INSERT INTO `onboarding_tasks` (`onboarding_task_id`, `title`, `description`, `task_type`, `is_general`, `department_id`, `added_by`, `updated_by`, `created_at`, `updated_at`) VALUES
('0f12f9b0-2f19-11ec-83ec-6c626d3a5d34', 'Introduce myself and the team', 'Introduce myself and the team', 'For department manager', 1, '649c149d-1b7a-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:08:41', '2021-10-17 15:08:41'),
('1f85f38d-2f19-11ec-83ec-6c626d3a5d34', 'Give forms for first month tasks', 'Give forms for first month tasks', 'For department manager', 1, '649c149d-1b7a-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:09:09', '2021-10-17 15:09:09'),
('6b90aae2-2f19-11ec-83ec-6c626d3a5d34', 'Introduce himself to the team', 'Introduce himself to the team', 'For new employees', 0, '649c149d-1b7a-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:11:16', '2021-10-17 15:11:16'),
('b1cc327e-2f18-11ec-83ec-6c626d3a5d34', 'Read rules, regulations and policies', 'Read rules, regulations and policies of this enterprise and this department', 'For new employees', 1, '649c149d-1b7a-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:06:05', '2021-10-17 15:06:05'),
('e69f3c1b-2f18-11ec-83ec-6c626d3a5d34', 'Do task for first month', 'Do task for first month as part of onboarding', 'For new employees', 1, '649c149d-1b7a-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:07:33', '2021-10-17 15:07:33'),
('ff70327c-2f18-11ec-83ec-6c626d3a5d34', 'Welcome the new employee', 'Welcome the new employee by introducing each team member', 'For the team', 1, '649c149d-1b7a-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '07431c30-1b87-11ec-9d57-6c626d3a5d34', '2021-10-17 15:08:15', '2021-10-17 15:08:15');

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
('180c2c33-268d-11ec-816e-6c626d3a5d34', '36afdca4-268c-11ec-816e-6c626d3a5d34', 'Pediatrician', 'Pediatrician', '2021-10-06 18:06:37', '2021-10-06 18:06:37'),
('573932ed-268c-11ec-816e-6c626d3a5d34', '36afdca4-268c-11ec-816e-6c626d3a5d34', 'Department Head', 'Department Head', '2021-10-06 18:01:14', '2021-10-06 18:01:14'),
('9107463f-268c-11ec-816e-6c626d3a5d34', '36afdca4-268c-11ec-816e-6c626d3a5d34', 'Department Manager', 'Department Manager', '2021-10-06 18:02:51', '2021-10-06 18:02:51'),
('a7bbc44d-1b94-11ec-9d57-6c626d3a5d34', '649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'ICU Doctor', 'ICU Doctor', '2021-09-22 19:03:02', '2021-09-22 19:03:02'),
('b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', '649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'ICU Nurse', 'ICU Nurse', '2021-09-22 19:03:24', '2021-09-22 19:03:24'),
('c36fa650-1b7a-11ec-9d57-6c626d3a5d34', '849a92b6-1b7a-11ec-9d57-6c626d3a5d34', 'Hiring Manager', 'Hiring Manager', '2021-09-22 15:57:42', '2021-09-22 15:57:42'),
('ce4245b3-1b7a-11ec-9d57-6c626d3a5d34', '849a92b6-1b7a-11ec-9d57-6c626d3a5d34', 'Recruiter', 'Recruiter', '2021-09-22 15:58:00', '2021-09-22 15:58:00'),
('d58596dd-268c-11ec-816e-6c626d3a5d34', '36afdca4-268c-11ec-816e-6c626d3a5d34', 'Physician', 'Physician', '2021-10-06 18:04:46', '2021-10-06 18:04:46'),
('dcc05a91-268c-11ec-816e-6c626d3a5d34', '36afdca4-268c-11ec-816e-6c626d3a5d34', 'OPD Doctor', 'OPD Doctor', '2021-10-06 18:04:58', '2021-10-06 18:04:58'),
('e16eb13d-268c-11ec-816e-6c626d3a5d34', '36afdca4-268c-11ec-816e-6c626d3a5d34', 'OPD Nurse', 'OPD Nurse', '2021-10-06 18:05:06', '2021-10-06 18:05:06'),
('e45bdada-1b7a-11ec-9d57-6c626d3a5d34', '649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'Department Head', 'Department Head', '2021-09-22 15:58:37', '2021-09-22 15:58:37'),
('ec052bfe-1b7a-11ec-9d57-6c626d3a5d34', '649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'Department Manager', 'Department Manager', '2021-09-22 15:58:50', '2021-09-22 15:58:50');

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

--
-- Dumping data for table `requisitions`
--

INSERT INTO `requisitions` (`requisition_id`, `requisition_no`, `requested_by`, `position_id`, `employment_type`, `request_nature`, `staffs_needed`, `min_monthly_salary`, `max_monthly_salary`, `content`, `request_status`, `deadline`, `signed_by`, `signed_at`, `reviewed_by`, `reviewed_at`, `completed_at`, `rejected_by`, `rejected_at`, `remarks`, `created_at`, `updated_at`) VALUES
('4923c219-1ea6-11ec-afc6-6c626d3a5d34', 'REQ-KU0Z9BY9-W2GRA8', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'Replacement', 2, NULL, NULL, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', 'For signature', '2021-12-01 16:46:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-26 16:46:48', '2021-10-17 12:23:42'),
('4c39aeb4-1f52-11ec-affd-6c626d3a5d34', 'REQ-KU279804-V1TI43', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'e45bdada-1b7a-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>se</p>', 'Rejected for signing', NULL, NULL, NULL, NULL, NULL, NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-09-27 13:29:15', 'Invalid request', '2021-09-27 13:18:06', '2021-09-27 13:29:15'),
('5630852e-268d-11ec-816e-6c626d3a5d34', 'REQ-KUFCKAOQ-1FM6M0', 'c53bea43-268c-11ec-816e-6c626d3a5d34', '180c2c33-268d-11ec-816e-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', 'Approved', '2022-01-31 18:00:00', '8cb6e2f8-268c-11ec-816e-6c626d3a5d34', '2021-10-06 18:10:40', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 18:11:43', NULL, NULL, NULL, NULL, '2021-10-06 18:08:21', '2021-10-06 18:11:43'),
('5eb47c60-268e-11ec-816e-6c626d3a5d34', 'REQ-KUFCUJ30-NOU0IS', 'c53bea43-268c-11ec-816e-6c626d3a5d34', 'e16eb13d-268c-11ec-816e-6c626d3a5d34', 'Part Time', 'Replacement', 2, NULL, NULL, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', 'Approved', NULL, '8cb6e2f8-268c-11ec-816e-6c626d3a5d34', '2021-10-06 18:18:29', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 18:18:55', NULL, NULL, NULL, NULL, '2021-10-06 18:15:45', '2021-10-06 18:18:55'),
('83946187-1dd0-11ec-8b6c-6c626d3a5d34', 'REQ-KTZGIL3R-BQF298', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'a7bbc44d-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p><b>From ICU Department</b></p><p>Lorem ipsum dolor sit amet consectetur&nbsp;<span style=\"text-align: justify;\">Se</span>d ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p><ul><li><span style=\"font-size: 1rem;\">Duis aute irure dolor in reprehenderit</span></li><li><span style=\"font-size: 1rem;\">Excepteur sint occaecat cupidatat non proident<br></span></li></ul><p><span style=\"font-size: 1rem;\">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><table class=\"table table-bordered\"><tbody><tr><td>&nbsp;dolorem ipsum quia<br></td><td>dolor<br></td><td>amet</td></tr><tr><td><span style=\"text-align: justify;\">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti</span><br></td><td>2</td><td>1</td></tr><tr><td><span style=\"text-align: justify;\">quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,&nbsp;</span><br></td><td>3</td><td>1</td></tr><tr><td><span style=\"text-align: justify;\">similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.&nbsp;</span><br></td><td>1</td><td>1</td></tr></tbody></table><p><span style=\"font-size: 1rem;\"> </span></p><p><span style=\"font-size: 1rem;\">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span><br></p><p><br></p>', 'Approved', '2021-09-30 15:16:00', '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-09-26 16:43:47', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-09-27 16:25:31', NULL, NULL, '2021-09-26 16:42:48', NULL, '2021-09-25 15:16:33', '2021-09-27 16:25:31'),
('85d432f2-268d-11ec-816e-6c626d3a5d34', 'REQ-KUFCMT80-7L86AA', 'c53bea43-268c-11ec-816e-6c626d3a5d34', 'd58596dd-268c-11ec-816e-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', 'Approved', NULL, '8cb6e2f8-268c-11ec-816e-6c626d3a5d34', '2021-10-06 18:10:08', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 18:11:34', NULL, NULL, NULL, NULL, '2021-10-06 18:09:41', '2021-10-06 18:11:34'),
('979886ec-1f69-11ec-affd-6c626d3a5d34', 'REQ-KU2D7PV0-J0KCIO', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'a7bbc44d-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>dsafsdfsdf</p>', 'For approval', NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-10-04 20:35:42', NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-27 16:04:51', '2021-10-04 20:35:42'),
('a11891fe-1f69-11ec-affd-6c626d3a5d34', 'REQ-KU2D82VU-9VDIBK', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', 'Part Time', 'New/Addition', 3, NULL, NULL, '<p>sdfsdfdsf</p>', 'Rejected for approval', NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-09-27 16:05:40', NULL, NULL, NULL, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-04 20:37:09', 'Request details is inaappropriate', '2021-09-27 16:05:07', '2021-10-04 20:37:09'),
('b68282a7-2684-11ec-816e-6c626d3a5d34', 'REQ-KUFAAUTX-84I8YA', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 4, 15000, 26000, '<p><b>From ICU Department</b></p><p>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.&nbsp;</p><p><br></p><p>Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.&nbsp;</p><ul><li>senectus habitasse scelerisque&nbsp;</li><li>lacus convallis enim&nbsp;</li><li>aenean commodo&nbsp;</li></ul><p><br></p><p>Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.</p>', 'Completed', NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 17:13:39', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-06 17:15:26', '2021-10-17 12:00:10', NULL, NULL, NULL, '2021-10-06 17:06:38', '2021-10-06 17:15:26');

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
('07431c30-1b87-11ec-9d57-6c626d3a5d34', 'Maxwell', NULL, 'Frye', NULL, 'ec052bfe-1b7a-11ec-9d57-6c626d3a5d34', 'icu_manager@email.com', '$2b$12$4UEESjB3X2Kuf9o/fsDnn.kpvZ.FlCJ4RMEmydihJcDCiT0YcRBla', 'Department Manager', '2021-09-22 17:25:29', '2021-09-22 17:25:29'),
('3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', 'Clifford', NULL, 'Tyler', NULL, 'e45bdada-1b7a-11ec-9d57-6c626d3a5d34', 'icu_head@email.com', '$2b$12$b06gz7oQ8oIyQ8DV9qXo6eli6cD1sqLy5QTb4WVQxvUYEqMO4zpMW', 'Department Head', '2021-09-22 17:26:57', '2021-09-22 17:26:57'),
('6bfa042c-1b87-11ec-9d57-6c626d3a5d34', 'Warner', NULL, 'Olson', NULL, 'c36fa650-1b7a-11ec-9d57-6c626d3a5d34', 'hr_manager@email.com', '$2b$12$hJFiP9cJ8hI529lN9rEvBuYVmxwO/Ft16MK7QG/F2VECEzW8s/dZO', 'Hiring Manager', '2021-09-22 17:28:18', '2021-09-22 17:28:18'),
('898c51c6-1b87-11ec-9d57-6c626d3a5d34', 'Lottie', NULL, 'Burch', NULL, 'ce4245b3-1b7a-11ec-9d57-6c626d3a5d34', 'hr_recruiter@email.com', '$2b$12$QlaufjyDCZRaFOJsLYtObuB8OAhBT7jRisC15zNfefQV6eOkQUL8.', 'Recruiter', '2021-09-22 17:29:08', '2021-09-22 17:29:08'),
('8cb6e2f8-268c-11ec-816e-6c626d3a5d34', 'Anthony', 'Johnston', 'Herrman', '', '573932ed-268c-11ec-816e-6c626d3a5d34', 'opd_head@email.com', '$2b$12$/L17DiCdmcDc3PuVqq6uTOs82mVzwEDD4ngD8/aGk7Ro.nCeWci4O', 'Department Head', '2021-10-06 18:02:43', '2021-10-06 18:02:43'),
('c53bea43-268c-11ec-816e-6c626d3a5d34', 'Jennefer', '', 'Geddes', '', '9107463f-268c-11ec-816e-6c626d3a5d34', 'opd_manager@email.com', '$2b$12$68BlmCfVOQ9IHB46x25U5.Kow2uolUs6sy1PuCAwL4OXUjip57nQm', 'Department Manager', '2021-10-06 18:04:18', '2021-10-06 18:04:18');

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
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`job_post_id`),
  ADD KEY `requisition_id` (`requisition_id`),
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
-- Constraints for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `job_posts_ibfk_1` FOREIGN KEY (`requisition_id`) REFERENCES `requisitions` (`requisition_id`),
  ADD CONSTRAINT `job_posts_ibfk_2` FOREIGN KEY (`posted_by`) REFERENCES `users` (`user_id`);

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
