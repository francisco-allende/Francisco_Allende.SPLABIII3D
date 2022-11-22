
window.addEventListener("load", buildCards);

function buildCards() {
    const $cardContainer = document.getElementById("container_cards");
    let data = JSON.parse(localStorage.getItem("lista_anuncios"));
    let contador = 1;

    let $divRow = document.createElement("div");
    $divRow.classList.add("row");
    $divRow.classList.add("p-2");
    $cardContainer.appendChild($divRow);

    if(data != null){
        data.forEach(element => {
            $divRow.innerHTML += `
              <div class="col-lg-3 col-sm-12">
                  <div class="card text-center border-dark">
                    <div class="card-title">
                      <h3> ${element.titulo} </h3>
                      <h4 class="card-subtitle mb-2"> ${element.descripcion} </h4>
                    </div>
                    <div class="card-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Precio: $${element.precio}</li>
                        <li class="list-group-item"><img src="./imagenes/icono_puerta.png" alt="icono puerta" class="icono"> ${element.puertas} puertas </li>
                        <li class="list-group-item"><img src="./imagenes/icono_kms.png" alt="icono kms" class="icono"> ${element.kms} KMs</li>
                        <li class="list-group-item"><img src="./imagenes/icono_potencia.png" alt="icono potencia" class="icono"> ${element.potencia} de potencia</li>
                      </ul>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success">Ver Vehiculo</button>
                    </div>
                    
                  </div>
              </div
            `

            if((contador % 4) == 0){
                $cardContainer.innerHTML+=`</div>`; //cierro la row que itera hasta 4 cartas
                $divRow.innerHTML = ``; //lo vacio o se acumulan
                $cardContainer.appendChild($divRow); //le añado una nueva row 
            }
            
            contador++;
        });
    }
}

function destroyCards() {
    const container = document.getElementById("container_cards");
    while (container.lastElementChild) 
    {
        container.removeChild(container.lastElementChild);
    }
}

function refreshCards() {
    destroyCards();  
    buildCards();
}

window.addEventListener("click", refreshCards);



