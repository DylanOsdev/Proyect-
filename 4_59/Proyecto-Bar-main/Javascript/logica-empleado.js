/* ==================================================
   SISTEMA OPERATIVO EMPLEADO (LÓGICA COMPLETA)
   ================================================== */

// ESTADO GLOBAL (Simulación de BD)
let sistema = {
    efectivo: 450000,
    entregas: 12,
    otpReal: "4590",
    enLinea: true
};

// 1. SISTEMA DE NAVEGACIÓN (SPA)
function cambiarVista(vistaId, elementoMenu) {
    // A. Ocultar todas las secciones
    document.querySelectorAll('.vista-seccion').forEach(el => {
        el.classList.add('d-none');
        el.classList.remove('fade-in'); // Reset animación
    });

    // B. Mostrar la seleccionada
    const target = document.getElementById('vista-' + vistaId);
    if(target) {
        target.classList.remove('d-none');
        void target.offsetWidth; // Trigger reflow para reiniciar animación
        target.classList.add('fade-in');
    }

    // C. Actualizar Título
    const titulos = {
        'dashboard': 'Panel Operativo',
        'reparto': 'Zona de Logística',
        'pos': 'Caja Rápida (POS)',
        'historial': 'Historial de Turnos',
        'perfil': 'Mi Perfil'
    };
    document.getElementById('titulo-pagina').innerText = titulos[vistaId] || 'Staff';

    // D. Activar botón del menú
    if(elementoMenu) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        elementoMenu.classList.add('active');
    }

    // E. Cerrar menú en móvil automáticamente
    if(window.innerWidth < 768) {
        document.getElementById("wrapper").classList.remove("toggled");
    }
}

// 2. TOGGLE SIDEBAR
document.getElementById("menu-toggle").onclick = function() {
    document.getElementById("wrapper").classList.toggle("toggled");
};

// 3. SWITCH DISPONIBILIDAD
function toggleDisponibilidad() {
    const check = document.getElementById("switchEstado");
    const label = document.getElementById("labelEstado");
    
    if(check.checked) {
        label.innerHTML = "EN LÍNEA 🟢";
        label.classList.replace("text-danger", "text-neon-green");
        sistema.enLinea = true;
    } else {
        label.innerHTML = "OFFLINE 🔴";
        label.classList.replace("text-neon-green", "text-danger");
        sistema.enLinea = false;
        alert("⚠️ ATENCIÓN: No recibirás nuevos pedidos mientras estés desconectado.");
    }
}

// 4. LÓGICA POS (CAJA)
function actualizarTotalPOS() {
    const select = document.getElementById("selectProducto");
    const price = parseFloat(select.options[select.selectedIndex].getAttribute("data-price")) || 0;
    const qty = document.getElementById("posCantidad").value;
    const total = price * qty;

    const formato = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total);
    document.getElementById("posTotal").value = formato;
    document.getElementById("posTotal").setAttribute("data-raw", total);
}

function procesarVentaPOS() {
    const total = parseFloat(document.getElementById("posTotal").getAttribute("data-raw"));
    const producto = document.getElementById("selectProducto").options[document.getElementById("selectProducto").selectedIndex].text;

    if(!total) return alert("⚠️ Selecciona un producto primero.");

    if(confirm(`¿Confirmar venta de: ${producto}?\nTotal: ${document.getElementById("posTotal").value}`)) {
        // Actualizar Sistema
        sistema.efectivo += total;
        actualizarKPIs();
        
        alert("✅ VENTA REGISTRADA\n- Inventario descontado.\n- Efectivo actualizado.");
        
        // Reset
        document.getElementById("posCantidad").value = 1;
        document.getElementById("selectProducto").value = "0";
        actualizarTotalPOS();
    }
}

// 5. LÓGICA REPARTO (OTP)
function validarEntrega() {
    const otp = document.getElementById("inputOTP").value;
    const checkEdad = document.getElementById("checkEdad").checked;

    if(!checkEdad) return alert("⚠️ REQUISITO LEGAL: Debes verificar la cédula (+18) antes de entregar.");

    if(otp === sistema.otpReal) {
        alert("✅ CÓDIGO CORRECTO\n\n- Pedido #1024 cerrado.\n- Trigger activado: Repartidor liberado.\n- Cliente notificado.");
        
        // Simulación visual de "Sin pedidos"
        document.getElementById("contenido-pedido").innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-check-circle text-success" style="font-size: 5rem;"></i>
                <h3 class="text-white mt-4">¡Buen trabajo!</h3>
                <p class="text-white-50">Esperando asignación de nuevos pedidos...</p>
                <div class="spinner-border text-neon-green mt-3" role="status"></div>
            </div>
        `;
        document.getElementById("tarjeta-pedido").classList.remove("card-active-order");
        
        sistema.entregas++;
        sistema.efectivo += 55000; // Valor del pedido ejemplo
        actualizarKPIs();
        
    } else {
        alert("❌ CÓDIGO INCORRECTO\nPídelo nuevamente al cliente.");
        document.getElementById("inputOTP").value = "";
        document.getElementById("inputOTP").focus();
    }
}

// 6. ARQUEO DE CAJA
var modalArqueo;
function abrirModalArqueo() {
    modalArqueo = new bootstrap.Modal(document.getElementById('modalArqueo'));
    actualizarKPIs(); // Para asegurar que el valor esperado esté al día
    modalArqueo.show();
}

function verificarArqueo() {
    const real = parseFloat(document.getElementById("arqueoReal").value);
    const esperado = sistema.efectivo;
    const alerta = document.getElementById("arqueoResultado");
    const btn = document.getElementById("btnCerrarTurno");

    alerta.classList.remove("d-none", "alert-danger", "alert-success");

    if(real === esperado) {
        alerta.classList.add("alert-success");
        alerta.innerHTML = "✅ <strong>CUADRE PERFECTO</strong>. Puedes cerrar turno.";
        btn.disabled = false;
    } else {
        const diff = real - esperado;
        alerta.classList.add("alert-danger");
        alerta.innerHTML = `⚠️ <strong>DESCUADRE</strong><br>Diferencia: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(diff)}`;
        btn.disabled = true;
    }
}

// UTILIDADES
function actualizarKPIs() {
    const formatoDinero = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(sistema.efectivo);
    document.getElementById("kpiEntregas").innerText = sistema.entregas;
    document.getElementById("kpiDinero").innerText = formatoDinero;
    document.getElementById("arqueoSistema").innerText = formatoDinero;
}

function reportarNovedad() {
    prompt("Describe la novedad para el Admin:");
    alert("Incidente reportado y guardado en auditoría.");
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    actualizarKPIs();
});