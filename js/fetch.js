const URL = "http://localhost:3000/autos";

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

const getAuto = async (id) => {
	try{
		addSpinner();
		const res = await fetch(URL + `/${id}`);

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
}

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

const updateAuto = (auto) => {
	addSpinner();
	fetch(URL + `/${auto.id}`, 
	{
		method: "PUT",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(auto),
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
	  return data.data;
    })
    .catch((err) => {
      console.error(err);
    })
	.finally(()=>{
		destroySpinner();
	})
};

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
  getAuto,
  updateAuto,
  deleteAuto,
  postAuto
}

