<!-- Rubrica: criação do arquivo AGENTS.md -->
# Instruções para agentes

API do controle de estoque de materiais elétricos da DW Engenharia Elétrica. O front fica no repositório `front-end-projeto4`.

## Stack e comandos

- Node.js, Express 5 e TypeScript.
- `npm run dev`: sobe a API na porta 3000 com recarga automática.
- `npm run build`: compila para `dist`.
- `npx tsc --noEmit`: confere os tipos. Rode antes de entregar qualquer mudança.
- `docker compose up -d`: sobe o MySQL. As credenciais vêm do `.env`.

## Estrutura

- `src/app.ts`: rotas e tratamento central de erros.
- `src/database.ts`: conexão com o MySQL.
- `src/entidades`: classes do domínio, com as regras de cada campo.
- `src/servicos`: regras de negócio de cada recurso.
- `src/repositorios`: consultas SQL de cada recurso.
- `src/erros`: exceções customizadas. Cada uma define o status HTTP.
- `src/validadores`: validações de CPF, email, nível de senha e campo preenchido.
- `sql`: tabelas e dados iniciais. Rodam sozinhos só quando o banco é criado do zero.
- `docker-compose.yml`: serviço do MySQL com volume e rede.

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

<!-- Rubrica: implementação de guardrails para limitar ações e comportamentos do agente -->
## Guardrails

As regras ficam em `.claude/settings.json` e valem quando o agente é aberto nesta pasta.

- Bloqueados: `git commit`, `git push`, `git reset --hard`, exclusão recursiva de pastas e `docker compose down -v`.
- Pedem confirmação: `npm install`.
- Não altere arquivos fora deste repositório.
- Não apague nem renomeie arquivos sem pedido do usuário.

<!-- Rubrica: proteção de arquivos sensíveis, impedindo que o agente leia ou exponha o .env -->
## Arquivos sensíveis

- O `.env` guarda senhas e chaves. Ele fica fora do Git, e o `.claude/settings.json` bloqueia a leitura e a edição pelo agente.
- Os nomes das variáveis ficam no `.env.example`, sem valores reais. Esse arquivo pode ser lido.
- Nunca escreva senha, token ou chave no código, em logs ou nas respostas.
