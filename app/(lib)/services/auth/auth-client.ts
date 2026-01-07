export async function signUp(payload: {email : string, name: string, password: string}){

    const res = await fetch("/api/auth/sign-up/email",
        {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)

        }
    )
    return checkAndReturnJSON(res)
} 

export async function signIn(payload: {email:string, password: string}) {

    const res = await fetch("/api/auth/sign-in/email",{
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }) 
    return checkAndReturnJSON(res)
}

export async function signOut() {

    const res = await fetch("/api/auth/sign-out",{
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({})
    }) 
    return checkAndReturnJSON(res)
}


export async function checkAndReturnJSON(res: Response){
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || "Operation Failed!")
    return data
}
