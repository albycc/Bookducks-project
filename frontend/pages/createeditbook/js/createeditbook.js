// createeditbook.js
import {userData} from '../../../js/main.js'

let radioValue;

const genreValues = $('#genres-values')
const authorsValues = $('#authors-values')
const authorInputfield = $('#input-field-authors')

const narrationsValues = $('#narrations-values')
const narrationsInputfield = $('#input-field-narrators')

const coverInput = $('#cover-input');
const preview = $('#book-cover') 


$('[name="type-radio-grp"]').on('click', toggleRadioButtons)

function toggleRadioButtons(){
    $('li[data-radio]').hide();
    radioValue = $('[name="type-radio-grp"]:checked').val();
    $(`li[data-radio=${radioValue}]`).show();
}


$('#submit-btn').on('click', async (e)=>{
    e.preventDefault();
    console.log('create book function');
    $('.input-field-errormessage').remove();

    //are required fields empty?
    const required = $('[required]').filter(function(){
        return this.value == "";
    })

    //no cover image?
    if(coverInput[0].files.length == 0){
        console.log("missing cover image")
        preview.addClass('error')
        preview.next().text(`missing image click her to choose`)
        return;
    }
    //missing fields?
    console.log(required)
    if(required.length >= 1){
        console.log('empty fields');
        required.after('<p class="input-field-errormessage">Empty field</p>')
        return;
    }


    
    const inputs = $('#form-input-list > li').not('[style="display: none;"]').find('[data-input]');
    const multipleValues = $('#form-input-list > li').not('[style="display: none;"]').find('[data-multiple-prop]')

    const bookObject = {}
    inputs.each((i,e) =>{
        let value;
        if(e.type=="number"){
            value = +(e.value)
        }
        else{
            value = e.value
        }
        bookObject[`${e.dataset.input}`] = value
    })

    multipleValues.each((i,e) =>{
        const nameArray = [];
        const children = Array.prototype.slice.call(e.children)
        children.forEach(option =>{
            nameArray.push(option.textContent)
        })
        bookObject[`${e.dataset.multipleProp}`] = nameArray.join(', ');
    })

    //get genres
    const genreArray = genreValues.children().toArray().map(option => option.value)
    bookObject.genres = genreArray

    //get cover image
    const image = coverInput[0].files[0];
    const imgData = new FormData();
    console.log(image)
    imgData.append('files', image)

    console.log(bookObject);

    await axios.post('http://localhost:1337/api/upload', imgData ,{
        headers:{
            Authorization: `Bearer ${userData.jwt}`
        }
    })
    .then(response =>{
        bookObject.cover = response.data[0].id
        axios.post(`http://localhost:1337/api/${radioValue}`, {
            data:bookObject
        },
        {
            headers:{
                Authorization:`Bearer ${userData.jwt}`
            }
        })
    })
    .then(response =>{
        console.log(response)
    })
    .catch(error =>{
        console.log(error.message)
    })

})

async function initFormula(){
    //"1954-07-29"
    toggleRadioButtons();
    const today = new Date();
    $('#input-field-date').val(today.toISOString().slice(0, 10))
    // $('#input-field-date').val(new Date().toDateInputValue());


    //genre option dropdown
    const genreOptions = $('#genre-option');

    await axios.get('http://localhost:1337/api/genres')
    .then(response =>{
        const {data:{data}} = response;
        data.forEach(g =>{
            const option = $(`<option value="${g.id}">${g.attributes.name}</option>`)
            genreOptions.append(option)
            option.on('click', ()=>{
                console.log('click')
            })
        })

    })
    
    genreOptions.on('change', (e)=>{
        const genre = e.target.children[e.target.value-1]

        if(genreValues.children(`[value=${genre.value}]`).length >= 1){
            return;
        }

        const option = $(`<span class="option-value" value="${genre.value}">${genre.textContent}</span>`);
        option.val(genre.value);

        genreValues.append(option)

        option.on('click', (e)=>{
            option.remove();
        })
    })

    //add behaviour for multiple value inputs
    addMultipleValueBehavior($('#add-author-btn') ,authorInputfield, authorsValues)
    addMultipleValueBehavior($('#add-narrator-btn') ,narrationsInputfield, narrationsValues)

}

initFormula();

function addMultipleValueBehavior(button, inputfield, multipleValueContainer){
    button.on('click', ()=>{
        const value = inputfield.val();

        if(multipleValueContainer.children(`[value="${value}"]`).length >= 1){
            return;
        }
        if(value == ""){
            return;
        }
        inputfield.val("");
    
    
        const option = $(`<span class="option-value" value="${value}">${value}</span>`);
        multipleValueContainer.append(option);
        option.on('click', (e)=>{
            option.remove();
        })
    })
}

coverInput.on('change', (e)=>{
    const bookCover = coverInput[0].files[0];

    const reader = new FileReader();
    reader.onload = function(event){
        preview.attr('src', reader.result);
        preview.next().remove();
    };
    reader.readAsDataURL(bookCover)
})