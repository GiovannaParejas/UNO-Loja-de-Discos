document.querySelector('header').classList.add('visivel');
// hamburguer
const hamburguer = document.getElementById('hamburguer');
const menu       = document.getElementById('link-menu');

hamburguer.addEventListener('click', () => {
    menu.classList.toggle('aberto');
    hamburguer.classList.toggle('aberto');
});

// formulário
function enviarFormulario() {
    document.querySelectorAll('.form-erro').forEach(e => e.textContent = '');

    const nome     = document.getElementById('form-nome');
    const email    = document.getElementById('form-email');
    const mensagem = document.getElementById('form-mensagem');
    let ok = true;

    if (nome.value.trim().length < 2) {
        document.getElementById('erro-nome').textContent = 'Informe seu nome completo.';
        ok = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        document.getElementById('erro-email').textContent = 'Informe um e-mail válido.';
        ok = false;
    }

    if (mensagem.value.trim().length < 10) {
        document.getElementById('erro-mensagem').textContent = 'Escreva uma mensagem com pelo menos 10 caracteres.';
        ok = false;
    }

    if (!ok) return;

    document.getElementById('form-success').style.display = 'block';
    nome.value     = '';
    email.value    = '';
    mensagem.value = '';
    document.getElementById('form-assunto').value = '';
}