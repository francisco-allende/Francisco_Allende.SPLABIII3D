const URL = "http://localhost:3000/autos";


//METODO GET CON AJAX
const getAutos = async () =>
{
	addSpinner();
    return new Promise((resolve,rejected)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                    resolve(data);
                }else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                    rejected("Error: No se encontro la lista de autos");
                }
				destroySpinner();
            }
        });

        xhr.open("GET", URL);
        xhr.send();
    });
};

//METODO POST CON FETCH CON ASYNC AWAIT
const postAuto = async (auto) => {
	addSpinner();
	fetch(URL, {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(auto)
	})
	.then(
		response => response.json()
		) 
	.then(
		json => console.log(json)
		)
	.catch(
		err => console.log(err)
		)
	.finally(()=>{
		destroySpinner();
	})
}

//METODO PUT CON AJAX
const updateAuto = async (auto) =>
{
	addSpinner();
    return new Promise((resolve,rejected)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
                else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                    rejected("Error: No se pudo actualizar el auto en la base de datos");
                }
				destroySpinner();
            }
        });

        xhr.open("PUT", URL + "/" + auto.id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(auto));
    });
};

//METODO DELETE CON FETCH
const deleteAuto = (id) => {
	addSpinner();
	fetch(URL + `/${id}`, 
	{
		method: "DELETE",
	})
    .then((res) =>
	{
		if(res.ok){
			return res.json();
		}else{
			return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
		}  
	})
    .then((data) => {
      	console.log(data);
    })
    .catch((err) => {
      	console.error(err);
    })
	.finally(()=>{
		destroySpinner();
	})
};

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

export{
  getAutos,
  updateAuto,
  deleteAuto,
  postAuto
}

