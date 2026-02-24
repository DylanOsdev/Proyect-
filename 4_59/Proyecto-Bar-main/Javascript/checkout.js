/* =========================================
   LÓGICA CHECKOUT (Cálculos + Modal)
   ========================================= */

const BASE_TOTAL = 67000; // Subtotal fijo de ejemplo

// 1. Cambiar Envío y Recalcular
function actualizarEnvio(costoEnvio) {
    // Actualizar texto envío
    const textoEnvio = costoEnvio === 0 ? "GRATIS" : `$${costoEnvio.toLocaleString()}`;
    document.getElementById("shipping-cost").innerText = textoEnvio;
    document.getElementById("shipping-cost").className = costoEnvio === 0 ? "fw-bold text-success" : "fw-bold text-dark";

    // Recalcular Total
    const totalFinal = BASE_TOTAL + costoEnvio;
    document.getElementById("total-cost").innerText = `$${totalFinal.toLocaleString()}`;
}

// 2. Toggle Tarjeta de Crédito
document.querySelectorAll('input[name="payment"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        const cardForm = document.getElementById("card-form-details");
        if (event.target.id === "payCard") {
            cardForm.classList.remove("d-none");
        } else {
            cardForm.classList.add("d-none");
        }
    });
});

// 3. Procesar Pedido (Botón Pagar)
function procesarPedido() {
    // Validar correo invitado (Simulado)
    const emailInput = document.getElementById('inputEmailInvitado');
    const email = emailInput.value || "invitado@correo.com"; // Fallback si está vacío

    // Animación de Carga
    const btn = document.querySelector('button[onclick="procesarPedido()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Procesando pago...';
    btn.disabled = true;

    // Simular tiempo de espera (2 seg)
    setTimeout(() => {
        // Restaurar botón
        btn.innerHTML = originalText;
        btn.disabled = false;

        // Poner correo en el modal
        document.getElementById('email-confirm').innerText = email;

        // Mostrar Modal Éxito
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
    }, 2000);
}