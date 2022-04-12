// createeditbook.js
import {userData} from '../../../js/main.js'

const radioBooktypeGrp = $('[name="type-radio-grp"]');
let radioValue;

$('[name="type-radio-grp"]').on('click', toggleRadioButtons)

function toggleRadioButtons(){
    $('li[data-radio]').hide();
    radioValue = $('[name="type-radio-grp"]:checked').val();
    $(`li[data-radio=${radioValue}]`).show();
}


$('#submit-btn').on('click', async (e)=>{
    console.log('create book function');
    e.preventDefault();

    //are required fields empty?
    const required = $('[required]');
    if(required.val() == ""){
        console.log('empty fields');
        console.log(required)
        return;
    }
    
    const inputs = $('#form-input-list > li').not('[style="display: none;"]').find('[data-input]');

    console.log(inputs)

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

    console.log(bookObject);

    await axios.post(`http://localhost:1337/api/${radioValue}`, {
        data:bookObject
    },
    {
        headers:{
            Authorization:`Bearer ${userData.jwt}`
        }
    })
})

async function initFormula(){
    //"1954-07-29"
    toggleRadioButtons();
    const today = new Date();
    $('#input-field-date').val(today.toISOString().slice(0, 10))
    console.log(today.toISOString().slice(0, 10))
    // $('#input-field-date').val(new Date().toDateInputValue());

    const genreOptions = $('#genre-option');

    await axios.get('http://localhost:1337/api/genres')
    .then(response =>{
        const {data:{data}} = response;
        data.forEach(g =>{
            genreOptions.append(`<option value="${g.id}">${g.attributes.name}</option>`)
        })
    })
}

initFormula();