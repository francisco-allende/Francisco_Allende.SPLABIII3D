const buildTable=(data)=>
{
    if (!Array.isArray(data)) {
        return null;
    }

    let $divTabla = document.getElementById("divTabla");
    let $table = document.createElement('table');
    $table.classList.add("table");
    $table.classList.add("table-orderer");
    $table.classList.add("table-striped"); 
    $table.classList.add("table-light");
    $table.classList.add("table-hover");
    $table.appendChild(buildColumns(data[0]));
    $table.appendChild(buildRows(data));

    $divTabla.appendChild($table);
}

function buildColumns(obj)
{   
    const $thead = document.createElement("thead"); 
    $thead.classList.add("table-dark"); 
    const $fila = document.createElement("tr");

    for (const key in obj) 
    {
        if (key !== 'id') 
        {
            const $column = document.createElement("th");
            $column.textContent = key;
            $fila.append($column);
        }
    }

  $thead.appendChild($fila);
  return $thead;
}

function buildRows(data)
{
    const $tbody = document.createElement("tbody")
    
    data.forEach(element => 
    {
        const $fila = document.createElement("tr");
        
        for(let key in element)
        {
            if(key !== "id")
            {
                let $celda = document.createElement("td");
                $celda.textContent = element[key]; 
                $fila.append($celda);
            }else{
                $fila.setAttribute("data-id", element[key]);
            }
        }
        $tbody.appendChild($fila);
    });
    
    const filas = $tbody.children;
    for (let i = 0; i < filas.length; i++) {
        if (!(i % 2)) {
            filas[i].classList.add('rosa')
        }else{
            filas[i].classList.add('blanco')
        }
    }

  return $tbody;
}

const refreshTable = (data) =>
{
    destroyTable();  
    addSpinner();
    setTimeout(() => {    
        buildTable(data);
        destroySpinner();
        }, 3000)
    localStorage.setItem("lista_anuncios",  JSON.stringify(data));
}

function destroyTable()
{
    const divTabla = document.getElementById("divTabla");
    while (divTabla.lastElementChild) 
    {
        divTabla.removeChild(divTabla.lastElementChild);
    }
}

function addSpinner()
{
    let container = document.getElementById("containerSpinner");
    let spinner = document.createElement("div");
    spinner.classList.add("spinner");

    let iconoAuto = document.createElement("img");
    iconoAuto.setAttribute("src", "./imagenes/icono_auto_spinner.png")
    iconoAuto.classList.add("icono_auto");

    let p = document.createElement("p");
    p.classList.add("centrar");
    p.appendChild(iconoAuto)

    spinner.appendChild(p);
    container.appendChild(spinner);
}

function destroySpinner()
{
    let container = document.getElementById("containerSpinner");
    let spinner = container.firstElementChild;
    container.removeChild(spinner); 
}

export {
    buildTable,
    refreshTable
}

