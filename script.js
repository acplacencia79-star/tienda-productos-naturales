// ==========================================
// 1. ESTADO DE LA APLICACIÓN Y DATOS INICIALES
// ==========================================

// Lista base de productos naturales FWP
const catalogoInicial = [
  {
    id: 1,
    nombre: "Moringa Orgánica en Polvo 250g",
    categoria: "Superalimentos",
    precio: 35.00,
    descripcion: "Rica en antioxidantes, hierro y vitaminas esenciales para la energía diaria."
  },
  {
    id: 2,
    nombre: "Colágeno Hidrolizado + Camu Camu",
    categoria: "Suplementos",
    precio: 65.00,
    descripcion: "Fórmula regeneradora enriquecida con vitamina C natural para piel y articulaciones."
  },
  {
    id: 3,
    nombre: "Aceite de Coco Prensado en Frío 500ml",
    categoria: "Cuidado Personal",
    precio: 28.00,
    descripcion: "100% puro y virgen para uso cosmético, capilar o preparación saludable de comidas."
  },
  {
    id: 4,
    nombre: "Infusión Herbal Relax (Valeriana + Toronjil)",
    categoria: "Infusiones",
    precio: 18.50,
    descripcion: "Mezcla botánica relajante libre de preservantes para favorecer el descanso nocturno."
  }
];

// Cargar catálogo y carrito desde localStorage (persistencia en navegador)
let productos = JSON.parse(localStorage.getItem('fwp_catalogo')) || catalogoInicial;
let carrito = JSON.parse(localStorage.getItem('fwp_carrito')) || [];

// ==========================================
// 2. REFERENCIAS A ELEMENTOS DEL DOM
// ==========================================
const contenedorProductos = document.getElementById('contenedor-productos');
const inputBuscador = document.getElementById('buscador');
const contadorCarrito = document.getElementById('contador-carrito');
const panelCarrito = document.getElementById('panel-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalPrecio = document.getElementById('total-precio');

// Botones de control
const btnAbrirCarrito = document.getElementById('btn-abrir-carrito');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
const btnVaciar = document.getElementById('btn-vaciar');
const btnCheckout = document.getElementById('btn-checkout');

// Módulo de creación
const seccionFormulario = document.getElementById('seccion-formulario');

const btnCancelarForm = document.getElementById('btn-cancelar-form');
const formulario = document.getElementById('formulario-producto');

// ==========================================
// 3. FUNCIONES DE RENDERIZADO (VISTA)
// ==========================================

// Dibuja las tarjetas de productos en el HTML
function renderizarCatalogo(lista) {
  contenedorProductos.innerHTML = '';

  if (lista.length === 0) {
    contenedorProductos.innerHTML = '<p class="carrito-vacio">No se encontraron productos coincidentes.</p>';
    return;
  }

  lista.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img-wrap">${prod.categoria}</div>
      <div class="card-body">
        <span class="badge-cat">${prod.categoria}</span>
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <div class="card-footer">
          <span class="precio">S/ ${prod.precio.toFixed(2)}</span>
          <button class="btn-agregar" onclick="agregarAlCarrito(${prod.id})">Agregar</button>
        </div>
      </div>
    `;
    contenedorProductos.appendChild(card);
  });
}

// Dibuja el contenido del carrito lateral
function renderizarCarrito() {
  contadorCarrito.textContent = carrito.length;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li class="carrito-vacio">No hay productos seleccionados.</li>';
    totalPrecio.textContent = 'S/ 0.00';
    return;
  }

  listaCarrito.innerHTML = '';
  let sumaTotal = 0;

  carrito.forEach((item, index) => {
    sumaTotal += item.precio;
    const li = document.createElement('li');
    li.className = 'item-carrito';
    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br>
        <small>S/ ${item.precio.toFixed(2)}</small>
      </div>
      <button class="btn-secundario" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;" onclick="eliminarDelCarrito(${index})">✕</button>
    `;
    listaCarrito.appendChild(li);
  });

  totalPrecio.textContent = `S/ ${sumaTotal.toFixed(2)}`;
}

// ==========================================
// 4. LÓGICA DE NEGOCIO Y OPERACIONES
// ==========================================

// Guardar estados en localStorage
function sincronizarStorage() {
  localStorage.setItem('fwp_catalogo', JSON.stringify(productos));
  localStorage.setItem('fwp_carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
window.agregarAlCarrito = function(id) {
  const seleccionado = productos.find(p => p.id === id);
  if (seleccionado) {
    carrito.push(seleccionado);
    sincronizarStorage();
    renderizarCarrito();
  }
};

// Eliminar un producto del carrito por su índice
window.eliminarDelCarrito = function(index) {
  carrito.splice(index, 1);
  sincronizarStorage();
  renderizarCarrito();
};

// ==========================================
// 5. EVENTOS Y CONTROLADORES (EVENT LISTENERS)
// ==========================================

// Buscador en tiempo real
inputBuscador.addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase().trim();
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(termino) ||
    p.categoria.toLowerCase().includes(termino) ||
    p.descripcion.toLowerCase().includes(termino)
  );
  renderizarCatalogo(productosFiltrados);
});

// Control del panel del carrito
btnAbrirCarrito.addEventListener('click', () => panelCarrito.classList.remove('oculto'));
btnCerrarCarrito.addEventListener('click', () => panelCarrito.classList.add('oculto'));

// Vaciar carrito
btnVaciar.addEventListener('click', () => {
  carrito = [];
  sincronizarStorage();
  renderizarCarrito();
});

// Finalizar pedido (simulación de checkout con resumen)
btnCheckout.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  const total = totalPrecio.textContent;
  alert(`¡Pedido recibido con éxito!\nTotal a pagar: ${total}\nNos contactaremos para coordinar la entrega.`);
  carrito = [];
  sincronizarStorage();
  renderizarCarrito();
  panelCarrito.classList.add('oculto');
});

// Mostrar / Ocultar panel de nuevo producto

btnCancelarForm.addEventListener('click', () => seccionFormulario.classList.add('oculto'));

// Guardar nuevo producto desde el formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recargar la página

  const nuevoProducto = {
    id: Date.now(), // ID numérico único basado en timestamp
    nombre: document.getElementById('prod-nombre').value.trim(),
    categoria: document.getElementById('prod-categoria').value,
    precio: parseFloat(document.getElementById('prod-precio').value),
    descripcion: document.getElementById('prod-desc').value.trim()
  };

  productos.push(nuevoProducto);
  sincronizarStorage();
  renderizarCatalogo(productos);

  // Limpiar campos y cerrar formulario
  formulario.reset();
  seccionFormulario.classList.add('oculto');
  alert('Producto natural agregado al catálogo exitosamente.');
});

// ==========================================
// 6. INICIALIZACIÓN
// ==========================================
renderizarCatalogo(productos);
renderizarCarrito();


// ==========================================
// CONTROL DE ACCESO (ADMINISTRACIÓN)
// ==========================================
let esAdministrador = false;
const CLAVE_SECRETA = "admin123";

// Referencias a elementos del modal
const btnLoginAdmin = document.getElementById('btn-login-admin');
const modalLogin = document.getElementById('modal-login');
const inputPassword = document.getElementById('input-password');
const btnValidarPass = document.getElementById('btn-validar-pass');
const btnCancelarLogin = document.getElementById('btn-cancelar-login');
const mensajeErrorLogin = document.getElementById('mensaje-error-login');

// Abrir modal o cerrar sesión
btnLoginAdmin.addEventListener('click', () => {
  if (esAdministrador) {
    esAdministrador = false;
    btnLoginAdmin.textContent = "⚙️ Gestión del Negocio";
    seccionFormulario.classList.add('oculto');
    alert("Sesión de administración finalizada.");
  } else {
    modalLogin.classList.remove('oculto');
    inputPassword.value = '';
    mensajeErrorLogin.classList.add('oculto');
    inputPassword.focus();
  }
});

// Cerrar modal sin autenticar
btnCancelarLogin.addEventListener('click', () => {
  modalLogin.classList.add('oculto');
});

// Validar credencial
btnValidarPass.addEventListener('click', () => {
  if (inputPassword.value === CLAVE_SECRETA) {
    esAdministrador = true;
    modalLogin.classList.add('oculto');
    seccionFormulario.classList.remove('oculto'); // Muestra panel de carga
    btnLoginAdmin.textContent = "🔒 Cerrar Modo Gestión";
  } else {
    mensajeErrorLogin.classList.remove('oculto');
  }
});