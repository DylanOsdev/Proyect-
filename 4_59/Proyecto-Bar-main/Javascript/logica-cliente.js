/* =========================================
   LÓGICA CLIENTE SPA
   ========================================= */

function navigate(viewId, btn) {
    // 1. Ocultar todas las secciones
    document.querySelectorAll('section').forEach(el => {
        el.classList.remove('d-block');
        el.classList.add('d-none');
    });

    // 2. Mostrar la seleccionada
    const target = document.getElementById('view-' + viewId);
    if(target) {
        target.classList.remove('d-none');
        target.classList.add('d-block');
        
        // Reiniciar animación
        void target.offsetWidth; 
        target.classList.add('fade-in');
    }

    // 3. Activar botón del menú (si aplica)
    if(btn) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// Funciones para Modales
function abrirModal(id) {
    const modal = new bootstrap.Modal(document.getElementById(id));
    modal.show();
}