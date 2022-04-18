
let missingCoverPath;
let bookLinkPath;

// "./img/missingCover.svg"
// ./pages/bookinfo/bookinfo.html

export const bookRowItemContainer = (bookItem) => {

    let arr = bookItem.attributes.itemID.split('_');

    const itemIDobject = {
        item:arr[0],
        type:arr[1],
        id:arr[2]
    }
    
    const availableFlag = bookItem.attributes.loanedBy.data == null;

    const url = bookItem.attributes.cover.data !== null ?
    `http://localhost:1337${bookItem.attributes.cover.data.attributes.url}` :
     `${missingCoverPath}img/missingCover.svg`;   

    return $(`
    <div class="book">
    
        <a href="${bookLinkPath}pages/bookinfo/bookinfo.html?id=${itemIDobject.id}&collection=${itemIDobject.type}">
            <img src="${url}">
            <div class="book-message ${availableFlag ? "yellow-color" : "red-color"}">
                <span>${availableFlag ? "Available" : "Unavailable"}</span>
            </div>
            
        </a>
        <p class="title">${bookItem.attributes.title}</p>
        <p>${bookItem.attributes.authors}</p>
        
    </div>`)
}

export function setBookCollection(missingCover, aLinkPath){
    missingCoverPath = missingCover;
    bookLinkPath = aLinkPath;

}

export default {missingCoverPath, bookLinkPath}