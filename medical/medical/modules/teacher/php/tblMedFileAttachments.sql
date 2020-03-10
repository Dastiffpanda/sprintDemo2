-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 30, 2020 at 08:16 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s94gccodec_master_F2019`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblMedFileAttachments`
--

CREATE TABLE `tblMedFileAttachments` (
  `DateUploaded` date NOT NULL,
  `fkClassDetail` int(255) NOT NULL,
  `DocType` varchar(255) CHARACTER SET utf8 NOT NULL,
  `Note` varchar(255) CHARACTER SET utf8 NOT NULL,
  `FilePath` varchar(255) CHARACTER SET utf8 NOT NULL,
  `MedFileAttachmentID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Indexes for table `tblMedFileAttachments`
--
ALTER TABLE `tblMedFileAttachments`
  ADD PRIMARY KEY (`MedFileAttachmentID`);


--
-- AUTO_INCREMENT for table `tblMedFileAttachments`
--
ALTER TABLE `tblMedFileAttachments`
  MODIFY `MedFileAttachmentID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
