import cors from 'cors';
import express from 'express';
import { ErroValidacao } from './model/ErroValidacao';
import { Usuario } from './model/Usuario';
import { UsuarioRepositorio } from './repositorios/UsuarioRepositorio';

const app = express();
const usuarioRepositorio = new UsuarioRepositorio();
const porta = Number(process.env.PORT ?? 3000);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rubrica: cadastro com os campos obrigatórios nome, email, senha e CPF
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, cpf } = req.body ?? {};
    const preenchidos = [nome, email, senha, cpf].every((campo) => typeof campo === 'string' && campo.trim());

    if (!preenchidos) {
        res.status(400).json({ mensagem: 'Nome, email, senha e CPF são obrigatórios' });
        return;
    }

    try {
        const usuario = new Usuario(nome, email, senha, cpf);
        await usuarioRepositorio.salvar(usuario);
        res.status(201).json(usuario);
    } catch (erro) {
        if (!(erro instanceof ErroValidacao)) throw erro;
        res.status(400).json({ mensagem: erro.message });
    }
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
