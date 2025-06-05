-- Banco de Estudo

CREATE DATABASE estudo_pessoas IF NOT EXISTS
   -- DEFAULT CHARACTER SET = 'utf8mb4';
--
-- Table structure for table `table_name`
--
Use estudo_pessoas

DROP TABLE IF EXISTS `compras`;

CREATE TABLE `compras` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `data_compra` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Data de Compra',
  `pessoa_id` bigint(20) NOT NULL,
   FOREIGN KEY(pessoa_id) REFERENCES pessoas(id),
  PRIMARY KEY (`id`)
) -- ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Cadastro de Compras';

-- Inserção de dados de exemplo
INSERT INTO compras (pessoa_id) VALUES
('1'),
('2');

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14  8:56:50
