CREATE TABLE usuario (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(120) NOT NULL,
    email       VARCHAR(120) NOT NULL UNIQUE,
    senha_hash  VARCHAR(255) NOT NULL,
    cpf         CHAR(11)     NOT NULL
);

CREATE TABLE categoria (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(60) NOT NULL
);

CREATE TABLE cliente (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nome    VARCHAR(120) NOT NULL,
    cidade  VARCHAR(80)  NOT NULL
);

-- Rubrica: relacionamento entre os recursos, cada obra pertence a um cliente
CREATE TABLE obra (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id   INT NOT NULL,
    titulo       VARCHAR(140) NOT NULL,
    status       ENUM('EM_ANDAMENTO', 'CONCLUIDA', 'PARALISADA') NOT NULL DEFAULT 'EM_ANDAMENTO',
    data_inicio  DATE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE RESTRICT
);

-- Rubrica: relacionamento entre os recursos, cada material pertence a uma categoria
CREATE TABLE material (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id    INT NOT NULL,
    nome            VARCHAR(120)  NOT NULL,
    unidade         VARCHAR(10)   NOT NULL,
    valor_unitario  DECIMAL(10,2) NOT NULL,
    estoque_atual   INT NOT NULL DEFAULT 0,
    estoque_minimo  INT NOT NULL DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE RESTRICT
);
