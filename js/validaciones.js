const validar = (e) =>
{
    let emisor = e.target;
    let valor = e.target.value.trim();

    if(!validarCampoVacio(valor, emisor)){        
        return false;
    }

    if(emisor.type == "number"){
        if(!validarNumerosPositivos(valor, emisor)){
            return false; 
        }
        if(emisor.id != "txtPrecio"){
            if(!validarRango(valor, emisor)){
                return false;
            }
        }
    }

    if(emisor.type == "text"){
        if(!validarTieneLetras(valor, emisor)){
            return false;
        }
    }
   
    setSuccess(emisor);
}

const validarRango = (num, input) =>{

    let todoOk = false;
    switch(input.id){
        case "txtPuertas":
            if(num == 2 || num == 4 || num == 5){
                todoOk = true;
            }else{
                setError(input)
            }
            break;
        case "txtKms":
           if(num >= 0 && num <= 200000){
            todoOk = true;
           }else{
            setError(input)
            }
            break;
        case "txtPotencia":
            if(num >= 50 && num <= 300){
                todoOk = true;
               }else{
                setError(input)
                }
            break;
    }

    return todoOk;
}

const validarTieneLetras = (str, input) =>{
    let result = /[a-zA-Z]/.test(str);
    if(!result){
        setError(input)
        return false;
    }
    return true;
}

const validarNumerosPositivos = (num, input)=>{
    num = parseInt(num);
    if(num < 0){
        setError(input)
        return false;
    } 
    return true;
}

const validarCampoVacio = (str, input) =>{
    if(str.length > 0){
        return true
    }else{
        setError(input);
        return false
    }
}

const validarRadioButton = (e) =>
{
    let emisor = e.target;
    let valor = e.target.checked;
    if(emisor.id == "txtVenta" && valor){
        setSuccess(emisor);
        setSuccess(document.getElementById("txtAlquiler"));
    }else if(emisor.id == "txtAlquiler" && valor){
        setSuccess(emisor);
        setSuccess(document.getElementById("txtVenta"));
    }else{
        setError(emisor);
    }
}

function validarSubmit(inputs)
{   
    let todoOk = true;
    inputs.forEach(element =>{
        if(element.matches(".nonValid")){
            todoOk = false;
        }
    });
    return todoOk;
}

const setError = (input) =>
{
    const $small = input.nextElementSibling;
    $small.textContent = "Error, campo invalido";
    $small.classList.add("error");
    input.classList.add("nonValid")
    if(input.matches(".valid"))
    {
        input.classList.remove("valid");
    }
}

const setSuccess = (input) =>
{
    const $small = input.nextElementSibling;
    if(input.type != "radio"){
        $small.textContent = "✔";
        $small.classList.add("success");
    }
    input.classList.add("valid")  
    if(input.matches(".nonValid"))
    {
        input.classList.remove("nonValid");
    } 
}

export{
    validar,
    validarRadioButton,
    validarSubmit
}