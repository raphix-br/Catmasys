(function () {
    const games = Array.isArray(window.GAMES) ? window.GAMES : [];
    const grid = document.getElementById("collection-grid");
    const count = document.getElementById("collection-count");
    const statusText = document.getElementById("collection-status");
    const search = document.getElementById("search");
    const filters = document.querySelectorAll("#collection-filters button");
    const STORAGE_KEY = "catmasys_minha_colecao_v1";

    let collection = {};
    try {
        collection = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_) {
        collection = {};
    }

    const statuses = {
        CIB: "CIB",
        BOXED: "Boxed",
        LOOSE: "Loose",
        INCOMPLETO: "Incompleto",
        NAO_POSSUO: "Não possuo"
    };

    function esc(s) {
        return String(s ?? "").replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    }

    function getStatus(id) {
        return collection[id] || "NAO_POSSUO";
    }

    function render(list) {
        grid.innerHTML = list.map(g => {
            const status = getStatus(g.id);
            return `
                <article class="collection-card" data-id="${esc(g.id)}">
                    <a class="collection-cover-link" href="jogo.html?id=${encodeURIComponent(g.id)}">
                        <img class="thumb" src="${esc(g.thumb || g.image)}" alt="${esc(g.name)}" loading="lazy">
                    </a>
                    <div class="collection-name">${esc(g.name)}</div>
                    <div class="collection-id">${esc(g.id)}</div>
                    <select class="collection-status-select" aria-label="Status de ${esc(g.name)}">
                        ${Object.entries(statuses).map(([value,label]) =>
                            `<option value="${value}" ${status === value ? "selected" : ""}>${label}</option>`
                        ).join("")}
                    </select>
                </article>
            `;
        }).join("");

        grid.querySelectorAll(".collection-status-select").forEach(select => {
            select.addEventListener("change", function () {
                const id = this.closest(".collection-card").dataset.id;
                collection[id] = this.value;
                save();
                updateSummary();
                applyFilters();
            });
        });

        updateSummary();
    }

    function updateSummary() {
        const owned = games.filter(g => getStatus(g.id) !== "NAO_POSSUO").length;
        count.textContent = `${owned} de ${games.length} jogos`;

        const totals = Object.keys(statuses)
            .filter(s => s !== "NAO_POSSUO")
            .map(s => `${statuses[s]}: ${games.filter(g => getStatus(g.id) === s).length}`);

        statusText.textContent = totals.join("  •  ");
    }

    function applyFilters() {
        const q = search.value.trim().toLowerCase();
        const active = document.querySelector("#collection-filters button.active").dataset.status;

        const list = games.filter(g => {
            const matchesSearch = !q || String(g.name).toLowerCase().includes(q);
            const matchesStatus = active === "TODOS" || getStatus(g.id) === active;
            return matchesSearch && matchesStatus;
        });

        render(list);
    }

    filters.forEach(button => {
        button.addEventListener("click", function () {
            filters.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            applyFilters();
        });
    });

    search.addEventListener("input", applyFilters);

    render(games);
})();
