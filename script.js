// Altere para o seu número real de atendimento (com DDD)
const SEU_NUMERO_WHATSAPP = "5593999999999"; 

// Atualiza botão flutuante
const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
  whatsappFloat.href = `https://wa.me/${SEU_NUMERO_WHATSAPP}`;
}

// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Formulário de WhatsApp
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `Olá! Meu nome é *${nome}*.\n*Interesse:* ${servico}\n*Mensagem:* ${mensagem}`;
    const url = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  });
}
