# Contribuição e manutenção do CATMASYS

## IMPORTANTE PARA HUMANOS E IAs

Antes de editar qualquer arquivo:

- consulte `README.md`;
- consulte `VERSION`;
- consulte `CHANGELOG.md`;
- entenda as regras de arquitetura das skins.

## Versionamento

Use sempre o próximo número disponível em **Version 0.XXX**.

Nunca reutilize números.

Toda alteração relevante precisa atualizar:

- `VERSION`
- a versão visível (`.site-version`) em todas as páginas HTML que a exibem
- `CHANGELOG.md`
- mensagem do commit

Formato do commit:

`Version 0.XXX — descrição objetiva`

## Histórico

Não apague versões anteriores do CHANGELOG.

Se uma alteração anterior precisar ser revertida, crie uma nova versão documentando o que foi revertido.

## Skins

Skin específica é camada de aparência. Layout estrutural pertence ao CSS base.

Não mover, redimensionar ou reposicionar estruturalmente header, sidebar ou conteúdo dentro de uma skin sem registrar e justificar explicitamente a decisão no CHANGELOG.

## Ao receber uma solicitação

Faça a menor alteração necessária para atingir o objetivo solicitado e preserve o restante do projeto.

Ao finalizar, informe a Version criada e o resumo exato dos arquivos alterados.
