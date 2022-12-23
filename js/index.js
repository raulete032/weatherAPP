

llamadaAPI({peticion: 'provincias'})
    .then(function(data){
        let provincias= data.datos.provincias;
        provincias= ordenaArrayObjetos('ASC', provincias, 'NOMBRE_PROVINCIA');
        rellenaSelect('selectProvincia', provincias, 'NOMBRE_PROVINCIA', 'CODPROV');
    });


function municipiosPorProvincia(){

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