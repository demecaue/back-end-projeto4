---
name: item-rubrica
description: Implementa um item da rubrica do projeto. Use quando o usuário pedir para fazer, continuar ou revisar um item da rubrica.
---

# Item da rubrica

1. Confirme com o usuário qual item será feito. Faça só ele.
2. Faça a menor mudança que atende ao item, seguindo os padrões do `AGENTS.md`.
3. Marque o trecho com um comentário:
   - `// Rubrica: <item>` para itens de back-end e front-end.
   - `// Rubrica Tech Forge: <critério>` para critérios de Tech Forge.
   - `<!-- Rubrica: <item> -->` em arquivos Markdown.
4. Rode `npx tsc --noEmit` e teste com a skill `testar-api`.
5. Pare e informe os arquivos alterados, como testou e uma sugestão de mensagem de commit em minúsculas e sem acento.

Não faça commit nem push. Quem commita é o usuário.
