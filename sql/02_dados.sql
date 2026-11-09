-- Acentos corretos quando o script roda na criação do banco
SET NAMES utf8mb4;

INSERT INTO categoria (nome) VALUES
    ('Cabos e Fios'),
    ('Proteção e Comando'),
    ('Eletrodutos e Fixação'),
    ('Iluminação'),
    ('Tomadas e Interruptores');

INSERT INTO cliente (nome, cidade) VALUES
    ('Coamo Sede Administração Central', 'Campo Mourão'),
    ('Coamo Farol', 'Farol'),
    ('Coamo Ouro Verde do Oeste', 'Ouro Verde do Oeste'),
    ('Coamo Jardim Alvorada', 'Campo Mourão'),
    ('Coamo Jardim Araucária', 'Campo Mourão'),
    ('Coamo Rio Ivaí', 'São João do Ivaí'),
    ('Coamo Arapuã', 'Arapuã'),
    ('Coamo Furnas', 'Manoel Ribas'),
    ('Coamo Mamborê', 'Mamborê'),
    ('Coamo Roncador', 'Roncador');

INSERT INTO obra (cliente_id, titulo, status, data_inicio) VALUES
    (1,  'Reforma da subestação', 'CONCLUIDA', '2026-01-12'),
    (2,  'Alimentação do secador de grãos', 'EM_ANDAMENTO', '2026-03-02'),
    (3,  'Adequação NR-10 do armazém graneleiro', 'EM_ANDAMENTO', '2026-01-20'),
    (4,  'Painel de comando das correias transportadoras', 'CONCLUIDA', '2026-02-08'),
    (5,  'Iluminação do pátio de recebimento', 'EM_ANDAMENTO', '2026-02-16'),
    (6,  'Cabine primária - manutenção', 'PARALISADA', '2026-04-05'),
    (7,  'Aterramento e SPDA dos silos', 'CONCLUIDA', '2026-03-11'),
    (8,  'Grupo gerador e quadro de transferência', 'EM_ANDAMENTO', '2026-04-18'),
    (9,  'Iluminação de emergência', 'CONCLUIDA', '2026-05-06'),
    (10, 'Troca da entrada de energia', 'EM_ANDAMENTO', '2026-05-22');

INSERT INTO material (categoria_id, nome, unidade, valor_unitario, estoque_atual, estoque_minimo) VALUES
    (1, 'Cabo flexível 2,5mm² 750V', 'm', 2.85, 420, 200),
    (1, 'Cabo flexível 4,0mm² 750V', 'm', 4.60, 180, 150),
    (1, 'Cabo PP 3x2,5mm²', 'm', 8.90, 65, 80),
    (1, 'Fio rígido 1,5mm²', 'm', 1.95, 600, 250),
    (2, 'Disjuntor DIN monopolar 16A', 'un', 14.50, 38, 40),
    (2, 'Disjuntor DIN bipolar 25A', 'un', 42.00, 12, 30),
    (2, 'Disjuntor DIN tripolar 63A', 'un', 128.00, 9, 10),
    (2, 'DPS classe II 275V', 'un', 68.00, 22, 15),
    (2, 'Contator tripolar 25A', 'un', 96.50, 14, 12),
    (3, 'Eletroduto PVC 3/4 pol. 3m', 'br', 9.40, 8, 25),
    (3, 'Eletroduto galvanizado 1 pol. 3m', 'br', 34.00, 30, 20),
    (3, 'Abraçadeira tipo D 3/4 pol.', 'un', 1.20, 480, 200),
    (3, 'Fita isolante 20m', 'un', 8.70, 5, 30),
    (4, 'Luminária LED 36W sobrepor', 'un', 78.00, 3, 15),
    (4, 'Refletor LED 100W', 'un', 145.00, 18, 10),
    (4, 'Lâmpada LED bulbo 12W', 'un', 11.30, 240, 100),
    (5, 'Tomada 2P+T 10A com placa', 'un', 16.80, 150, 60),
    (5, 'Interruptor simples com placa', 'un', 13.20, 95, 60);
