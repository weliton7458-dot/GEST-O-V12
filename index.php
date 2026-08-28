<?php
// Configurações Globais
$telefone_whatsapp = "5593991192244";

function gerarLinkWhatsapp($mensagem, $numero) {
    return "https://wa.me/" . $numero . "?text=" . urlencode($mensagem);
}

$link_200mb  = gerarLinkWhatsapp("Olá! Gostaria de contratar o plano de Fibra Óptica de 200 MB por R$ 100/mês.", $telefone_whatsapp);
$link_1gb    = gerarLinkWhatsapp("Olá! Gostaria de contratar o plano Ultra Fibra de 1 GB por R$ 149/mês.", $telefone_whatsapp);
$link_starlink = gerarLinkWhatsapp("Olá! Tenho interesse em adquirir o material/kit da Internet Starlink.", $telefone_whatsapp);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WKB Telecom - Fibra Óptica & Starlink</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root {
            --bg-color: #060913;
            --card-bg: rgba(15, 23, 42, 0.75);
            --primary-cyan: #00f0ff;
            --primary-blue: #3b82f6;
            --accent-green: #10b981;
            --text-main: #f8fafc;
            --text-sub: #94a3b8;
            --glow-cyan: rgba(0, 240, 255, 0.4);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Rajdhani', sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* Animação de Fundo Tech Grid & Particles */
        body::before {
            content: "";
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: 
                radial-gradient(circle at 50% 20%, rgba(0, 240, 255, 0.08) 0%, transparent 50%),
                linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
            background-size: 100% 100%, 40px 40px, 40px 40px;
            z-index: -1;
            animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: 0 0, 0 40px, 40px 0; }
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        /* Header Tech */
        header {
            text-align: center;
            margin-bottom: 50px;
        }

        .badge-tech {
            display: inline-block;
            padding: 6px 16px;
            background: rgba(0, 240, 255, 0.1);
            border: 1px solid var(--primary-cyan);
            color: var(--primary-cyan);
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            box-shadow: 0 0 15px var(--glow-cyan);
            margin-bottom: 15px;
            animation: pulse 2s infinite alternate;
        }

        h1 {
            font-family: 'Orbitron', sans-serif;
            font-size: 2.8rem;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
            background: linear-gradient(135deg, #ffffff 0%, var(--primary-cyan) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }

        p.subtitle {
            color: var(--text-sub);
            font-size: 1.2rem;
        }

        /* Grid de Planos */
        .section-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            color: var(--primary-cyan);
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, var(--primary-cyan), transparent);
        }

        .plans-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }

        /* Card de Plano */
        .plan-card {
            background: var(--card-bg);
            border: 1px solid rgba(0, 240, 255, 0.2);
            border-radius: 16px;
            padding: 35px 25px;
            position: relative;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .plan-card:hover {
            transform: translateY(-8px);
            border-color: var(--primary-cyan);
            box-shadow: 0 10px 30px var(--glow-cyan);
        }

        .plan-card.highlight {
            border: 2px solid var(--primary-cyan);
            background: linear-gradient(180deg, rgba(0, 240, 255, 0.08) 0%, var(--card-bg) 100%);
        }

        .popular-badge {
            position: absolute;
            top: -12px;
            right: 20px;
            background: var(--primary-cyan);
            color: #000;
            font-weight: 800;
            font-size: 0.8rem;
            padding: 4px 12px;
            border-radius: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .plan-header {
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 20px;
            margin-bottom: 20px;
        }

        .plan-speed {
            font-family: 'Orbitron', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: #fff;
        }

        .plan-price {
            font-size: 2.8rem;
            font-weight: 800;
            color: var(--primary-cyan);
            margin: 10px 0;
        }

        .plan-price span {
            font-size: 1rem;
            color: var(--text-sub);
            font-weight: 500;
        }

        .plan-features {
            list-style: none;
            margin-bottom: 30px;
        }

        .plan-features li {
            padding: 8px 0;
            color: var(--text-sub);
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.05rem;
        }

        .plan-features li i {
            color: var(--primary-cyan);
        }

        /* Botão Principal */
        .btn-action {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 14px;
            background: linear-gradient(90deg, #00f0ff, #0088ff);
            color: #000;
            font-family: 'Orbitron', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 240, 255, 0.3);
        }

        .btn-action:hover {
            box-shadow: 0 0 25px var(--primary-cyan);
            transform: scale(1.02);
            color: #000;
        }

        /* Seção Starlink */
        .starlink-card {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 35px;
            display: grid;
            grid-template-columns: 1fr 250px;
            align-items: center;
            gap: 30px;
            position: relative;
            overflow: hidden;
        }

        .starlink-card::before {
            content: "";
            position: absolute;
            top: 0; right: 0;
            width: 200px; height: 200px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
            z-index: 0;
        }

        .starlink-info {
            position: relative;
            z-index: 1;
        }

        .starlink-info h2 {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.8rem;
            color: #fff;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .starlink-info p {
            color: var(--text-sub);
            font-size: 1.1rem;
            line-height: 1.5;
        }

        .btn-starlink {
            background: linear-gradient(90deg, #10b981, #059669);
            color: #fff;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            position: relative;
            z-index: 1;
        }

        .btn-starlink:hover {
            box-shadow: 0 0 25px rgba(16, 185, 129, 0.6);
            color: #fff;
        }

        /* Animações */
        @keyframes pulse {
            0% { box-shadow: 0 0 5px var(--glow-cyan); }
            100% { box-shadow: 0 0 20px var(--glow-cyan); }
        }

        /* Responsividade */
        @media (max-width: 768px) {
            h1 { font-size: 2rem; }
            .starlink-card {
                grid-template-columns: 1fr;
                text-align: center;
            }
            .starlink-info h2 {
                justify-content: center;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <div class="badge-tech"><i class="fa-solid fa-microchip"></i> WKB Telecom</div>
            <h1>Conectividade de Alta Performance</h1>
            <p class="subtitle">Tecnologia em Fibra Óptica e Soluções de Conexão Satelital</p>
        </header>

        <div class="section-title">
            <i class="fa-solid fa-bolt"></i> Planos Fibra Óptica
        </div>

        <div class="plans-grid">
            <div class="plan-card">
                <div>
                    <div class="plan-header">
                        <div class="plan-speed"><i class="fa-solid fa-wifi"></i> 200 MB</div>
                        <div class="plan-price">R$ 100 <span>/mês</span></div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-circle-check"></i> 100% Fibra Óptica</li>
                        <li><i class="fa-solid fa-circle-check"></i> Wi-Fi Dual Band Incluso</li>
                        <li><i class="fa-solid fa-circle-check"></i> Baixa Latência / Sem Lag</li>
                        <li><i class="fa-solid fa-circle-check"></i> Suporte Técnico Rápido</li>
                    </ul>
                </div>
                <a href="<?php echo $link_200mb; ?>" target="_blank" class="btn-action">
                    <i class="fa-brands fa-whatsapp"></i> Contratar Agora
                </a>
            </div>

            <div class="plan-card highlight">
                <div class="popular-badge">Ultra Gamer</div>
                <div>
                    <div class="plan-header">
                        <div class="plan-speed"><i class="fa-solid fa-rocket"></i> 1 GIGA</div>
                        <div class="plan-price">R$ 149 <span>/mês</span></div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-circle-check"></i> Ultra Velocidade Giga</li>
                        <li><i class="fa-solid fa-circle-check"></i> Roteador High Performance</li>
                        <li><i class="fa-solid fa-circle-check"></i> Ideal para Streaming 4K / Jogos</li>
                        <li><i class="fa-solid fa-circle-check"></i> Prioridade de Banda na Rede</li>
                    </ul>
                </div>
                <a href="<?php echo $link_1gb; ?>" target="_blank" class="btn-action">
                    <i class="fa-brands fa-whatsapp"></i> Contratar Agora
                </a>
            </div>
        </div>

        <div class="section-title">
            <i class="fa-solid fa-satellite"></i> Conexão Via Satélite
        </div>

        <div class="starlink-card">
            <div class="starlink-info">
                <h2><i class="fa-solid fa-satellite-dish" style="color: var(--primary-cyan);"></i> Internet Starlink</h2>
                <p>Precisa de internet ultrarrápida em locais sem cobertura de fibra? Adquira já o seu Kit Starlink completo com auxílio de instalação e suporte especializado da WKB Sistemas.</p>
            </div>
            <div>
                <a href="<?php echo $link_starlink; ?>" target="_blank" class="btn-action btn-starlink">
                    <i class="fa-brands fa-whatsapp"></i> Adquirir Material
                </a>
            </div>
        </div>
    </div>

</body>
</html>
