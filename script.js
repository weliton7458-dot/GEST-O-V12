// 1. CARREGAMENTO E REMOÇÃO FORÇADA DA INTRO
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progressBar");
  const pingVal = document.getElementById("pingVal");
  const introOverlay = document.getElementById("introOverlay");

  let progress = 0;
  
  const interval = setInterval(() => {
    progress += 20;
    if (pingVal) pingVal.innerText = `${Math.floor(Math.random() * 8) + 8} ms`;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      removerIntro();
    }
  }, 80);

  function removerIntro() {
    if (introOverlay) {
      introOverlay.style.opacity = '0';
      setTimeout(() => {
        introOverlay.classList.add("hidden");
      }, 400);
    }
  }

  // Garantia: se demorar mais de 1.2s, força o desaparecimento
  setTimeout(removerIntro, 1200);
});

// 2. ANIMACAO DE FUNDO DO CANVAS
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

// 3. WHATSAPP & MENU MOBILE
const NUMERO_WHATSAPP = "5593991192244";

const waFloatBtn = document.getElementById('waFloatBtn');
const waChatBox = document.getElementById('waChatBox');
const waCloseBtn = document.getElementById('waCloseBtn');
const waSendBtn = document.getElementById('waSendBtn');
const waInputMsg = document.getElementById('waInputMsg');

if (waFloatBtn && waChatBox) {
  waFloatBtn.addEventListener('click', () => {
    waChatBox.classList.toggle('active');
  });
}

if (waCloseBtn && waChatBox) {
  waCloseBtn.addEventListener('click', () => {
    waChatBox.classList.remove('active');
  });
}

function irParaWhatsapp() {
  const msgText = waInputMsg ? waInputMsg.value.trim() : "";
  const textoFinal = msgText ? msgText : "Ola! Gostaria de mais informacoes sobre os servicos da WKB Sistemas.";
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoFinal)}`, '_blank');
}

if (waSendBtn) waSendBtn.addEventListener('click', irParaWhatsapp);
if (waInputMsg) {
  waInputMsg.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') irParaWhatsapp();
  });
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `*SOLICITACAO DE ORCAMENTO WKB*\n\n*Nome:* ${nome}\n*Servico:* ${servico}\n*Detalhes:* ${mensagem}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank');
  });
}
