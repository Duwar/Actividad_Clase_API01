
const cargarInformacion = async (e) => {
    e.preventDefault();
    const buscarPaisJs = document.getElementById('buscarPais').value;
    console.log('pais a buscar', buscarPaisJs);

    try {
        const respuesta = await fetch(`https://restcountries.com/v3.1/name/${buscarPaisJs}`);
        const pais = await respuesta.json();
        console.log('pais obtenido', pais)
        mostarInfo(pais);
    } catch (error) {
        console.log('Hubo un error inesperado', error);
        alert('Hubo un error inesperado, intente más tarde');
    }

}

const mostarInfo = (pais) => {
    console.log('Vamos a contruir un HTML')

    const contenedor = document.getElementById('datos');

    if (pais.length === 1) {
        pais = pais;
    } else {
        contenedor.innerHTML = '<div class="sinPais"><p>¡Lo siento! no encontramos este país.</p></div>';
        return;
    }

    const nativeNames = pais[0].name.nativeName;
    const primerasClave = Object.keys(nativeNames);
    let primeraClave = 0;

    if (primerasClave.length === 1) {
        primeraClave = primerasClave[0];
    } else if (primerasClave.length > 1) {
        primeraClave = primerasClave[primerasClave.length - 1];
    }

    const nombreOficial = nativeNames[primeraClave].official;
    const nombreComun = nativeNames[primeraClave].common;

    const currencieName = pais[0].currencies;
    const primeraClaveCur = Object.keys(currencieName)[0];

    const nombreOficialCur = currencieName[primeraClaveCur].name;
    const symbolo = currencieName[primeraClaveCur].symbol;

    const languages = pais[0].languages;
    console.log(languages);
    const primeraClaveLan = Object.keys(languages)[0];
    console.log(primeraClaveLan);
    const language = languages[primeraClaveLan];
    console.log('result', language);

    const capital = pais[0].capital;
    const maps = pais[0].maps.googleMaps;
    const openMaps = pais[0].maps.openStreetMaps;

    contenedor.innerHTML = `
         <section class="card" >
            <div class="flagCoat">
            <img src="${pais[0].flags.png}" class="card-img-top" alt="${pais[0].flags.alt}">
            <img src="${pais[0].coatOfArms.png}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${nombreOficial}</h5>
                <p class="card-text">El hermoso país de ${nombreComun}, cuenta con las siguientes caracteristicas:
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Capital: ${capital}</li>
                <li class="list-group-item">Lenguaje: ${language}</li>
                <li class="list-group-item">Moneda oficial: ${nombreOficialCur} </li>
                <li class="list-group-item">simbolo de la moneda: ${symbolo}</li>

            </ul>
            <div class="card-body">
                <a href="${maps}" target="_blank" class="card-link">Google Maps</a>
                <a href="${openMaps}" target="_blank" class="card-link">Open Street Maps</a>
            </div>
        </section>
    `

}