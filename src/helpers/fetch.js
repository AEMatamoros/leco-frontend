const API_URL = "http://localhost:3000"

const fetchAPI = (endpoint,data,method = 'GET') =>{
    const url = `${API_URL}/diagrams/${endpoint}`;
    try{
        if ( method=== 'GET' ){
            return fetch(url)
        }else{
            return fetch(url,{
                method,
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            })
        }
    }catch(e){
        console.error("Ocurrio un error en la petición", e)
    }
    
}

export {
    fetchAPI
}