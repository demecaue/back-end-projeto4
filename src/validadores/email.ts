// Rubrica: validação de email
export const emailValido = (email: string) => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email);
