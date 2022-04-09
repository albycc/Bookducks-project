//bookInfo.js


let bookId;

const token = JSON.parse(sessionStorage.getItem('token'));

async function loadBookData(){
    const qs = new URLSearchParams(location.search)
    
    bookId = qs.get('id');

    const {data:{data:{attributes}}} = await axios.get(`http://localhost:1337/api/books/${bookId}?populate=*`)

    const book = attributes;

    console.log(book.loanedBy.data)

    const authorString = book.authors.data.map(b => b.attributes.name).join(", ");

    const container =  `
        <div class="bookinfo-flexcolumn">
            <div class="book-cover">
                <img src="http://localhost:1337${book.cover.data.attributes.url}" alt="" id="">
            </div>
            <div class="book-info-panel">
                <p>lorem</p>
                <p>lorem</p>
                <p>lorem</p>
                <p>lorem</p>
                <p>lorem</p>
            </div>
        </div>
        <div class="main-book-container">
            <span class="flex-row flex-space-between">
                <h1>${book.title}</h1>

                <span>${book.avgScore}</span>
            </span>
            <p>${authorString}</p>
            <button id="loan-btn"></button>
            <p>description</p>
            <div id="description-container">

            </div>
        </div>
    `

    $('.book-container').append(container);
    const loanBtn = $('#loan-btn');
    
    // is book already loaned?
    book.loanedBy.data ? 
        (loanBtn.text('Already loaned'), loanBtn.prop('disabled', true) ):
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