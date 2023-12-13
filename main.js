// Función para calcular pagos en cuotas
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
      // Montos y cuotas que pone el usuario
      const monto = parseFloat(prompt("Ingrese el monto total:"));
      const cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
  
      const pagoMensual = calcularCuotas(monto, cuotas);
  
      // Resultado
      if (pagoMensual !== null) {
        alert(`El pago mensual será de: ${pagoMensual.toFixed(2)}`);
      }
  
      const opcion = prompt("¿Desea calcular otro pago? (Ingrese 'si' para continuar, o 'no' para terminar)");
  
      if (opcion.toLowerCase() === 'no') {
        continuar = false; // Finaliza bucle
      }
    }
  
    alert("¡Gracias por usar la calculadora de pagos en cuotas!");
  }
  
  programaCuotas();
