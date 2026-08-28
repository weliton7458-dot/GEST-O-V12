// 1. ANIMAÇÃO MATRIX / SERVIDOR NO CANVAS
const canvas = document.getElementById('serverCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = '01WKB_NET_SYS_101010';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawServerAnimation() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00e5ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawServerAnimation, 33);
}

// 2. CONFIGURAÇÃO DO SEU WHATSAPP (DDD + NÚMERO)
const NUMERO_WHATSAPP = "5593999999999"; 

const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
  whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
}

// 3. MENU MOBILE TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// 4. FORMULÁRIO ENVIANDO MENSAGEM PARA O WHATSAPP
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `*SOLICITAÇÃO DE ORÇAMENTO WKB*\n\n*Nome:* ${nome}\n*Serviço:* ${servico}\n*Detalhes:* ${mensagem}`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  });
}
