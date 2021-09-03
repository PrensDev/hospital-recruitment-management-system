-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2021 at 06:18 PM
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
  `evaluated_at` datetime DEFAULT NULL,
  `screened_by` varchar(36) DEFAULT NULL,
  `screened_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`applicant_id`, `job_post_id`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `resume`, `contact_number`, `email`, `status`, `evaluated_by`, `evaluated_at`, `screened_by`, `screened_at`, `remarks`, `created_at`, `updated_at`) VALUES
('3ddb8b0e-0b9d-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Aric', '', 'Swaniawski', '', '5ba73bc237e64a09ac783f9c1fc584e2.pdf', '09123456789', 'aric.swaniawski@ethereal.email', 'For screening', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:42:37', NULL, NULL, NULL, '2021-09-02 11:24:11', '2021-09-02 22:16:18'),
('40dbfd77-0bb5-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', '7e4b40267949418ca5d8460b4d220adf.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-09-02 14:16:04', '2021-09-02 14:16:04'),
('50cfe18b-0ba5-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Mat Troi', '', 'Huyen', '', '269c07a4e464477eb4524877cec09c0e.pdf', '0912345679', 'mattroihuyen@gmail.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-09-02 12:21:59', '2021-09-02 12:21:59'),
('6b92c6ed-0bb1-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', '34e8d70e09f946c692dc19a2e241a121.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-09-02 13:48:38', '2021-09-02 13:48:38'),
('7a68f39c-0b9e-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Mat Troi', '', 'Huyen', '', '2c4f076779354ef5919810e516c6ee3b.pdf', '0906543210', 'mattroihuyen@gmail.com', 'For screening', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:42:47', NULL, NULL, NULL, '2021-09-02 11:33:02', '2021-09-02 22:16:38'),
('8323a74a-0665-11ec-a443-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Michelle', NULL, 'Bancifra', '', 'resume.pdf', '+639999999999', 'michellebancifra@email.com', 'Rejected from evaluation', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:42:54', NULL, NULL, 'Not enough information is provided', '2021-08-26 20:02:40', '2021-08-28 10:26:55'),
('8368f9ae-08b7-11ec-be32-d8c497916dda', 'cc2f2dfc-07b6-11ec-92bc-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', 'resume.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-08-29 18:54:41', '2021-08-29 18:54:41'),
('9361f10b-0b9a-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Harold', '', 'Little', '', 'dbb457714883471197bfab5e839bd6ec.pdf', '09123456789', 'harold.little80@ethereal.email', 'For interview', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:43:10', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-03 23:52:28', NULL, '2021-09-02 11:05:06', '2021-09-03 23:52:29'),
('9bfaabd4-0b58-11ec-a668-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Berenice', '', 'Boehm', '', '53c6053556194a70893cbcd0c11c9486.pdf', '09999999999', 'berenice.boehm41@ethereal.email', 'For interview', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:43:15', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-03 23:46:18', NULL, '2021-09-02 03:12:48', '2021-09-03 23:46:18'),
('a3c97907-08df-11ec-be32-d8c497916dda', 'cc2f2dfc-07b6-11ec-92bc-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', '8152ba5543424236b4b0cc26016c2ea7.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-08-29 23:41:56', '2021-08-29 23:41:56'),
('a75f5816-0bb2-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Joana Monique', 'Padrogane', 'Torres', '', '2e0b60ba90f34cbaba3e6cac8524d0af.pdf', '+639999999999', 'jamsphone0924@gmail.com', 'Rejected from screening', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:43:19', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', NULL, 'No enough information', '2021-09-02 13:57:28', '2021-09-03 23:46:55'),
('ad4aeed9-063b-11ec-a443-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Mark Angel', NULL, 'Monterde', '', 'resume.pdf', '+639999999999', 'markangel@email.com', 'For screening', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-02 21:43:23', NULL, NULL, NULL, '2021-08-26 15:03:12', '2021-08-28 10:27:12'),
('bbea6a34-0bb5-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', 'c224a1c205194155b0223e0ce1c2ab19.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-09-02 14:19:31', '2021-09-02 14:19:31'),
('bd471e7f-07a7-11ec-92bc-d8c497916dda', 'ba6c45a5-04f6-11ec-bebb-d8c497916dda', 'Maria', 'Dela Paz', 'Mercedez', '', 'resume.pdf', '09123456789', 'mariamercedez@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-08-28 10:29:15', '2021-08-28 10:29:15'),
('e8b15811-08ea-11ec-be32-d8c497916dda', 'cc2f2dfc-07b6-11ec-92bc-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', 'e00b84c2afad4e81b7f822270dd05c18.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-08-30 01:02:36', '2021-08-30 01:02:36'),
('ea247d58-0ba2-11ec-954d-d8c497916dda', '8c60f128-0b26-11ec-a668-d8c497916dda', 'Mat Troi', '', 'Huyen', '', 'b607828354ba4fccb8125a68eefe7e5c.pdf', '094565656334', 'mattroihuyen@gmail.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-09-02 12:04:48', '2021-09-02 12:04:48'),
('ed952c62-07a7-11ec-92bc-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Juan', '', 'Dela Cruz', 'Jr.', 'resume.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-08-28 10:30:36', '2021-08-28 10:30:36'),
('f3c868b5-0b1a-11ec-a668-d8c497916dda', '49b28e24-036b-11ec-9258-d8c497916dda', 'Juan', 'Dela', 'Cruz', '', 'eaf1c5f4b4224dab87691842f2d45091.pdf', '0987654321', 'juandelacruz@email.com', 'For evaluation', NULL, NULL, NULL, NULL, NULL, '2021-09-01 19:51:27', '2021-09-01 19:51:27');

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
('3473dd47-0b22-11ec-a668-d8c497916dda', 'Intensive Care Unit Department', 'Intensive Care Unit Department', '2021-09-01 20:43:22', '2021-09-01 20:43:22'),
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
('3495b2a5-0b25-11ec-a668-d8c497916dda', 'b3166adf-0b24-11ec-a668-d8c497916dda', 0, '<p><span style=\"font-size: 1rem;\">Our department need physicians.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span><br></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Requirements</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol><div><div><div><div></div></div></div></div><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-size: 1rem;\"><br></span></p>', '2021-12-15 12:00:00', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:04:51', '2021-09-01 21:05:45'),
('49b28e24-036b-11ec-9258-d8c497916dda', '0fbde148-0240-11ec-9ccc-d8c497916dda', 1, '<p><b>Qualifications</b></p><p>Lorem ipsum folot sit amet consect conset lore lorem sina<span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span></p><ul><li>Test Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul><p><br></p><p><b>Educational Attainment</b></p><p>Lorem ipsum folot sit amet consect conset lore lorem sina<span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum folot sit amet consect conset lore lorem sina</span><span style=\"font-size: 1rem;\">&nbsp;</span><span style=\"font-size: 1rem;\">ipsum</span><b><br></b></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul>', '2021-10-22 00:00:00', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-08-23 01:06:27', '2021-08-26 15:58:57'),
('782c2b8e-0b26-11ec-a668-d8c497916dda', '9bce4388-0b24-11ec-a668-d8c497916dda', 0, '<p><span style=\"font-size: 1rem;\">Our department need ICU nurses.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span><br></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Requirements</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol><p><p><span style=\"font-size: 1rem;\"><br></span></p></p><div style=\"box-sizing: border-box; color: rgb(33, 37, 41); font-family: &quot;Source Sans Pro&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><div style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"></div></div></div></div>', '2021-11-30 21:00:00', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:13:54', '2021-09-01 21:13:54'),
('8c60f128-0b26-11ec-a668-d8c497916dda', '79a45fa1-0b24-11ec-a668-d8c497916dda', 1, '<p><span style=\"font-size: 1rem;\">Our department need physicians.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span><br></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><span style=\"font-weight: bolder;\">Educational Attainment</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Requirements</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol><p><p><span style=\"font-size: 1rem;\"><br></span></p></p><div style=\"box-sizing: border-box; color: rgb(33, 37, 41); font-family: &quot;Source Sans Pro&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><div style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"><div style=\"box-sizing: border-box;\"></div></div></div></div>', NULL, 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:14:27', '2021-09-01 21:14:27'),
('ba6c45a5-04f6-11ec-bebb-d8c497916dda', '2ffb8ef8-0230-11ec-9ccc-d8c497916dda', 0, '<p><b>Qualifications</b></p><p>Lorem impsum dolor&nbsp;<span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed.</span></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Test updates</li></ul><p><br></p><p><b>Experiences</b></p><p>Lorem impsum dolor&nbsp;<span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed.</span></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul><p><br></p><p><b>Educational Attainment</b></p><p>Lorem impsum dolor&nbsp;<span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed&nbsp;</span><span style=\"font-size: 1rem;\">ipsum dolor sit amet consecteture sit amed.</span><b><br></b></p><ul><li>Lorem ipsum dolor sit amet consecteture sit amed</li><li>Lorem ipsum dolor sit amet consecteture sit amed</li></ul><p><br></p><p><br></p><table class=\"table table-bordered\"><tbody><tr><td style=\"text-align: center; \">Column 1</td><td style=\"text-align: center; \">Column 2</td></tr><tr><td>Sample Data</td><td><div>Lorem ipsum dolor sit amet consectetur.</div><div><br></div><ul><li>List in a table</li><li>List in a table</li><li>List in a table</li></ul></td></tr></tbody></table><p><br></p>', NULL, 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-08-25 00:17:07', '2021-09-01 15:35:02'),
('cc2f2dfc-07b6-11ec-92bc-d8c497916dda', '53854eed-07b1-11ec-92bc-d8c497916dda', 0, '<p><b>Responsibilities</b></p><p>This position will be responsible for the recruitment and management of the day to day activities of Hospital. Complete management of Resources Assistance (floaters) involving their scheduling, performance, management and recruitment, along with practice of groups to maintain legal assistant resources and recommending location of Resource Assistants to support each group.</p><p>Responsible fir all new <u>employee orientation</u>, <u>training</u>, and on-going training of legal assistants throughout the firm working with Hospital in-house trainer</p><p><br></p><p><b>Competencies</b></p><ul><li>Detail-oriented</li><li>Organized</li><li>Ability to successfully manage multiple relationship within the work environment</li><li>Creative</li></ul><p><br></p><p><b>Educational Attainment</b></p><ul><li>5 years of experience</li><li>Certificate in Human Resource Management</li><li>CHRP would be an asset</li></ul><p><br></p><p>For more information please contact us:</p><table class=\"table table-bordered\"><tbody><tr><td>Facebook</td><td>https://facebook.com/hospital</td></tr><tr><td>Email</td><td>hospital@email.com</td></tr><tr><td>Twitter</td><td>https://twitter.com/hospital</td></tr></tbody></table><p><br></p>', '2021-09-02 15:21:00', 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-08-28 12:17:03', '2021-09-01 15:21:19'),
('fe94c35d-0b0f-11ec-a668-d8c497916dda', '4494b176-07b2-11ec-92bc-d8c497916dda', 0, '<p><span style=\"font-size: 1rem;\">This is a test Update</span><br></p>', NULL, 'f87dd92a-ff0c-11eb-9644-d8c497916dda', '2021-09-01 18:33:01', '2021-09-01 18:33:29');

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
('5b22aa9e-0b22-11ec-a668-d8c497916dda', '3473dd47-0b22-11ec-a668-d8c497916dda', 'Physician', 'Physician', '2021-09-01 20:44:27', '2021-09-01 20:44:27'),
('8f83fce0-0b22-11ec-a668-d8c497916dda', '3473dd47-0b22-11ec-a668-d8c497916dda', 'Critical Care Nurse', 'Critical Care Nurse', '2021-09-01 20:45:55', '2021-09-01 20:45:55'),
('a1a89db0-ff07-11eb-9644-d8c497916dda', '915793d0-ff07-11eb-9644-d8c497916dda', 'Department Head', 'Department Head', '2021-08-17 11:03:00', NULL),
('a25216a7-0b22-11ec-a668-d8c497916dda', '3473dd47-0b22-11ec-a668-d8c497916dda', 'Department Head', 'Department Head', '2021-09-01 20:46:26', '2021-09-01 20:46:26'),
('ad7044a3-ff07-11eb-9644-d8c497916dda', '915793d0-ff07-11eb-9644-d8c497916dda', 'Hiring Manager', 'Hiring Manager', '2021-08-17 11:03:20', NULL),
('b9610b90-ff07-11eb-9644-d8c497916dda', '915793d0-ff07-11eb-9644-d8c497916dda', 'Recruiter', 'Recruiter', '2021-08-17 11:03:40', NULL),
('d852819c-0b22-11ec-a668-d8c497916dda', '3473dd47-0b22-11ec-a668-d8c497916dda', 'Respiratory Therapist', 'Respiratory Therapist', '2021-09-01 20:47:57', '2021-09-01 20:47:57');

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
('0fbde148-0240-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Intern/OJT', 'Replacement', 4, 18000, 25000, '<p>dsfdsfsdf</p>', 'Approved', '2021-09-30 00:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:27:40', NULL, NULL, '2021-08-21 13:24:30', '2021-08-22 12:27:40'),
('2ffb8ef8-0230-11ec-9ccc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'b9610b90-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 4, NULL, NULL, 'Lorem', 'Approved', '2021-08-21 03:24:04', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-22 12:01:24', NULL, NULL, '2021-08-21 11:30:52', '2021-08-22 12:01:27'),
('4494b176-07b2-11ec-92bc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'a1a89db0-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 1, NULL, NULL, '<p>sfg</p>', 'Approved', NULL, 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 13:10:54', NULL, NULL, '2021-08-28 11:44:37', '2021-09-01 13:10:54'),
('53854eed-07b1-11ec-92bc-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'ad7044a3-ff07-11eb-9644-d8c497916dda', 'Full Time', 'Replacement', 9, NULL, NULL, '<p>lorem ipsum dolor sit amet</p>', 'Approved', '2022-01-01 00:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-28 12:01:21', NULL, NULL, '2021-08-28 11:37:53', '2021-08-28 12:01:21'),
('79a45fa1-0b24-11ec-a668-d8c497916dda', '2d0ecd52-0b23-11ec-a668-d8c497916dda', '5b22aa9e-0b22-11ec-a668-d8c497916dda', 'Full Time', 'New/Addition', 2, 25000, 50000, '<p><b>This is from the Intensive Care Unit Department</b></p><p>Our department need physicians.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;<span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><b>Qualifications</b></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><b>Required Attitudes</b></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol>', 'Approved', NULL, 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:03:23', NULL, NULL, '2021-09-01 20:59:37', '2021-09-01 21:03:23'),
('9bce4388-0b24-11ec-a668-d8c497916dda', '2d0ecd52-0b23-11ec-a668-d8c497916dda', '8f83fce0-0b22-11ec-a668-d8c497916dda', 'Full Time', 'New/Addition', 4, NULL, NULL, '<p><span style=\"font-weight: bolder;\">This is from the Intensive Care Unit Department</span></p><p>Our department need physicians.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;<span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><span style=\"font-weight: bolder;\">Required Attitudes</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol>', 'Approved', NULL, 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:03:17', NULL, NULL, '2021-09-01 21:00:34', '2021-09-01 21:03:17'),
('b2ea58f4-0725-11ec-98c4-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'ad7044a3-ff07-11eb-9644-d8c497916dda', 'Full Time', 'Replacement', 3, NULL, NULL, '<p>Lorem</p>', 'Rejected', NULL, 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 13:19:06', NULL, 'Test Reject', '2021-08-27 18:58:23', '2021-09-01 13:19:06'),
('b301de6a-0b24-11ec-a668-d8c497916dda', '2d0ecd52-0b23-11ec-a668-d8c497916dda', '5b22aa9e-0b22-11ec-a668-d8c497916dda', 'Part Time', 'Replacement', 4, NULL, NULL, '<p><span style=\"font-weight: bolder;\">This is from the Intensive Care Unit Department</span></p><p>Our department need physicians.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;<span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><span style=\"font-weight: bolder;\">Required Attitudes</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol>', 'Rejected', '2021-10-01 21:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:03:01', NULL, 'You insert some inconsistent data on your request', '2021-09-01 21:01:13', '2021-09-01 21:03:01'),
('b3166adf-0b24-11ec-a668-d8c497916dda', '2d0ecd52-0b23-11ec-a668-d8c497916dda', '5b22aa9e-0b22-11ec-a668-d8c497916dda', 'Part Time', 'Replacement', 4, NULL, NULL, '<p><span style=\"font-weight: bolder;\">This is from the Intensive Care Unit Department</span></p><p>Our department need physicians.&nbsp; Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;<span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini.</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-weight: bolder;\">Qualifications</span></p><ul><li>Lorem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li><li>Dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</li></ul><p><br></p><p><span style=\"font-weight: bolder;\">Required Attitudes</span></p><p><span style=\"font-size: 1rem;\">Endi simon faulastic lorem deinamica locomotovi aureus fractura plantini&nbsp;</span><span style=\"font-size: 1rem;\">orem ipsum dolor sit amet consectetur di simon faulastic lorem deinamica locomotovi</span></p><ol><li><span style=\"font-size: 1rem;\">Lorem lorem lorem sinti</span></li><li><span style=\"font-size: 1rem;\">Sampli realim antrodictus minis</span></li></ol>', 'Approved', NULL, 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 21:03:12', NULL, NULL, '2021-09-01 21:01:13', '2021-09-01 21:03:12'),
('d87e92ce-0942-11ec-ac3e-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'a1a89db0-ff07-11eb-9644-d8c497916dda', 'Contract', 'New/Addition', 1, NULL, NULL, '<p><b>This is from the Department Head.</b></p><p>I just want to inform that lorem ipsum dolor sit amet consecteture&nbsp;<span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture</span></p><p><span style=\"font-size: 1rem;\">This is&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture&nbsp;</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture</span><span style=\"font-size: 1rem;\">at lorem ipsum dolor sit amet consecteture</span></p><ol><li>This is a sample list 1</li><li>This is a sample list 2</li><li>This is a sample list 3</li></ol><p>Please consider the following</p><table class=\"table table-bordered\"><tbody><tr><td style=\"text-align: center; \">Position</td><td style=\"text-align: center; \">Age</td><td style=\"text-align: center; \">Remarks</td></tr><tr><td>Department Head</td><td>25-45 years old</td><td>Qualifications must be met</td></tr></tbody></table><p><br></p>', 'Rejected', '2021-10-01 12:00:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-08-31 20:21:33', NULL, 'asd', '2021-08-30 11:32:04', '2021-08-31 20:21:33'),
('f1da2a21-0a82-11ec-b9e3-d8c497916dda', '99363496-ff0b-11eb-9644-d8c497916dda', 'a1a89db0-ff07-11eb-9644-d8c497916dda', 'Full Time', 'New/Addition', 43, 18000, 25000, '<p>Test XD</p>', 'Approved', '2021-09-15 01:43:00', 'd23e5f3c-ff0c-11eb-9644-d8c497916dda', '2021-09-01 13:07:04', NULL, NULL, '2021-09-01 01:43:26', '2021-09-01 13:07:05'),
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
('2d0ecd52-0b23-11ec-a668-d8c497916dda', 'Jane', 'Kennedy', 'Doe', '', 'a25216a7-0b22-11ec-a668-d8c497916dda', 'icu_head@email.com', '$2b$12$YWZTPsCgIuHsT6RLm.OwGOhSGmpEQAh8tI97suwm3ijTLox7VLwJ.', 'Department Head', '2021-09-01 20:50:19', '2021-09-01 20:50:19'),
('99363496-ff0b-11eb-9644-d8c497916dda', 'Jetsun Prince', '', 'Torres', '', 'a1a89db0-ff07-11eb-9644-d8c497916dda', 'hr_head@email.com', '$2b$12$0GRgLDXjlKEtHS5eEMkii.4GzK9WHznvvJGAp4f4OZRSMrJ50fogy', 'Department Head', '2021-08-17 11:31:24', NULL),
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
