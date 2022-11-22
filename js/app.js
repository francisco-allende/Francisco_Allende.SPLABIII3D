import {Anuncio_Auto, getTransaccionType} from "./anuncio.js";
import {vaciar, borrarBotones, loadBtnCargar, loadModifyEliminarBtns, avoidFormSubmit, loadClickedAnuncio, asignarNonValid, modificarObjetoAnuncio} from "./form.js";
import {validarSubmit, validar, validarRadioButton} from "./validaciones.js";
import { buildTable, refreshTable, hideColumns} from "./tabla.js";
import {getAutos, updateAuto, deleteAuto, postAuto } from "./peticiones.js";

//     Cargo BBDD      //
const chequearPrimeraVez = async () =>{
    let lista = null;
    if(localStorage.getItem('si_fue_visitada')){
        lista = await getAutos();
        localStorage.setItem("lista_anuncios", JSON.stringify(await getAutos()));
        return lista;
    }
    
    localStorage.setItem('si_fue_visitada', true);
    localStorage.setItem("lista_anuncios", JSON.stringify(await getAutos()));
    lista = JSON.parse(localStorage.getItem('lista_anuncios'));
    return lista; 
}

let anunciosFiltrados = [];

window.addEventListener("load", async () => {   
    let anuncios = await chequearPrimeraVez();
    buildTable(anuncios);
});

//     Filtrado      //
let filtroController = document.getElementById("select-filtro");

filtroController.addEventListener("change", async ()=>{
    let tipoTransaccion = document.getElementById("select-filtro").value;
    let anunciosAux = await getAutos();
    if(tipoTransaccion != "todos")
    {
        anunciosFiltrados = anunciosAux.filter((valor)=>{
            if(valor.transaccion == tipoTransaccion){
                return true; 
            }
        })
        refreshTable(anunciosFiltrados);
        
        calcularPromedio(anunciosFiltrados);
        return;
    }
    refreshTable(anunciosAux);
    //seteo todos los anuncios en el storage, sino las cards solo se ven las filtradas de la tabla
    localStorage.setItem("lista_anuncios",  JSON.stringify(anunciosAux));
    await calcularPromedio(anunciosAux);
})

//     Promedio      //
const calcularPromedio = async (arr) => 
{
    let promedio = arr.reduce((prev, actual)=>{
        return parseFloat(prev) + parseFloat(actual.precio); 
    }, 0);
    document.getElementById("txtBoxPromedio").value = promedio;
}

//     Tabla sin columnas      //
const getCheckedCheckboxes = async () => {
    let checkboxContainer = document.querySelectorAll(".div-checkbox input");
    checkboxContainer.forEach((checkbox)=>{
        checkbox.addEventListener("change", ()=>{
            console.log("aguarde mientas se reacomoda la fila...");
            buildTableWithLessColumns();
        })
    })
}

const buildTableWithLessColumns = async () =>
{
    let checkboxContainer = document.querySelectorAll(".div-checkbox input");
    let onlyChecked = [];
    checkboxContainer.forEach((checkbox)=>{
        if(checkbox.checked){
            onlyChecked.push(checkbox.value);
        }
    })
    hideColumns(await getAutos(), onlyChecked);
}

const setCheckedCheckboxes = () =>{
    let checkboxContainer = document.querySelectorAll(".div-checkbox input");
    checkboxContainer.forEach((checkbox)=>{
        checkbox.checked = true;
    })
}

setCheckedCheckboxes();
getCheckedCheckboxes();

//     Fin Tabla sin columnas      //

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

//boton cargar 
let cargar = document.getElementById("btnCargar");
cargar.addEventListener("click", ()=>{
    handlerCargar(inputs, formBtns);
});

//cancelar
let cancelar = document.getElementById("btnCancelar");
cancelar.addEventListener("click", ()=>{
    vaciar(inputs);
    borrarBotones(formBtns);
    if(document.getElementById("btnCargar") != null){
        setEventToBtnCargar();
    }
})

// para traer los datos del elemento clickeado
const $divTabla = document.getElementById("divTabla");

$divTabla.addEventListener("click", async (e) => {
    const emisor = e.target; 
    
    if (emisor.matches("tbody tr td")) {
        let id = emisor.parentElement.dataset.id;
        await handlerSeleccionar(id, inputs, formBtns);
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
            //fetch de post, de alta
            postAuto(nuevoAnuncio);
        }else{
            alert("Atencion! No todos los campos han sido llenados correctamente");
        }
    }
}

const handlerSeleccionar = async (id, inputs, formBtns) =>{
    let anuncios = await getAutos();

    let selectedAnuncio = anuncios.find((element) => element.id == id); 
    let index = anuncios.indexOf(selectedAnuncio);
    
    if(document.getElementById("btnEliminar") == null && document.getElementById("btnModificar") == null)
    {
        let $btnEliminar = loadModifyEliminarBtns("Eliminar", "btnEliminar");
        let $btnModificar = loadModifyEliminarBtns("Modificar", "btnModificar");
        $btnEliminar.addEventListener("click", ()=>
        {
            borrar(anuncios, index, inputs, formBtns, selectedAnuncio);
        });
        $btnModificar.addEventListener("click", ()=>
        {
            modificar(anuncios, inputs, selectedAnuncio, formBtns);
        });

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

function borrar(anuncios, index, inputs, formBtns, carToDelete){
    anuncios.splice(index, 1);
    refreshTable(anuncios);
    vaciar(inputs);
    borrarBotones(formBtns);
    if(document.getElementById("btnCargar") != null){
        setEventToBtnCargar();
    }

    deleteAuto(carToDelete.id);
}

function modificar(anuncios, inputs, selectedAnuncio, formBtns)
{
    let modifiedCar = modificarObjetoAnuncio(inputs, selectedAnuncio);
    refreshTable(anuncios);
    vaciar(inputs);
    borrarBotones(formBtns);
    if(document.getElementById("btnCargar") != null){
        setEventToBtnCargar();
    }

    updateAuto(modifiedCar);
}








