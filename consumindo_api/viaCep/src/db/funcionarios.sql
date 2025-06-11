CREATE DATABASE rh-tech IF NOT EXISTS

Use rh-tech

DROP TABLE IF EXISTS `funcionarios`;

CREATE TABLE `funcionarios` (
  `id` bigint(20) NOT NULL UNIQUE AUTO_INCREMENT,
  `nome` timestamp NOT NULL,
  `email` varchar(500) NOT NULL,
  `senha` varchar(500) NOT NULL,
  `cep` varchar(500) NOT NULL,
  `endereco` varchar(1000)NOT NULL,
  `numero` varchar(500) NOT NULL,
  `bairro` varchar(500) NOT NULL,
  `cidade` varchar(500) NOT NULL,
  `estado` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
)
