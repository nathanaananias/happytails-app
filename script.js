// NAVEGAÇÃO ENTRE ECRÃS PRINCIPAIS
function showScreen(screenId) {
    document.querySelectorAll('.view-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// NAVEGAÇÃO POR ABAS NO DASHBOARD
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById('tab-' + tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Inicializa o mapa ao abrir a aba Pet Táxi
    if(tabId === 'pettaxi') {
        setTimeout(initMap, 200);
    }
}

// SALVAR PERFIL DO TUTOR E DO CÃO
function saveProfile(e) {
    e.preventDefault();
    const tutorName = document.getElementById('tutor-name').value || 'Tutor';
    alert(`Dados salvos com sucesso para ${tutorName}!`);
}

// MODAL DE VISUALIZAÇÃO DE FOTOS
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

// ALERTA AO CONFIRMAR AGENDAMENTO
function handleBooking(e) {
    e.preventDefault();
    alert('Agendamento realizado com sucesso! Pode consultar o estado na aba Notificações.');
    openTab('notificacoes');
}

// GRÁFICO DE ALIMENTAÇÃO CENTRALIZADO
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

// MAPA INTERATIVO (LEAFLET)
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