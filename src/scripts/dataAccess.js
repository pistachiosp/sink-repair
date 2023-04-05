//api
const mainContainer = document.querySelector("#container")
const applicationState = {
plumbers: [],
completions: [],
requests: []
}

const API = "http://localhost:8088"
// request waiting on response
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
    //convert response to json
        .then(res => res.json())
        .then((serviceRequests) => {
                //{console.log(serviceRequests)
                // Store the external state in application state
                applicationState.requests = serviceRequests})}



//making copy of applicationState.requests
export const getRequests = () => {
return applicationState.requests.map(request => ({...request}))}

//The POST method on any HTTP request means "Hey API!! I want you to create something new!"
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
    //convert response to json
        .then(res => res.json())
    //what data are you trying to get
        .then(() => {
            //doc.querysel finds html element
            //need to lookin to .dispatchevent
            const mainContainer = document.querySelector("#container")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        })
}
//function whose responsiblity it is to initiate the fetch request for DELETE must have the primary key sent to it as an argument.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
    .then(res => res.json())
        .then(() => {
                //const mainContainer = document.querySelector("#container")
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
//Plumbers
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(res => res.json())
        .then((name) => {
            //changed requests to completions
                applicationState.plumbers = name})}
//making copy of appstate.plumbers
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))}
//The POST method on any HTTP request means "Hey API!! I want you to create something new!"
export const sendPlumbers = (completedPlumber) => {
    const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completedPlumber)
        }
    
    
        return fetch(`${API}/plumbers`, fetchOptions)
        //convert response to json
            .then(res => res.json())
        //what data are you trying to get
            .then(() => {
                //doc.querysel finds html element
                //need to look into .dispatchevent
                //const mainContainer = document.querySelector("#container")
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    
            })
    }

// export const saveCompletion = () => {
//     return fetchCompletions()
// }
// request waiting on response
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    //convert response to json
        .then(res => res.json())
        .then((serviceCompletions) => {
        //{console.log(serviceRequests)
        // Store the external state in application state
        applicationState.completions = serviceCompletions})
}
                
export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))}
// export const fetchCompletions = () => {
//     
// }
export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }
    //const mainContainer = document.querySelector("#container")
    return fetch(`${API}/completions`,fetchOptions)
    .then(res => res.json())
    .then(() => {mainContainer.dispatchEvent(new CustomEvent("stateChanged"))})
}