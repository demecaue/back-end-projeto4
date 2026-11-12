export type Valores = Record<string, string | number | null>;

// Rubrica Tech Forge: classe abstrata, cada entidade define como vira registro no banco (polimorfismo)
export abstract class Entidade {
    abstract dadosParaBanco(): Valores;
}
