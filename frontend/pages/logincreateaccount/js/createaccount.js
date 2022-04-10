// createaccount.js
// import {printErrorMessage} from './login.js'

const usernameInputfield = $('#username-input-field');
const passwordInputfield = $('#password-input-field');
const emailInputfield = $('#email-input-field');

$('#login-btn').on('click', async (e)=>{
    e.preventDefault();

    console.log(usernameInputfield.val(), passwordInputfield.val(), emailInputfield.val())

    if(usernameInputfield.val() == "" || emailInputfield.val() == "" || passwordInputfield.val() == ""){
        console.log("Empty fields");
        return;

    }

    const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username:usernameInputfield.val(),
        password:passwordInputfield.val(),
        email:emailInputfield.val(),
    })
    

    console.log('created account function')
});

// (function(){
//     usernameInputfield.val('Robert');
//     emailInputfield.val('robert@gmail.com');
//     passwordInputfield.val('test1234')
// })();