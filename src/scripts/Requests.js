import { getPlumbers, getRequests, getCompletions, saveCompletion } from "./dataAccess.js"
// In the following code, you will need to define the function that will be passed to the map() method.
const mainContainer = document.querySelector("#container")
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            // const completionRequestId = document.querySelector("input[name='completionRequest']").value
            // const completionPlumberId = document.querySelector("input[name='completionPlumber']").value
            // const completionDate_created = document.querySelector("input[name='completionDate']").value

           //this data goes to API
            const completion = {
                //changing string into int with parseint
                requestId : parseInt(requestId),
                plumberId: parseInt(plumberId),
                Date_created: Date.now()
            }
            /*
                Invoke the function that performs the POST request to the `completions` resource for your API. Send the completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)
// The function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

// The function should define 1 parameter (value will be each object in the array)
// The description of the service request should be interpolated inside the <li> HTML representation.
// The function should return the HTML representation.
// For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...
// requests.map(convertRequestToListElement).join("")
export const buildServiceRequest = (request) => {
//get completions
const completions = getCompletions()
const plumbers = getPlumbers()
//.find compare request.completions
let html = ""
html += `<li> ${request.description}`
html += `<select class='plumbers' id='plumbers'>
<option value='0'>Choose</option> 
${plumbers.map( plumber => { return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`}).join("")}
</select>
<button class="request__delete"
         id="request--${request.id}">Delete</button></li>`
completions.map(completion => {
    if(completion.requestId === request.id) {
        html = `<li>${request.description}<button class="request__delete" id="request--${request.id}">Delete</button></li>`
    }
})
return html  
}
// const listItems = request.map(buildServiceRequest)
// html += listItems.join("")
export const Requests = () => {
    const requests = getRequests()
    let html =`<ul>
    ${requests.map(buildServiceRequest).join("")}
    </ul>`
    return html
}
// export const Requests = () => {
//     const requests = getRequests()

//     let html = `<ul>
//        ${requests.map(request => {
// // Now that you have a function that can send a DELETE request to the API, you can add a button for the user to click and initiate that process. Add the button element right next to the text of each request.
//     return `<li>
//         ${request.description}<button class="request__delete"
//         id="request--${request.id}">Delete</button></li>` 
//                 }).join("")
//             }
//             </ul>`
//         return html
// }

// export const Plumbers = () => {
//     const request = getRequests()
//     const plumbers = getPlumbers()
//     let html = `<select class="plumbers" id="plumbers">
//     <option value="">Choose</option>
//     ${
//         plumbers.map(plumber => {
//                 return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
//             }
//         ).join("")
//     }
// </select>`
// return html
// }


// return `<li>${request.id}-${request.description} ${request.address} $${request.budget}</li>`