document.querySelector('header').classList.add('visivel');

const produtos = [
    { id: 1, nome: "White Album",              artista: "The Beatles",  tipo: "cd",    genero: "rock",     badge: "raridade",  preco: 199.99, precoOld: null,   tamanho: "75%", img: "../assets/Home/white-album.jpg" },
    { id: 2, nome: "Even In Arcadia",          artista: "Sleep Token",  tipo: "vinil", genero: "rock",     badge: "lancamento",preco: 299.99, precoOld: null,   tamanho: "80%", img: "../assets/Home/even-in-arcadia.jpg" },
    { id: 3, nome: "The Black",                artista: "Imminence",    tipo: "vinil", genero: "rock",     badge: "promocao",  preco: 99.99,  precoOld: 299.99, tamanho: "100%", img: "../assets/Home/the-black.jpg" },
    { id: 4, nome: "Hit Me Hard and Soft",     artista: "Billie Eilish",tipo: "cd",    genero: "pop",      badge: "promocao",  preco: 99.99,  precoOld: 199.99, tamanho: "100%", img: "../assets/Portfólio/hit-me.jpg" },
    { id: 5, nome: "Nobody Can Live Forever",  artista: "Tim Maia",     tipo: "vinil", genero: "mpb",      badge: "raridade",  preco: 89.99,  precoOld: null,   tamanho: "65%", img: "../assets/Portfólio/tim-maia.jpg" },
    { id: 6, nome: "Construção",               artista: "Chico Buarque",tipo: "vinil", genero: "mpb",      badge: "raridade",  preco: 89.99,  precoOld: null,   tamanho: "65%", img: "../assets/Portfólio/construcao.jpg" },
    { id: 7, nome: "Happier",                  artista: "Marshmello",   tipo: "vinil", genero: "eletronico",badge: "",         preco: 159.99, precoOld: null,   tamanho: "100%", img: "../assets/Portfólio/happier.avif" },
    { id: 8, nome: "...And Justice For All",   artista: "Metallica",    tipo: "vinil", genero: "rock",     badge: "importado", preco: 399.99, precoOld: null,   tamanho: "85%", img: "../assets/Portfólio/and-justice.jpg" },
    { id: 9, nome: "Classic Music Masterpieces",artista: "Mozart",      tipo: "vinil", genero: "classico", badge: "raridade",  preco: 229.99, precoOld: null,   tamanho: "65%", img: "../assets/Portfólio/mozart.jpg" },
];

const badgeLabel = {
    raridade: { texto: "Raridade", classe: "badge-raridade" },
    lancamento: { texto: "Lançamento", classe: "badge-lancamento" },
    promocao: { texto: "Promoção", classe: "badge-promo" },
    importado: { texto: "Importado", classe: "badge-importado" },
};

function renderCard(p) {
    const badge = p.badge && badgeLabel[p.badge]
        ? `<span class="produto-badge ${badgeLabel[p.badge].classe}">${badgeLabel[p.badge].texto}</span>`
        : "";

    const preco = p.precoOld
        ? `<p class="produto-preco-old">R$ ${p.precoOld.toFixed(2).replace(".", ",")} <span class="produto-preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</span></p>`
        : `<p class="produto-preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>`;

    const parcela = (p.preco / 12).toFixed(2).replace(".", ",");
    const tamanho = p.tamanho || "75%"; /* ← usa o tamanho do produto */

    return `
        <div class="produto-card" data-tipo="${p.tipo}" data-genero="${p.genero}" data-badge="${p.badge}">
            <div class="produto-capa">
                <img src="${p.img}" alt="${p.nome}" style="width:${tamanho}; height:${tamanho};">
                ${badge}
            </div>
            <div class="produto-info">
                <p class="produto-nome">${p.nome}</p>
                <p class="produto-artista">${p.artista} · ${p.tipo.toUpperCase()}</p>
                ${preco}
                <p class="produto-parcela">ou 12x de R$ ${parcela}</p>
            </div>
        </div>`;
}

function renderGrid(lista) {
    const grid = document.getElementById("portfolio-grid");
    grid.innerHTML = lista.length
        ? lista.map(renderCard).join("")
        : `<p style="color:#555;font-family:var(--fonte-corpo);grid-column:1/-1;text-align:center;padding:3rem">Nenhum produto encontrado.</p>`;
}

function filtrar() {
    const tipo = document.querySelector(".filtro-tipo.ativo")?.dataset.tipo || "todos";
    const genero = document.getElementById("filtro-genero").value;
    const badge = document.getElementById("filtro-preco").value;

    const resultado = produtos.filter(p => {
        const okTipo = tipo === "todos" || p.tipo === tipo;
        const okGenero = genero === "todos" || p.genero === genero;
        const okBadge = badge === "todos" || p.badge === badge;
        return okTipo && okGenero && okBadge;
    });

    renderGrid(resultado);
}

// botões de tipo
document.querySelectorAll(".filtro-tipo").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filtro-tipo").forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        filtrar();
    });
});

// selects
document.getElementById("filtro-genero").addEventListener("change", filtrar);
document.getElementById("filtro-preco").addEventListener("change", filtrar);

// lê parâmetro da URL (?filtro=promocao ou ?genero=rock)
const params = new URLSearchParams(window.location.search);
const generoURL = params.get("genero");
const filtroURL = params.get("filtro");

if (generoURL) {
    document.getElementById("filtro-genero").value = generoURL;
}
if (filtroURL) {
    document.getElementById("filtro-preco").value = filtroURL;
}

// hamburguer
const hamburguer = document.getElementById("hamburguer");
const menu = document.getElementById("link-menu");
hamburguer.addEventListener("click", () => {
    menu.classList.toggle("aberto");
    hamburguer.classList.toggle("aberto");
});

// badge importado no CSS
const style = document.createElement("style");
style.textContent = `.badge-importado { background: #1a3a5a; color: #fff; }`;
document.head.appendChild(style);

// render inicial
renderGrid(produtos);
filtrar();