-- Banco de Estudo

CREATE DATABASE estudo_pessoas IF NOT EXISTS
   -- DEFAULT CHARACTER SET = 'utf8mb4';
--
-- Table structure for table `table_name`
--
Use estudo_pessoas

DROP TABLE IF EXISTS `itens_compra`;

CREATE TABLE `itens_compra` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `compra_id` bigint(20) NOT NULL,
  FOREIGN KEY(compra_id) REFERENCES compras(id),
  `produto_id` bigint(20) NOT NULL,
   FOREIGN KEY(produto_id) REFERENCES produtos(id),
   `quantidade` int NOT NULL,
   `preco_unitario` float NOT NULL,
  PRIMARY KEY (`id`)
) -- ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Cadastro de Compras';

-- Inserção de dados de exemplo
INSERT INTO itens_compra (compra_id, produto_id, quantidade, preco_unitario) VALUES
('1', '1', '2', '200'),
('2', '2', '1', '850');

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14  8:56:50
