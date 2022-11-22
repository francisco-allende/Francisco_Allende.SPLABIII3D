import { anuncios } from "./database.js";
import {Anuncio_Auto, getTransaccionType} from "./anuncio.js";
import {vaciar, borrarBotones, loadBtnCargar, loadModifyEliminarBtns, avoidFormSubmit, loadClickedAnuncio, asignarNonValid, modificarObjetoAnuncio} from "./form.js";
import {validarSubmit, validar, validarRadioButton} from "./validaciones.js";
import { buildTable, refreshTable} from "./tabla.js";

//Storage, cargo mi BBDD
window.addEventListener("load", () => {        
    let anuncios = chequearPrimeraVez();
    buildTable(anuncios);
});

//Seteo comportamiento botones
let formBtns = document.getElementsByClassName('btn'); 
avoidFormSubmit(formBtns)

//Validacion de los campos del formulario. Cargo los inputs a un array y les asigno eventos y estilos
const formulario = document.forms[0];
const [ txtTitulo, txtVenta, txtAlquiler, txtDescripcion, txtPrecio, txtPuertas, txtKms, txtPotencia ] = formulario;

const inputs = [];
inputs.push(txtTitulo, txtVenta, txtAlquiler, txtDescripcion, txtPrecio, txtPuertas, txtKms, txtPotencia)

asignarManejadorDeEventos(inputs);
asignarNonValid(inputs);

//Cargo un nuevo registro a la tabla dinamica
let cargar = document.getElementById("btnCargar");
cargar.addEventListener("click", ()=>{
    handlerCargar(inputs, formBtns);
});

//cancelar
let cancelar = document.getElementById("btnCancelar");
cancelar.addEventListener("click", ()=>{
    vaciar(inputs);
    borrarBotones(formBtns);
})

// para traer los datos del elemento clickeado
const $divTabla = document.getElementById("divTabla");

$divTabla.addEventListener("click", (e) => {
    const emisor = e.target; 
    
    if (emisor.matches("tbody tr td")) {
        let id = emisor.parentElement.dataset.id;
        handlerSeleccionar(id, inputs, formBtns);
    }
});

//      Handlers        //
const handlerCargar = (inputs, formBtns)=>
{
    let transaccion = getTransaccionType();
    let anuncios = JSON.parse(localStorage.getItem("lista_anuncios"));
    
    if(Array.isArray(inputs))
    {
        if(validarSubmit(inputs))
        {
            let nuevoAnuncio = agregar(inputs, transaccion);
            anuncios.push(nuevoAnuncio);
	        borrarBotones(formBtns);
            refreshTable(anuncios);
            vaciar(inputs);
        }else{
            alert("Atencion! No todos los campos han sido llenados correctamente");
        }
    }
}

function chequearPrimeraVez(){
    let lista = null;
    if(localStorage.getItem('si_fue_visitada')){
        lista = JSON.parse(localStorage.getItem('lista_anuncios'));
        return lista;
    }
    
    localStorage.setItem('si_fue_visitada', true);
    localStorage.setItem("lista_anuncios", JSON.stringify(anuncios));
    lista = JSON.parse(localStorage.getItem('lista_anuncios'));
    return lista; 
}

const handlerSeleccionar = (id, inputs, formBtns)=>{
    let anuncios = JSON.parse(localStorage.getItem("lista_anuncios"));

    let selectedAnuncio = anuncios.find((element) => element.id == id); 
    let index = anuncios.indexOf(selectedAnuncio);
    
    if(document.getElementById("btnEliminar") == null && document.getElementById("btnModificar") == null)
    {
        let $btnEliminar = loadModifyEliminarBtns("Eliminar", "btnEliminar");
        let $btnModificar = loadModifyEliminarBtns("Modificar", "btnModificar");
        $btnEliminar.addEventListener("click", ()=>
        {
            borrar(anuncios, index, inputs, formBtns);
        });
        $btnModificar.addEventListener("click", ()=>
        {
            modificar(anuncios, inputs, selectedAnuncio, formBtns);
        });
        //borro el boton de alta
        if(document.getElementById("btnCargar") != null){
            document.getElementById("btnCargar").remove();
        }
    }
    
    avoidFormSubmit(formBtns)
    loadClickedAnuncio(inputs, selectedAnuncio);
}

function asignarManejadorDeEventos (inputs)
{
    inputs.forEach(element => {
        if(element.name != "transaccion")
        {
            element.addEventListener("blur", validar)
        }
        else
        {
            element.addEventListener("click", validarRadioButton);
        }     
    });
}

function setEventToBtnCargar(){
    let cargar = document.getElementById("btnCargar");
    cargar.addEventListener("click", ()=>{
        handlerCargar(inputs, formBtns);
    });
}

//      Fin Handlers        //

//          Crud        //

function agregar(inputs, transaccion){
    let myNewObj = new Anuncio_Auto(Math.floor(Math.random() * 1001),
            inputs[0].value, //titulo
            transaccion,
            inputs[3].value, //descripcion
            inputs[4].value, //precio
            inputs[5].value, //puertas
            inputs[6].value, //kms
            inputs[7].value, //potencia
            )
    return myNewObj;
}

function borrar(anuncios, index, inputs, formBtns){
    anuncios.splice(index, 1);
    refreshTable(anuncios);
    vaciar(inputs);
    borrarBotones(formBtns);
    if(document.getElementById("btnCargar") != null){
        setEventToBtnCargar();
    }
}

function modificar(anuncios, inputs, selectedAnuncio, formBtns)
{
    modificarObjetoAnuncio(inputs, selectedAnuncio);
    refreshTable(anuncios);
    vaciar(inputs);
    borrarBotones(formBtns);
    if(document.getElementById("btnCargar") != null){
        setEventToBtnCargar();
    }
}








