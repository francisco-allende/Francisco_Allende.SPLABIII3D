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

  return $tbody;
}

const refreshTable = (data) =>
{
    let t = document.getElementById("divTabla");
    destroyTable();  
    setTimeout(() => { 
        buildTable(data);
        }, 3000)
    
}

function destroyTable()
{
    const divTabla = document.getElementById("divTabla");
    while (divTabla.lastElementChild) 
    {
        divTabla.removeChild(divTabla.lastElementChild);
    }
}

//con menos columnas

function hideColumns(data, columns){
    destroyTable();

    let $divTabla = document.getElementById("divTabla");
    let $table = document.createElement('table');
    $table.classList.add("table");
    $table.classList.add("table-orderer");
    $table.classList.add("table-striped"); 
    $table.classList.add("table-light");
    $table.classList.add("table-hover");

    $table.appendChild(buildColumnsWithHideColumns(columns));
    $table.appendChild(buildRowsWithHideColumns(data, columns));

    $divTabla.appendChild($table);
}

function buildColumnsWithHideColumns(obj)
{   
    const $thead = document.createElement("thead"); 
    $thead.classList.add("table-dark"); 
    const $fila = document.createElement("tr");
    let cantidad = Object.keys(obj).length;
    let porcentaje = 100 / cantidad;

    for (const key in obj) 
    {
        const $column = document.createElement("th");
        $column.textContent = obj[key]; //obj en la posicion key (ya que key es un indice)
        $column.style.width=`${porcentaje}%`;
        $fila.append($column);
    }

    $thead.appendChild($fila);
    return $thead;
}

function buildRowsWithHideColumns(data, columns)
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

                for(let i = 0; i < Object.keys(columns).length; i++){
                    if(columns[i] == key){
                        $celda.textContent = element[key]; 
                        $fila.append($celda);
                    }
                }
                
            }else{
                $fila.setAttribute("data-id", element[key]);
            }
        }
        $tbody.appendChild($fila);
    });

  return $tbody;
}




export {
    buildTable,
    refreshTable,
    hideColumns
}

