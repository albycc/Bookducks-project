//bookInfo.js

import {userData} from '../../../js/main.js';

let bookId;
let collection;
let book;

const bookpageContainer = $('#bookpage-container')

async function loadBookData(){
    const params = new URLSearchParams(location.search)
    
    bookId = params.get('id');
    collection = params.get('collection')

    let {data:{data:{attributes:bookItem}}} = await axios.get(`http://localhost:1337/api/${collection}/${bookId}?populate=*`)

    const bookType = collection[0].toUpperCase() + collection.slice(1, collection.length-1)

    const genreString = bookItem.genres.data.map(b => b.attributes.name).join(", ");

    console.log(bookItem)

    book = bookItem;

    const url = book.cover.data !== null ?
    `http://localhost:1337${book.cover.data.attributes.url}` :
     "../../../img/missingCover.svg";


    //score stars

    let scorePerc = ((5 - bookItem.avgScore) * 20) + "%";
    const stars = `
    <div class="score-bar">
        <div class="score empty"></div>
        <div class="score full" style="clip-path:inset(0% ${scorePerc} 0% 0%);">
    </div>
    `;
    
    const container =  `
        <div class="bookinfo-header-container">
            <div class="book-cover">
                <img src="${url}" alt="" id="">
            </div>
            <div class="book-info-heading">
                <article>
                    <h1>${bookItem.title}</h1>
                    </section>
                    <section>
                        <p>${bookItem.authors}</p>
                        ${collection == "audiobooks" ? "<p>Narrated by: " + bookItem.narratedBy + "</p>": ""}
                    </section>
                    <section>
                        <div class="star-row">
                            ${stars}
                            <span>${bookItem.avgScore !== null ? bookItem.avgScore : ""}</span>
                        </div>
                    </section>
                    <section>
                        <div class="components-row">
                            <button id="loan-btn" class="component-button background-pink"></button>
                        </div>
                    </section>
                </article>
            </div>
        </div>
        <div class="main-book-container">
            <article>
                <section>
                    <h2>Description</h2>
                </section>
                <section>
                    <span class="desc-text">${bookItem.description || ""}</span>
                    <div id="description-container">

                    </div>
                </section>
                <section>
                    <h2>Book details</h2>
                </section>
                <section>
                    <p>Format</p>
                    <p>${bookType}</p>
                </section>
                <section>
                    <p>Genres</p>
                    <p>${genreString}</p>
             </section>
                <section>
                    <p>Date published</p>
                    <p>${bookItem.datePublished}</p>
                </section>
                <section>
                    <p>ISBN</p>
                    <p>${bookItem.isbn}</p>
                </section>
            </article>
           
        </div>
    `;

    $('.book-container').append(container);
    const loanBtn = $('#loan-btn');
    
    // is user not logged in?
    if(userData == null){
        loanBtn.prop('disabled', true);
        loanBtn.text('Login to loan')
    }
    //
    else{
        //someone else if borrowing it?
        if(book.loanedBy.data !== null){
            if(book.loanedBy.data.attributes.username !== userData.user.username){
                const loanersMessage = `<div class="user-loaned-box">
                    <p>Already loaned by</p>
                    <p>${book.loanedBy.data.attributes.username}</p>
                    <p>Mail: ${book.loanedBy.data.attributes.email}</p>
                </div>`

                loanBtn.after(loanersMessage);
                loanBtn.remove();

                return;
            }
            //You're the loaner
            else if(book.loanedBy.data.attributes.username === userData.user.username){
                loanBtn.text('Retrieve');
                loanBtn.on('click', retrieveBook)
                return;
            }
        }
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
            loanedBy:userData.user.id,
        }
    },
    {
        headers:{
            Authorization: `Bearer ${userData.jwt}`,
        }
    })
    const popupContainer = $(`<div class="popup-container"></div>`);
    const popupMessage = $('<div class="message-box"></div>');

    popupMessage.append(`
        <div class="content">
            <h2>You have loaned ${book.title}!</h2>
        </div>
        <div class="content">
            <h3>Recipe details</h3>
            <p>Loaned by: ${userData.user.username}</p>
            <p>Email: ${userData.user.email}</p>
        
        </div>
        <div class="content links">
            <a href="../../index.html" class="link-button background-pink">Search more books</a>
            <button id="close-popup-btn" class="close">Close</button>
        
        </div>
    `);
    popupContainer.append(popupMessage);

    bookpageContainer.prepend(popupContainer);

    $('#close-popup-btn').on('click', ()=>{
        location.reload();
    })

    $(document).on('scroll', ()=>{
        popupContainer.css('top', window.scrollY)
    })
}

async function retrieveBook(){
    await axios.put(`http://localhost:1337/api/${collection}/${bookId}`, {
        data:{
            loanedBy:null,
        }
    },
    {
        headers:{
            Authorization: `Bearer ${userData.jwt}`,
        }
    })
    .then(response =>{

        console.log(response)
        const popupContainer = $(`<div class="popup-container"></div>`);
        const popupMessage = $('<div class="message-box"></div>');

    
        popupMessage.append(`
            <div class="content">
                <h2>Thank you or reading ${response.data.data.attributes.title}!</h2>
            </div>
            <div class="content links">
                <a href="../../index.html" class="link-button background-pink">Search more books</a>
                <button id="close-popup-btn" class="close">Close</button>
            </div>
        `);
    
        popupContainer.append(popupMessage);
    
        bookpageContainer.prepend(popupContainer);
    
        $('#close-popup-btn').on('click', ()=>{
            location.reload();
        })

        $(document).on('scroll', ()=>{
            popupContainer.css('top', window.scrollY)
        })

    })


}