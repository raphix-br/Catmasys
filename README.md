# CATMASYS

Catálogo visual de jogos físicos Master System Tectoy Brasil.

## Controle de versão — REGRA OBRIGATÓRIA

Este projeto usa uma versão incremental no formato **Version 0.XXX**.

A versão atual está no arquivo `VERSION`.

O histórico detalhado está em `CHANGELOG.md`.

### Regra para qualquer modificação

Toda alteração relevante feita no projeto, por uma pessoa ou por uma IA, deve:

1. Ler primeiro `VERSION` e `CHANGELOG.md`.
2. Incrementar o número da versão antes de concluir a alteração.
3. Atualizar o arquivo `VERSION`.
4. Atualizar também a versão visível no `.site-version` de todas as páginas HTML que exibem a versão.
5. Registrar no `CHANGELOG.md` exatamente o que foi alterado, quais arquivos foram modificados e, quando relevante, o motivo.
6. Usar a versão no início da mensagem do commit, no formato:
   `Version 0.XXX — descrição objetiva`.
7. Nunca reutilizar uma versão já existente.
8. Não apagar ou reescrever o histórico anterior sem autorização explícita.
9. Se uma alteração for desfeita, registrar uma nova versão explicando o rollback; não apagar a versão anterior do histórico.

### Pontos de retorno

O número da versão é o identificador humano do estado do projeto. Quando alguém disser, por exemplo, “voltar para Version 0.007”, deve localizar no histórico o commit correspondente e usar esse ponto como referência.

Para marcos importantes, recomenda-se futuramente criar uma Git tag/release com o mesmo número.

## Regra de arquitetura das skins

As skins são exclusivamente visuais.

O CSS/JS específico de uma skin **não deve alterar a estrutura ou o layout-base da aplicação**, incluindo altura/posição estrutural do header, dimensões/posição da sidebar, margens estruturais do conteúdo ou outras regras globais.

O layout compartilhado deve permanecer no CSS base.

Uma nova skin deve modificar somente aparência, cores, fundos, efeitos e elementos visuais próprios da skin, salvo decisão explícita registrada no CHANGELOG.

Isso é importante para que uma nova skin nunca quebre o Grid/default ou outras skins existentes.

## Orientação para pessoas e IAs

Antes de modificar o Catmasys:

- leia este arquivo;
- leia `VERSION`;
- leia `CHANGELOG.md`;
- identifique o CSS base antes de modificar uma skin;
- preserve funcionalidades e layout existentes que não façam parte da alteração solicitada;
- registre a alteração na nova versão.

**Não considere apenas o código atual como especificação. O histórico de versões também faz parte da especificação do projeto.**



## Páginas principais

- `index.html`: página inicial e entrada do projeto.
- `perfil.html`: cadastro/login de perfil local.
- `catalogo.html`: catálogo visual principal (243 títulos agrupados).
- `minha_colecao.html`: coleção pessoal por registro/edição.
- `jogo.html`: detalhe do título e tags para alternar entre edições.

## Catálogo padrão e edições

- `js/games_br.js` preserva os registros individuais de edições em `window.GAMES`.
- O mesmo arquivo constrói `window.CATALOG_GAMES`, com um registro por título para o catálogo principal.
- O catálogo padrão tem 243 títulos únicos. A visualização Miniaturas, Gênero e Linha do Tempo mantém os títulos agrupados; somente a visualização **Agrupar por ano** exibe os registros individuais de edições. Os dois itens de pacote sem caixa (`20 em 1` e `Hang On & Safari Hunt`) continuam acessíveis em Minha Coleção, mas não entram na contagem padrão.
- Ao abrir um título, as edições encontradas são apresentadas em tags selecionáveis.
- A referência editorial de conferência é [Colecionando.Games — lista de jogos Master System TecToy](https://blog.colecionando.games/lista-completa-master-system-tectoy/).

## Perfis

O perfil desta versão é **local ao navegador**. Não existe backend de autenticação, recuperação de senha ou sincronização na nuvem. Para contas reais acessíveis em vários dispositivos, será necessário integrar um serviço de autenticação e armazenamento no servidor. Não reutilize senhas de outros serviços.

## Imagens

Bandeiras e ícones de interface ficam em `assets/flags/` e `assets/ui/`; fundos em `assets/backgrounds/`. As capas existentes continuam em `CAPAS_MASTER_SYSTEM/` e as miniaturas em `thumbs/`.


## Identidade e rodapé — Version 0.014

- O título de todas as páginas é `Catmasys`; o favicon é `assets/catmasys-icon.svg`.
- A barra lateral usa o termo **Agrupar por ano** para a visualização cronológica com edições separadas.
- O rodapé de catálogo/coleção contém créditos, aviso de marcas e versão atual.
