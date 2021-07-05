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
            listaActividadesUser.innerHTML += `<div class="alert alert-danger my-3" role="alert">
            <i class="material-icons float-left mr-2">
                accessibility
            </i>
            <b>${element.actividad}</b> - ${element.estado}
            <div class="float-right">
                <i class="material-icons">
                    done
                </i>
                <i class="material-icons">
                    delete
                </i>
            </div>
        </div>`
        });
    }
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
    console.log(event.path[0].childNodes[3].innerHTML)
});
    