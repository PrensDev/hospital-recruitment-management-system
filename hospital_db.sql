-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2021 at 06:37 AM
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
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `applicant_id` varchar(36) NOT NULL,
  `job_post_id` varchar(36) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix_name` varchar(255) DEFAULT NULL,
  `resume` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `evaluated_by` varchar(36) DEFAULT NULL,
  `screened_by` varchar(36) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`applicant_id`, `job_post_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `resume`, `contact_number`, `email`, `status`, `evaluated_by`, `screened_by`, `remarks`, `created_at`, `updated_at`) VALUES
('8323a74a-0665-11ec-a443-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Michelle', NULL, 'Bancifra', '', 'resume.pdf', '+639999999999', 'michellebancifra@email.com', 'Rejected from evaluation', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', NULL, 'Not enough information is provided', '2021-08-26 20:02:40', '2021-08-28 10:26:55'),
('ad4aeed9-063b-11ec-a443-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Mark Angel', NULL, 'Monterde', '', 'resume.pdf', '+639999999999', 'markangel@email.com', 'For screening', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', NULL, NULL, '2021-08-26 15:03:12', '2021-08-28 10:27:12'),
('bd471e7f-07a7-11ec-92bc-d8c497916dda', 'ba6c45a5-04f6-11ec-bebb-d8c497916dda', 'Maria', 'Dela Paz', 'Mercedez', '', 'resume.pdf', '09123456789', 'mariamercedez@email.com', 'For evaluation', NULL, NULL, NULL, '2021-08-28 10:29:15', '2021-08-28 10:29:15'),
('ed952c62-07a7-11ec-92bc-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Juan', '', 'Dela Cruz', 'Jr.', 'resume.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, '2021-08-28 10:30:36', '2021-08-28 10:30:36');

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
-- Table structure for table `interviewees`
--

CREATE TABLE `interviewees` (
  `interviewee_id` varchar(36) NOT NULL,
  `applicant_id` varchar(36) NOT NULL,
  `interview_schedule_id` varchar(36) DEFAULT NULL,
  `is_interviewed` tinyint(1) DEFAULT NULL,
  `interviewed_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `interview_schedules`
--

CREATE TABLE `interview_schedules` (
  `interview_schedule_id` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT NULL,
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
  `posted_by` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`job_post_id`, `requisition_id`, `salary_is_visible`, `content`, `expiration_date`, `posted_by`, `created_at`, `updated_at`) VALUES
('49b28e24-036b-11ec-9258-d8c497916dda', '0fbde148-0240-11ec-9ccc-d8c497916dda', 1, '<p><b>Qualifications</b></p><p>Lorem ipsum folot sit amet consect conset lore lorem sina<span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span></p><ul><li>Test Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul><p><br></p><p><b>Educational Attainment</b></p><p>Lorem ipsum folot sit amet consect conset lore lorem sina<span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum</span><b><br></b></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul>', '2021-10-22 00:00:00', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-08-23 01:06:27', '2021-08-26 15:58:57'),
('ba6c45a5-04f6-11ec-bebb-d8c497916dda', '2ffb8ef8-0230-11ec-9ccc-d8c497916dda', 0, '<p><b>Qualifications</b></p><p>Lorem impsum dolor&nbsp;<span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed.</span></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Test updates</li></ul><p><br></p><p><b>Educational Attainment</b></p><p>Lorem impsum dolor&nbsp;<span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed.</span><b><br></b></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul>', NULL, 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-08-25 00:17:07', '2021-08-27 14:03:41'),
('cc2f2dfc-07b6-11ec-92bc-d8c497916dda', '53854eed-07b1-11ec-92bc-d8c497916dda', 0, '<p><b>Responsibilities</b></p><p>This position will be responsible for the recruitment and management of the day to day activities of Hospital. Complete management of Resources Assistance (floaters) involving their scheduling, performance, management and recruitment, along with practice of groups to maintain legal assistant resources and recommending location of Resource Assistants to support each group.</p><p>Responsible fir all new <u>employee orientation</u>, <u>training</u>, and on-going training of legal assistants throughout the firm working with Hospital in-house trainer</p><p><br></p><p><b>Competencies</b></p><ul><li>Detail-oriented</li><li>Organized</li><li>Ability to successfully manage multiple relationship within the work environment</li><li>Creative</li></ul><p><br></p><p><b>Educational Attainment</b></p><ul><li>5 years of experience</li><li>Certificate in Human Resource Management</li><li>CHRP would be an asset</li></ul><p><br></p><p>For more information please contact us:</p><table class=\"table table-bordered\"><tbody><tr><td>Facebook</td><td>https://facebook.com/hospital</td></tr><tr><td>Email</td><td>hospital@email.com</td></tr></tbody></table><p><br></p>', NULL, 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-08-28 12:17:03', '2021-08-28 12:17:03');

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
  `deadline` datetime DEFAULT NULL,
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
('063fa6cf-0402-11ec-970c-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'Replacement', 10, NULL, NULL, '<p>dfgdfg</p>', 'For Review', '2021-09-14 00:00:00', NULL, NULL, NULL, NULL, '2021-08-23 19:05:28', '2021-08-23 19:05:28'),
('0fbde148-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Intern/OJT', 'Replacement', 4, 18000, 25000, '<p>dsfdsfsdf</p>', 'Approved', '2021-09-30 00:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:27:40', NULL, NULL, '2021-08-21 13:24:30', '2021-08-22 12:27:40'),
('1cc92c3f-002f-11ec-becb-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 1, 25000, 35000, 'Lorem impsum dolor sit amet', 'Rejected', '2021-08-29 14:14:51', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:28:02', NULL, 'OTHERS XD', '2021-08-18 22:18:08', '2021-08-22 12:28:02'),
('2ffb8ef8-0230-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 4, NULL, NULL, 'Lorem', 'Approved', '2021-08-21 03:24:04', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:01:24', NULL, NULL, '2021-08-21 11:30:52', '2021-08-22 12:01:27'),
('4494b176-07b2-11ec-92bc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'a1a89db0-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>sfg</p>', 'For Review', NULL, NULL, NULL, NULL, NULL, '2021-08-28 11:44:37', '2021-08-28 11:44:37'),
('53854eed-07b1-11ec-92bc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'ad7044a3-ff07-11eb-9644-d8c497916dda', 'Full Time', 'Replacement', 9, NULL, NULL, '<p>lorem ipsum dolor sit amet</p>', 'Approved', '2022-01-01 00:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-28 12:01:21', NULL, NULL, '2021-08-28 11:37:53', '2021-08-28 12:01:21'),
('9de5b6d9-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Part Time', 'Replacement', 5, 18000, 25000, '<p><b>Job Description</b></p><p>Lorem inpsum dolor sit amet consectetur.&nbsp;<span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.&nbsp;</span><span style=\"font-size: 1rem;\">Lorem inpsum dolor sit amet consectetur.</span></p>', 'For Review', '2021-10-01 00:00:00', NULL, NULL, NULL, NULL, '2021-08-21 13:28:29', '2021-08-21 13:28:29'),
('b2ea58f4-0725-11ec-98c4-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'ad7044a3-ff07-11eb-9644-d8c497916dda', 'Full Time', 'Replacement', 3, NULL, NULL, '<p>Lorem</p>', 'For Review', NULL, NULL, NULL, NULL, NULL, '2021-08-27 18:58:23', '2021-08-27 18:58:23'),
('c1e392c9-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Contract', 'Replacement', 6, 18000, 25000, '<p>sdfsd</p>', 'Rejected', '2021-10-30 00:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:02:31', NULL, 'TEST REJECT XD', '2021-08-21 13:29:29', '2021-08-22 12:02:31'),
('fa26f87d-01d2-11ec-b603-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Part Time', 'Replacement', 1, 12000, 18000, '<h1>Test</h1>', 'Approved', '2021-09-01 16:22:35', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:08:17', NULL, NULL, '2021-08-21 00:23:39', '2021-08-22 12:08:17');

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
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`applicant_id`),
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
-- Indexes for table `interview_schedules`
--
ALTER TABLE `interview_schedules`
  ADD PRIMARY KEY (`interview_schedule_id`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`job_post_id`),
  ADD KEY `requisition_id` (`requisition_id`),
  ADD KEY `posted_by` (`posted_by`);

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
-- Constraints for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `job_posts_ibfk_1` FOREIGN KEY (`requisition_id`) REFERENCES `requisitions` (`requisition_id`),
  ADD CONSTRAINT `job_posts_ibfk_2` FOREIGN KEY (`posted_by`) REFERENCES `users` (`user_id`);

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
