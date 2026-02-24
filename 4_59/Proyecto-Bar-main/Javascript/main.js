// -------------------------
// BASE DE DATOS DE PRODUCTOS
// -------------------------
const PRODUCTOS_DB = [
    { id: 1, nombre: "Vuse Go 5000 Blue Rapberry 34mg (Mora Azul)", precio: 50000, categoria: "Vape", imagen: "img/vaperjs.webp", stock: 15 },
    { id: 2, nombre: "Ron Viejo de Caldas Tradicional", precio: 32000, categoria: "Media", imagen: "img/rvctrad.jpg", stock: 8 },
    { id: 3, nombre: "Ron Viejo de Caldas Esencial", precio: 26000, categoria: "Media", imagen: "img/rcvEsencial.jpg", stock: 12 },
    { id: 4, nombre: "Ron Viejo de Caldas Carta De Oro", precio: 54000, categoria: "Media", imagen: "img/rvc8años.jpg", stock: 5 },
    { id: 5, nombre: "Aguardiente Amarillo De Manzanares", precio: 33000, categoria: "Media", imagen: "img/catalogo/Manzanares.jpg", stock: 25 },
    { id: 6, nombre: "Aguardiente Antioqueño Azúl", precio: 28900, categoria: "Media", imagen: "img/azul.jpg", stock: 18 },
    { id: 7, nombre: "Aguardiente Antioqueño Real", precio: 44000, categoria: "Botella", imagen: "img/botreal.jpg", stock: 7 },
    { id: 8, nombre: "Whisky Buchanan's Deluxe", precio: 180000, categoria: "Botella", imagen: "img/buchanas.webp", stock: 6 },
    { id: 9, nombre: "Black & White", precio: 33000, categoria: "Media", imagen: "img/black.jpg", stock: 6 },
    { id: 10, nombre: "Vodka Smirnoff Tamarindo Picante", precio: 60000, categoria: "Botella", imagen: "img/catalogo/tamarindo.jpg", stock: 6 },
    { id: 11, nombre: "Vodka Smirnoff Lulo", precio: 30000, categoria: "Media", imagen: "img/lulo.jpg", stock: 6 },
    { id: 12, nombre: "Aguardiente Antioqueño Verde Caja", precio: 51000, categoria: "Litro", imagen: "img/catalogo/tetraverde.jpg", stock: 6 }
];

// -------------------------
// FUNCIÓN PARA MOSTRAR PRODUCTOS
// -------------------------
function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    PRODUCTOS_DB.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
    <div class="img-container">
        <button class="btn-heart">
            <i class="far fa-heart"></i>
        </button>
        <img src="${producto.imagen}" class="product-img" alt="${producto.nombre}">
    </div>

    <h3 class="product-title">${producto.nombre}</h3>
    <p class="product-price">$${producto.precio.toLocaleString()}</p>
    <a href="producto-detalle.html" class="product-boton">Mostrar</a>
`;
        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos);

function agregarAlCarrito(id) {
    const producto = PRODUCTOS_DB.find(p => p.id === id);
    
    const itemEnCarrito = carrito.find(p => p.id === id);
    
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem('licorera_cart', JSON.stringify(carrito));
    actualizarContador();
    
    alert(`¡${producto.nombre} agregado a la canasta!`);
}

function actualizarContador() {
    const contador = document.getElementById('cart-count-badge');
    if(contador) {
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.innerText = total;
        contador.style.display = total > 0 ? 'flex' : 'none';
    }
}

window.agregarAlCarrito = agregarAlCarrito;

let brandAutoScroll;
    const brandContainer = document.getElementById('brandScrollPremium'); // Nuevo ID
    
    // --- PARÁMETROS OPTIMIZADOS PARA MOVIMIENTO SUAVE ---
    const scrollDelay = 50;  // ¡CAMBIO CLAVE! Mover cada 50 milisegundos
    const scrollStep = 2;    // Mover solo 2 píxeles a la vez
    // ---------------------------------------------------

    function autoBrandScroll() {
        if (brandContainer) {
            // Mueve la barra de scroll
            brandContainer.scrollLeft += scrollStep;
            
            // Si llegamos al final, vuelve al inicio suavemente
            if (brandContainer.scrollLeft >= brandContainer.scrollWidth - brandContainer.clientWidth) {
                // Pequeño delay para que el reinicio no sea tan brusco
                setTimeout(() => {
                    brandContainer.scrollLeft = 0;
                }, 50);
            }
        }
    }

    // Iniciar auto-scroll al cargar
    if (brandContainer) {
        // Ejecutar el movimiento cada 50ms (movimiento continuo)
        brandAutoScroll = setInterval(autoBrandScroll, scrollDelay);
        
        // Pausar al pasar el mouse
        brandContainer.addEventListener('mouseenter', () => {
            clearInterval(brandAutoScroll);
        });
        
        // Reanudar al salir del mouse
        brandContainer.addEventListener('mouseleave', () => {
            brandAutoScroll = setInterval(autoBrandScroll, scrollDelay);
        });
    }
    
    // Función para los botones manuales (se mantiene por si los quieres usar)
    function scrollMarcas(direction) {
        const container = document.getElementById('brandScrollPremium');
        const scrollAmount = 300;
        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }



