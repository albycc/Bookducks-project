
const emailField = $('#email-input-field');
const passwordField = $('#password-input-field');
const errorMessage = $('#error-message');


const loginbutton = $('#login-btn')

loginbutton.on('click', (e)=>{
    login(e);
})

$('#login-form').on('submit', (e)=>{
    login(e)
})

async function login(e){
    e.preventDefault();
    
    if(emailField.val() == "" || passwordField.val() == ""){
        printErrorMessage("Empty fields");
        return;
    }
    
    loginbutton.attr('disabled', true)
    console.log('login function call')
    await axios.post('http://localhost:1337/api/auth/local', {
        identifier: emailField.val(),
        password: passwordField.val(),
    })
    .then(response =>{
        console.log('Login success');
        const {data} = response;
        sessionStorage.setItem('userData', JSON.stringify(data))
        console.log('Login details: ', data);
        location.href= '../../index.html';
    
    })
    .catch(error =>{
        console.log(error.response)
        if(error.response.status == 400){
            printErrorMessage('Wrong email or password')
            loginbutton.removeAttr('disabled')
    
        }
    })
}

function printErrorMessage(message){
    if(errorMessage.parent().hasClass('hide-visible')){
        errorMessage.parent().removeClass('hide-visible');
    }
    errorMessage.text(message)
}