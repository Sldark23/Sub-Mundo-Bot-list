const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

const searchInput = document.getElementById('searchInput');
const botsList = document.getElementById('bots-list');

let bots = [];

// 🔥 Carregar bots do JSON
fetch('bots.json')
    .then(res => res.json())
    .then(data => {
        bots = data;
        renderBots();
    });

// 🔍 Renderizar bots
function renderBots(filter = '') {
    botsList.innerHTML = '';

    const filteredBots = bots.filter(bot => 
        bot.nome.toLowerCase().includes(filter.toLowerCase())
    );

    filteredBots.forEach(bot => {
        const botCard = document.createElement('div');
        botCard.className = 'bot-card';
        botCard.innerHTML = `
            <div class="bot-banner" style="background-image: url('${bot.plano_fundo}')"></div>
            <div class="bot-content">
                <img src="${bot.foto}" alt="${bot.nome}" class="bot-avatar">
                <h3>${bot.nome}</h3>
                <p class="headline">${bot.headline}</p>
                <p>${bot.descricao}</p>
                <a href="${bot.link_convite}" target="_blank" class="invite-btn">➕ Adicionar Bot</a>
                <div class="bot-info">
                    <p><strong>Dono:</strong> ${bot.dono}</p>
                    <p><strong>Criação:</strong> ${bot.data_criacao}</p>
                    <p><strong>Enviado:</strong> ${bot.data_envio}</p>
                </div>
            </div>
        `;
        botsList.appendChild(botCard);
    });
}

// Evento de pesquisa
searchInput.addEventListener('input', (e) => {
    renderBots(e.target.value);
});