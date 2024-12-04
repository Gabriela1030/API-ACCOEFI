-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2024 a las 01:21:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestionaccoefi_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`, `direccion`, `fecha_registro`, `fecha_creacion`) VALUES
(5, 'juanama', 'juanama@gmail.com', '239023932', 'kra 003', '2024-10-03 21:19:59', '2024-10-03 23:19:59'),
(6, 'paula', 'pauaa@gmail.com', '8493834', 'tv  # jskak', '2024-10-10 15:49:35', '2024-10-10 17:49:35'),
(7, 'yoha', 'yoha@gmail.com', '893283298', 'jskjksd', '2024-10-13 02:27:19', '2024-10-13 04:27:19'),
(8, 'sebastian', 'sebastian@gmail.com', '32898392', 'cll 9220', '2024-10-13 02:33:48', '2024-10-13 04:33:48'),
(10, 'maria', 'sjaksjk@gmai.com', '898329', 'cll 7832', '2024-10-16 01:31:30', '2024-10-16 03:31:30'),
(11, 'Martina', 'ezsara451@gmail.com', 'hj7980', 'kjkjkj', '2024-10-16 04:49:01', '2024-10-16 06:49:01'),
(19, 'josé', 'jose.v@gmail.com', '832982839', 'tv 892', '2024-11-13 01:02:03', '2024-11-13 02:02:03'),
(20, 'simon', 'simon@gmail.com', '82839328', 'tv 0', '2024-11-20 00:13:05', '2024-11-20 01:13:05'),
(21, 'vanessa', 'vanesa@gmail.com', '409430', 'cll 78 ', '2024-11-20 00:26:03', '2024-11-20 01:26:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `proveedor_id`, `fecha_registro`, `cantidad`) VALUES
(2, 'Producto de Prueba', 'Descripción del producto', 100.00, 2, '2024-10-16 12:53:37', 10),
(11, 'MANZANA', 'DESCRIPCION', 800.00, 2, '2024-10-25 06:22:07', 20),
(12, 'pera', 'pera dulce', 78989889.00, 4, '2024-11-20 08:56:44', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `email`, `telefono`, `direccion`, `fecha_registro`) VALUES
(1, 'kjkjkj', 'gabriela@pk.com', '7899009', 'njhbjh', '2024-10-16 12:09:19'),
(2, 'arturo', 'arturo8787@gmail.com', '990900', 'jkjjnnk', '2024-10-16 12:14:25'),
(3, 'sandra', 'saj@gmail.com', '83932928', 'askjaskas', '2024-11-06 03:08:01'),
(4, 'SERGIO', 'sergio.v@gmail.com', '89383982', 'cll 9302', '2024-11-13 06:59:08'),
(5, 'juan', 'juan@outlook.es', '32329839', 'asush', '2024-11-20 06:07:12'),
(6, 'jsxlksa', 'aksjjsk@gmai.com', '389382', 'udh', '2024-11-20 06:36:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `fecha_creacion`, `nombre`) VALUES
(1, 'juanupdated@example.com', '$2y$10$Zev75Vk8lbEme8SpJchTGejr5rvVS21s9f/BGN/wm.mHNqMPt5cRm', '2024-09-21 22:37:43', ''),
(7, 'gabriela10d@example.com', '$2y$10$a2ljm9nauXeXwCbwR/DF.ebBqfXvY7crXcwqqZmdg2S9CPSmyCcSu', '2024-09-21 23:00:06', ''),
(9, 'marti@gmail.com', '$2y$10$yfEMExQk4syBf/iGRsTAH.lfAiNZqfBINVtyY0KN40KyvuxxrvV5G', '2024-09-21 23:08:56', ''),
(34, 'cristian@gmail.com', '$2y$10$D0q66x/by9hJ1CxQqqeS6.ZkRcyKufRT9jr6knHMztLeTwRBbVEWq', '2024-09-23 10:22:38', ''),
(40, 'rai10d@example.com', '$2y$10$f7M03qUAEOUZFyxMBuT2c.AFvWl.7BkgEHshGyirExthguFor4zcq', '2024-09-23 10:40:29', ''),
(49, 'juana@gmail.com', '$2y$10$Q8KcIRwc73HgXUPrX5NGrOjAosxCdI7u9UQy5oHk1Ce8egG.xSv96', '2024-09-25 03:44:03', ''),
(50, '', '$2y$10$BS0H4d1d6SqzRTbIeyc8MulL72U4HAeyIFfbhHzCSUpZ6JIBGhZ.W', '2024-09-25 03:44:29', ''),
(65, 'jhon@gmail.com', '$2y$10$27pmc3lkJrX.X/DYN.u/K.Efq0bfWLttXqIxwJ2o.Pt23/0ncEDou', '2024-09-25 05:08:30', ''),
(67, 'john@gmail.com', '$2y$10$7rsZjReien/v5TftdL2lBOSz6Ij/ALbovLksxvT3ABkGhlfy/J8ay', '2024-09-25 05:16:02', ''),
(68, 'fer@gmail.com', '$2y$10$qcwte1AMt.qpOBFFihimeenNX38/x3pvJ3pH0wE2AlBw6SkuOx9gy', '2024-09-25 05:16:13', ''),
(70, 'marta@gmail.com', '$2y$10$XhDClmEwFIl2p4G29NXTZuLRzeuY2eMjZxyRGZoLl.GeHNzPxma..', '2024-09-25 05:20:26', ''),
(75, 'juana20@gmail.com', '$2y$10$cJ9zSJ4Ib0UbOxFOj0Ug6eDkZQMSwzardB5tKubg2RAAmBELm6Vqm', '2024-09-25 06:26:39', ''),
(76, 'jhonf@gmail.com', '$2y$10$3qNedIVHeQmPuju4.6wW6.9NIjQi1LWTbg8yoMRW9q6UNq5kLNOci', '2024-09-25 06:27:34', 'jhonf'),
(78, 'susana@gmail.com', '$2y$10$iyaew7EctRlhCfyZoQifDuCrUppnTDYGp6jurqBF.yXhXIg13mey2', '2024-09-25 06:40:01', 'susana'),
(84, 'sofia2@example.com', '$2y$10$hnmVpGAwrhJBFh3YaODE1uKE3kqYU4GM0nOXJPBxsEkbDVbKJlas2', '2024-09-25 07:21:27', 'sofia2'),
(89, 'maicol@gmail.com', '$2y$10$..HV0jiE7ii8mn5NsZ6hCemvqW4dfjOvaSw/BLd21AYDM8aYDcNG6', '2024-09-25 07:32:45', 'maicol'),
(97, 'paula@gmail.com', '$2y$10$RDA9MuDtPb8jBOIaeW3TWOy3A6.nI0R5TJTJztA.RXzHg.nYPW8WO', '2024-09-25 08:13:49', 'paula'),
(102, 'juan3a@gmail.com', '$2y$10$waileNOUvLVNSG.lRb5/ruFvgnuoRYPTHXmY6hyN.p8r4/goxr8mS', '2024-09-26 21:18:16', ''),
(104, 'juan34322a@gmail.com', '$2y$10$2NU.Gj7FFp/SlPm2iwXMZeDpiMFXPdKFUeDvo62BRgJeLBzV9kYtK', '2024-09-26 21:18:39', ''),
(106, 'juan34322arwerwe@gmail.com', '$2y$10$X6HZ4nHbswGmPTZI6Pp5lOzqiJOsOsQarsUmj38wsOHSbRlRR.U1S', '2024-09-26 21:19:54', ''),
(107, 'juan34322arwerfdwe@gmail.com', '$2y$10$V8h5KSaaB282yGn3lrC1j.PDNAve/8nJTjOvjFuIivH0XwDy2Q4iK', '2024-09-26 21:23:16', ''),
(108, 'juan34322arwerfdfwe@gmail.com', '$2y$10$7Z5qvChGazoGVkEnXcYTKurZbC2vZ/lzhMwTtsY1MLzfL8DOVooFi', '2024-09-26 21:23:26', ''),
(109, 'juan34322arweerfdfwe@gmail.com', '$2y$10$zejqppQ04t.XpP86IfsynebFPGfmuDMOKygPRyRBQJrMXJ6vondn6', '2024-09-26 21:23:39', ''),
(110, 'juan34322arweerfdfwfe@gmail.com', '$2y$10$Nk2qwM/GzXBg8NuOlz5vjOLQ408M3SQvaHTYCe7YiIHLhCGWYxKWW', '2024-09-26 21:24:16', ''),
(112, 'juan34322arweerfdfwfde@gmail.com', '$2y$10$ZbkfBiwURhLBpiY9xFcOWeIvO9rsLyuxjYaoQsmdj.2Ol7SxOpdh2', '2024-09-26 21:24:30', ''),
(113, 'juan34322arweerfdffwfde@gmail.com', '$2y$10$Oo52LIRRTHaoEimXKQlqX.9Rz89b38iIgIbUi/Y.oZcykp8XyHZmK', '2024-09-26 21:25:13', ''),
(116, 'juan34322arwfeerfdffwfde@gmail.com', '$2y$10$WucHCtE.eitjzNKrDxQmGuRDZYrNIo9Zvp18NG93KNKKBrEXoSGvm', '2024-09-26 21:32:21', ''),
(117, 'juan34322arwfeerfdfffwfde@gmail.com', '$2y$10$gOwoHXqE/lwxZLe5myZLO.HbuhLO3ZWYXn9fypfEran3ZZsN.UBFW', '2024-09-26 21:33:38', ''),
(119, 'juan34322arwfeerfdfffwfdfe@gmail.com', '$2y$10$Z8dm5F1ojZZimw8UDDHZBurkZjvLPtJ/ZJmmGKGjZDJZN3oBgoNfi', '2024-09-26 21:35:24', ''),
(121, 'juan34322arwfeerfdfffwfdffe@gmail.com', '$2y$10$FGg6oVuDeScF02oi1PZ9feGicVTd6M5brSWVxKIcmTjJ/anfp.a4a', '2024-09-26 21:37:13', ''),
(130, 'dsfds@hotmail.com', '$2y$10$w/CGfesiywRHgDT0BlB8IeW5xxJ1fNwn1uH4x/a11HZ8AdDfkJxG6', '2024-09-26 21:45:56', ''),
(133, 'gabriela518119@gmail.com', '$2y$10$wmH3OVzoQdXi1Wpqvao2reYkpjw009oWo.5yDCUXGPEUvP.PYETG.', '2024-09-26 21:50:08', ''),
(135, 'fdssd@hotmail.com', '$2y$10$CPZtStNW4O1jKGnIB2KRO.lDarP9M.EIOsx7G9Pz6QzmbkypV59ZC', '0000-00-00 00:00:00', ''),
(136, 'juanafd@gmail.com', '$2y$10$iN.uqgRPCHrj.eFl5okekOHCt5mkKFiJEcZ0aGNXT5q94aHvV9W2y', '0000-00-00 00:00:00', ''),
(137, 'paula4@gmail.com', '$2y$10$FpuaqW374InuDKRAiKSL6eiCcGVTLnQV5c/qH9So4/ivo77gSht.G', '0000-00-00 00:00:00', ''),
(138, 'lina@gmail.com', '$2y$10$DLch537DAFWgciXa5t6uReJ9DhFK4XPuHfRc2e7M.KYnIByxKJnDi', '0000-00-00 00:00:00', ''),
(139, 'sofia3@gmail.com', '$2y$10$556a9tPB6jlZnWBfvPZW9.57inrKYDD878W.JQwZOh4Qdr9jC8rd.', '0000-00-00 00:00:00', ''),
(140, 'juana32@gmail.com', '$2y$10$W7x09mrZ3JuBlo/qnpwLq.2ik5c9OaRI6wBwE16EERW45f4vFvMAa', '0000-00-00 00:00:00', ''),
(141, 'martina4020@hotmail.com', '$2y$10$HLpYO0DiaFa.bwyAyQHFQO1cvuPcDRXwp6.0p2jSluWxj00xw8ri.', '0000-00-00 00:00:00', ''),
(142, 'martinavargas8090@gmail.com', '$2y$10$O49ZYCQIlegp74MWkejxxeXH/ByxYg18J9FgPAZq9Y330zLMa1Kza', '0000-00-00 00:00:00', ''),
(143, 'ana@gmail.com', '$2y$10$VNNZuvrfT3NW3NnJRe2WROQS18Trdr3hkU31y3bxp4cJMF6lXZS0q', '0000-00-00 00:00:00', ''),
(144, 'jdmc1030@gmail.com', '$2y$10$BC6HEWvX3cP0ICeUuBLZMObhCWOUD7/8i1nWG1GgPsvNePeHAuBOC', '0000-00-00 00:00:00', ''),
(145, 'ana2020@gmail.com', '$2y$10$PHIfDY13tOCPtvxoVuTrHOSfIzbixyzcGdY2WCiu8kuLzlqonGWEa', '0000-00-00 00:00:00', ''),
(146, 'sara@gmail.com', '$2y$10$aON/2YHwGp3qEiPiuWHd9uc5jLBxsa9aW9slFisarLLl0TfO.LWIq', '0000-00-00 00:00:00', ''),
(147, 'sofia90@gmail.com', '$2y$10$nCB8Tp2XwxdIVsON8ZLUM.E/zerKrv/tD7yK/V.UHHWpkmNcG9Yu2', '0000-00-00 00:00:00', ''),
(148, 'juana1030@gmail.com', '$2y$10$W1S3CSGNVix5SC7w7SIF5.0CR01PYrDh8N6l7o1Lv2LkD2qcfj9Q.', '0000-00-00 00:00:00', ''),
(149, 'felipe@gmail.com', '$2y$10$PG6biCksnxoF43kjwNnkKuP3UXhW7DxzUGj4KNuCK/kVqw0M1sElG', '0000-00-00 00:00:00', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proveedor_id` (`proveedor_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
