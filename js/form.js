function avoidFormSubmit(formBtns)
{
    for (let i = 0; i < formBtns.length; i++) 
    {
        formBtns[i].addEventListener('click', (e)=>{
            e.preventDefault();
        })   
    }
}

function asignarNonValid(inputs)
{
    inputs.forEach(element => {
        element.classList.add("nonValid");
    })
}

function loadModifyEliminarBtns(text, id)
{
    let formBtns = document.getElementById('formDivBtn'); 
    if(formBtns.children.length <= 3)
    {
        let $btn = document.createElement("button");
        $btn.classList.add("btn");
        if(id == "btnEliminar"){
            $btn.classList.add("btn-danger");
        }else{
            $btn.classList.add("btn-primary");
        }
        $btn.textContent = text;
        $btn.setAttribute("id", id);
        formBtns.appendChild($btn);
        return $btn;
    }   
}

function loadBtnCargar(){
    let $divBotones = document.getElementById("formDivBtn");
    let $btn = document.createElement("button");
    let $icono = document.createElement("i");
    $icono.classList.add("bi");
    $icono.classList.add("bi-hdd");
    
    $btn.classList.add("btn");
    $btn.classList.add("btn-success");
    $btn.textContent = " Guardar";
    $btn.setAttribute("id", "btnCargar");
    $divBotones.prepend($btn); 
    $btn.prepend($icono);
}

function loadClickedAnuncio(inputs, anuncio)
{
    inputs[0].value = anuncio.titulo;
    if(anuncio.transaccion == "venta")
    {
        inputs[1].checked = true;
        inputs[2].checked = false;
    }else{
        inputs[1].checked = false;
        inputs[2].checked = true;
    }
    inputs[3].value = anuncio.descripcion;
    inputs[4].value = anuncio.precio;
    inputs[5].value = anuncio.puertas;
    inputs[6].value = anuncio.kms;
    inputs[7].value = anuncio.potencia;

    inputs.forEach(element=>{
        if(element.matches(".nonValid"))
        {
            element.classList.remove("nonValid");
            element.classList.add("valid");
        }
    })
}

function vaciar(inputs)
{
    inputs.forEach(element=>{
        if(element.matches(".valid"))
        {
            element.classList.add("nonValid");
            element.classList.remove("valid");
        }

        if(element.name != "transaccion")
        {
            element.value = "";
            const $small = element.nextElementSibling;
            $small.textContent = "";
        }
        else
        {
            element.checked = false;
        }
    });
}

function borrarBotones(formBtns)
{
    let aux = formBtns;
    for(let i = 0; i < aux.length; i++)
    {
        if(aux[i].matches("#btnEliminar")){
            formBtns[i].remove();
            formBtns[i].remove();
        }
    }
    if(document.getElementById("btnCargar") == null){
        loadBtnCargar();
        avoidFormSubmit(formBtns);
    }
}

function modificarObjetoAnuncio(inputs, selectedAnuncio)
{
    selectedAnuncio.titulo = inputs[0].value ;
    if(inputs[1].checked)
    {
        selectedAnuncio.transaccion = "venta";
    }else{
        selectedAnuncio.transaccion = "alquiler";
    }
    selectedAnuncio.descripcion = inputs[3].value;
    selectedAnuncio.precio = inputs[4].value;
    selectedAnuncio.puertas = inputs[5].value;
    selectedAnuncio.kms = inputs[6].value;
    selectedAnuncio.potencia = inputs[7].value;
}

export {
    avoidFormSubmit,
    asignarNonValid,
    vaciar,
    loadModifyEliminarBtns,
    loadClickedAnuncio,
    borrarBotones,
    loadBtnCargar,
    modificarObjetoAnuncio
}