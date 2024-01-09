// Objeto JS
function Producto(nombre, precio, categoria) {
  this.nombre = nombre;
  this.precio = precio;
  this.categoria = categoria;
}

// Array - almaceno productos
const catalogoProductos = [
  new Producto('Remera estampada', 250, 'Remeras'),
  new Producto('Remera color lisa', 200, 'Remeras'),
  new Producto('Remera manga larga', 225, 'Remeras'),
  new Producto('Pantalon deportivo', 300, 'Pantalones'),
  new Producto('Pantalon de cuero', 500, 'Pantalones'),
  new Producto('Pantalon blanco', 420, 'Pantalones'),
  new Producto('Zapatillas deportivas', 700, 'Calzado'),
  new Producto('Zapatillas negras', 500, 'Calzado'),
  new Producto('Zapatillas Jordan', 1200, 'Calzado'),
  new Producto('Aros plateados', 300, 'Joyeria'),
  new Producto('Collar con estrella', 350, 'Joyeria'),
];

// Aplica buscador
function buscarProductoPorNombre(nombre) {
  return catalogoProductos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

// Aplica filtrado
function filtrarProductosPorCategoria(categoria) {
  return catalogoProductos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
}

// Listado en la consola
function mostrarOpcionesDeCategoria() {
  console.log("Categorías disponibles:");
  catalogoProductos.forEach(producto => console.log(producto.categoria));
}

// Lista de productos segun categoria seleccionada
function generarListaDeProductos(categoria) {
  const productosEnCategoria = filtrarProductosPorCategoria(categoria);

  let listaDeProductos = "Productos disponibles en la categoría " + categoria + ":\n";

  productosEnCategoria.forEach(producto => {
      listaDeProductos += `${producto.nombre} - Precio: ${producto.precio.toFixed(2)}\n`;
  });

  return listaDeProductos;
}

// Función para calcular pagos en cuotas aplicada en la primera entrega
function calcularCuotas(monto, cuotas) {
  if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
      alert("Por favor, ingrese montos y cuotas válidos.");
      return null;
  }

  const pagoMensual = monto / cuotas;
  return pagoMensual;
}

function programaCuotas() {
  let continuar = true;

  while (continuar) {
      // Mostrar opciones de categoría
      mostrarOpcionesDeCategoria();

      const categoriaElegida = prompt("Ingrese la categoría que le interesa:");

      // Generar lista de productos y mostrarla en un alert
      const listaDeProductos = generarListaDeProductos(categoriaElegida);
      alert(listaDeProductos);

      // Elegir un producto
      const nombreProducto = prompt("Ingrese el nombre del producto que desea:");

      // Buscar el producto seleccionado
      const productoEncontrado = buscarProductoPorNombre(nombreProducto);

      if (productoEncontrado) {
          // Montos y cuotas
          const monto = productoEncontrado.precio;
          const cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));

          const pagoMensual = calcularCuotas(monto, cuotas);

          // Resultado
          if (pagoMensual !== null) {
              alert(`El pago mensual será de: ${pagoMensual.toFixed(2)}`);
          }
      } else {
          alert("Producto no encontrado en la categoría seleccionada.");
      }

      const opcion = prompt("¿Desea realizar otra búsqueda o calcular cuotas para otro producto? (Ingrese 'si' para continuar, o 'no' para terminar)");

      if (opcion.toLowerCase() === 'no') {
          continuar = false; // Finaliza bucle
      }
  }

  alert("¡Gracias por usar la calculadora de pagos en cuotas!");
}

programaCuotas();
