(function () {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const games = Array.isArray(window.GAMES) ? window.GAMES : [];
    const detail = document.getElementById("detail");
    const title = document.getElementById("title");

    const game = games.find(function (g) {
        return String(g.id) === String(id);
    });

    if (!game) {
        detail.innerHTML = '<div class="detail-card"><div class="info"><h2>Jogo nao encontrado</h2><a href="index.html">Voltar ao catalogo</a></div></div>';
        return;
    }

    document.title = game.name + " - Catmasys";
    title.textContent = game.name;

    detail.innerHTML =
        '<article class="detail-card">' +
            '<img class="cover" src="' + game.image + '" alt="' + game.name + '">' +
            '<div class="info">' +
                '<h2>' + game.name + '</h2>' +
                '<div class="info-row"><span class="label">ID BDJogos</span>' + game.id + '</div>' +
                '<div class="info-row"><span class="label">Catalogo</span>Master System BR</div>' +
                '<div class="info-row"><span class="label">Ano</span>' + game.year + '</div>' +
                '<div class="info-row"><span class="label">Edicao</span>' + game.edition + '</div>' +
            '</div>' +
        '</article>';
})();
