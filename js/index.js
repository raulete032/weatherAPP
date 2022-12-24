
setInterval(()=>{
    let today= new Date();
    document.getElementById('localDate').innerHTML=today.toLocaleString();
}, 1000);



limpia();



llamadaAPI({peticion: 'provincias'})
    .then(function(data){
        let provincias= data.datos.provincias;
        provincias= ordenaArrayObjetos('ASC', provincias, 'NOMBRE_PROVINCIA');
        rellenaSelect('selectProvincia', provincias, 'NOMBRE_PROVINCIA', 'CODPROV');
    });




/**
 * Función que hace la llamada a la API para pedir los municipios de la provincia elegida
 */
function municipiosPorProvincia(){
    limpia();
    //Obtengo el código de la privincia
    let codProv= this.selectedOptions[0].value;

    llamadaAPI({peticion: 'provincias/'+ codProv+'/municipios'})
        .then(function(data){
            let municipios= data.datos.municipios;
            municipios= Object.values(municipios);
            municipios= ordenaArrayObjetos('ASC', municipios, 'NOMBRE');
            vaciaSelect('selectMunicipio')
            rellenaSelect('selectMunicipio', municipios, 'NOMBRE', 'CODIGOINE');
        })
}



function datosMunicipio(){
    limpia();
    let codProv= document.getElementById('selectProvincia').selectedOptions[0].value;
    let codMun= this.selectedOptions[0].value;
    codMun= codMun.substring(0,5);

    llamadaAPI({peticion: 'provincias/'+codProv+'/municipios/'+codMun})
        .then(function(data){
            let datos= data.datos;
            sessionStorage.setItem('datosMeteo', JSON.stringify(datos));
            muestraDatos();
        })
}


function muestraDatos(){

    let datos= JSON.parse(sessionStorage.getItem('datosMeteo'));

    //Actual
    document.getElementById('mainTempHot').innerHTML= datos.temperaturas.max + '&#176;';
    document.getElementById('mainTempLow').innerHTML= datos.temperaturas.min + '&#176;';
    document.getElementById('humidity').innerHTML= datos.humedad + '%';
    document.getElementById('celcius').innerHTML= datos.temperatura_actual + '&#176;C';
    document.getElementById('farenheit').innerHTML= gradosAFarenheit(datos.temperatura_actual) + '&#176;F';
    document.getElementById('wind').innerHTML= datos.viento + " m/s";

    //Mañana
    let mañana= datos.proximos_dias[0];
    let fecha= datos.proximos_dias[0]["@attributes"].fecha;
    let date= new Date(fecha);
    let dia= date.getDay();   

    document.getElementById('forecast-day-1-name').innerHTML= diaSemana(dia);

    //Pasado
    let pasado= datos.proximos_dias[1];
    fecha= datos.proximos_dias[1]["@attributes"].fecha;
    date= new Date(fecha);
    dia= date.getDay();   

    document.getElementById('forecast-day-2-name').innerHTML= diaSemana(dia);


    //Dentro de 3 días
    let dentro3Dias= datos.proximos_dias[2];
    fecha= datos.proximos_dias[2]["@attributes"].fecha;
    date= new Date(fecha);
    dia= date.getDay();   

    document.getElementById('forecast-day-3-name').innerHTML= diaSemana(dia);


    //Dentro de 4 días
    let dentro4Dias= datos.proximos_dias[3];
    fecha= datos.proximos_dias[3]["@attributes"].fecha;
    date= new Date(fecha);
    dia= date.getDay();   

    document.getElementById('forecast-day-4-name').innerHTML= diaSemana(dia);
}


/**
 * Función que devuelve el día de la semana de una fecha
 * @param {*} dia 
 * @returns 
 */
function diaSemana(dia){
    let result="";
    switch(dia){
        case 0: result= 'Dom';break;
        case 1: result= 'Lun';break;
        case 2: result= 'Mar';break;
        case 3: result= 'Mie';break;
        case 4: result= 'Jue';break;
        case 5: result= 'Vie';break;
        case 6: result= 'Dom';break;
    }
    return result;
}

