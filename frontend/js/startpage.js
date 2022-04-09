
const bookRowPopular = $('#popular-books-row');
const bookRowFantasy = $('#fantasy-books-row')
const bookRowScifi = $('#scifi-books-row')

console.log(bookRowPopular)

async function populateBookrows(){

    const token = JSON.parse(sessionStorage.getItem('token'))

    // console.log(token)

    //'http://localhost:1337/api/book-collection?populate=*'
    //
    const {data:{data}} = await axios.get('http://localhost:1337/api/books?populate=*')

    
    //get available books
    const bookList = data.filter(b => !b.attributes.loanedBy.data);

    const trendingBooks = bookList.sort((a,b) => b.attributes.avgScore - a.attributes.avgScore).slice(0, 5);

    // const fantasyBooks = bookList.filter(b => b.attributes.genres.data.find(g => g.attributes.name == "fantasy"))

    console.log(bookList)
    
    trendingBooks.forEach(book => {
        const bookCoverURL = book.attributes.cover.data.attributes.url;
        if(bookCoverURL){
            bookRowPopular.append(bookRowItemContainer(bookCoverURL));
        }
        else{
            console.log('Warning! Book missing cover');
        }
        
    });
    
    bookList.forEach(book =>{
        const bookCoverURL = book.attributes.cover.data.attributes.url;

        if(containsGenre('fantasy')){
            bookRowFantasy.append(bookRowItemContainer(bookCoverURL));
        }
        else if(containsGenre('sci-fi')){
            bookRowScifi.append(bookRowItemContainer(bookCoverURL));
        }

        function containsGenre(genre){
            return book.attributes.genres.data.find(b => b.attributes.name == genre) || false;
        }
    })




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
