/*Definir de acuerdo al tipo de publicacion de Mercadolibre (Gratuita, Clasica, Premium) a cuanto seria el precio de venta de una publicacion.*/
let btn = document.getElementById("btn");
btn.addEventListener("click",calculo);

let precioFinal=0;
let comision=0;
let montoComision=0;

class Publicacion {
    constructor(tipo, comision) {
        this.tipo = tipo;
        this.comision = comision;
    }
}

const publicaciones = [];
publicaciones.push(new Publicacion("GRATUITA", 1));
publicaciones.push(new Publicacion("CLASICA", 0.87));
publicaciones.push(new Publicacion("PREMIUM", 0.72));

function buscarPublicacion(publi, publicaciones){
    return publi.find(objeto => objeto.tipo === publicaciones.toUpperCase());
}

function calcComision(costoProducto, comision){
    precioFinal= costoProducto/comision;
    precioFinal=precioFinal.toFixed(2);
    montoComision= precioFinal-costoProducto;
    montoComision=montoComision.toFixed(2);
}

function lista() {
    var select = document.getElementById('pub');
    var value = select.options[select.selectedIndex].value;
    return(value);
}

//Con esta funcion se guardan los datos de nombre de usuario, costo y tipo de publicacion elegido por el usuario en el localStorage.
function guardarDatos() {
    localStorage.NombreUsuario = document.getElementById("usuario").value;
    localStorage.CostoIngresado = document.getElementById("num").value;
    localStorage.TipoPublicacion = document.getElementById("pub").value;
}

// Utilizo fetch para traer informacion del decimo objeto de la API de jsonplaceholder para mostrar por consola el titulo y el contenido.
fetch('https://jsonplaceholder.typicode.com/posts')
.then (res=>res.json())
.then (data=> {
    let decimo= data[9];
    console.log('Titulo del decimo:',decimo.title);
    console.log('Contenido del decimo:',decimo.body);
})
.catch((error)=>{
    console.log(error);
})


//Con esta funcion retorno el valor de la lista despegable HTML, con respecto a cada categoria para hacer el calculo de acuerdo a la publicacion seleccionada.
function calculo() {
    let usuario= document.getElementById("usuario").value;
    // No hay validacion con un IF ya que el input es solo numerico, y el desplegable solo admite 3 opciones, que son las expresadas en el Array.
    let costo = document.getElementById("num").value;
    // uso de operador ternario
    costo <= 0 && Swal.fire({
        title: 'Valor invalido!',
        text: 'Ingresa un costo mayor a 0',
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    // uso de libreria SweetAlert
    let busqueda = buscarPublicacion(publicaciones, lista());
    calcComision(costo,busqueda.comision);
    let div = document.createElement("div");
        div.innerHTML = `<h2>${usuario} tu publicación tendra un precio final de: $${precioFinal}</h2>
                        <p>\nEl monto de la comisión es de: $${montoComision}</p>
                        <hr>`;
        document.body.appendChild(div);
    guardarDatos();

    // uso de libreria Toastify    
        Toastify({
            text: "Se calculo el precio final!",
            gravity: 'bottom',
            position: 'right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c92d)'
            }    
        }).showToast();
    
}