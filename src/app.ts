import cors from 'cors';
import express from 'express';
import { ErroValidacao } from './model/ErroValidacao';
import { Usuario } from './model/Usuario';

const app = express();
const usuarios: Usuario[] = [];

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/usuarios', (req, res) => {
    const { nome, email, senha, cpf } = req.body ?? {};
    const preenchidos = [nome, email, senha, cpf].every((campo) => typeof campo === 'string' && campo.trim());

    if (!preenchidos) {
        res.status(400).json({ mensagem: 'Nome, email, senha e CPF são obrigatórios' });
        return;
    }

    try {
        const usuario = new Usuario(nome, email, senha, cpf);
        usuarios.push(usuario);
        res.status(201).json(usuario);
    } catch (erro) {
        if (!(erro instanceof ErroValidacao)) throw erro;
        res.status(400).json({ mensagem: erro.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
