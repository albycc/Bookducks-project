
const emailField = $('#email-input-field');
const passwordField = $('#password-input-field');
const errorMessage = $('#error-message');

$('#login-btn').on('click', (e)=>{
    e.preventDefault();

    if(emailField.val() == "" || passwordField.val() == ""){
        printErrorMessage("Empty fields");
        return;
    }

    console.log('login function call')
    axios.post('http://localhost:1337/api/auth/local', {
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
        if(error.response.status == 400){
            printErrorMessage('Wrong email or password')
        }
    })
})

export function printErrorMessage(message){
    if(errorMessage.parent().hasClass('hide-visible')){
        errorMessage.parent().removeClass('hide-visible');
    }
    errorMessage.text(message)
}