import {userData} from './main.js';
import { bookRowItemContainer, setBookCollection} from './bookcollection.js';

const bookRowPopular = $('#popular-books-row');
const bookRowFantasy = $('#fantasy-books-row')
const bookRowScifi = $('#scifi-books-row')

const searchField = $('#search-field');

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

$('#search-btn').on('click', ()=>{
    location.href = `./pages/search/search.html?query=${searchField.val().toLowerCase()}`
})

populateBookrows();

setBookCollection("./", "./")
