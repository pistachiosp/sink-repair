import { fetchRequests, fetchPlumbers, deleteRequest, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

//import { getRequests } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")
// Now add an event listener to the main container. When the user clicks on any of the delete buttons, invoke the deleteRequest() function you just made above. Make sure you pass the id of the service request to the deleteRequest() function as an argument.
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
// You need to fetch the data from the API and store it in application state before you can convert the data structures to HTML representations.your instruction team will explain the logic when they do a live coding review.
// const render = () => {
//     fetchRequests().then(
//         () => {
//     mainContainer.innerHTML = SinkRepair()
//         }
//     )
// }
// render()

// Then update your main.js to request both resources using the following syntax. Notice the new .then() method which, in turn, invokes the fetchPlumbers function.
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(() => {mainContainer.innerHTML = SinkRepair()})
}

render()

// Now your main module has to listen for the custom event and invoke the render() function to build all the HTML again.
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)