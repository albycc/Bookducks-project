//search.js

/*
Query Parameters

empty - retrieve all books, both loaned and available

* - retrieve available books

querystring - retrieve books with title or author containing search text

*/

const searchResultContainer = $('#search-result-container');

const searchField = $('#search-field')

async function searchQuery(){

    const params = new URLSearchParams(location.search)

    const query = params.get('query')

    console.log(query)

    const {data:{data:{attributes:bookCol}}} = await axios.get('http://localhost:1337/api/book-collection?populate[books][populate]=*&populate[audiobooks][populate]=*');

    let bookList = [...bookCol.books.data, ...bookCol.audiobooks.data]

    console.log(bookList)

    searchField.val(query)

    if(query == '*'){
        bookList = bookList.filter(b => b.attributes.loanedBy.data == null)
        
    }
    else{
        bookList = bookList.filter(b => b.attributes.title.toLowerCase().includes(query) || b.attributes.authors.toLowerCase().includes(query))

    }

    bookList.forEach(b => {
        searchResultContainer.append(bookRowItemContainer(b))
    })
}

const bookRowItemContainer = (bookItem) => {

    //what type of book?

    let arr = bookItem.attributes.itemID.split('_');

    const itemIDobject = {
        item:arr[0],
        type:arr[1],
        id:arr[2]
    }

    console.log(bookItem)

    const url = bookItem.attributes.cover.data !== null ?
    `http://localhost:1337${bookItem.attributes.cover.data.attributes.url}` :
     "../../../img/missingCover.svg";
    
    return $(`
        <div class="book-container">
            <a href="../../pages/bookinfo/bookinfo.html?id=${itemIDobject.id}&collection=${itemIDobject.type}">
                <img src="${url}">
            </a>
        </div>`
    )
}

$('#search-btn').on('click', searchListener);
$('#search-form').on('submit', searchListener);

function searchListener(){
    
    location.href = `../../pages/search/search.html?query=${searchField.text().toLowerCase()}`
}

searchQuery();

