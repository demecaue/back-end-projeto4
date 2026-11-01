const calcularDigito = (numeros: string, tamanho: number) => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) {
        soma += Number(numeros[i]) * (tamanho + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
};

export const cpfValido = (cpf: string) => {
    if (!/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf)) return false;

    const numeros = cpf.replace(/\D/g, '');
    if (/^(\d)\1+$/.test(numeros)) return false;

    return calcularDigito(numeros, 9) === Number(numeros[9]) && calcularDigito(numeros, 10) === Number(numeros[10]);
};
