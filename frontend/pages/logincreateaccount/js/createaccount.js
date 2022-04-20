
const usernameInputfield = $('#username-input-field');
const emailInputfield = $('#email-input-field');
const passwordInputfield = $('#password-input-field');

const errorMessage = $('#error-message')

const createBtn = $('#create-account-btn');

createBtn.on('click', async (e)=>{
    e.preventDefault();

    errorMessage.parent().addClass('hide-visible')

    if(!$('#terms-checkbox').is(':checked')){
        printErrorMessage('Agree to the terms.')
        return;
    }

    const requriedFields = $('[required]').filter(function(){
        return this.value == "";
    })

    if(requriedFields.length >= 1){
        console.log('empty fields');
        printErrorMessage('Missing fields')
        return;
    }
    
    if(passwordInputfield.val().length < 8){
        printErrorMessage('Password must be 8 atleast characters long.')
        return;    
    }

    await axios.post('http://localhost:1337/api/auth/local/register', {
        username:usernameInputfield.val(),
        email:emailInputfield.val(),
        password:passwordInputfield.val(),
    })
    .then(response =>{
        console.log(response);
        if(response.status==200){

            const popupMessage = $('<div class="message-box"></div>');

            popupMessage.append(`
                <div class="popup-container">
                    <div class="message-box">
                        <div class="content">
                            <h2>Account created succesful!</h2>
                            <p>Now enjoy plenty of books here at</p>
                            <p>meinPage</p>
                        </div>
                        <div class="content links">
                            <button id="close-popup-btn" class="close">Close</button>
                        </div>
                    </div>
                </div>
            `);

            $('.login-page-layout').before(popupMessage);

            $('#close-popup-btn').on('click', ()=>{
                sessionStorage.setItem('userData', JSON.stringify(response.data))
                location.href= '../../index.html';
            })
        }
    })
    .catch(error =>{
        console.log(error.response);
        printErrorMessage(error.response.data.error.message)
    })
});

function printErrorMessage(message){
    if(errorMessage.parent().hasClass('hide-visible')){
        errorMessage.parent().removeClass('hide-visible');
    }
    errorMessage.text(message)
}