
const bookRowPopular = $('#popular-books-row');
const bookRowFantasy = $('#fantasy-books-row')
const bookRowScifi = $('#scifi-books-row')

console.log(bookRowPopular)

async function populateBookrows(){

    const token = JSON.parse(sessionStorage.getItem('token'))

    // console.log(token)

    //'http://localhost:1337/api/book-collection?populate=*'
    //
    const books = await axios.get('http://localhost:1337/api/books?populate=*');
    const audiobooks = await axios.get('http://localhost:1337/api/audiobooks?populate=*');

    console.log(books)

    const bookList = [...books.data.data, ...audiobooks.data.data]

    const trendingBooks = bookList.sort((a,b) => b.attributes.avgScore - a.attributes.avgScore).slice(0, 5);

    // const fantasyBooks = bookList.filter(b => b.attributes.genres.data.find(g => g.attributes.name == "fantasy"))

    console.log(bookList)
    
    trendingBooks.forEach(book => {
        const bookCoverURL = book.attributes.cover.data.attributes.url;
        if(bookCoverURL){
            bookRowPopular.append(bookRowItemContainer(book));
        }
        else{
            console.log('Warning! Book missing cover');
        }
        
    });
    
    bookList.forEach(book =>{

        if(containsGenre('fantasy')){
            bookRowFantasy.append(bookRowItemContainer(book));
        }
        else if(containsGenre('sci-fi')){
            bookRowScifi.append(bookRowItemContainer(book));
        }

        function containsGenre(genre){
            return book.attributes.genres.data.find(b => b.attributes.name == genre) || false;
        }
    })




}

const bookRowItemContainer = (item) => {

    //what type of book?
    const collection = item.attributes.hasOwnProperty("nrPages") ? "books" : "audiobooks";

    return $(`
    <div class="book-container">
        <a href="./pages/bookinfo/bookinfo.html?id=${item.id}&collection=${collection}">
            <img src="http://localhost:1337${item.attributes.cover.data.attributes.url}">
        </a>
    </div>`)
}

populateBookrows();
