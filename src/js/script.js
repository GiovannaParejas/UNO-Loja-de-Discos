// Início: Loading

window.onload = function () {

    const intro = document.getElementById("inicio");

    setTimeout(() => {
        intro.classList.add("efeito-out")
        setTimeout(() => {
            intro.style.display = "none";
            content.classList.remove("hidden");
            content.classList.add("efeito-in");
        }, 1000)
    }, 3000)
}

const inicio = document.getElementById('inicio');
const barraFill = document.getElementById('barra-fill');
const porcentagem = document.getElementById('porcentagem');
const header = document.querySelector('header'); 

let progresso = 0;

const intervalo = setInterval(() => {
    progresso += Math.random() * 4 + 1;

    if (progresso >= 100) {
        progresso = 100;
        clearInterval(intervalo);

        barraFill.style.width = '100%';
        porcentagem.textContent = '100%';

        setTimeout(() => {
            inicio.style.opacity = '0';
            setTimeout(() => {
                inicio.style.display = 'none';
                header.classList.add('visivel'); 
            }, 1000);
        }, 400);

        return;
    }

    barraFill.style.width = Math.round(progresso) + '%';
    porcentagem.textContent = Math.round(progresso) + '%';

}, 60);

// Fim: Loading

// Início: Menu

const hamburguer = document.getElementById('hamburguer');
const menu = document.getElementById('link-menu');

hamburguer.addEventListener('click', () => {
    menu.classList.toggle('aberto');
    hamburguer.classList.toggle('aberto');
});

// Fim: Menu