
function authorize(container){
    if(userData == null){
        const pageContainer = $(container)
        pageContainer.empty()

        const pageError = $(`<div>
            <h1>Unauthorized access</h2>
        </div>`);

        console.log(pageContainer)

        pageContainer.append(pageError)
    }
}

export default(authorize);