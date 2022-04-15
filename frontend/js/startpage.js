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

    console.log(bookItem)
    //what type of book?
    const itemIDobject = Object.assign({}, bookItem.attributes.itemID.split('_'))
    
    console.log(itemIDobject)

    return $(`
    <div class="book-container">
        <a href="./pages/bookinfo/bookinfo.html?id=${bookItem.id}&collection=${itemIDobject['1']}">
            <img src="http://localhost:1337${bookItem.attributes.cover.data.attributes.url}">
        </a>
    </div>`)
}

populateBookrows();
