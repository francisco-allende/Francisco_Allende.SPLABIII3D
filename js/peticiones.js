const URL = "http://localhost:3000/autos";

/*
//METODO GET CON FETCH
const getAutos = async () => {
	try {
		addSpinner();
		const res = await fetch(URL);

		if (!res.ok) {
			throw new Error(`${res.status}-${res.statusText}`);
		}
		
		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
	}finally{
		destroySpinner();
	}
};
*/

const getAutos = async () =>
{
    return new Promise((resolve,rejected)=>
    {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", ()=>
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300){
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                    resolve(data);
                }
                else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                    rejected("Error: No se encontro la lista de autos");
                }
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
            }
        });

        xhr.open("PUT", URL + "/" + auto.id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(auto));
    });
};

//METODO DELETE CON AJAX 
const deleteAuto = async (id) =>
{
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
                    rejected("Error: No se pudo borrar el auto de la base de datos");
                }
            }
        });

        xhr.open("DELETE", URL + "/" + id);
        xhr.send();
    });
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

