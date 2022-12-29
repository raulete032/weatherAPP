
/**
 * Función que crea un nodo y lo devuelve
 * @param {String} tipo -> El tipo de nodo a crear
 * @param {String} txt -> Texto que llevará, en su caso, el nodo
 * @returns -> El nodo creado
 */
function creaNodo(tipo, txt) {

    if (txt == undefined)
        return document.createElement(tipo);
    else {
        let nodo = document.createElement(tipo);
        let texto = document.createTextNode(txt);

        nodo.appendChild(texto);
        return nodo;
    }
}



/**
 * Función que rellean un select con las options
 * @param {*} idSelect 
 * @param {*} data 
 */
function rellenaSelect(idSelect, data, txt, value){

    let select= document.getElementById(idSelect);
    for(let i=0;i<data.length;i++){
        let opt= creaNodo("option", data[i][txt]);
            opt.value= data[i][value];
        select.appendChild(opt);
    }
}



/**
 * Función que ordena un array de objetos por la propiedad NOMBRE_PROVINCIA
 * @param {*} orden -> ASC o DESC
 * @param {*} array -> El array de objetos
 * @returns 
 */
function ordenaArrayObjetos(orden, array, propiedad){

    if(orden=="ASC")
        array.sort((x, y) => x[propiedad].localeCompare(y[propiedad]));
    else
        array.sort((x, y) => y[propiedad].localeCompare(x[propiedad]));
    
    return array;
}



/**
 * Función que vacía un select (salvo la primera opción)
 * @param {*} idSelect 
 */
function vaciaSelect(idSelect){
    let select= document.getElementById(idSelect);

    while(select.options.length!=1 && select.options.length!=0)
        select.options[1].remove();
}


/**
 * Función que devuelve la hora actual en formato hh:mm:ss
 * @param {*} objDate -> Un objeto tipo Date
 * @returns -> String con la hora hh:mm:ss
 */
function createTimeString(objDate){
    var h= objDate.getHours();
    var m= objDate.getMinutes();
    var s= objDate.getSeconds();

    if(h<=9)
        h="0"+h;
    if(m<=9)
        m="0"+m;
    if(s<=9)
        s="0"+s;
    
    return h+":"+m+":"+s;
}

/**
 * Función que pasa los grados a grados Farenheit
 * @param {*} grados 
 * @returns 
 */
function gradosAFarenheit(grados){

    return (grados * 9/5) + 32;
}


/**
 * Función que limpia los datos que se muestran
 */
function limpia(){

    document.getElementById('mainTempHot').innerHTML= '';
    document.getElementById('mainTempLow').innerHTML= '';
    document.getElementById('humidity').innerHTML= '';
    document.getElementById('celcius').innerHTML= '';
    document.getElementById('farenheit').innerHTML= '';
    document.getElementById('wind').innerHTML= '';
    document.getElementById('temperaturaActual').style.visibility='hidden';

}