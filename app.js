// variables globales

let formularioUserInterface = document.querySelector('#formulario');
let listaActividadesUser = document.querySelector('#listaActividades');

let arrayActividades = [];



// funciones

let Crearitem = (actividad) => {

    let item = {
        actividad: actividad,
        estado: false   
    }

    //agregar un elemento al array

    arrayActividades.push(item);

    return item

}

let GuardarLocalStorage = (actividad) => {

    localStorage.setItem('rutina', JSON.stringify(arrayActividades))

    PintarLocalStorage();

}

let PintarLocalStorage = () => {

    listaActividadesUser.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if(arrayActividades === null){
        arrayActividades = [];
    }
    else {
        arrayActividades.forEach(element => {
            if(element.estado){
                listaActividadesUser.innerHTML += `<div class="alert alert-success my-3" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<div class="float-right"><i class="material-icons">done</i></div><div class="float-right"><i class="material-icons">delete</i></div></div>` 
            }else{

                listaActividadesUser.innerHTML += `<div class="alert alert-danger my-3" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<div class="float-right"><i class="material-icons">done</i></div><div class="float-right"><i class="material-icons">delete</i></div></div>`

            }
           
        });
    }
}

let EliminarActividad = (actividad) => {

    //encontrar y guardar el index del array

    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if(elemento.actividad === actividad){
            indexArray = index;
        }
    });

    // eliminar elemento del array

    arrayActividades.splice(indexArray, 1);

    GuardarLocalStorage();
}

let EditarActividad = (actividad) => {

    // otra manera de encontrar y guardar el index de una array

    let indexArray = arrayActividades.findIndex((elemento) => {
        return elemento.actividad === actividad
    });

    arrayActividades[indexArray].estado = true;

    GuardarLocalStorage();
}



//eventLiseners

formularioUserInterface.addEventListener('submit', (event) => {
    event.preventDefault();
    let actividadUser = document.querySelector('#actividad').value;

    Crearitem(actividadUser);

    GuardarLocalStorage();

    formularioUserInterface.reset();
});

document.addEventListener('DOMContentLoaded', PintarLocalStorage)

listaActividadesUser.addEventListener('click', (event) => {
    event.preventDefault();

 
        let textoActividad =  event.path[2].childNodes[1].innerHTML;
            if(event.target.innerHTML === 'delete'){
                EliminarActividad (textoActividad)
            }
            if(event.target.innerHTML === 'done'){
                EditarActividad (textoActividad)
            }
    
});
