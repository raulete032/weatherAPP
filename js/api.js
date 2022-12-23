

function API_url(){
    return "https://www.el-tiempo.net/api/json/v2/";
}


function llamadaAPI(obj){

    return new Promise(function(resolve, reject){
        fetch(API_url()+obj.peticion)
            .then(function(resp){
                if(resp.ok)
                    resp.json()
                        .then(function(data){
                            resolve({datos: data})
                        })
                        .catch(function(er){
                            console.error("ERROR: " + er);
                        })
            })
            .catch(function(er){
                reject({error: er})
            })
    })

    
}