'use strict';
/*
 * FIRPO, NICOLÁS EZEQUIEL
 */


// Funciones:

// Función para resaltar las duraciones mayores a 180:
function rojo(duracion) {
  if (duracion > 180) {
    return '<span style="color: red;">' + duracion + "</span>";
  } else {
    return "<span>" + duracion + "</span>";
  }
}

//Función para obtenes cual es el Disco de mayor duración
function obtenerDiscoMayorDuracion(discos) {
    
  let discoMayorDuracion = null;
  let duracionMayor = 0;
  
    for (let disco of discos) {
      const duracionTotal = disco.totalDuracion();
      if (duracionTotal > duracionMayor) {
        duracionMayor = duracionTotal;
        discoMayorDuracion = disco;
      }
    }
  
    return discoMayorDuracion;
}

//Clase con los datos del disco
class Disco {
  //Guardamos la cantidad de discos y los codigos que vamos utilizando
  static cantidadDiscos = 0;
  static codigosUtilizados = [];

  nombreDisco = 'Nombre del Disco';
  nombreAutor = 'Nombre del autor/a';
  codigoDisco = 0;
  pistas = [];

  constructor() {
    console.log('Nuevo disco creado');
    Disco.cantidadDiscos++;
  }

  //Ingresamos el nombre del disco y verificamos
  ingresarNombreDisco() {
    
    let nombreDisco;
    
    do {
      nombreDisco = prompt('Ingrese el nombre del disco: ');
      if (!isNaN(nombreDisco)) {
        alert("El valor ingresado no puede ser un número ni un espacio vacío");
        console.warn("El usuario ingresó un nombre de disco inválido");
      } 
    } while (!isNaN(nombreDisco));
    
    console.log(`El usuario ingreso el nombre del disco: ${nombreDisco}`)
    this.nombreDisco = nombreDisco;
  }

  //Ingresamos el nombre del autor y verificamos
  ingresarNombreAutor() {
    
    let nombreAutor;
    
    do {
      nombreAutor = prompt('Ingrese el nombre del autor/a: ');
     
      if (!isNaN(nombreAutor)) {
        alert("El valor ingresado no puede ser un número ni un espacio vacío");
        console.warn("El usuario ingresó un nombre de autor inválido ni un espacio vacío");
      }
    
    } while (!isNaN(nombreAutor));
    
    console.log(`El usuario ingreso el nombre del autor: ${nombreAutor}`)
    this.nombreAutor = nombreAutor;
  }

  //Ingresamos el codigo de disco
  ingresarCodigo() {
    
    let codigoDisco;
    let codigoExistente;

    do {
      codigoDisco = parseInt(prompt('Ingrese el código numérico del disco: '));
      codigoExistente = Disco.codigosUtilizados.includes(codigoDisco);
      
      //Hacemos una comparacion donde primero verificamos que el codigo no haya sido utilizado, luego verificamos que cumpla con todas las condicionez
      if (codigoExistente) {
        alert('El código ya ha sido ingresado. Intente nuevamente.');
        console.warn("El usuario ingreso un código que ya fue ingresado antes");
        } else if (codigoDisco < 1 || codigoDisco > 999 || isNaN(codigoDisco)) {
          alert('El código debe ser un número del 1 al 999. Intente nuevamente.(No puede ser un texto)');
          console.warn("El usuario ingreso un código invalido");
        }
    
      } while (codigoExistente || codigoDisco < 1 || codigoDisco > 999 || isNaN(codigoDisco));

    //Guardamos el codigo y realizamos un push para registrar los codigos
    console.log(`El usuario ingreso el código ${codigoDisco}`);
    this.codigoDisco = codigoDisco;
    Disco.codigosUtilizados.push(codigoDisco);
  }

  //Guardmos la pista
  guardarPista(pista) {
    this.pistas.push(pista);
  }

  //buscamos la cantidad de pistas
  obtenerCantidadPistas() {
    return this.pistas.length;
  }

  //Acumulamos la duración de las pistas en cada disco
  totalDuracion() {
    
    let acumDuracion = 0;
    
    for (let pista of this.pistas) {
      acumDuracion += pista.leerDuracion();
    }
    
    return acumDuracion;
  }

  //calculamos el promedio de la duración
  promedioDuracionTotal() {
    const duracionTotal = this.totalDuracion();
    const cantidadPistas = this.obtenerCantidadPistas();
      
    const promedio = duracionTotal / cantidadPistas;
    const promedioRedondeado = promedio.toFixed(2); //redondeamos el promedio a 2 decimales

    return promedioRedondeado;
  }

  //buscamos cual es la pista mas larga
  obtenerPistaMasLarga() {
   
    let pistaMasLarga = null;
    let duracionMasLarga = 0;

    for (let pista of this.pistas) {
      const duracion = pista.leerDuracion();
      if (duracion > duracionMasLarga) {
        duracionMasLarga = duracion;
        pistaMasLarga = pista;
      }
    }

    return pistaMasLarga;
  }
  
  //armamos nuestro html
  armar() {
    let m = `<div class="card">
      <img src="img/vinilo.png" alt="Disco de vinilo">
      <div class="datos">
      <p><span class="negrita">Disco:</span> ${this.nombreDisco}</p>
      <p><span class="negrita">Autor/a:</span> ${this.nombreAutor}</p>
      <p><span class="negrita">Código:</span> ${this.codigoDisco}</p>
      <p><span class="negrita">Pistas:</span> </p>
      <ul>`;
    for (let pista of this.pistas) {
      m += pista.armar();
    }

    m += `</ul>
      <p><span class="negrita">Duracion del disco:</span> ${this.totalDuracion()}</p>
      <p><span class="negrita">Promedio duración:</span> ${this.promedioDuracionTotal()}</p>
      <p><span class="negrita">Cantidad de Pistas:</span> ${this.obtenerCantidadPistas()}</p>
      <p><span class="negrita">Pista más larga:</span> ${this.obtenerPistaMasLarga()?.nombrePista || 'No se encontro la pista mas larga'}</p>
    `;

    return m;
  }
}


//Creamos una class para las pistas
class Pista {
 
  nombrePista = 'Nombre de la pista';
  duracion = 0;

  constructor() {
    console.log('Nueva pista creada');  
  }

  //Ingresamos el nombre de la pista
  ingresarNombrePista() {
    
    let nombrePista;
   
    do {
      nombrePista = prompt('Ingrese el nombre de la pista: ').trim();
      
      if (!isNaN(nombrePista)) {
        alert("El valor ingresado no puede ser un número, Ni ser un espacio vacío.");
        console.warn("El usuario ingresó un nombre de pista inválido");
      }
    } while (!isNaN(nombrePista));
    
    console.log(`El usuario ingreso el nombre de la pista: ${nombrePista}`)
    this.nombrePista = nombrePista;
  }

  //Ingresamos la duracion
  ingresarDuracion() {
    
    let duracion;
    
    do {
      duracion = parseInt(prompt('Ingrese la duración de la pista'));
      if (!(duracion >= 1 && duracion <= 7200)) {
        alert("La duración ingresada es inválida (La duración debe ser un número entre 0 y 7200 inclusive)");
        console.warn("El usuario ingresó una duración inválida");
      }
    } while (!(duracion >= 1 && duracion <= 7200));
    console.log(`El usuario ingreso la duracion de la pista: ${duracion} seg.`)
    this.duracion = duracion;
  }

  //leemos la duracion 
  leerDuracion() {
    return this.duracion;
  }

  //seguimos armando nuestro mensaje para el html
  armar() {
    return `<li><span class="negrita">Nombre:</span> ${this.nombrePista}</li>
            <li><span class="negrita">Duración:</span> ${rojo(this.duracion)}</li>`;
  }
}

// Todos los discos
let discos = [];


// Funciones de carga:
const Cargar = () => {
  let disco, pista;

  do {
    disco = new Disco();
    disco.ingresarNombreDisco();
    disco.ingresarNombreAutor();
    disco.ingresarCodigo();

    do {
      pista = new Pista();
      pista.ingresarNombrePista();
      pista.ingresarDuracion();
      disco.guardarPista(pista);
    } while (confirm('¿Quiere ingresar otra pista?'));

    discos.push(disco);
  } while (confirm('¿Quiere ingresar otro disco?'));
};

//Función para mostrar en nuestro html
const Mostrar = () => {
  let html = '';

  html += `<h2>Cantidad de Discos: ${Disco.cantidadDiscos}</h2>`;
  
  const discoMayorDuracion = obtenerDiscoMayorDuracion(discos);
  if (discoMayorDuracion) {
    html += `<h3>Disco de mayor duración: ${discoMayorDuracion.nombreDisco}</h3>`;
  } 

  for (let disco of discos) {
    html += disco.armar();
    html += '</div> </div>';
  }

  document.getElementById("info").innerHTML = html;
};

//creamos una funcion para buscar por codigo, limpiamos la pantalla y luego volvemos a mostrar el disco que busco el usuario 
const Buscar = () => { 
    let codigoInsertado;
    do {
        codigoInsertado = parseInt(prompt("Ingrese el código de disco que desea buscar:"));
    } while (codigoInsertado < 0 || codigoInsertado > 999 || isNaN(codigoInsertado));

    const divPrincipal = document.getElementById('info');
    divPrincipal.innerHTML = ''; // Limpia el contenido anterior

    let html = '';

    const arrayFiltrado = discos.filter(function(disco) {
        return disco.codigoDisco === codigoInsertado;  
    });

    if (arrayFiltrado.length > 0) {
        for (const disco of arrayFiltrado) {
            html += disco.armar();
        }
    } else {
        html = '<div id="error"><p >No se encontraron discos con el código ingresado.</p><img src="img/advertencia.png" alt="Busqueda inexistente"></div>';
    }

    divPrincipal.innerHTML = html;
};