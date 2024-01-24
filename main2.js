//PRE-ENTREGA 3

// Array - almaceno productos
 const catalogoProductos = [
    {
        id: 1,
        nombre: "Remera estampada",
        precio: 250,
        img: "https://img.freepik.com/free-photo/front-view-abstract-natural-pigmented-t-shirt_23-2148734454.jpg?w=740&t=st=1706066546~exp=1706067146~hmac=279d11cd5c5b3f77c916459bb9c6d19006351ff4ca7fbc29d51687d0df86e88d",
        cantidad: 1,
    },
    {   
        id: 2,
        nombre: "Pantalon de cuero",
        precio: 500,
        img:"https://img.freepik.com/free-photo/croppe-photo-fashionable-stylish-lady-dressed-black-pants-white-blouse-posing-background-car-outdoors_132075-9145.jpg?w=740&t=st=1706066720~exp=1706067320~hmac=b54a6e9becf07f522f383e39ae3bfc8b11e30ebddbddce8dfc1ef44e4ff11e0f",
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Zapatillas negras",
        precio: 500,
        img: "https://cdn.pixabay.com/photo/2017/07/23/02/40/leather-shoes-2530457_1280.jpg",
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "Aros plateados",
        precio: 300,
        img: "https://img.freepik.com/free-photo/still-life-aesthetic-earrings_23-2149649171.jpg?w=740&t=st=1706066830~exp=1706067430~hmac=10a4a4077d0e51c3ceab749a7662fdf0fb3343dfcd812fc6c743bddf6eb789aa",
        cantidad: 1,
    },
  ];

const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

let carrito = JSON.parse(localStorage.getItem("compras")) || [];

// Card y pusheo del carrito
catalogoProductos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="precio">${product.precio} $ </p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if(repeat){
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        });
    }else{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    }
    saveLocal();
    });
});

// Creacion modal con carrito
    const muestraCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <p>Cantidad: ${product.cantidad}</p>
            <p>Total: ${product.cantidad * product.precio} </p>
        `;

        modalContainer.append(carritoContent);

        //Boton ELIMINAR
        let eliminar = document.createElement("span");
        eliminar.innerText = "x";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    //Monto final + aplicacion de calculadora de cuotas
    const montoTotal = carrito.reduce((acc, e) => acc + e.precio * e.cantidad, 0);

    const montoTotalContainer = document.createElement("div");
    montoTotalContainer.className = "modal-total";
    montoTotalContainer.innerHTML = `<p>Monto Total: ${montoTotal} $</p>`;
    modalContainer.append(montoTotalContainer);

    const cuotasInput = document.createElement("input");
    cuotasInput.type = "number";
    cuotasInput.id = "cuotas";
    cuotasInput.value = 1;
    cuotasInput.min = 1;
    cuotasInput.max = 12;

    const cuotasLabel = document.createElement("label");
    cuotasLabel.for = "cuotas";
    cuotasLabel.innerText = "Cuotas:";

    modalContainer.append(cuotasLabel, cuotasInput);

    const pagoMensualContainer = document.createElement("div");
    pagoMensualContainer.className = "modal-total";
    modalContainer.append(pagoMensualContainer);

    const actualizarPagoMensual = () => {
        const pagoMensual = montoTotal / parseInt(cuotasInput.value);
        pagoMensualContainer.innerHTML = `
        <p>El pago mensual será de: ${pagoMensual.toFixed(2)} $ por ${cuotasInput.value} meses</p>`;
    };

    cuotasInput.addEventListener("input", actualizarPagoMensual);
    actualizarPagoMensual();
};

verCarrito.addEventListener("click", muestraCarrito);

//Ejecucion de eliminar producto y actualizacion en el local storage
const eliminarProducto = () => {
    const buscaId =  carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscaId;
    });

    saveLocal();
    muestraCarrito();
}

//Local storage
const saveLocal = () => {
    localStorage.setItem("compras", JSON.stringify(carrito));
};