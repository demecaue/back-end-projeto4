// Rubrica: validação de nível de senha
export const nivelSenha = (senha: string) => {
    if (senha.length < 8) return 'fraca';

    const tipos = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z\d]/].filter((tipo) => tipo.test(senha)).length;

    if (tipos === 4) return 'forte';
    return tipos === 3 ? 'media' : 'fraca';
};
