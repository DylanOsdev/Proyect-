/* =========================================
   LÓGICA ACCESO CLIENTE
   ========================================= */

// 1. Simulación de Login
function simularLogin(e) {
    e.preventDefault();
    
    // Efecto de carga en botón
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
    btn.disabled = true;

    // Simular demora de red
    setTimeout(() => {
        // Redirigir al Dashboard del Cliente
        window.location.href = 'dashboard-cliente.html';
    }, 1500);
}

// 2. Simulación de Registro con Validación de Edad
function simularRegistro(e) {
    e.preventDefault();
    
    // A. Validar Edad
    const fechaNacimiento = new Date(document.getElementById('regBirth').value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    // Ajuste fino por mes y día
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        alert("⛔ LO SENTIMOS\n\nDebes ser mayor de 18 años para registrarte en la Licorera Aranjuez.");
        return; // Detiene el registro
    }

    // B. Validar contraseñas
    const pass = document.getElementById('regPass').value;
    const confirm = document.getElementById('regConfirm').value;

    if(pass !== confirm) {
        alert("⚠️ Las contraseñas no coinciden.");
        return;
    }

    // Éxito
    alert("✅ ¡Cuenta creada con éxito!\nBienvenido al Club Aranjuez.");
    
    // Redirigir
    window.location.href = 'dashboard-cliente.html';
}

// 3. Utilidad para cambiar de pestaña desde enlace
function switchTab(tabId) {
    const tabTrigger = new bootstrap.Tab(document.getElementById(tabId));
    tabTrigger.show();
}