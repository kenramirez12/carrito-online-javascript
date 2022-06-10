const PRODUCTOS = [
	{
		nombre: "Producto #1",
		precio: "10.00",
		imagen: "/imagenes/producto.png",
	},
	{
		nombre: "Producto #2",
		precio: "4.50",
		imagen: "/imagenes/producto.png",
	},
	{
		nombre: "Producto #2",
		precio: "4.50",
		imagen: "/imagenes/producto.png",
	},
	{
		nombre: "Producto #3",
		precio: "43.00",
		imagen: "/imagenes/producto.png",
	},
	{
		nombre: "Producto #3",
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

	const boton = document.createElement("button");
	boton.classList.add("d-block", "btn", "btn-outline-primary", "mt-3");
	boton.innerText = "Agregar al carrito";

	contenido.append(titulo);
	contenido.append(precio);
	contenido.append(boton);

  card.append(imagen);
  card.append(contenido);

  contenedor.append(card);

	return contenedor;
};

const formatearPrecio = (monto) => {
	return "S/." + monto;
};

const init = () => {
	PRODUCTOS.forEach((producto) => {
		const tarjetaProducto = crearTarjetaProducto(producto);
		document.getElementById("lista-productos").append(tarjetaProducto);
	});
};

init();
