# CHANGELOG

## Version 0.016
- Reorganizado o menu lateral como barra de modos de visualização: Miniaturas, Cronológico, Gêneros e botão alfabético A–Z/Z–A.
- Separado visualmente o modo experimental Linha do Tempo dos modos principais.
- Linha do Tempo agora navega com interpolação suave e velocidade proporcional à roda/trackpad; Ctrl + scroll controla o zoom. O arraste mantém posição contínua sem encaixe brusco em um jogo inteiro.
- Criado seletor independente de skins com Default (fundo branco e grid escuro), Escuro (tema escuro atual) e Space Harrier, com preferência salva localmente.
- Recolocada a versão do projeto logo abaixo da marca no canto superior esquerdo.
- Reforçados o contraste dos marcadores de ano e o posicionamento mais baixo da Linha do Tempo.
- Alterados: `VERSION`, `catalogo.html`, `minha_colecao.html`, `js/app_catalogo.js`, `js/skin_spaceharrier.js`, `css/catmasys-ui.css`, `css/skin_spaceharrier.css`, `README.md`, `CHANGELOG.md`.



## Version 0.015
- A bandeira do Brasil agora é o único seletor regional visível; botão reduzido ao tamanho exato da imagem, sem fundo, borda, texto ou sombra.
- Filtros de edição (CP, GG, GP, AB e AZ) movidos para um rail à esquerda, também disponível em Minha Coleção.
- Cards do catálogo e da coleção receberam dimensões e áreas de capa padronizadas para evitar alturas diferentes entre jogos.
- Minha Coleção agora exibe tags de características por jogo e permite filtrar por gênero, subgênero, jogadores, periféricos, som FM e save por bateria quando os dados existem.
- A página de cada jogo agora exibe tags das características preenchidas na base de dados e uma seção de dados do catálogo, mantendo as tags de seleção de edição.
- Os campos ausentes continuam omitidos; nenhuma característica não presente na planilha é inventada.
- Arquivos alterados: `VERSION`, `catalogo.html`, `minha_colecao.html`, `jogo.html`, `css/catmasys-ui.css`, `js/app_catalogo.js`, `js/app_colecao.js`, `js/app.js`, `README.md`, `index.html`, `perfil.html`.



## Version 0.014
- Redesenhado o favicon como cartucho retrô mais legível; atualizado o parâmetro de versão do ícone para evitar cache antigo.
- Padronizado o título da aba do navegador como `Catmasys` em todas as páginas.
- Simplificado o cabeçalho principal para exibir apenas CATMASYS, com tipografia sem serifa mais limpa e hierarquia mais consistente.
- Refinados os botões de navegação, filtros, controles regionais e barra lateral.
- Redesenhadas as barras de ano com fundo escuro, destaque lateral vermelho, tipografia nítida e contagem de registros.
- Renomeada a opção da barra lateral para explicar que o agrupamento por ano exibe as edições separadamente.
- O catálogo principal, gênero, miniaturas e linha do tempo usam títulos únicos; somente a visualização/agrupamento por ano mostra os registros de edições separadas.
- Aumentado o espaço visual no rodapé e adicionados créditos, copyright, aviso de marcas e versão do projeto.
- Arquivos alterados: `VERSION`, `assets/catmasys-icon.svg`, `css/catmasys-ui.css`, `js/app_catalogo.js`, `index.html`, `catalogo.html`, `minha_colecao.html`, `jogo.html`, `perfil.html`, `js/app.js`, `CHANGELOG.md`, `README.md`.

## Version 0.013
- Criada uma página inicial para o Catmasys com identidade visual própria, acesso ao catálogo e atalhos para login/criação de perfil.
- Criada a página de perfil com cadastro e login locais no navegador; senhas são derivadas com PBKDF2, mas não há servidor, recuperação de conta nem sincronização entre dispositivos.
- O catálogo padrão agora mostra 243 títulos únicos, agrupando as edições; os dois jogos de pacote sem caixa (20 em 1 e Hang On & Safari Hunt) permanecem disponíveis em Minha Coleção, fora da contagem padrão.
- A página de detalhe exibe as edições disponíveis em tags selecionáveis e atualiza capa/identificação conforme a edição escolhida.
- Minha Coleção mantém os registros por edição e substitui o menu suspenso repetido em cada jogo por um selo de status e um único diálogo de edição reutilizável.
- Aplicada paleta padrão escura para aumentar contraste dos cartuchos/capas claras; a skin Space Harrier permanece isolada.
- Adicionadas bandeiras SVG para BR, USA, Europa, Japão e Coreia em `assets/flags/`; as regiões sem catálogo próprio continuam desabilitadas.
- Criados `assets/README.md`, `assets/ui/README.md` e `assets/backgrounds/README.md` com a organização recomendada para novas imagens.
- Arquivos principais alterados: `index.html`, `catalogo.html`, `perfil.html`, `minha_colecao.html`, `jogo.html`, `css/catmasys-ui.css`, `js/games_br.js`, `js/app_catalogo.js`, `js/app_colecao.js`, `js/app.js`, `js/perfil.js`, `assets/flags/*.svg`.

## Version 0.012
- Corrigida a versão visível no cabeçalho de `index.html` e `minha_colecao.html`, que ainda estava em `VERSION 0.010` apesar de a versão oficial do repositório já estar em `0.011`.
- A versão oficial e as versões visíveis nas duas páginas passam a estar sincronizadas em `0.012`.
- Nenhuma funcionalidade, layout ou skin foi alterada nesta correção.

## Version 0.011
- Tornado o arraste da Linha do Tempo contínuo, permitindo atravessar vários jogos em um único movimento.
- O posicionamento durante o arraste agora aceita valores intermediários entre jogos e só faz o encaixe no jogo mais próximo ao soltar.
- Mantido o jogo mais próximo do centro como selecionado durante a navegação.
- Refinada a transição da linha para acompanhar melhor o movimento do ponteiro.
- Garantido que, na skin Space Harrier, estrelas, horizonte e piso permaneçam fixos enquanto somente os tiles da Linha do Tempo se deslocam.
- Alterados: `js/app_catalogo.js`, `css/style.css` e `css/skin_spaceharrier.css`.

## Version 0.010
- Corrigida a versão exibida no cabeçalho para ficar sincronizada com a versão oficial do projeto.
- Atualizado `index.html` de `VERSION 0.008` para `VERSION 0.010`.
- Atualizado `minha_colecao.html` de `VERSION 0.007` para `VERSION 0.010`.
- Reforçada em `README.md` e `CONTRIBUTING.md` a regra de que toda alteração de versão deve atualizar também as versões visíveis nas páginas HTML.
- Nenhuma funcionalidade ou layout foi alterado nesta correção.

## Version 0.009
- Refinada a Linha do Tempo sem alterar os demais modos do catálogo.
- Adicionado zoom progressivo pelo scroll do mouse: zoom out mostra mais jogos e zoom in aproxima a linha.
- Adicionada navegação horizontal por arraste, com encaixe automático do jogo mais próximo ao centro.
- Mantido o jogo selecionado centralizado e visualmente destacado.
- Marcadores de ano receberam linha, ponto de referência e identificação discreta.
- Adicionada indicação discreta dos controles da linha.

## Version 0.008
- Adicionado novo modo de visualização "Linha do Tempo" na sidebar.
- A Linha do Tempo usa uma única linha horizontal e organiza os jogos por ano, do mais antigo à esquerda para o mais recente à direita.
- O jogo selecionado permanece centralizado e recebe destaque visual.
- Os anos recebem marcadores verticais para separar os grupos cronológicos.
- O modo foi implementado de forma isolada, sem alterar o comportamento dos modos Miniaturas, Ano e Gênero.
- Navegação inicial da linha por clique e pelas setas do teclado; o scroll do mouse navega entre os jogos enquanto este modo está ativo.

## Version 0.007
- Removida a aparência de barra branca do contador no topo da área de conteúdo.
- Contador de jogos aumentado e destacado, mantendo a informação sem criar uma faixa visual desnecessária.
- Adicionada a versão atual (`VERSION 0.007`) abaixo da identidade CATMASYS no header, no Catálogo e em Minha Coleção.
- A versão exibida no projeto passa a acompanhar o número oficial de `VERSION` a cada alteração relevante.

## Version 0.006
- Bordas das barras de ano e gênero reduzidas de 2 px para 1 px.
- Tipografia das barras ajustada para reduzir o aspecto borrado e ficar mais nítida.
- Barras de ano e gênero agora usam a mesma paleta de cores.
- Barras estendidas até os limites laterais da área útil do conteúdo, da direita da sidebar até a borda da viewport.
- Mantido o espaçamento interno dos thumbnails, sem alterar a estrutura do layout base.

## Version 0.005
- Header aumentado de 108 px para 124 px.
- Barra de ferramentas estendida por toda a área útil visível, da direita da sidebar até a borda direita da viewport.
- Botão de edição `CU` removido enquanto não utilizado.
- Botões de catálogo reduzidos e substituídos visualmente por bandeiras compactas de Brasil, EUA, Europa, Japão e Coreia.
- Mantida a estrutura base para que as skins não alterem o layout.

## Version 0.004
- Alterado o título exibido na aba do navegador para `Catmasys`.
- Adicionado favicon próprio do projeto em SVG, com gato pixelado e paleta vermelha, azul e preta.
- O mesmo ícone foi aplicado ao Catálogo e à página Minha Coleção.

## Version 0.003
- Aumentado o respiro vertical entre o header e o início dos grids de miniaturas.
- Criada uma área inferior ampla e reservada para futuro rodapé do site, incluindo créditos e outras informações.
- A área de rodapé foi adicionada tanto ao catálogo quanto à página Minha Coleção.
- O espaço foi implementado no CSS base, preservando a regra de que skins não alteram a estrutura do layout.

# CATMASYS — CHANGELOG

## Version 0.002

### Documentacao
- Criado README.md com as regras oficiais de versionamento, historico e arquitetura de skins.
- Criado CONTRIBUTING.md com instrucoes explicitas para humanos e IAs que contribuirem com o projeto.
- Reforcada a regra de que o historico de versoes faz parte da especificacao do projeto.

### Arquivos
- `README.md`
- `CONTRIBUTING.md`
- `VERSION`
- `CHANGELOG.md`

---

## Version 0.001
- Reduzidos os botoes da sidebar para 32×32 px e os icones para 16×16 px.
- Sidebar centralizada verticalmente.
- Alteracao feita no CSS base para valer para todos os skins, incluindo Grid/default e futuras skins.
- Iniciado controle de versao incremental no repositorio.

> Regra: cada modificacao relevante recebe uma nova Version 0.XXX, com o numero incrementado, e uma entrada neste arquivo.
