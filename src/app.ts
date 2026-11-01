import express from 'express';
import { Usuario } from './model/Usuario';
import { cpfValido } from './validators/cpf';

const app = express();
const usuarios: Usuario[] = [];

app.use(express.json());

app.post('/usuarios', (req, res) => {
    const { nome, email, senha, cpf } = req.body ?? {};
    const preenchidos = [nome, email, senha, cpf].every((campo) => typeof campo === 'string' && campo.trim());

    if (!preenchidos) {
        res.status(400).json({ mensagem: 'Nome, email, senha e CPF são obrigatórios' });
        return;
    }

    if (!cpfValido(cpf)) {
        res.status(400).json({ mensagem: 'CPF inválido' });
        return;
    }

    const usuario = new Usuario(nome, email, senha, cpf);
    usuarios.push(usuario);
    res.status(201).json(usuario);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
