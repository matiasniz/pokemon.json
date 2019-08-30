/**
 * Hace una llamada AJAX descargando el achivo pokedex.json
 */
function buscar(conFiltro) {
    //Creo el objeto XMLHttpRequest 
    const xhr = new XMLHttpRequest();
    
    //Cuando se descargue el archivo...
    xhr.onload = function() {
        //Si hay error lo informo
        if (xhr.status != 200) {
            alert("Error al intentar consultar pokedex.json");
            return;
        }
        //Convierto el JSON en un array de objetos
        let dataArray = JSON.parse(xhr.responseText);

        //Si hay que filtrar, busco los elementos del form y llamo a filtrar
        if (conFiltro) {
            //Tomo el nombre
            let nombre = document.getElementById("form-nombre").value;

            let ataqueMin = document.getElementById("form-ataque-min").value;
            let ataqueMax = document.getElementById("form-ataque-max").value;

            dataArray = filtrar(dataArray, nombre, ataqueMin, ataqueMax);
        }

        mostrarResultados(dataArray);
    }

    xhr.onerror = function(event) {
        console.log("error");
    };

    //Especifico el método 
    xhr.open('GET', 'data/pokedex.json', true);
    //Envío la solicitud
    xhr.send();
}

/**
 * Filtro el array por las condiciones establecidas
 * @param {Array} dataArray 
 * @param {string} nombre 
 * @param {number} ataqueMin 
 * @param {number} ataqueMax 
 */
function filtrar(dataArray, nombre, ataqueMin, ataqueMax) {
    let resultado = [];
    dataArray.forEach(element => {
        if ((!nombre || element.name.toLowerCase().indexOf(nombre) >= 0) && //Si especificó nombre
            (!ataqueMin || element.base.Attack >= ataqueMin) && //Si especificó ataqueMin 
            (!ataqueMax || element.base.Attack <= ataqueMax)) {  //Si especificó ataqueMax
            resultado.push(element);
        }

    });
    return resultado;
}

function mostrarResultados(dataArray) {
    let items = document.getElementById("items");
    items.innerHTML = "";

    dataArray.forEach(pokemon => {
        
        //Creo el div "name"
        let divName = document.createElement('div');
        divName.setAttribute("class", "name");
        divName.innerText = pokemon.name;

        //Creo un ul para todos los tipos
        let ulType = document.createElement("ul");
        ulType.setAttribute("class", "type");

        //Creo un list item por cada type
        pokemon.type.forEach(type => {
            let liType = document.createElement('li');
            liType.setAttribute("class", type);
            liType.innerText += type;
            ulType.append(liType);
        }); 

        //Creo un ul para las estadísticas
        let ulStats = document.createElement("ul");
        ulStats.setAttribute("class", "stats");
        
        //Agrego HP
        let liHP = document.createElement("li");
        liHP.innerText = "HP: " + pokemon.base.HP;
        ulStats.append(liHP);

        //Agrego Attack
        let liAttack = document.createElement("li");
        liAttack.innerText = "Ataque:" + pokemon.base.Attack;
        ulStats.append(liAttack);

        //Agrego Defense
        let liDefense = document.createElement("li");
        liDefense.innerText = "Defensa: " + pokemon.base.Defense;
        ulStats.append(liDefense);

        //Agrego Speed
        let liSpeed = document.createElement("li");
        liSpeed.innerText = "Velocidad: " + pokemon.base.Speed;
        ulStats.append(liSpeed);

        //Creo el elemento a que contendrá cada pokemon
        let a = document.createElement('a');
        a.setAttribute("href", "detalle.html?id=" + pokemon.id);
        a.setAttribute("class", "pokemon col col-lg-3 col-md-6 col-sm-12 col-xs-12");

        //Creo el div contenedor
        let divContainer = document.createElement('div');
        divContainer.setAttribute("class", "contenedor");
        
        //Meto dentro del tag a un contenedor
        a.appendChild(divContainer);

        //Creo un elemento imagen y le asigno el thumbnail
        let img = document.createElement('img');
        img.setAttribute('src', pokemon.thumbnail);
        
        //Meto dentro del contenedor todos los elementos
        divContainer.append(img);
        divContainer.append(divName);
        divContainer.appendChild(ulType);
        divContainer.appendChild(ulStats);
        
        items.append(a);    
    });
};

//Cuando el usuario hace click en el botón buscar...
let btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function() {
    buscar(true);
};

//Cuando la página está lista muestro todos los pokemones
buscar(false);