//bookInfo.js


let bookId;

const token = JSON.parse(sessionStorage.getItem('token'));

async function loadBookData(){
    const qs = new URLSearchParams(location.search)
    
    bookId = qs.get('id');

    const {data:{data:{attributes}}} = await axios.get(`http://localhost:1337/api/books/${bookId}?populate=*`)

    const book = attributes;

    console.log(book)

    const authorString = book.authors.data.map(b => b.attributes.name).join(", ");
    const genreString = book.genres.data.map(b => b.attributes.name).join(", ");

    const bookType = book.type[0].__component.split('.')[1];

    // console.log(bookType)

    const container =  `
        <div class="bookinfo-flexcolumn">
            <div class="book-cover">
                <img src="http://localhost:1337${book.cover.data.attributes.url}" alt="" id="">
            </div>
            <div class="book-info-panel">

                <p>Format <br> ${bookType}</p>
                <p>ISBN <br>${book.isbn}</p>
                <p>Genres <br>${genreString}</p>
            </div>
        </div>
        <div class="main-book-container">
            <span class="flex-row flex-space-between">
                <h1>${book.title}</h1>

                <span>${book.avgScore}</span>
            </span>
            <p>${authorString}</p>
            <p>Published date: ${book.datePublished}</p>
            <button id="loan-btn"></button>
            <p>description</p>
            <span>${book.description || ""}</span>
            <div id="description-container">

            </div>
        </div>
    `

    $('.book-container').append(container);
    const loanBtn = $('#loan-btn');
    
    // is book already loaned?
    book.loanedBy.data ? 
        (loanBtn.text('Already loaned'), 
        loanBtn.prop('disabled', true)) :
        loanBtn.text('Loan');
    loanBtn.on('click', loanBook)
}

loadBookData();



//event listeners

async function loanBook(){
    console.log('loan book function');

    const response = await axios.put(`http://localhost:1337/api/books/${bookId}`, {
        data:{
            loanedBy:1,
        }
    },
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}