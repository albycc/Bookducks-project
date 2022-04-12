//bookInfo.js

import {userData} from '../../../js/main.js';

let bookId;
let collection;
let book;

async function loadBookData(){
    const params = new URLSearchParams(location.search)
    
    bookId = params.get('id');
    collection = params.get('collection')

    const {data:{data:{attributes}}} = await axios.get(`http://localhost:1337/api/${collection}/${bookId}?populate=*`)

    book = attributes;
    const bookType = collection[0].toUpperCase() + collection.slice(1, collection.length-1)

    const genreString = book.genres.data.map(b => b.attributes.name).join(", ");

    // console.log(bookType)

    const container =  `
        <div class="bookinfo-flexcolumn">
            <div class="book-cover">
                <img src="http://localhost:1337${book.cover.data.attributes.url}" alt="" id="">
            </div>
            <div class="book-info-panel">

                <p>Format <br>${bookType}</p>
                <p>ISBN <br>${book.isbn}</p>
                <p>Genres <br>${genreString}</p>
            </div>
        </div>
        <div class="main-book-container">
            <span class="flex-row flex-space-between">
                <h1>${book.title}</h1>

                <span>${book.avgScore}</span>
            </span>
            <p>${book.authors}</p>
            ${collection == "audiobooks" ? "<p>Narrated by: " + book.narratedBy + "</p>": ""}
            <p>Published date: ${book.datePublished}</p>
            <button id="loan-btn"></button>
            <p>description</p>
            <span>${book.description || ""}</span>
            <div id="description-container">

            </div>
        </div>
    `;

    $('.book-container').append(container);
    const loanBtn = $('#loan-btn');
    
    // is book already loaned?
    if(userData == null){
        loanBtn.prop('disabled', true);
        loanBtn.text('Login to loan')
    }
    else{
        book.loanedBy.data ? 
            (loanBtn.text('Already loaned'), 
            loanBtn.prop('disabled', true)) :
            loanBtn.text('Loan');
        loanBtn.on('click', loanBook)
    }
}

loadBookData();



//event listeners

async function loanBook(){
    console.log('loan book function');

    await axios.put(`http://localhost:1337/api/${collection}/${bookId}`, {
        data:{
            loanedBy:1,
        }
    },
    {
        headers:{
            Authorization: `Bearer ${userData.jwt}`,
        }
    })
    const popupContainer = $(`<div class="recipe-popup-container"></div>`);
    const popupMessage = $('<div class="message-box"></div>');

    popupMessage.append(`
        <h2>You have loaned ${book.title}!</h2>
        <h3>Recipe details</h3>
        <p>Loaned by: ${userData.user.username}</p>
        <p>Email: ${userData.user.email}</p>
        <a href="../../index.html">Search more books<a>
        <button id="close-popup-btn">Close</button>
    `);
    popupContainer.append(popupMessage);

    $('#bookpage-container').prepend(popupContainer);

    $('#close-popup-btn').on('click', ()=>{
        location.reload();
    })
}