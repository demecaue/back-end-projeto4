export const emailValido = (email: string) => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email);
