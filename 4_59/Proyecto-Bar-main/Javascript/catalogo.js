// ------------------------------
// PRODUCTOS DE LICORERA REALISTAS
// ------------------------------
const products = [
    { id: 1, title: "Old Parr 12 Años 750ml", brand: "Old Parr", category: "Whisky", price: 125000, img: "img/catalogo/old.jpg" },
    { id: 2, title: "Old Parr 18 Años 750ml", brand: "Old Parr", category: "Whisky", price: 230000, img: "img/catalogo/ol18.jpg" },
    { id: 3, title: "Johnnie Walker Black Label", brand: "Johnnie Walker", category: "Whisky", price: 139000, img: "img/catalogo/black.jpg" },
    { id: 4, title: "Johnnie Walker Red Label", brand: "Johnnie Walker", category: "Whisky", price: 85000, img: "img/catalogo/red.jpg" },

    { id: 5, title: "Aguardiente Antioqueño Azul", brand: "Aguardiente", category: "Aguardiente", price: 42000, img: "img/catalogo/azul.jpg" },
    { id: 6, title: "Aguardiente Antioqueño Verde", brand: "Aguardiente", category: "Aguardiente", price: 38000, img: "img/catalogo/verde.jpg" },

    { id: 7, title: "Absolut Vodka 1L", brand: "Absolut", category: "Vodka", price: 95000, img: "img/catalogo/absolut.jpg" },
    { id: 8, title: "Smirnoff Vodka 750ml", brand: "Smirnoff", category: "Vodka", price: 65000, img: "img/catalogo/vodka.jpg" },

    { id: 9, title: "Bacardí Blanco 750ml", brand: "Bacardí", category: "Ron", price: 57000, img: "img/catalogo/Bacardi.jpg" },
    { id: 10, title: "Bacardí Añejo 750ml", brand: "Bacardí", category: "Ron", price: 67000, img: "img/catalogo/añejo.jpg" },

    { id: 11, title: "Cerveza Corona 355ml", brand: "Corona", category: "Cerveza", price: 4500, img: "img/catalogo/corona.jpg" },
    { id: 12, title: "Cerveza Heineken 330ml", brand: "Heineken", category: "Cerveza", price: 5000, img: "img/catalogo/heineken.jpg" },
    { id: 13, title: "Bacardí Blanco 750ml", brand: "Smirnoff sabor Tamarindo", category: "Vodka", price: 57000, img: "img/catalogo/tamarindo.jpg" },
    { id: 14, title: "Bacardí Añejo 750ml", brand: "Aguardiente Antioqueño verde", category: "Aguardiente", price: 67000, img: "img/catalogo/tetraverde.jpg" },

    { id: 15, title: "Vaper 5000 puf", brand: "Vaps", category: "Vaps", price: 24500, img: "img/catalogo/vaper.png" },
    { id: 16, title: "Aguadiente Amarillo Manzanares", brand: "Amarillo", category: "Aguardiente", price: 5000, img: "img/catalogo/Manzanares.jpg" },
];  

// ------------------------------
// Cargar productos
// ------------------------------
const container = document.getElementById("products-container");

function loadProducts(list) {
    // Asegúrate de que 'container' esté definido (ej: const container = document.getElementById('products-container');)
    container.innerHTML = ""; 

    list.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <div class="img-container">
                    <button class="btn-heart">
                        <i class="far fa-heart"></i>
                    </button>
                    <img src="${p.img}" class="product-img" alt="${p.title}">
                </div>

                <h3 class="product-title">${p.title}</h3>
                <p class="product-price">$${p.price.toLocaleString()}</p>
                
                <a href="producto-detalle.html" class="product-boton">Mostrar</a>
                
                </div>`;
    });
}

// Ejecutar la función (asegúrate que la variable 'products' existe y tiene datos)
loadProducts(products);

// ------------------------------
// FILTROS
// ------------------------------
const filterBrand = document.getElementById("filter-brand");
const filterCategory = document.getElementById("filter-category");
const filterPrice = document.getElementById("filter-price");
const priceValue = document.getElementById("price-value");

function applyFilters() {
    let brand = filterBrand.value;
    let categ = filterCategory.value;
    let maxPrice = parseInt(filterPrice.value);

    priceValue.textContent = maxPrice;

    let filtered = products.filter(p =>
        (brand === "all" || p.brand === brand) &&
        (categ === "all" || p.category === categ) &&
        p.price <= maxPrice
    );

    loadProducts(filtered);
}

filterBrand.onchange = applyFilters;
filterCategory.onchange = applyFilters;
filterPrice.oninput = applyFilters;

// ------------------------------
// CARRITO
// ------------------------------
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        cartList.innerHTML += `<li>${item.title} - $${item.price.toLocaleString()}</li>`;
        total += item.price;
    });

    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.length;
}
