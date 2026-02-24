/* =========================================
   LÓGICA DEL CLUB VIP
   ========================================= */

// 1. Manejo del Formulario de Suscripción
document.getElementById('vipForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recargar la página

    // Capturar datos
    const email = document.getElementById('inputEmail').value;
    const terms = document.getElementById('checkTerms').checked;

    if (email && terms) {
        // Poner el correo en el modal
        document.getElementById('correoConfirmacion').innerText = email;
        
        // Mostrar Modal de Éxito
        const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
        modalExito.show();

        // (Opcional) Limpiar formulario
        this.reset();
    }
});

// 2. Manejo del Modal Legal (Click en el enlace)
document.getElementById('btnLegal').addEventListener('click', function(event) {
    event.preventDefault();
    const modalLegal = new bootstrap.Modal(document.getElementById('modalLegal'));
    modalLegal.show();
});