export const preenchido = (valor: unknown): valor is string => typeof valor === 'string' && valor.trim() !== '';
