<!-- Rubrica: criação do arquivo AGENTS.md -->
# Instruções para agentes

API do controle de estoque de materiais elétricos da DW Engenharia Elétrica. O front fica no repositório `front-end-projeto4`.

## Stack e comandos

- Node.js, Express 5 e TypeScript.
- `npm run dev`: sobe a API na porta 3000 com recarga automática.
- `npm run build`: compila para `dist`.
- `npx tsc --noEmit`: confere os tipos. Rode antes de entregar qualquer mudança.

## Estrutura

- `src/app.ts`: rotas.
- `src/model`: classes do domínio e erros customizados.
- `src/validators`: validações de CPF, email e nível de senha.

## Padrões

- Código curto e direto, sem abstração que ainda não tem uso.
- Nomes em português, seguindo o que já existe.
- Regras de negócio ficam nas classes, não nas rotas.
- Erros da API respondem `{ mensagem }` com o status adequado.
- Comentários só para marcar itens da rubrica, no formato `// Rubrica: ...`.

## Fluxo

- Trabalhe em um item da rubrica por vez.
- Ao terminar, pare e descreva o que mudou.

<!-- Rubrica: definição de 3 skills específicas para os agentes -->
## Skills

Ficam em `.claude/skills`:

- `item-rubrica`: implementa um item da rubrica por vez e deixa o commit para o usuário.
- `crud-recurso`: cria o CRUD completo de um recurso do estoque.
- `testar-api`: sobe a API e testa as rotas, inclusive os casos de erro.
