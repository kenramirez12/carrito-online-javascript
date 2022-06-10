const PRODUCTOS = [
  {
    nombre: "Producto #1",
    precio: "10.00",
    imagen: "/imagenes/producto.png"
  },
  {
    nombre: "Producto #2",
    precio: "4.50",
    imagen: "/imagenes/producto.png"
  },
  {
    nombre: "Producto #3",
    precio: "43.00",
    imagen: "/imagenes/producto.png"
  }
];

const crearTarjetaProducto = (producto) => {
  const li = document.createElement("li");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;

  const contenedor = document.createElement("div");

  const titulo = document.createElement("h3");
  titulo.innerText = producto.nombre;

  const precio = document.createElement("span");
  precio.innerText = formatearPrecio(producto.precio);

  const boton = document.createElement("button");
  boton.innerText = "Agregar al carrito";

  contenedor.append(titulo);
  contenedor.append(precio);
  contenedor.append(boton);
  
  li.append(imagen);
  li.append(contenedor);

  return li;
}

const formatearPrecio = (monto) => {
  return "S/." + monto;
}

const init = () => {
  PRODUCTOS.forEach((producto) => {
    const tarjetaProducto = crearTarjetaProducto(producto);
    document.getElementById("lista-productos").append(tarjetaProducto);
  });
}

init();