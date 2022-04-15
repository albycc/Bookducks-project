import {userData} from './main.js';

const bookRowPopular = $('#popular-books-row');
const bookRowFantasy = $('#fantasy-books-row')
const bookRowScifi = $('#scifi-books-row')

async function populateBookrows(){


    

    // const trendingBooks = [...books, ...audiobooks].sort((a,b) => b.attributes.avgScore - a.attributes.avgScore).slice(0, 5);

    const {data:{data:{attributes:trendingCollection}}} = await axios.get('http://localhost:1337/api/trending-book?populate[books][populate]=*&populate[audiobooks][populate]=*')


    const {data:{data:{attributes:fantasyCollection}}} = await axios.get('http://localhost:1337/api/fantasy?populate[books][populate]=*&populate[audiobooks][populate]=*')
    const {data:{data:{attributes:scifiCollection}}} = await axios.get('http://localhost:1337/api/scifi?populate[books][populate]=*&populate[audiobooks][populate]=*')

    
    const trendingBooks = [...trendingCollection.audiobooks.data, ...trendingCollection.books.data].sort((a,b) => b.attributes.avgScore - a.attributes.avgScore)
    const scifiBooks = [...scifiCollection.audiobooks.data, ...scifiCollection.books.data].sort((a,b) => b.attributes.avgScore - a.attributes.avgScore)
    const fantasyBooks = [...fantasyCollection.audiobooks.data, ...fantasyCollection.books.data].sort((a,b) => b.attributes.avgScore - a.attributes.avgScore)

    populateRow(trendingBooks, bookRowPopular)
    populateRow(fantasyBooks, bookRowFantasy);
    populateRow(scifiBooks, bookRowScifi)
    
}

function populateRow(list, rowElement){
    list.forEach(book => {
        rowElement.append(bookRowItemContainer(book));
    });

}

async function getBookCollection(apiURL){
    const {data:{data}} = await axios.get(apiURL);
    return data
}

const bookRowItemContainer = (bookItem) => {

    //what type of book?

    let arr = bookItem.attributes.itemID.split('_');

    const itemIDobject = {
        item:arr[0],
        type:arr[1],
        id:arr[2]
    }
    

    return $(`
    <div class="book-container">
        <a href="./pages/bookinfo/bookinfo.html?id=${itemIDobject.id}&collection=${itemIDobject.type}">
            <img src="http://localhost:1337${bookItem.attributes.cover.data.attributes.url}">
        </a>
    </div>`)
}

populateBookrows();
