
const bookRowPopular = $('#popular-books-row');

console.log(bookRowPopular)

async function populateBookrows(){

    const token = JSON.parse(sessionStorage.getItem('token'))

    // console.log(token)

    //'http://localhost:1337/api/book-collection?populate=*'
    //
    const {data:{data}} = await axios.get('http://localhost:1337/api/books?populate=*', {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(data)

    data.forEach(book => {
        const bookCoverURL = book.attributes.cover.data.attributes.url;
        if(bookCoverURL){
            bookRowPopular.append(bookRowItemContainer(bookCoverURL));
        }
        else{
            console.log('Warning! Book missing cover')
        }
        console.log('Book cover url: ', bookCoverURL);

    });
}

const bookRowItemContainer= (url) => {
    return $(`
    <div class="book-container">
        <a href="./pages/bookinfo/bookinfo.html">
            <img src="http://localhost:1337${url}">
        </a>
    </div>`)
}

populateBookrows();