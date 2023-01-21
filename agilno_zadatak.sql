-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2023 at 09:59 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agilno_zadatak`
--
CREATE DATABASE IF NOT EXISTS `agilno_zadatak` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `agilno_zadatak`;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `author` varchar(50) NOT NULL,
  `onStock` int(11) NOT NULL,
  `borrowed` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `slug`, `author`, `onStock`, `borrowed`, `createdAt`, `updatedAt`) VALUES
('5d7a120d-dcc9-4e57-be5a-5da63101d01d', 'Ime ružess', 'ime-ruzess', 'Umberto Eko', 4444, 0, '2023-01-21', '2023-01-21'),
('62b5ae78-9679-463d-a5c5-0bf751d7c38e', 'Ime ruže', 'ime-ruze', 'Umberto Eko', 4444, 0, '2023-01-21', '2023-01-21'),
('c5a618e5-7718-4678-8859-d9a1d4ba979f', 'Zločin i kazna', 'zlocin-i-kazna', 'Dostojevski', 4444, 0, '2023-01-21', '2023-01-21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(70) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `role`) VALUES
('676fe224-f7b0-42bf-bbf2-3137ab4fe01d', 'aidin', 'aidin@mail', '$2b$10$tFZFA.12xG8fzxEtxmNYsu3udsD/iy4cADB9uHHm9FhqNyDeb3IvS', '2023-01-19', '2023-01-19', 'admin'),
('7851b86d-b366-488e-9d9f-bfd79de5dde7', 'john', 'john.oliver@gmail.com', '$2b$10$yCvuwdRvKrquti2GyoyE6eXYOsIuLb66QB0J9a7P1AVHujZ..RarS', '2023-01-21', '2023-01-21', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
