// Navegación
function navigate(viewId, btn) {
    document.querySelectorAll('section').forEach(el => { el.classList.remove('d-block'); el.classList.add('d-none'); });
    const target = document.getElementById('view-' + viewId);
    if(target) { target.classList.remove('d-none'); target.classList.add('d-block'); void target.offsetWidth; target.classList.add('fade-in'); }
    
    const titles = { 'dashboard': 'Visión General', 'inventario': 'Gestión de Inventario', 'finanzas': 'Finanzas y Caja', 'logistica': 'Torre de Control', 'usuarios': 'Gestión de Acceso', 'auditoria': 'Seguridad', 'soporte': 'Mesa de Ayuda' };
    document.getElementById('page-title').innerText = titles[viewId] || 'Admin';

    if(btn) { document.querySelectorAll('.list-group-item').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
}

function abrirModal(id) { new bootstrap.Modal(document.getElementById(id)).show(); }
document.getElementById('menu-toggle').onclick = function() { document.getElementById('wrapper').classList.toggle('toggled'); }

// Gráficas
document.addEventListener("DOMContentLoaded", function() {
    Chart.defaults.color = '#888'; Chart.defaults.borderColor = '#2a2a2a';
    
    const ctx1 = document.getElementById('chartVentas').getContext('2d');
    let gradient = ctx1.createLinearGradient(0, 0, 0, 400); gradient.addColorStop(0, 'rgba(212, 175, 55, 0.2)'); gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
    
    new Chart(ctx1, {
        type: 'line',
        data: { labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], datasets: [{ label: 'Ventas', data: [1200, 1900, 1500, 2500, 3200, 4200, 3800], borderColor: '#D4AF37', backgroundColor: gradient, tension: 0.4, fill: true }, { label: 'Costos', data: [800, 1200, 900, 1600, 2000, 2800, 2500], borderColor: '#c0392b', borderDash: [5, 5], tension: 0.4, fill: false }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } }, scales: { y: { grid: { borderDash: [5, 5] } } } }
    });

    const ctx2 = document.getElementById('chartProductos').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: { labels: ['Rones', 'Aguardiente', 'Cervezas'], datasets: [{ data: [45, 30, 25], backgroundColor: ['#D4AF37', '#888888', '#222222'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right' } } }
    });
});