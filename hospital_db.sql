-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2021 at 10:34 AM
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
  `rejected_by` datetime DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`applicant_id`, `job_post_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `resume`, `contact_number`, `email`, `status`, `evaluated_by`, `evaluated_at`, `screened_by`, `screened_at`, `rejected_by`, `rejected_at`, `remarks`, `created_at`, `updated_at`) VALUES
('11a927b5-1836-11ec-ae82-6c626d3a5d34', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Juan', '', 'Dela Cruz', '', '120bb8e357fd40b1b6a6b4b6ecf965e2.pdf', '0999999999', 'jetsunprincetorres@gmail.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-09-18 14:44:18', 'details are not legitimate', '2021-09-18 12:08:24', '2021-09-18 14:44:18'),
('14dda571-1086-11ec-82da-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Efren', '', 'Lazaro', '', '7ca673e4c5ff4e3d830e35bcac4e2d92.pdf', '123-546-6786', 'efren.lazaro@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:25:26', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:39:55', NULL, NULL, NULL, '2021-09-08 17:21:00', '2021-09-08 17:39:55'),
('2168107c-0e43-11ec-9e47-d8c497916dda', '2edf54f3-0e3c-11ec-9e47-d8c497916dda', 'Malika', '', 'Willms', 'Sr.', '57dc88b4fd4e448a9ccafaaa615fa500.pdf', '09234567892', 'malika.willms@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-06 13:30:26', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-06 13:31:29', NULL, NULL, NULL, '2021-09-05 20:16:42', '2021-09-06 13:31:30'),
('2794fc42-1086-11ec-82da-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Jose', '', 'Devera', '', '889c7fe65e4344a7bdf8235f06f42427.pdf', '234-567-9012', 'jose.devera@email.com', 'Hired', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:25:20', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:39:51', NULL, NULL, NULL, '2021-09-08 17:21:31', '2021-09-09 02:39:37'),
('303eb1be-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Herbert', 'Kenneth', 'Tillman', 'Jr.', '346e80148d8d42d3b58c789a9358f646.pdf', '09123456788', 'herbert.tillman@email.com', 'Rejected from screening', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:38:18', NULL, NULL, '0000-00-00 00:00:00', '2021-09-07 10:36:25', 'No enough information is provided.', '2021-09-05 19:55:39', '2021-09-07 10:36:25'),
('3edd726e-0e43-11ec-9e47-d8c497916dda', '2edf54f3-0e3c-11ec-9e47-d8c497916dda', 'Carole', '', 'Moen', 'III', '0aef3f80946f491897f53a88c00483c6.pdf', '771-475-203', 'carole.moen@email.com', 'For screening', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-06 13:30:20', NULL, NULL, NULL, NULL, NULL, '2021-09-05 20:17:32', '2021-09-06 13:30:21'),
('4f4a3571-1086-11ec-82da-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Crisanto', 'Esteban', 'Cortez', '', '2be0c663a81d407f8f241f8c178763b6.pdf', '345-678-0123', 'crisanto.cortez@email.com', 'Onboarding', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:23:58', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:39:48', NULL, NULL, NULL, '2021-09-08 17:22:38', '2021-09-21 13:06:21'),
('5ad08512-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Domenica', '', 'Considine', '', 'a453f95718e140f88d6fb9cc7eb62ef7.pdf', '0987654322', 'domenica.considine@email.com', 'For screening', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:38:12', NULL, NULL, NULL, NULL, NULL, '2021-09-05 19:56:50', '2021-09-05 20:38:12'),
('64a97f1f-1086-11ec-82da-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Sherwin', 'Romero', 'Mariano', '', '968dfedcddf04444afe862e9f754f1d3.pdf', '321-543-6543', 'sherwin.mariano@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:23:53', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:39:43', NULL, NULL, NULL, '2021-09-08 17:23:14', '2021-09-08 17:39:43'),
('7e316a7c-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Hilario', 'Matanong', 'Gleason', '', 'e6d1fccb57aa4d3d85edeef9575440e3.pdf', '0987654323', 'hilario.gleason@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:38:09', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:48:47', NULL, NULL, NULL, '2021-09-05 19:57:49', '2021-09-05 20:48:47'),
('88ed65f4-0e3f-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Colin', '', 'Kozey', '', 'f4a49f92e626446b80e6a9f92440bba1.pdf', '09000000003', 'colin.kozey@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:25:33', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:52', NULL, NULL, NULL, '2021-09-05 19:50:58', '2021-09-08 21:48:52'),
('8965c6b8-183d-11ec-ae82-6c626d3a5d34', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Jetsun Prince', '', 'Torres', '', '847c3530a1a540a39ed82f34aa2ddb19.pdf', '099999999', 'jetsunprincetorres@gmail.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-09-18 14:43:41', 'Details are not legitimate', '2021-09-18 13:01:51', '2021-09-18 14:43:41'),
('8e2e44b6-183e-11ec-ae82-6c626d3a5d34', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Jetsun Prince', '', 'Torres', '', 'd49dd8c05eaa41729e202b56eebbd27f.pdf', '09065645312', 'jetsunprincetorres@gmail.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-09-18 14:43:07', 'Details are not legitimate', '2021-09-18 13:09:09', '2021-09-18 14:43:07'),
('965bfcce-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Daisha', '', 'Bruen', '', '0a8349875c1446be8811ff0bec41b444.pdf', '0998765432', 'daisha.bruen@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:38:06', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:48:42', NULL, NULL, NULL, '2021-09-05 19:58:30', '2021-09-05 20:48:42'),
('9a862a66-1836-11ec-ae82-6c626d3a5d34', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Juan', '', 'Dela Cruz', '', 'b0684e8ea4a345228112c427ad5a1484.pdf', '0999999999', 'jetsunprincetorres@gmail.com', 'Rejected from evaluation', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2021-09-18 14:44:07', 'Details are not legitimate', '2021-09-18 12:12:14', '2021-09-18 14:44:07'),
('b33f2854-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Colleen', '', 'Shanahan', '', '3ed21106c49f4cae8ce9eb3b564828b4.pdf', '09123456777', 'colleen.shanahan@email.com', 'Rejected from interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:38:03', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:48:37', '0000-00-00 00:00:00', '2021-09-09 02:54:06', 'Not satisfied in interview', '2021-09-05 19:59:18', '2021-09-09 02:54:08'),
('c0a37f16-0e3f-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Evan', '', 'Breitenberg', 'III', '742de456d9374204a1da83954e2e18f0.pdf', '0900000004', 'evan.breitenberg@email.com', 'For screening', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:25:12', NULL, NULL, NULL, NULL, NULL, '2021-09-05 19:52:31', '2021-09-08 17:25:12'),
('c0d96d35-1085-11ec-82da-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Noriel', 'Pachica', 'Padrogane', '', '14f4866f3a744cc18c71312d87079f20.pdf', '09345678535', 'noriel.padrogane@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-08 17:18:39', '2021-09-08 17:18:39'),
('ce454f34-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Manuel', '', 'Cassin', 'Jr.', 'f324ec93acec47ceb76af3f3e3db42d3.pdf', '097867564532', 'manuel.cassin@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:38:00', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:48:30', NULL, NULL, NULL, '2021-09-05 20:00:04', '2021-09-05 20:48:31'),
('d6c5c741-0e3f-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Joana Monique', 'Padrogane', 'Torres', '', '49e677cd28e54ae38ac355497d571f47.pdf', '09123456789', 'jam@email.com', 'For evaluation', '73d29fff-0e34-11ec-9e47-d8c497916dda', NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-05 19:53:09', '2021-09-05 20:37:51'),
('e54b7795-0e40-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Caesar', '', 'Harris', '', 'af0beec4635d406ea409910971330691.pdf', '093456783567', 'caesar.harris@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:37:26', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 20:48:18', NULL, NULL, NULL, '2021-09-05 20:00:42', '2021-09-05 20:48:24'),
('ecc3f89a-0e42-11ec-9e47-d8c497916dda', '2edf54f3-0e3c-11ec-9e47-d8c497916dda', 'Blake', 'Clinton', 'Moen', '', 'd8398aa9defa440c973e8771efa7cd29.pdf', '09234567891', 'blake.moen@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-05 20:15:14', '2021-09-05 20:15:14'),
('f3a9bd0d-0e3d-11ec-9e47-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', 'Dovie', '', 'Reichert', '', 'bb6f4090e2cc4c63897d77839542e248.pdf', '09000000001', 'dovie.rechert@email.com', 'For screening', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:32:41', NULL, NULL, NULL, NULL, NULL, '2021-09-05 19:39:38', '2021-09-08 17:32:41'),
('ffc1ec5b-0e42-11ec-9e47-d8c497916dda', '2edf54f3-0e3c-11ec-9e47-d8c497916dda', 'Shayna', '', 'Trantow', '', 'c7bccec57f2048a88600a5b43d0450a9.pdf', '09765432198', 'shayna.trantow@email.com', 'For interview', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-06 13:30:31', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-06 13:31:34', NULL, NULL, NULL, '2021-09-05 20:15:46', '2021-09-06 13:31:34');

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
('6783f999-0e30-11ec-9e47-d8c497916dda', 'Intensive Care Unit Department', 'Intensive Care Unit Department', '2021-09-05 18:02:39', '2021-09-05 18:02:39'),
('6bc113b2-0e31-11ec-9e47-d8c497916dda', 'Outpatient Department', 'Outpatient Department', '2021-09-05 18:09:56', '2021-09-05 18:09:56'),
('ad2a6756-0e2f-11ec-9e47-d8c497916dda', 'Human Resource Department', 'Human Resource Department', '2021-09-05 17:57:27', '2021-09-05 17:57:27');

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
('7c8731f5-0fcc-11ec-9785-d8c497916dda', 'ce454f34-0e40-11ec-9e47-d8c497916dda', '7c0545c1-0fcc-11ec-9785-d8c497916dda', 1, '2021-09-08 18:44:32', NULL, '2021-09-07 19:12:27', '2021-09-08 18:44:33'),
('7c940dd7-0fcc-11ec-9785-d8c497916dda', 'b33f2854-0e40-11ec-9e47-d8c497916dda', '7c0545c1-0fcc-11ec-9785-d8c497916dda', 1, '2021-09-08 21:42:12', NULL, '2021-09-07 19:12:27', '2021-09-08 21:42:14'),
('da2a78e7-1088-11ec-82da-d8c497916dda', '14dda571-1086-11ec-82da-d8c497916dda', 'd9f5a379-1088-11ec-82da-d8c497916dda', 1, '2021-09-08 21:44:44', NULL, '2021-09-08 17:40:50', '2021-09-08 21:44:47'),
('da576eeb-1088-11ec-82da-d8c497916dda', '2794fc42-1086-11ec-82da-d8c497916dda', 'd9f5a379-1088-11ec-82da-d8c497916dda', 1, '2021-09-08 21:48:20', NULL, '2021-09-08 17:40:50', '2021-09-08 21:48:21'),
('da7057bf-1088-11ec-82da-d8c497916dda', '4f4a3571-1086-11ec-82da-d8c497916dda', 'd9f5a379-1088-11ec-82da-d8c497916dda', 1, '2021-09-10 22:43:17', NULL, '2021-09-08 17:40:50', '2021-09-10 22:43:17'),
('da894e3f-1088-11ec-82da-d8c497916dda', '64a97f1f-1086-11ec-82da-d8c497916dda', 'd9f5a379-1088-11ec-82da-d8c497916dda', NULL, NULL, NULL, '2021-09-08 17:40:50', '2021-09-08 17:40:50'),
('efead62f-0f32-11ec-8a15-d8c497916dda', '7e316a7c-0e40-11ec-9e47-d8c497916dda', 'ef9ad695-0f32-11ec-8a15-d8c497916dda', NULL, NULL, NULL, '2021-09-07 00:53:18', '2021-09-07 00:53:18'),
('efffc5f2-0f32-11ec-8a15-d8c497916dda', '965bfcce-0e40-11ec-9e47-d8c497916dda', 'ef9ad695-0f32-11ec-8a15-d8c497916dda', NULL, NULL, NULL, '2021-09-07 00:53:19', '2021-09-07 00:53:19');

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
('05667517-0f1e-11ec-8a15-d8c497916dda', 'What are your strengths and weaknesses?', 'General', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-06 22:23:35', '2021-09-06 22:23:35'),
('6df71687-10ab-11ec-82da-d8c497916dda', 'What do we expect from you if we hire you?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:21', '2021-09-08 21:48:21'),
('6e1d354a-10ab-11ec-82da-d8c497916dda', 'What qualities do you have that makes you unique from the others?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:21', '2021-09-08 21:48:21'),
('6ff2680d-1245-11ec-bceb-d8c497916dda', 'What are your experiences and skills that makes you fit for this job?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:43:18', '2021-09-10 22:43:18'),
('72b66d84-1a8e-11ec-858d-6c626d3a5d34', 'Test', 'General', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-21 11:46:05', '2021-09-21 11:46:05'),
('92e9ffc0-10aa-11ec-82da-d8c497916dda', 'What we are going to expect if we are going to hire you?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:13', '2021-09-08 21:42:13'),
('93d0c2ae-10aa-11ec-82da-d8c497916dda', 'How do you see yourself in 10 years?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:15', '2021-09-08 21:42:15'),
('c06a3599-0f26-11ec-8a15-d8c497916dda', 'What are your hobbies?', 'General', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-06 23:26:05', '2021-09-06 23:26:05'),
('c0c48e1d-1091-11ec-82da-d8c497916dda', 'Why should we hire you?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 18:44:33', '2021-09-08 18:44:33'),
('ed59ed93-10aa-11ec-82da-d8c497916dda', 'What are your experiences that fits you for this job?', 'Added', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:44:45', '2021-09-08 21:44:45'),
('f89c3eed-0f1d-11ec-8a15-d8c497916dda', 'Tell me about yourself.', 'General', '4c915545-0e34-11ec-9e47-d8c497916dda', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-06 22:23:14', '2021-09-06 22:23:14');

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
('7c0545c1-0fcc-11ec-9785-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', '2021-10-25', '09:15:00', '14:15:00', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-07 19:12:27', '2021-09-07 19:12:27'),
('d9f5a379-1088-11ec-82da-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', '2021-12-15', '13:00:00', '15:00:00', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 17:40:50', '2021-09-08 17:40:50'),
('ef9ad695-0f32-11ec-8a15-d8c497916dda', '8758886f-0e3d-11ec-9e47-d8c497916dda', '2021-09-08', '09:30:00', '11:30:00', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-07 00:53:18', '2021-09-07 00:53:18');

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
('6d5963be-10ab-11ec-82da-d8c497916dda', 'da576eeb-1088-11ec-82da-d8c497916dda', '05667517-0f1e-11ec-8a15-d8c497916dda', 99.25, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:20', '2021-09-08 21:48:20'),
('6d8102e3-10ab-11ec-82da-d8c497916dda', 'da576eeb-1088-11ec-82da-d8c497916dda', 'c06a3599-0f26-11ec-8a15-d8c497916dda', 98.25, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:20', '2021-09-08 21:48:20'),
('6d960722-10ab-11ec-82da-d8c497916dda', 'da576eeb-1088-11ec-82da-d8c497916dda', 'f89c3eed-0f1d-11ec-8a15-d8c497916dda', 99.75, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:20', '2021-09-08 21:48:20'),
('6e78b74d-10ab-11ec-82da-d8c497916dda', 'da576eeb-1088-11ec-82da-d8c497916dda', '6df71687-10ab-11ec-82da-d8c497916dda', 98, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:22', '2021-09-08 21:48:22'),
('6eb34147-10ab-11ec-82da-d8c497916dda', 'da576eeb-1088-11ec-82da-d8c497916dda', '6e1d354a-10ab-11ec-82da-d8c497916dda', 97.5, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:48:22', '2021-09-08 21:48:22'),
('6f692ab2-1245-11ec-bceb-d8c497916dda', 'da7057bf-1088-11ec-82da-d8c497916dda', '05667517-0f1e-11ec-8a15-d8c497916dda', 98, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:43:17', '2021-09-10 22:43:17'),
('6fa668a0-1245-11ec-bceb-d8c497916dda', 'da7057bf-1088-11ec-82da-d8c497916dda', 'f89c3eed-0f1d-11ec-8a15-d8c497916dda', 97, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:43:17', '2021-09-10 22:43:17'),
('6fbcc179-1245-11ec-bceb-d8c497916dda', 'da7057bf-1088-11ec-82da-d8c497916dda', 'c06a3599-0f26-11ec-8a15-d8c497916dda', 97, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:43:17', '2021-09-10 22:43:17'),
('9275ba56-10aa-11ec-82da-d8c497916dda', '7c940dd7-0fcc-11ec-9785-d8c497916dda', '05667517-0f1e-11ec-8a15-d8c497916dda', 92, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:12', '2021-09-08 21:42:12'),
('9344d852-10aa-11ec-82da-d8c497916dda', '7c940dd7-0fcc-11ec-9785-d8c497916dda', 'f89c3eed-0f1d-11ec-8a15-d8c497916dda', 93, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:14', '2021-09-08 21:42:14'),
('93c2febe-10aa-11ec-82da-d8c497916dda', '7c940dd7-0fcc-11ec-9785-d8c497916dda', 'c06a3599-0f26-11ec-8a15-d8c497916dda', 92, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:15', '2021-09-08 21:42:15'),
('93de4cca-10aa-11ec-82da-d8c497916dda', '7c940dd7-0fcc-11ec-9785-d8c497916dda', '92e9ffc0-10aa-11ec-82da-d8c497916dda', 92, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:15', '2021-09-08 21:42:15'),
('93f962d0-10aa-11ec-82da-d8c497916dda', '7c940dd7-0fcc-11ec-9785-d8c497916dda', '93d0c2ae-10aa-11ec-82da-d8c497916dda', 95, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:42:15', '2021-09-08 21:42:15'),
('c06065a7-1091-11ec-82da-d8c497916dda', '7c8731f5-0fcc-11ec-9785-d8c497916dda', '05667517-0f1e-11ec-8a15-d8c497916dda', 97, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 18:44:32', '2021-09-08 18:44:32'),
('c09490ce-1091-11ec-82da-d8c497916dda', '7c8731f5-0fcc-11ec-9785-d8c497916dda', 'c06a3599-0f26-11ec-8a15-d8c497916dda', 94, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 18:44:32', '2021-09-08 18:44:32'),
('c0da72c7-1091-11ec-82da-d8c497916dda', '7c8731f5-0fcc-11ec-9785-d8c497916dda', 'f89c3eed-0f1d-11ec-8a15-d8c497916dda', 96, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 18:44:33', '2021-09-08 18:44:33'),
('c0ff7f03-1091-11ec-82da-d8c497916dda', '7c8731f5-0fcc-11ec-9785-d8c497916dda', 'c0c48e1d-1091-11ec-82da-d8c497916dda', 91, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 18:44:33', '2021-09-08 18:44:33'),
('ed0e0491-10aa-11ec-82da-d8c497916dda', 'da2a78e7-1088-11ec-82da-d8c497916dda', '05667517-0f1e-11ec-8a15-d8c497916dda', 97.25, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:44:44', '2021-09-08 21:44:44'),
('ed1f24c9-10aa-11ec-82da-d8c497916dda', 'da2a78e7-1088-11ec-82da-d8c497916dda', 'c06a3599-0f26-11ec-8a15-d8c497916dda', 95.25, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:44:45', '2021-09-08 21:44:45'),
('ed2f9926-10aa-11ec-82da-d8c497916dda', 'da2a78e7-1088-11ec-82da-d8c497916dda', 'f89c3eed-0f1d-11ec-8a15-d8c497916dda', 96.75, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:44:45', '2021-09-08 21:44:45'),
('eef73932-10aa-11ec-82da-d8c497916dda', 'da2a78e7-1088-11ec-82da-d8c497916dda', 'ed59ed93-10aa-11ec-82da-d8c497916dda', 95.5, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-08 21:44:48', '2021-09-08 21:44:48');

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
('15aac437-0e3c-11ec-9e47-d8c497916dda', '5e55b5a4-0e3a-11ec-9e47-d8c497916dda', 0, '<p><b>Job Description</b></p><div style=\"line-height: 19px;\"><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', '2021-11-27 00:00:00', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:26:16', '2021-09-05 19:26:16'),
('2edf54f3-0e3c-11ec-9e47-d8c497916dda', '24f1a65d-0e3a-11ec-9e47-d8c497916dda', 1, '<p><span style=\"font-weight: bolder;\">Job Description</span></p><div style=\"line-height: 19px;\"><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', NULL, '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:26:58', '2021-09-05 19:26:58'),
('577d86d3-0e3d-11ec-9e47-d8c497916dda', '2416aff2-0e39-11ec-9e47-d8c497916dda', 0, '<p><span style=\"font-weight: bolder;\">Job Description</span></p><div style=\"line-height: 19px;\"><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', '2021-09-05 20:20:00', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:35:16', '2021-09-05 20:19:17'),
('6c65c0f1-0e3d-11ec-9e47-d8c497916dda', 'f326d63f-0e38-11ec-9e47-d8c497916dda', 1, '<p><span style=\"font-weight: bolder;\">Job Description</span></p><div style=\"line-height: 19px;\"><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', NULL, '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:35:51', '2021-09-05 19:35:51'),
('8758886f-0e3d-11ec-9e47-d8c497916dda', 'd67fc838-0e37-11ec-9e47-d8c497916dda', 1, '<p><span style=\"font-weight: bolder;\">Job Description</span></p><div style=\"line-height: 19px;\"><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', '2021-12-25 12:00:00', '73d29fff-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:36:36', '2021-09-05 19:36:36');

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
  `added_by` varchar(36) NOT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `onboarding_employees`
--

INSERT INTO `onboarding_employees` (`onboarding_employee_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `contact_number`, `email`, `position_id`, `employment_start_date`, `added_by`, `updated_by`, `created_at`, `updated_at`) VALUES
('a94ee075-1a99-11ec-858d-6c626d3a5d34', 'Crisanto', 'Esteban', 'Cortez', '', '345-678-0123', 'crisanto.cortez@email.com', '088704a8-0e31-11ec-9e47-d8c497916dda', '2021-09-01', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2021-09-21 13:06:21', '2021-09-21 13:06:21');

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
('a966d2b0-1a99-11ec-858d-6c626d3a5d34', 'a94ee075-1a99-11ec-858d-6c626d3a5d34', '86c41699-1244-11ec-bceb-d8c497916dda', '2021-09-22 13:04:00', '2021-10-29 13:04:00', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'Pending', NULL, NULL, '2021-09-21 13:06:21', '2021-09-21 13:06:21'),
('a9713ba2-1a99-11ec-858d-6c626d3a5d34', 'a94ee075-1a99-11ec-858d-6c626d3a5d34', '94a28ca4-1240-11ec-bceb-d8c497916dda', '2021-10-31 13:04:00', '2021-11-01 13:04:00', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'Pending', NULL, NULL, '2021-09-21 13:06:21', '2021-09-21 13:06:21'),
('a979e124-1a99-11ec-858d-6c626d3a5d34', 'a94ee075-1a99-11ec-858d-6c626d3a5d34', '9fa04811-1244-11ec-bceb-d8c497916dda', '2021-10-01 13:04:00', '2021-11-02 13:04:00', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'Pending', NULL, NULL, '2021-09-21 13:06:21', '2021-09-21 13:06:21');

-- --------------------------------------------------------

--
-- Table structure for table `onboarding_tasks`
--

CREATE TABLE `onboarding_tasks` (
  `onboarding_task_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `task_type` varchar(255) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `added_by` varchar(36) NOT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `onboarding_tasks`
--

INSERT INTO `onboarding_tasks` (`onboarding_task_id`, `title`, `description`, `task_type`, `department_id`, `added_by`, `updated_by`, `created_at`, `updated_at`) VALUES
('86b2e2c9-1321-11ec-93c0-d8c497916dda', 'Get all necessary files and information of onboarding employee', 'Get all necessary files and information of onboarding employee', 'Added', '6783f999-0e30-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2021-09-12 00:58:45', '2021-09-12 00:58:45'),
('86c41699-1244-11ec-bceb-d8c497916dda', 'Introduce the rules, regulations, and policies', 'Introduce the rules, regulations, and policies of organization and ICU department to new onboarding employee', 'General', '6783f999-0e30-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:36:46', '2021-09-10 22:36:46'),
('94a28ca4-1240-11ec-bceb-d8c497916dda', 'Welcoming the new onboarding employee', 'Welcoming the new onboarding employee to all staffs and employees of the ICU department', 'General', '6783f999-0e30-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:08:32', '2021-09-10 22:08:32'),
('9fa04811-1244-11ec-bceb-d8c497916dda', 'Assign work for first day', 'Assign work for first day', 'General', '6783f999-0e30-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2021-09-10 22:37:28', '2021-09-10 22:37:28'),
('a9812550-1a99-11ec-858d-6c626d3a5d34', 'Test', 'test', 'Added', '6783f999-0e30-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2021-09-21 13:06:21', '2021-09-21 13:06:21');

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
('088704a8-0e31-11ec-9e47-d8c497916dda', '6783f999-0e30-11ec-9e47-d8c497916dda', 'Physiotherapist', 'Physiotherapist', '2021-09-05 18:07:10', '2021-09-05 18:07:10'),
('152b7f25-0e31-11ec-9e47-d8c497916dda', '6783f999-0e30-11ec-9e47-d8c497916dda', 'Dietician', 'Dietician', '2021-09-05 18:07:31', '2021-09-05 18:07:31'),
('189aa20f-0e30-11ec-9e47-d8c497916dda', 'ad2a6756-0e2f-11ec-9e47-d8c497916dda', 'Department Head', 'Department Head', '2021-09-05 18:00:27', '2021-09-05 18:00:27'),
('2669d2de-0e31-11ec-9e47-d8c497916dda', '6783f999-0e30-11ec-9e47-d8c497916dda', 'Nurse', 'Nurse', '2021-09-05 18:08:00', '2021-09-05 18:08:00'),
('29014583-0e30-11ec-9e47-d8c497916dda', 'ad2a6756-0e2f-11ec-9e47-d8c497916dda', 'Hiring Manager', 'Hiring Manager', '2021-09-05 18:00:55', '2021-09-05 18:00:55'),
('2e22682c-0e31-11ec-9e47-d8c497916dda', '6783f999-0e30-11ec-9e47-d8c497916dda', 'ICU Doctor', 'ICU Doctor', '2021-09-05 18:08:13', '2021-09-05 18:08:13'),
('4a0d886d-0e30-11ec-9e47-d8c497916dda', 'ad2a6756-0e2f-11ec-9e47-d8c497916dda', 'Recruiter', 'Recruiter', '2021-09-05 18:01:50', '2021-09-05 18:01:50'),
('7de3176d-0e31-11ec-9e47-d8c497916dda', '6bc113b2-0e31-11ec-9e47-d8c497916dda', 'Department Head', 'Department Head', '2021-09-05 18:10:26', '2021-09-05 18:10:26'),
('b5d7cba3-0e30-11ec-9e47-d8c497916dda', '6783f999-0e30-11ec-9e47-d8c497916dda', 'Department Head', 'Department Head', '2021-09-05 18:04:51', '2021-09-05 18:04:51'),
('cc4aa842-0e30-11ec-9e47-d8c497916dda', '6783f999-0e30-11ec-9e47-d8c497916dda', 'Physician', 'Physician', '2021-09-05 18:05:29', '2021-09-05 18:05:29'),
('d51aea88-0e31-11ec-9e47-d8c497916dda', '6bc113b2-0e31-11ec-9e47-d8c497916dda', 'OPD Nurse', 'OPD Nurse', '2021-09-05 18:12:53', '2021-09-05 18:12:53'),
('e9e353ff-0e31-11ec-9e47-d8c497916dda', '6bc113b2-0e31-11ec-9e47-d8c497916dda', 'Doctor', 'Doctor', '2021-09-05 18:13:28', '2021-09-05 18:13:28');

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
  `deadline` datetime DEFAULT NULL,
  `reviewed_by` varchar(36) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requisitions`
--

INSERT INTO `requisitions` (`requisition_id`, `requested_by`, `position_id`, `employment_type`, `request_nature`, `staffs_needed`, `min_monthly_salary`, `max_monthly_salary`, `content`, `request_status`, `deadline`, `reviewed_by`, `reviewed_at`, `completed_at`, `remarks`, `created_at`, `updated_at`) VALUES
('0736bdfa-0e39-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2669d2de-0e31-11ec-9e47-d8c497916dda', 'Part Time', 'New/Addition', 5, NULL, NULL, '<div style=\"line-height: 19px;\"><div><span style=\"font-weight: bolder;\">From:&nbsp;</span><span style=\"font-weight: bolder; font-size: 1rem;\">ICU Department</span></div><div>September 32, 2021</div><div><br></div><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'For Review', '2022-01-31 13:00:00', NULL, NULL, NULL, NULL, '2021-09-05 19:04:23', '2021-09-05 19:04:23'),
('2416aff2-0e39-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '152b7f25-0e31-11ec-9e47-d8c497916dda', 'Part Time', 'Replacement', 1, NULL, NULL, '<div style=\"line-height: 19px;\"><div><span style=\"font-weight: bolder;\">From:&nbsp;</span><span style=\"font-weight: bolder; font-size: 1rem;\">ICU Department</span></div><div>September 32, 2021</div><div><br></div><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'Approved', NULL, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:23:41', NULL, NULL, '2021-09-05 19:05:12', '2021-09-05 19:23:41'),
('24f1a65d-0e3a-11ec-9e47-d8c497916dda', '2235a47a-0e35-11ec-9e47-d8c497916dda', 'd51aea88-0e31-11ec-9e47-d8c497916dda', 'Full Time', 'New/Addition', 5, 15600, 45700, '<div style=\"line-height: 19px;\"><div><span style=\"font-weight: bolder;\">From: OPD</span><span style=\"font-weight: bolder; font-size: 1rem;\">&nbsp;Department</span></div><div>September 32, 2021</div><div><br></div><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'Approved', NULL, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:23:54', NULL, NULL, '2021-09-05 19:12:23', '2021-09-05 19:23:54'),
('5e55b5a4-0e3a-11ec-9e47-d8c497916dda', '2235a47a-0e35-11ec-9e47-d8c497916dda', 'e9e353ff-0e31-11ec-9e47-d8c497916dda', 'Full Time', 'New/Addition', 2, NULL, NULL, '<div style=\"line-height: 19px;\"><div><span style=\"font-weight: bolder;\">From: OPD</span><span style=\"font-weight: bolder; font-size: 1rem;\">&nbsp;Department</span></div><div>August 1, 2021</div><div><br></div><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'Approved', '2021-11-30 23:59:00', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:24:10', NULL, NULL, '2021-09-05 19:13:59', '2021-09-05 19:24:10'),
('aaa4b28d-0e3a-11ec-9e47-d8c497916dda', '2235a47a-0e35-11ec-9e47-d8c497916dda', '7de3176d-0e31-11ec-9e47-d8c497916dda', 'Full Time', 'Replacement', 1, NULL, NULL, '<div style=\"line-height: 19px;\"><div><span style=\"font-weight: bolder;\">From: OPD</span><span style=\"font-weight: bolder; font-size: 1rem;\">&nbsp;Department</span></div><div>September 32, 2021</div><div><br></div><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'Rejected', NULL, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:23:22', NULL, 'Invalid request', '2021-09-05 19:16:07', '2021-09-05 19:23:22'),
('d67fc838-0e37-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '088704a8-0e31-11ec-9e47-d8c497916dda', 'Full Time', 'New/Addition', 3, 18000, 25000, '<div style=\"line-height: 19px;\"><div style=\"\"><b>From:&nbsp;</b><b style=\"font-size: 1rem;\">ICU Department</b></div><div style=\"\">September 32, 2021</div><div style=\"\"><br></div><div style=\"\">Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div style=\"\"><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy </li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\"><tbody><tr><td style=\"text-align: center; \"><b>Doloris</b></td><td style=\"text-align: center; \"><b>Consectetura</b></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><b>Qualifications</b></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'Approved', '2022-01-01 12:01:00', '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:23:47', NULL, NULL, '2021-09-05 18:55:52', '2021-09-05 19:23:47'),
('f326d63f-0e38-11ec-9e47-d8c497916dda', 'e025248c-0e34-11ec-9e47-d8c497916dda', '2e22682c-0e31-11ec-9e47-d8c497916dda', 'Full Time', 'New/Addition', 1, 50000, 98000, '<div style=\"line-height: 19px;\"><div><span style=\"font-weight: bolder;\">From:&nbsp;</span><span style=\"font-weight: bolder; font-size: 1rem;\">ICU Department</span></div><div>December 32, 2021</div><div><br></div><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div><table class=\"table table-bordered\" style=\"width: 629px; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255);\"><tbody><tr><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Doloris</span></td><td style=\"text-align: center;\"><span style=\"font-weight: bolder;\">Consectetura</span></td></tr><tr><td>Maet consectetur di amet&nbsp;<br></td><td>defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></td></tr><tr><td>Hetsu suisof leosf defarut<br></td><td>qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf<br></td></tr></tbody></table><div style=\"line-height: 19px;\"><p><br></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ol><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ol><div>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk</div><div><br></div><p><span style=\"font-weight: bolder;\"><br></span></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span><br></p><p>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy qhetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs hkhk<br></p><ul><li>Lorem ipsum dolor si maet consectetur di amet si di amos conse tempore hiluna opnaund duej ksugwy</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li><li>Hetsu suisof leosf defarut em uns teuns pors wuofs fg dshf kshd ksdh shfgnd oeutbd od fdf skfngms sfhs</li><li>Isurb triqo ploi fisb jasjas wydls awhfls doleo ex ea motaild</li></ul></div>', 'Approved', NULL, '4c915545-0e34-11ec-9e47-d8c497916dda', '2021-09-05 19:24:20', NULL, NULL, '2021-09-05 19:03:50', '2021-09-05 19:24:20');

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
('2235a47a-0e35-11ec-9e47-d8c497916dda', 'Eleanora', NULL, 'Baumbach', NULL, '7de3176d-0e31-11ec-9e47-d8c497916dda', 'opd_manager@email.com', '$2b$12$xgz1CzdGsRrYNNFxmZdXPuG04JLgCCiUmE.xwbTgACjxC7.ibxxC2', 'Department Manager', '2021-09-05 18:36:31', '2021-09-05 18:36:31'),
('28452e4a-0e34-11ec-9e47-d8c497916dda', 'Jetsun Prince', 'Padrogane', 'Torres', NULL, '189aa20f-0e30-11ec-9e47-d8c497916dda', 'hr_head@email.com', '$2b$12$R89UgYBzXRP7OGqh3nmbOub73S1kq44CZNskJgGP4J9Ipey/Yptbq', 'Department Manager', '2021-09-05 18:29:31', '2021-09-05 18:29:31'),
('4c915545-0e34-11ec-9e47-d8c497916dda', 'Vanessah', 'Ogatis', 'Buenaventura', NULL, '29014583-0e30-11ec-9e47-d8c497916dda', 'hr_manager@email.com', '$2b$12$Rm50zwgoqRM1rKO/2nhSb.414rxvufarO99y65hgcvI.PWe/y57/K', 'Hiring Manager', '2021-09-05 18:30:32', '2021-09-05 18:30:32'),
('73d29fff-0e34-11ec-9e47-d8c497916dda', 'Neil', NULL, 'Concepcion', NULL, '4a0d886d-0e30-11ec-9e47-d8c497916dda', 'hr_recruiter@email.com', '$2b$12$2BVdljHII/Tydini9cNWquv1j0iCRqquOmBMXGG0/bKb/PEpj534e', 'Recruiter', '2021-09-05 18:31:38', '2021-09-05 18:31:38'),
('e025248c-0e34-11ec-9e47-d8c497916dda', 'Carlos', NULL, 'Del Mundo', 'Jr.', 'b5d7cba3-0e30-11ec-9e47-d8c497916dda', 'icu_manager@email.com', '$2b$12$vkKnquqyTxjCZfKxpcfOgeTxbgiixqPd7xuDQ.Hhq5iPnZsOvIfKK', 'Department Manager', '2021-09-05 18:34:40', '2021-09-05 18:34:40');

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
  ADD KEY `screened_by` (`screened_by`);

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
  ADD KEY `position_id` (`position_id`),
  ADD KEY `added_by` (`added_by`),
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
-- Constraints for table `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `applicants_ibfk_1` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`job_post_id`),
  ADD CONSTRAINT `applicants_ibfk_2` FOREIGN KEY (`evaluated_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `applicants_ibfk_3` FOREIGN KEY (`screened_by`) REFERENCES `users` (`user_id`);

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
  ADD CONSTRAINT `onboarding_employees_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`),
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
