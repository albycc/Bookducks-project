import {userData} from '../../../js/main.js'
import { convertId } from '../../../js/bookid.js';
import { bookRowItemContainer, setBookCollection } from '../../../js/bookcollection.js';

const booksLoanedContent = $('#book-collection-books-loaned');
const booksRegisteredContent = $('#book-collection-books-registered')


async function fetchUserInfo(){

    let {data:{data:{attributes:bookColl}}} = await axios.get(`http://localhost:1337/api/book-collection?populate[books][populate]=*&populate[audiobooks][populate]=*`, {
        headers:{
            Authorization:`Bearer ${userData.jwt}`,
        },
    });

    const usersBookList = [...bookColl.books.data, ...bookColl.audiobooks.data].filter(book => {
        if(book.attributes.loanedBy.data !== null){
            if(book.attributes.loanedBy.data.id == userData.user.id){
                return book
            }
        }
        if(book.attributes.creator.data !== null){
            if(book.attributes.creator.data.id == userData.user.id){
                return book
            }    
        }
    })

    console.log(usersBookList);
    $('h1').text(userData.user.username);

    let {id, email, createdAt} = userData.user;

    createdAt = createdAt.slice(0,10)
    const userList = [id, email, createdAt]

    $('.user-info-row > span + span').each((i,e) =>{
        e.textContent = userList[i]
    })

    let loanedCountElement = $('input#loaned-tab + label > span.book-tab-count');
    const createdCountElement = $('input#registered-tab + label > span.book-tab-count');
    // .text(usersBookList.length)

    usersBookList.forEach(book =>{

        console.log(book)

        if(book.attributes.loanedBy.data !== null){
            booksLoanedContent.append(bookRowItemContainer(book))
            loanedCountElement.text((+loanedCountElement.text()) + 1)
            
        }
        if(book.attributes.creator.data !== null){
            booksRegisteredContent.append(bookRowItemContainer(book))
            createdCountElement.text((+ createdCountElement.text()) + 1)
        }
    })

}

fetchUserInfo();

$('#logout-btn').on('click', ()=>{
    sessionStorage.removeItem('userData');
    location.href = '../../../index.html'
    
})

setBookCollection("../../../", "../")