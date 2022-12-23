
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
