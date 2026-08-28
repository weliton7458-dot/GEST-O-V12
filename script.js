// 1. ANIMAÇÃO DE ENTRADA (SPLASH SCREEN / DADOS ONLINE)
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progressBar");
  const btnEnter = document.getElementById("btnEnterSite");
  const pingVal = document.getElementById("pingVal");
  const introOverlay = document.getElementById("introOverlay");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (pingVal) pingVal.innerText = `${Math.floor(Math.random() * 8) + 8} ms`;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (progressBar) progressBar.style.width = "100%";
      
      // Auto carregar e fechar overlay ou mostrar botão
      setTimeout(() => {
        if (introOverlay) {
          introOverlay.classList.add("fade-out");
        }
      }, 600);
    } else {
      if (progressBar) progressBar.style.width = progress + "%";
    }
  }, 120);
});

// 2. ANIMAÇÃO DE FUNDO DO SERVIDOR (CANVAS)
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

// 3. CONTATOS E WIDGET ANIMADO DO WHATSAPP
const NUMERO_WHATSAPP_PRINCIPAL = "5593991192244";

const waFloatBtn = document.getElementById('waFloatBtn');
const waChatBox = document.getElementById('waChatBox');
const waCloseBtn = document.getElementById('waCloseBtn');
const waSendBtn = document.getElementById('waSendBtn');
const waInputMsg = document.getElementById('waInputMsg');
const waStatus = document.getElementById('waStatus');
const waTyping = document.getElementById('waTyping');

// Abrir/Fechar Widget Chat
if (waFloatBtn && waChatBox) {
  waFloatBtn.addEventListener('click', () => {
    waChatBox.classList.toggle('active');
    
    // Simula digitando ao abrir
    if (waChatBox.classList.contains('active')) {
      if (waStatus) waStatus.innerText = "digitando...";
      if (waTyping) waTyping.style.display = "flex";
      
      setTimeout(() => {
        if (waStatus) waStatus.innerText = "Online";
        if (waTyping) waTyping.style.display = "none";
      }, 1500);
    }
  });
}

if (waCloseBtn && waChatBox) {
  waCloseBtn.addEventListener('click', () => {
    waChatBox.classList.remove('active');
  });
}

// Enviar Mensagem para o WhatsApp Real ao clicar/escrever
function redirecionarWhatsApp() {
  const msgText = waInputMsg ? waInputMsg.value.trim() : "";
  const textoFinal = msgText ? msgText : "Olá! Gostaria de mais informações sobre os serviços da WKB Sistemas.";
  const url = `https://wa.me/${NUMERO_WHATSAPP_PRINCIPAL}?text=${encodeURIComponent(textoFinal)}`;
  window.open(url, '_blank');
}

if (waSendBtn) {
  waSendBtn.addEventListener('click', redirecionarWhatsApp);
}

if (waInputMsg) {
  waInputMsg.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') redirecionarWhatsApp();
  });
}

// 4. MENU MOBILE TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// 5. ENVIO DO FORMULÁRIO COMPLETO
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `*SOLICITACAO DE ORCAMENTO WKB*\n\n*Nome:* ${nome}\n*Servico:* ${servico}\n*Detalhes:* ${mensagem}`;
    const url = `https://wa.me/${NUMERO_WHATSAPP_PRINCIPAL}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  });
}
