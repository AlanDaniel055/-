-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2025 a las 11:08:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kanban`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditlog`
--

CREATE TABLE `auditlog` (
  `id` varchar(191) NOT NULL,
  `orgId` varchar(191) NOT NULL,
  `action` enum('CREATE','UPDATE','DELETE') NOT NULL,
  `entityId` varchar(191) NOT NULL,
  `entityType` enum('BOARD','LIST','CARD') NOT NULL,
  `entityTitle` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `userImage` text NOT NULL,
  `userName` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `board`
--

CREATE TABLE `board` (
  `id` varchar(191) NOT NULL,
  `orgId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `imageId` varchar(191) NOT NULL,
  `imageThumbUrl` text NOT NULL,
  `imageFullUrl` text NOT NULL,
  `imageUserName` text NOT NULL,
  `imageLinkHTML` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `card` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `order` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `listId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `list`
--

CREATE TABLE `list` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `order` int(11) NOT NULL,
  `boardId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orglimit`
--

CREATE TABLE `orglimit` (
  `id` varchar(191) NOT NULL,
  `orgId` varchar(191) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orgsubscription`
--

CREATE TABLE `orgsubscription` (
  `id` varchar(191) NOT NULL,
  `orgId` varchar(191) NOT NULL,
  `stripeCustomerId` varchar(191) NOT NULL,
  `stripeSubscriptionId` varchar(191) NOT NULL,
  `stripePriceId` varchar(191) NOT NULL,
  `stripeCurrentPeriodEnd` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1df79bb5-382d-4ca3-b012-507f8f13e6a6', '662876f7ec7adee09226be709feea9f32cb54f1bfdbba152e31f5e1d7024b0dc', '2025-04-09 03:56:59.839', '20250409035659_add_image_user_name', NULL, NULL, '2025-04-09 03:56:59.761', 1),
('85f98f32-050d-4c88-8e22-ea248c0a76d8', '8e7cc308e1a1cc7adb3cb4a2052a438a22dfb99c672364c5ba60146f123ff190', '2025-04-09 04:33:05.304', '20250409043305_add_org_subscription', NULL, NULL, '2025-04-09 04:33:05.242', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditlog`
--
ALTER TABLE `auditlog`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Card_listId_idx` (`listId`);

--
-- Indices de la tabla `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `List_boardId_idx` (`boardId`);

--
-- Indices de la tabla `orglimit`
--
ALTER TABLE `orglimit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `OrgLimit_orgId_key` (`orgId`);

--
-- Indices de la tabla `orgsubscription`
--
ALTER TABLE `orgsubscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `OrgSubscription_orgId_key` (`orgId`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
