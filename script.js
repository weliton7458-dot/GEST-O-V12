l/* ==========================================================================
   WKB SISTEMAS E SEGURANÇA - SCRIPT JS PRINCIPAL
   Controle de Interatividade, Navegação, Simulador Solar e WhatsApp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile (Hambúrguer)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar num link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Lógica do Formulário de Orçamento (WhatsApp Dinâmico)
    const orcForm = document.getElementById('orcamento-form');
    if (orcForm) {
        orcForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('orc_nome').value.trim();
            const empresa = document.getElementById('orc_empresa').value.trim() || 'Não informada';
            const telefone = document.getElementById('orc_telefone').value.trim();
            const cidade = document.getElementById('orc_cidade').value.trim();
            const endereco = document.getElementById('orc_endereco').value.trim();
            const servico = document.getElementById('orc_servico').value;
            const descricao = document.getElementById('orc_descricao').value.trim();
            const obs = document.getElementById('orc_obs').value.trim() || 'Nenhuma';

            const mensagem = `Olá, WKB Sistemas e Segurança! Gostaria de solicitar um orçamento.

*Nome:* ${nome}
*Empresa:* ${empresa}
*Telefone:* ${telefone}
*Cidade:* ${cidade}
*Endereço:* ${endereco}
*Serviço:* ${servico}
*Descrição da necessidade:* ${descricao}
*Observações:* ${obs}

Aguardo o retorno com as informações e orçamento.`;

            const phone = "5593991192244";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    }

    // 3. Widget Flutuante & Chat Atendimento WhatsApp
    const waFloatBtn = document.getElementById('wa-float-btn');
    const waChatWindow = document.getElementById('wa-chat-window');
    const waCloseBtn = document.getElementById('wa-close-btn');
    const waSendBtn = document.getElementById('wa-send-btn');
    const waInputMsg = document.getElementById('wa-input-msg');

    if (waFloatBtn && waChatWindow) {
        waFloatBtn.addEventListener('click', () => {
            waChatWindow.classList.toggle('hidden');
        });

        waCloseBtn.addEventListener('click', () => {
            waChatWindow.classList.add('hidden');
        });

        const sendMsgToWA = (msg) => {
            if (!msg) return;
            const phone = "5593991192244";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        };

        waSendBtn.addEventListener('click', () => {
            const text = waInputMsg.value.trim();
            if (text) {
                sendMsgToWA(text);
                waInputMsg.value = '';
            }
        });

        waInputMsg.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = waInputMsg.value.trim();
                if (text) {
                    sendMsgToWA(text);
                    waInputMsg.value = '';
                }
            }
        });

        // Opções rápidas do Chat
        document.querySelectorAll('.chip-opt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const msg = e.target.getAttribute('data-msg');
                sendMsgToWA(msg);
            });
        });
    }

    // 4. LÓGICA DO SIMULADOR SOLAR WKB
    const stepIndicators = document.querySelectorAll('.sim-step-indicator');
    const stepContents = document.querySelectorAll('.sim-step-content');
    const btnNextList = document.querySelectorAll('.btn-next');
    const btnPrevList = document.querySelectorAll('.btn-prev');
    const sysRadioList = document.querySelectorAll('input[name="sys_type"]');
    const extraOffgridFields = document.getElementById('extra-offgrid-fields');
    const btnRunSim = document.getElementById('btn-run-sim');
    const btnSendSimWa = document.getElementById('btn-send-sim-wa');

    // Variável para guardar o resultado do cálculo
    let lastSimulationResult = null;

    // Alternar campos extras (Off-Grid / Híbrido) na Etapa 4
    sysRadioList.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'OFF-GRID' || val === 'HIBRIDO') {
                extraOffgridFields.classList.remove('hidden');
            } else {
                extraOffgridFields.classList.add('hidden');
            }
        });
    });

    // Navegação entre etapas do Simulador
    const goToStep = (stepNum) => {
        stepContents.forEach(content => content.classList.remove('active'));
        stepIndicators.forEach(ind => ind.classList.remove('active'));

        document.getElementById(`sim-step-${stepNum}`).classList.add('active');
        document.getElementById(`step-ind-${stepNum}`).classList.add('active');
    };

    btnNextList.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nextStep = e.target.getAttribute('data-next');
            goToStep(nextStep);
        });
    });

    btnPrevList.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prevStep = e.target.getAttribute('data-prev');
            goToStep(prevStep);
        });
    });

    // Motores de Cálculo de Energia Solar
    const calcOnGrid = (kWh, potModuloW) => {
        // Média de Irradiação Solar (Ex: Pará/Norte ~4.8 kWh/m²/dia)
        const irradia = 4.8;
        const perfFator = 0.75; // Perdas do sistema (25%)
        const kWpNecessario = kWh / (30 * irradia * perfFator);
        const modulos = Math.ceil((kWpNecessario * 1000) / potModuloW);
        
        return {
            potenciakWp: kWpNecessario.toFixed(2),
            modulos: modulos,
            storage: 'N/A (Rede Elétrica)'
        };
    };

    const calcOffGrid = (kWh, potModuloW, autonomia) => {
        const base = calcOnGrid(kWh, potModuloW);
        
        // Estimativa de Banco de Baterias em kWh (Consumo diário * dias de autonomia)
        const consumoDiario = kWh / 30;
        let fatorDias = 1;
        if (autonomia === '2 dias') fatorDias = 2;
        if (autonomia === '3 dias') fatorDias = 3;
        if (autonomia === 'Algumas horas') fatorDias = 0.5;

        const bancoBateriakWh = (consumoDiario * fatorDias).toFixed(1);
        const qtdBaterias12V200Ah = Math.ceil((bancoBateriakWh * 1000) / (12 * 200 * 0.5)); // 50% DOD

        return {
            potenciakWp: base.potenciakWp,
            modulos: base.modulos,
            storage: `~${bancoBateriakWh} kWh (${qtdBaterias12V200Ah} baterias 200Ah)`
        };
    };

    const calcHibrido = (kWh, potModuloW, autonomia) => {
        const base = calcOffGrid(kWh, potModuloW, autonomia);
        return {
            potenciakWp: base.potenciakWp,
            modulos: base.modulos,
            storage: `Híbrido: ${base.storage}`
        };
    };

    // Executar Cálculo ao Clicar
    if (btnRunSim) {
        btnRunSim.addEventListener('click', () => {
            const sysType = document.querySelector('input[name="sys_type"]:checked').value;
            const consumo = parseFloat(document.getElementById('sim_consumo').value) || 0;
            const valorConta = document.getElementById('sim_valor').value || 'Não informado';
            const distribuidora = document.getElementById('sim_distribuidora').value;
            const cidade = document.getElementById('sim_cidade').value || 'Não informada';
            const imovel = document.getElementById('sim_imovel').value;
            const modPot = parseInt(document.getElementById('sim_modulo_pot').value);
            const autonomia = document.getElementById('sim_autonomia').value;

            if (consumo <= 0) {
                alert('Por favor, informe um consumo mensal em kWh válido.');
                goToStep(2);
                return;
            }

            let res = null;
            if (sysType === 'ON-GRID') res = calcOnGrid(consumo, modPot);
            else if (sysType === 'OFF-GRID') res = calcOffGrid(consumo, modPot, autonomia);
            else res = calcHibrido(consumo, modPot, autonomia);

            // Atualizar UI do Resultado
            document.getElementById('res-consumo').innerText = `${consumo} kWh/mês`;
            document.getElementById('res-sistema').innerText = sysType;
            document.getElementById('res-potencia').innerText = `~${res.potenciakWp} kWp`;
            document.getElementById('res-modulos').innerText = `~${res.modulos} painéis`;
            document.getElementById('res-mod-pot').innerText = `${modPot} W`;
            document.getElementById('res-storage').innerText = res.storage;

            // Guardar dados para o WhatsApp
            lastSimulationResult = {
                cidade,
                imovel,
                distribuidora,
                consumo,
                valorConta,
                sysType,
                potenciakWp: res.potenciakWp,
                modulos: res.modulos,
                storage: res.storage,
                autonomia
            };

            goToStep(5);
        });
    }

    // Enviar Resultado do Simulador para o WhatsApp
    if (btnSendSimWa) {
        btnSendSimWa.addEventListener('click', () => {
            if (!lastSimulationResult) return;

            const d = lastSimulationResult;
            const msg = `Olá, WKB Sistemas e Segurança! Fiz uma simulação de energia solar pelo site e gostaria de receber um orçamento.

*Cidade:* ${d.cidade}
*Tipo de Imóvel:* ${d.imovel}
*Distribuidora:* ${d.distribuidora}
*Consumo Mensal:* ${d.consumo} kWh
*Valor Aproximado Conta:* R$ ${d.valorConta}
*Sistema Escolhido:* ${d.sysType}
*Potência Estimada:* ~${d.potenciakWp} kWp
*Quantidade Estimada de Módulos:* ~${d.modulos} módulos
*Armazenamento Estimado:* ${d.storage}
*Autonomia Desejada:* ${d.sysType !== 'ON-GRID' ? d.autonomia : 'N/A'}

Gostaria de receber uma avaliação e orçamento da WKB.`;

            const phone = "5593991192244";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }
});
