import {userData} from '../../../js/main.js'

const booksLoanedCollection = $('#books-loaned-collection');

const loanTab = $('#loan-tab');
const registeredTab = $('#registered-tab')

async function fetchUserInfo(){

    console.log(userData)

    const {data:{data}} = await axios.get(`http://localhost:1337/api/books?populate=*&filters[loanedBy][id][$eq]=${userData.user.id}`, {
        headers:{
            Authorization:`Bearer ${userData.jwt}`,
        },
    });

    console.log(data);

    $('h1').text(userData.user.username);

    const {id, email, createdAt} = userData.user;
    const userList = [id, email, createdAt]

    $('.user-info-row > span + span').each((i,e) =>{
        console.log(e)
        e.textContent = userList[i]
    })

    loanTab.children('span.book-tab-count').text(data.length)

    data.forEach(book => {
        console.log(book.attributes.cover)
        $('#books-loaned-collection').append(`
            <div class="book">
                <img src="http://localhost:1337${book.attributes.cover.data.attributes.url}"></img>
            </div>
        `)
        
    });


}

fetchUserInfo();