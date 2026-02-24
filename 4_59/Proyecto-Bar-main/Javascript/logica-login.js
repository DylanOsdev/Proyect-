/* =========================================
   LÓGICA LOGIN STAFF (Dinámico)
   ========================================= */

// Configuración
const config = {
    admin: {
        bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920', // Oficina Moderna
        title: 'Gestión Central',
        subtitle: 'Control total de inventario y finanzas.',
        color: '#8e44ad',
        btnText: 'ENTRAR COMO ADMIN',
        url: 'dashboard-admin.html' // Archivo del Dashboard Admin
    },
    employee: {
        bg: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1920', // Repartidor / Moto
        title: 'Zona Operativa',
        subtitle: 'Gestión de entregas y caja rápida.',
        color: '#27ae60',
        btnText: 'ENTRAR COMO STAFF',
        url: 'dashboard-empleado.html' // Archivo del Dashboard Empleado
    }
};

let currentRole = 'admin';

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cambiarRol('admin'); // Cargar estado inicial
});

// Función de Cambio de Rol
function cambiarRol(rol) {
    currentRole = rol;
    const data = config[rol];

    // 1. Actualizar Imagen y Textos (Lado Izquierdo)
    const imgContainer = document.getElementById('hero-image');
    imgContainer.style.backgroundImage = `url('${data.bg}')`;
    imgContainer.className = `col-lg-7 d-none d-lg-block login-image ${rol}`; // Cambia clase para el gradiente CSS
    
    document.getElementById('info-title').innerText = data.title;
    document.getElementById('info-subtitle').innerText = data.subtitle;

    // 2. Actualizar Formulario (Lado Derecho)
    document.getElementById('welcome-message').innerText = `Bienvenido, ${rol === 'admin' ? 'Administrador' : 'Colaborador'}`;
    
    const btn = document.getElementById('login-button');
    btn.innerText = data.btnText;
    btn.style.backgroundColor = data.color;

    // 3. Actualizar Switch
    document.querySelectorAll('.role-option').forEach(el => el.classList.remove('active'));
    document.getElementById(`btn-${rol}`).classList.add('active');
}

// Manejo del Submit
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulación de carga
    const btn = document.getElementById('login-button');
    const originalText = btn.innerText;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    btn.disabled = true;

    setTimeout(() => {
        // Redirección Exitosa
        window.location.href = config[currentRole].url;
    }, 1500);
});