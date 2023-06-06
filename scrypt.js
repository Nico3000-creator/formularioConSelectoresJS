// Vamos a crear una planilla de autos para cargar los datos a la web (NO TENEMOS LA BASE DE DATOS)

// seleccionamos el selector para la edicion
// variables

// primera, resultado de la busqueda 
const resultado = document.querySelector("#resultado");
// segunda, para seleccionar el campo de "años"
const year = document.querySelector("#year");
// tercera, marca de autos
const marca = document.querySelector("#marca");
// cuarta, precio MINIMO de autos
const minimo = document.querySelector("#minimo");
// quinta, precio MAXIMO de autos
const maximo = document.querySelector("#maximo");
// sexta, puertas del auto
const puertas = document.querySelector("#puertas")

// Codeamos una variable donde nos centra el año actual en el que estmaos para trabajar, esto indica que no hay autos despues del 2022
const maxYear = new Date().getFullYear()
const minYear = maxYear - 10

// cargamos los datos con el dom

// eventos
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);
    llenarSelect();
})

// Objeto de busqueda (con esto le indicamos a la maquina el mapa de busqueda de cada selector):
const datosBusqueda = {
    marca: "",
    modelo: "",
    year: "",
    precio: "",
    puertas: "",
    color: "",
    transmision: "",
}



//Funciones 
function mostrarAutos() {
    // recorremos el objeto entero con un forEach
    autos.forEach(auto => {
        // desesctructuramos de forma mas facil para OBTENER los resultados de los autos primera forma:
        const { marca, modelo, puertas, año, precio, color, transmision } = auto;
        autoHTML.textContent = `Auto: ${marca} - Modelo: ${modelo} - Puertas: ${puertas} - Año: ${año} - Precio: ${precio} - Color: ${color} - Transmision: ${transmision}`
        // creamos los codigos html en js 
        const autoHTML = document.createElement("p");
        // agregamos el nombre del auto con SUS VARIABLES con `` segunda forma 
        autoHTML.textContent = `Auto: ${auto.marca} - Modelo: ${auto.modelo} - Puertas: ${auto.puertas} - Año: ${auto.año} - Precio: ${auto.precio} - Color: ${auto.color} - Transmision: ${auto.transmision}`
        // agregamos un hijo al selector
        resultado.appendChild(autoHTML);
        // ACA AUTOMATICAMENTE SE CARGA LA BASE DE DATOS DE AUTOS (no lo tenemos)
        
    });
    
}


// vamos a crear un selector para llenar el campo
// la siguiente funcion usamos el for para hacer referencia a las variables que disponemos y asi llenar el campo

function llenarSelect () {
    limpiarHTML()
     for(let i = maxYear; i > minYear; i--) {
        // variable para crear el elemento
        const opcion = document.createElement("option");
        // indicamos los valores del html dentro del indice
        opcion.value = i
        // indicamos el texto del html dentro del indice
        opcion.textContent = i
        // creamos una variable para que aparezcan los años en el selector
        year.appendChild(opcion)
        
     }
}

// aplicamos una funcion para borrar lo seleccionado visualizado y visualizar LO NUEVO
function limpiarHTML () {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

// funcion para filtrar los autos de manera global en todos los campos

function filtrarAuto () {
    // aca colocamos los filtros de cada auto, agregamos con .filter
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas)
    if (resultado.length) {
        console.log(resultado);
        mostrarAutos(resultado)
    } else {
        limpiarHTML()
        noTieneAuto()
    }
}


// funcion para determinar de que no se encuentran autos seleccionados
function noTieneAuto() {
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent = "No existen autos disponibles"
    resultado.appendChild(noResultado)
}


// filtramos la marca con otra funcion
function filtrarMarca (auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca
    }
    // si no cumple con el if, devovler auto igual
    return auto
}

// filtramos el año
function filtrarYear (auto) {
    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }
    // si no cumple con el if, devovler auto igual
    return auto;
}

// filtramos el precio MINIMO
function filtrarMinimo (auto) {
    const { minimo } = datosBusqueda
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto
}

// filtramos el precio MAXIMO
function filtrarMaximo (auto) {
    const { maximo } = datosBusqueda
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto
}

// filtramos las puertas
function filtrarPuertas (auto) {
    if (datosBusqueda.puertas) {
        // para reemplazar el parseint podemos poner el signo "+"
        return auto.puertas === +datosBusqueda.puertas;
    }
    return auto
}


// lista de autos con evento (base de datos de marca)
marca.addEventListener ("change", (e) => {
    // agregamos el valor que seleccionamos en la consola (objeto) 
    datosBusqueda.marca = e.target.value
    filtrarAuto ()
})

year.addEventListener ("change", (e) => {
    // agregamos el valor que seleccionamos en la consola (objeto) 
    datosBusqueda.year = e.target.value
    filtrarAuto ()
})

minimo.addEventListener ("change", (e) => {
    // agregamos el valor que seleccionamos en la consola (objeto) 
    datosBusqueda.minimo = e.target.value
    filtrarAuto ()
})
maximo.addEventListener ("change", (e) => {
    // agregamos el valor que seleccionamos en la consola (objeto) 
    datosBusqueda.maximo  = e.target.value
    filtrarAuto ()
})

puertas.addEventListener ("change", (e) => {
    // agregamos el valor que seleccionamos en la consola (objeto) 
    datosBusqueda.puertas  = e.target.value
    filtrarAuto ()
})

// USAR TYPEOF PARA SABER SI ES UN NUMERO O STRING EN LA CONSOLA