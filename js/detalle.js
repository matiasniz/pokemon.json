
window.onload = async () => {
    try{
        const id = window.location.search.slice(4);
        if (isNaN(id))
            throw "El parametro id es requerido"
        
        const res = await fetch('data/pokedex.json') 
        const data = await res.json()

        const pokemon = data.find( p => p.id == id)
        if (!pokemon)
            throw "No se encontro el pokemon"

        console.log(pokemon)
        setHead(pokemon)
        setApp(pokemon)
    }catch(err) {
        alert(err)
        goHome()
    }
};

const goHome = () => window.location.href = '/index.html'

const setHead = pokemon => {
    let icon = document.getElementById("icon")
    let title = document.getElementById("title")
    
    icon.setAttribute("href", pokemon.sprite)
    title.textContent = pokemon.name
}

const setApp = pokemon => {
    let types = ''
    pokemon.type.map( t => {
        types += `<li class="${t}">${t}</li>`
    })
    let app = document.getElementById("root")
    app.innerHTML = `
        <div class="contenedor">
            <div class="card text-center">
                <div class="card-header">
                    <img src="${pokemon.picture}"  class="image" alt="${pokemon.name}" />
                </div>
                <div class="card-body">
                    <h5 class="card-title name">${pokemon.name}</h5>
                    <ul class="type">
                        ${types}
                    </ul>
                </div>
                <div class="card-footer text-muted">
                    <ul>
                        <li class="atributo">HP: ${pokemon.base.HP}</li>
                        <li class="atributo">Ataque: ${pokemon.base.Attack}</li>
                        <li class="atributo">Defensa: ${pokemon.base.Defense}</li>
                        <li class="atributo">Velocidad: ${pokemon.base.Speed}</li>
                    </ul>

                    <a href="/index.html" class="btn btn-primary">Volver al inicio</a>
                </div>
            </div>
        </div>

    `  
}