// Rubrica Tech Forge: exceção base abstrata, cada subclasse define o próprio status HTTP
export abstract class ErroAplicacao extends Error {
    abstract readonly status: number;
}
