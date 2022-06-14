const PRODUCTOS = [
	{
		id: 1,
		nombre: "Producto #1",
		precio: "10.00",
		imagen: "/imagenes/producto.png",
	},
	{
		id: 2,
		nombre: "Producto #2",
		precio: "4.50",
		imagen: "/imagenes/producto.png",
	},
	{
		id: 3,
		nombre: "Producto #3",
		precio: "4.50",
		imagen: "/imagenes/producto.png",
	},
	{
		id: 4,
		nombre: "Producto #4",
		precio: "43.00",
		imagen: "/imagenes/producto.png",
	},
	{
		id: 5,
		nombre: "Producto #5",
		precio: "43.00",
		imagen: "/imagenes/producto.png",
	},
];

const crearTarjetaProducto = (producto) => {
  const contenedor = document.createElement("div");
	contenedor.classList.add("col-3");
  
  const card = document.createElement("div");
  card.classList.add("card");
  
	const imagen = document.createElement("img");
	imagen.classList.add("card-img-top");
	imagen.src = producto.imagen;

	const contenido = document.createElement("div");
	contenido.classList.add("card-body");

	const titulo = document.createElement("h5");
  titulo.classList.add("card-title");
	titulo.innerText = producto.nombre;

	const precio = document.createElement("span");
	precio.innerText = formatearPrecio(producto.precio);

	const botonAgregarAlCarrito = document.createElement("button");
	botonAgregarAlCarrito.classList.add("d-block", "btn", "btn-outline-primary", "mt-3");
	botonAgregarAlCarrito.innerText = "Agregar al carrito";

	botonAgregarAlCarrito.addEventListener("click", function() {
		const listaItemsCarrito = document.getElementById("lista-items-carrito");

		let itemCarrito = null;
		for (const item of listaItemsCarrito.children) {
			if (item.dataset.productId == producto.id) {
				itemCarrito = item;
			}
		}

		if (itemCarrito) {
			actualizarItemCarrito(itemCarrito, producto.precio);
		} else {
			itemCarrito = crearItemCarrito(producto);
			listaItemsCarrito.append(itemCarrito);
		}

		actualizarTotalCarrito();
	});

	contenido.append(titulo);
	contenido.append(precio);
	contenido.append(botonAgregarAlCarrito);

  card.append(imagen);
  card.append(contenido);

  contenedor.append(card);

	return contenedor;
};

const formatearPrecio = (monto) => {
	return "S/" + parseFloat(monto).toFixed(2);
};

const crearItemCarrito = (producto) => {
	const listaCarritoVacia = document.getElementById("lista-carrito-vacia");
	listaCarritoVacia.classList.add("d-none");
	
	const listaCarrito = document.getElementById("lista-items-carrito");
	listaCarrito.classList.remove("d-none");

	const contenedor = document.createElement("li");
	contenedor.classList.add("list-group-item");
	contenedor.dataset.productId = producto.id;
	contenedor.dataset.cantidad = 1;

	const fila = document.createElement("div");
	fila.classList.add("row", "align-items-center");

	const columna1 = document.createElement("div");
	columna1.classList.add("col-6");

	const imagen = document.createElement("img");
	imagen.classList.add("img-thumbnail", "img-cart-item");
	imagen.src = producto.imagen;

	const titulo = document.createElement("span");
	titulo.innerText = producto.nombre;

	columna1.append(imagen);
	columna1.append(titulo);

	const columna2 = document.createElement("div");
	columna2.classList.add("col-6", "text-end");

	const precio = document.createElement("span");
	precio.classList.add("precio", "fw-bold");
	precio.innerText = formatearPrecio(producto.precio);

	const cantidad = document.createElement("span");
	cantidad.classList.add("cantidad", "fst-italic");
	cantidad.innerText = " (1 und)";

	const botonEliminar = document.createElement("button");
	botonEliminar.classList.add("btn", "btn-outline-danger", "btn-sm", "ms-2");
	botonEliminar.innerText = "Eliminar";
	botonEliminar.addEventListener("click", function(e) {
		if ( confirm("¿Estás seguro que deseas eliminar este producto de tu carrito?") ) {
			e.target.parentElement.parentElement.parentElement.remove();
			actualizarTotalCarrito();

			const listaCarrito = document.getElementById("lista-items-carrito");
			if (listaCarrito.children.length === 0) {
				listaCarrito.classList.add("d-none");
				const listaCarritoVacia = document.getElementById("lista-carrito-vacia");
				listaCarritoVacia.classList.remove("d-none");
			}
		}
	});

	columna2.append(precio);
	columna2.append(cantidad);
	columna2.append(botonEliminar);

	fila.append(columna1);
	fila.append(columna2);

	contenedor.append(fila);

	return contenedor;
}

const actualizarItemCarrito = (itemCarrito, precioUnitario) => {
	const cantidadActual = parseInt(itemCarrito.dataset.cantidad);
	itemCarrito.dataset.cantidad = cantidadActual + 1;
	itemCarrito.querySelector(".cantidad").innerText = ` (${itemCarrito.dataset.cantidad} und)`;

	const subtotal = precioUnitario * itemCarrito.dataset.cantidad;
	itemCarrito.querySelector(".precio").innerText = formatearPrecio(subtotal);
}

const actualizarTotalCarrito = () => {
	const totalCarrito = document.getElementById("total-carrito");
	const itemsCarrito = document.getElementById("lista-items-carrito").children;

	const total = calcularTotalCarrito(itemsCarrito);
	totalCarrito.innerText = `Total ${total} `;

	const totalCheckout = document.getElementById("total-checkout");
	totalCheckout.innerText = total;
}

const calcularTotalCarrito = (itemsCarrito) => {
	if (itemsCarrito.length === 0) {
		return formatearPrecio(0);
	} else {
		let total = 0;
		for (const itemCarrito of itemsCarrito) {
			const productId = itemCarrito.dataset.productId;
			const cantidad = itemCarrito.dataset.cantidad;

			const producto = PRODUCTOS.find((p) => p.id == productId);
			total += producto.precio * cantidad;
		}
		return formatearPrecio(total);
	}
}

const init = () => {
	PRODUCTOS.forEach((producto) => {
		const tarjetaProducto = crearTarjetaProducto(producto);
		document.getElementById("lista-productos").append(tarjetaProducto);
	});
};

init();
