const API_BASE = "http://localhost:3000"


async function callApi(endpoint:string) {
    const response = await fetch( `${API_BASE}/${endpoint}`)
    if(response.ok){
        return response.json()
    } else{
        throw new Error(`API Error: ${response.status}`)
    }
}

//RETURN ALL SAMPLES
export async function getSamples() {
    return callApi("api/samples")
}