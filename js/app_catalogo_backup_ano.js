(function () {
    const games = Array.isArray(window.GAMES) ? window.GAMES : [];
    const grid = document.getElementById("grid");
    const count = document.getElementById("count");
    const search = document.getElementById("search");

    function esc(s) {
        return String(s ?? "").replace(/[&<>"']/g, c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c]));
    }

    function render(list) {
        const grupos = {};

        list.forEach(g => {
            const ano = g.year || "Sem ano";
            if (!grupos[ano]) grupos[ano] = [];
            grupos[ano].push(g);
        });

        const anos = Object.keys(grupos).sort((a, b) => {
            const na = parseInt(a);
            const nb = parseInt(b);
            if (isNaN(na)) return 1;
            if (isNaN(nb)) return -1;
            return nb - na;
        });

        grid.innerHTML = anos.map(ano => `
            <section class="year-section">
                <div class="year-title">${esc(ano)}</div>
                <div class="year-grid">
                    ${grupos[ano].map(g => `
                        <a class="card" href="jogo.html?id=${encodeURIComponent(g.id)}">
                            <img class="thumb" src="${esc(g.thumb || g.image)}"
                                 alt="${esc(g.name)}" loading="lazy">
                            <div class="name">${esc(g.name)}</div>
                            <div class="id">BDJogos ${esc(g.id)}</div>
                        </a>
                    `).join("")}
                </div>
            </section>
        `).join("");

        count.textContent = `${list.length} jogos`;
    }

    function filter() {
        const q = search.value.trim().toLowerCase();

        const lista = q
            ? games.filter(g => String(g.name).toLowerCase().includes(q))
            : games;

        render(lista);
    }

    search.addEventListener("input", filter);
    render(games);
})();
