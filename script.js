// PRODUCTOS
const productos = [
  {
    id: 1,
    nombre: "Cachorro Labrador",
    precio: 800000,
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    descripcion: "El Labrador es amigable, inteligente y muy sociable."
  },
  {
    id: 2,
    nombre: "Cachorro Husky",
    precio: 900000,
    img: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea",
    descripcion: "El Husky es enérgico y perfecto para personas activas."
  },
  {
    id: 3,
    nombre: "Cachorro Bulldog",
    precio: 850000,
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    descripcion: "El Bulldog es tranquilo y muy cariñoso."
  },
  {
    id: 4,
    nombre: "Cachorro Pug",
    precio: 700000,
    img: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    descripcion: "El Pug es juguetón y muy amoroso."
  },
  {
    id: 5,
    nombre: "Cachorro Golden Retriever",
    precio: 950000,
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    descripcion: "El Golden es inteligente y excelente con familias."
  },
  {
    id: 6,
    nombre: "Cachorro Pastor Alemán",
    precio: 880000,
    img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95",
    descripcion: "El Pastor Alemán es protector y muy inteligente."
  }
];

// VARIABLES
let carrito = [];

const contenedor = document.getElementById("listaProductos");
const contador = document.getElementById("contador");

// MODAL DETALLE
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitulo = document.getElementById("modal-titulo");
const modalPrecio = document.getElementById("modal-precio");
const modalDescripcion = document.getElementById("modal-descripcion");

// MODAL CARRITO
const modalCarrito = document.getElementById("modalCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalTexto = document.getElementById("total");

// MOSTRAR PRODUCTOS
function mostrarProductos() {
  productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>

      <div class="botones">
        <button class="btn-agregar" onclick="agregar(${p.id})">Agregar</button>
        <button class="btn-ver" onclick="verDetalle(${p.id})">Ver</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

// AGREGAR PRODUCTO (VERSIÓN CORRECTA)
function agregar(id) {
  const producto = productos.find(p => p.id === id);

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarContador();
}

// CONTADOR
function actualizarContador() {
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contador.textContent = totalItems;
}

// VER DETALLE
function verDetalle(id) {
  const producto = productos.find(p => p.id === id);

  modal.style.display = "flex";
  modalImg.src = producto.img;
  modalTitulo.textContent = producto.nombre;
  modalPrecio.textContent = "$" + producto.precio.toLocaleString();
  modalDescripcion.textContent = producto.descripcion;
}

// CERRAR MODALES
document.querySelectorAll(".cerrar").forEach(btn => {
  btn.onclick = () => {
    modal.style.display = "none";
    modalCarrito.style.display = "none";
  };
});

// CLICK FUERA
window.onclick = function(e) {
  if (e.target === modal) modal.style.display = "none";
  if (e.target === modalCarrito) modalCarrito.style.display = "none";
};

// ABRIR CARRITO
document.querySelector(".carrito").onclick = () => {
  modalCarrito.style.display = "flex";
  renderCarrito();
};
// RENDER CARRITO
function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;

    const div = document.createElement("div");

            div.innerHTML = `
            <div style="
                display:flex;
                align-items:center;
                gap:12px;
                margin-bottom:10px;
            ">
                
                <!-- IMAGEN -->
                <img src="${p.img}" style="
                width:70px;
                height:70px;
                object-fit:cover;
                border-radius:10px;
                border:2px solid #eee;
                ">

                <!-- INFO -->
                <div style="flex:1;">
                <p style="margin:0;"><strong>${p.nombre}</strong></p>
                <p style="margin:0; color:#ff6a00; font-weight:bold;">
                    $${p.precio.toLocaleString()}
                </p>
                </div>

            </div>

            <!-- CONTROLES -->
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:10px;
                margin-bottom:10px;
            ">
                <button onclick="cambiarCantidad(${p.id}, -1)">➖</button>
                <span>${p.cantidad}</span>
                <button onclick="cambiarCantidad(${p.id}, 1)">➕</button>
                <button onclick="eliminar(${p.id})">❌</button>
            </div>

            <hr>
            `;

    listaCarrito.appendChild(div);
  });

  totalTexto.textContent = "Total: $" + total.toLocaleString();
}

// CAMBIAR CANTIDAD
function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id === id);

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  actualizarContador();
  renderCarrito();
}

// ELIMINAR
function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarContador();
  renderCarrito();
}

// INICIAR
mostrarProductos();

// LOGICA DE FILTRO DE PRODUCTOS 

const buscador = document.getElementById("buscador");
const filtroPrecio = document.getElementById("filtroPrecio");

// FILTRAR
function filtrarProductos() {
  const texto = buscador.value.toLowerCase();
  const precioFiltro = filtroPrecio.value;

  contenedor.innerHTML = "";

  const filtrados = productos.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto);

    let coincidePrecio = true;

    if (precioFiltro === "bajo") {
      coincidePrecio = p.precio < 800000;
    } else if (precioFiltro === "medio") {
      coincidePrecio = p.precio >= 800000 && p.precio <= 900000;
    } else if (precioFiltro === "alto") {
      coincidePrecio = p.precio > 900000;
    }

    return coincideTexto && coincidePrecio;
  });

  filtrados.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>

      <div class="botones">
        <button class="btn-agregar" onclick="agregar(${p.id})">Agregar</button>
        <button class="btn-ver" onclick="verDetalle(${p.id})">Ver</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

// EVENTOS
buscador.addEventListener("input", filtrarProductos);
filtroPrecio.addEventListener("change", filtrarProductos);