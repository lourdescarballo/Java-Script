//ENTEGA FINAL
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

let carrito = JSON.parse(localStorage.getItem("compras")) || [];

const getProducts = async () => {
    const response = await fetch("products.json");
    const data = await response.json();
    // Card y pusheo del carrito
    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="precio">${product.precio} $ </p>
    `;

        shopContent.append(content);

        let comprar = document.createElement("button");
        comprar.innerText = "Agregar";
        comprar.className = "comprar";
        content.append(comprar);

        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
            }

            Toastify({
                text: "Agregaste un producto al carrito",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #70001f, #e6b5bc)",
                },
                offset: {
                    x: '1rem',
                    y: '3.5rem'
                },
                onClick: function () { }
            }).showToast();


            saveLocal();
        });
    });
};

getProducts();

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
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio} </p>
        `;

        modalContainer.append(carritoContent);

        //Suma y resta de cantidades
        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            muestraCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            muestraCarrito();
        });

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
    const buscaId = carrito.find((element) => element.id);

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