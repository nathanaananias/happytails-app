// NAVEGAÇÃO ENTRE ECRÃS PRINCIPAIS (LANDING PAGE E DASHBOARD)
function showScreen(screenId) {
    document.querySelectorAll('.view-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// NAVEGAÇÃO POR SEPARADORES/ABAS NO DASHBOARD
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById('tab-' + tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Inicializa o mapa do Pet Táxi ao abrir a respetiva aba
    if(tabId === 'pettaxi') {
        setTimeout(initMap, 200);
    }
}

// SOLICITAR PERMISSÃO DE NOTIFICAÇÃO PUSH (ONESIGNAL OU NATIVA COM AVISO)
function requestNotificationPermission() {
    // 1. Verifica se o navegador suporta notificações
    if (!("Notification" in window)) {
        alert("Este navegador ou dispositivo não suporta notificações push.");
        return;
    }

    // 2. Verifica se já estão permitidas
    if (Notification.permission === "granted") {
        alert("✅ As notificações já estão ativas neste dispositivo!");
        return;
    }

    // 3. Verifica se o utilizador bloqueou anteriormente
    if (Notification.permission === "denied") {
        alert("⚠️ As notificações estão bloqueadas nas definições do seu navegador.\n\nPara ativar: clique no ícone de cadeado ou definições ao lado do endereço do site (barra superior) e mude 'Notificações' para 'Permitir'.");
        return;
    }

    // 4. Se ainda não decidiu ("default"), força o pedido do OneSignal e do Navegador
    if (window.OneSignalDeferred) {
        window.OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.Slidedown.promptPush();
        });
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("✅ Notificações ativadas com sucesso!");
                new Notification("Happy Tails", {
                    body: "As suas notificações foram ativadas com sucesso!",
                    icon: "assets/logo.png"
                });
            }
        });
    }
}

// GUARDAR DADOS DO PERFIL
function saveProfile(e) {
    e.preventDefault();
    const tutorName = document.getElementById('tutor-name').value || 'Tutor';
    alert(`Dados salvos com sucesso para ${tutorName}!`);
}

// MODAL DE VISUALIZAÇÃO DE FOTOS DA GALERIA
function openImageModal(element) {
    const imgSrc = element.querySelector('img').src;
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    modal.style.display = "flex";
    modalImg.src = imgSrc;
}

function closeImageModal() {
    document.getElementById('image-modal').style.display = "none";
}

// CONFIRMAÇÃO DE AGENDAMENTO
function handleBooking(e) {
    e.preventDefault();
    alert('Agendamento realizado com sucesso! Pode consultar o estado no separador Avisos.');
    openTab('notificacoes');
}

// GRÁFICO DE ALIMENTAÇÃO (CHART.JS)
document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('feedingChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Gramas de Ração (g)',
                data: [300, 320, 300, 310, 300, 330, 300],
                backgroundColor: '#E8631C',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});

// MAPA INTERATIVO DO PET TÁXI (LEAFLET - COIMBRA)
let mapInitialized = false;
function initMap() {
    if (mapInitialized) return;
    
    const lat = 40.2033;
    const lng = -8.4103;

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup('<b>Pet Táxi Happy Tails</b><br>Viatura a caminho.')
        .openPopup();

    mapInitialized = true;
}