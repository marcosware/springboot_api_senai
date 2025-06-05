-- Banco de Estudo

CREATE DATABASE estudo_pessoas;
   -- DEFAULT CHARACTER SET = 'utf8mb4';
--
-- Table structure for table `table_name`
--
Use estudo_pessoas

DROP TABLE IF EXISTS `produtos`;

CREATE TABLE `produtos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `preco` float DEFAULT NULL,
  `quantidade_estoque` int  DEFAULT NULL,
  `descricao` varchar(2083) DEFAULT NULL,
  PRIMARY KEY (`id`)
) -- ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Cadastro de Produtos';

-- Inserção de dados de exemplo
INSERT INTO produtos (nome, preco, quantidade_estoque, descricao) VALUES
('Tenis Azul', '200', '1000', 'Tenis azul muito bonito.'),
('Guitarra Vermelha', '850', '500', 'Guitarra rock n roll baby');

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14  8:56:50
