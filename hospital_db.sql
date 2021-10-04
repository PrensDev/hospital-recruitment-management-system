-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2021 at 04:46 PM
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
('e09ef8f4-251c-11ec-94e2-6c626d3a5d34', '83946187-1dd0-11ec-8b6c-6c626d3a5d34', 0, '<p>Test test test test test test t<span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">test test test test test t</span><span style=\"font-size: 1rem;\">est test test test test test</span></p>', NULL, '4a9f3e33-1f6f-11ec-affd-6c626d3a5d34', '2021-10-04 22:10:49', '2021-10-04 22:10:49');

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
('a7bbc44d-1b94-11ec-9d57-6c626d3a5d34', '649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'ICU Doctor', 'ICU Doctor', '2021-09-22 19:03:02', '2021-09-22 19:03:02'),
('b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', '649c149d-1b7a-11ec-9d57-6c626d3a5d34', 'ICU Nurse', 'ICU Nurse', '2021-09-22 19:03:24', '2021-09-22 19:03:24'),
('c36fa650-1b7a-11ec-9d57-6c626d3a5d34', '849a92b6-1b7a-11ec-9d57-6c626d3a5d34', 'Hiring Manager', 'Hiring Manager', '2021-09-22 15:57:42', '2021-09-22 15:57:42'),
('ce4245b3-1b7a-11ec-9d57-6c626d3a5d34', '849a92b6-1b7a-11ec-9d57-6c626d3a5d34', 'Recruiter', 'Recruiter', '2021-09-22 15:58:00', '2021-09-22 15:58:00'),
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
('4923c219-1ea6-11ec-afc6-6c626d3a5d34', 'REQ-KU0Z9BY9-W2GRA8', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 2, NULL, NULL, '<p>dfg</p>', 'For signature', '2021-12-01 16:46:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-26 16:46:48', '2021-09-26 16:46:48'),
('4c39aeb4-1f52-11ec-affd-6c626d3a5d34', 'REQ-KU279804-V1TI43', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'e45bdada-1b7a-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>se</p>', 'Rejected for signing', NULL, NULL, NULL, NULL, NULL, NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-09-27 13:29:15', 'Invalid request', '2021-09-27 13:18:06', '2021-09-27 13:29:15'),
('83946187-1dd0-11ec-8b6c-6c626d3a5d34', 'REQ-KTZGIL3R-BQF298', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'a7bbc44d-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p><b>From ICU Department</b></p><p>Lorem ipsum dolor sit amet consectetur&nbsp;<span style=\"text-align: justify;\">Se</span>d ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p><ul><li><span style=\"font-size: 1rem;\">Duis aute irure dolor in reprehenderit</span></li><li><span style=\"font-size: 1rem;\">Excepteur sint occaecat cupidatat non proident<br></span></li></ul><p><span style=\"font-size: 1rem;\">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><table class=\"table table-bordered\"><tbody><tr><td>&nbsp;dolorem ipsum quia<br></td><td>dolor<br></td><td>amet</td></tr><tr><td><span style=\"text-align: justify;\">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti</span><br></td><td>2</td><td>1</td></tr><tr><td><span style=\"text-align: justify;\">quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,&nbsp;</span><br></td><td>3</td><td>1</td></tr><tr><td><span style=\"text-align: justify;\">similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.&nbsp;</span><br></td><td>1</td><td>1</td></tr></tbody></table><p><span style=\"font-size: 1rem;\"> </span></p><p><span style=\"font-size: 1rem;\">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span><br></p><p><br></p>', 'Approved', '2021-09-30 15:16:00', '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-09-26 16:43:47', '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-09-27 16:25:31', NULL, NULL, '2021-09-26 16:42:48', NULL, '2021-09-25 15:16:33', '2021-09-27 16:25:31'),
('979886ec-1f69-11ec-affd-6c626d3a5d34', 'REQ-KU2D7PV0-J0KCIO', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'a7bbc44d-1b94-11ec-9d57-6c626d3a5d34', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>dsafsdfsdf</p>', 'For approval', NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-10-04 20:35:42', NULL, NULL, NULL, NULL, NULL, NULL, '2021-09-27 16:04:51', '2021-10-04 20:35:42'),
('a11891fe-1f69-11ec-affd-6c626d3a5d34', 'REQ-KU2D82VU-9VDIBK', '07431c30-1b87-11ec-9d57-6c626d3a5d34', 'b4ef84d2-1b94-11ec-9d57-6c626d3a5d34', 'Part Time', 'New/Addition', 3, NULL, NULL, '<p>sdfsdfdsf</p>', 'Rejected for approval', NULL, '3bbe4e8b-1b87-11ec-9d57-6c626d3a5d34', '2021-09-27 16:05:40', NULL, NULL, NULL, '6bfa042c-1b87-11ec-9d57-6c626d3a5d34', '2021-10-04 20:37:09', 'Request details is inaappropriate', '2021-09-27 16:05:07', '2021-10-04 20:37:09');

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
('4a9f3e33-1f6f-11ec-affd-6c626d3a5d34', 'Juliette', NULL, 'May', NULL, 'ce4245b3-1b7a-11ec-9d57-6c626d3a5d34', 'recruiter@email.com', '$2b$12$lJYHYha2KcHN0Cb/vIbGi.S9JK2m1H7jjunHIzdYO5uS3iw7RZ5dO', 'Recruiter', '2021-09-27 16:45:39', '2021-09-27 16:45:39'),
('6bfa042c-1b87-11ec-9d57-6c626d3a5d34', 'Warner', NULL, 'Olson', NULL, 'c36fa650-1b7a-11ec-9d57-6c626d3a5d34', 'hr_manager@email.com', '$2b$12$hJFiP9cJ8hI529lN9rEvBuYVmxwO/Ft16MK7QG/F2VECEzW8s/dZO', 'Hiring Manager', '2021-09-22 17:28:18', '2021-09-22 17:28:18'),
('898c51c6-1b87-11ec-9d57-6c626d3a5d34', 'Lottie', NULL, 'Burch', NULL, 'ce4245b3-1b7a-11ec-9d57-6c626d3a5d34', 'hr_recruiter@email.com', '$2b$12$QlaufjyDCZRaFOJsLYtObuB8OAhBT7jRisC15zNfefQV6eOkQUL8.', 'Recruiter', '2021-09-22 17:29:08', '2021-09-22 17:29:08');

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
