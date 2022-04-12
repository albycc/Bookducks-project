import {userData} from '../../../js/main.js'

const booksLoanedContent = $('#book-collection-books-loaned');


async function fetchUserInfo(){


    const {data:{data}} = await axios.get(`http://localhost:1337/api/books?populate=*&filters[loanedBy][id][$eq]=${userData.user.id}`, {
        headers:{
            Authorization:`Bearer ${userData.jwt}`,
        },
    });

    $('h1').text(userData.user.username);

    const {id, email, createdAt} = userData.user;
    const userList = [id, email, createdAt]

    $('.user-info-row > span + span').each((i,e) =>{
        e.textContent = userList[i]
    })

    $('input#loaned-tab + label > span.book-tab-count').text(data.length)

    console.log($('input#loaned-tab ~ label > span.book-tab-count'))

    data.forEach(book => {
        console.log(book.attributes.cover)
        booksLoanedContent.append(`
            <div class="book">
                <img src="http://localhost:1337${book.attributes.cover.data.attributes.url}"></img>
            </div>
        `)
        
    });


}

fetchUserInfo();