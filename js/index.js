
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




    //Pasado



    //Dentro de 3 días





    //Dentro de 4 días

}




