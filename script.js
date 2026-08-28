// 1. ANIMAÇÃO DE FUNDO DO SERVIDOR
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

// 2. WHATSAPP FLUTUANTE
const NUMERO_WHATSAPP = "5593999999999"; // Substitua com seu número
const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
  whatsappFloat.href = `https://wa.me/${NUMERO_WHATSAPP}`;
}

// 3. MENU MOBILE TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// 4. ENVIO DO FORMULÁRIO PARA O WHATSAPP
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `*SOLICITACAO DE ORCAMENTO WKB*\n\n*Nome:* ${nome}\n*Servico:* ${servico}\n*Detalhes:* ${mensagem}`;
    const url = `https://wa.me/${93991192244}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  });
}
