// createaccount.js
// import {printErrorMessage} from './login.js'

const userNameInputfield = $('#username-input-field');
const emailInputfield = $('#email-input-field');
const passwordInputfield = $('#password-input-field');

$('#login-btn').on('click', async (e)=>{
    e.preventDefault();

    console.log(userNameInputfield.val(), emailInputfield.val(), passwordInputfield.val())

    if(userNameInputfield.val() == "" || emailInputfield.val() == "" || passwordInputfield.val() == ""){
        console.log("Empty fields");
        return;

    }

    const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: userNameInputfield.val(),
        password: passwordInputfield.val(),
        email: emailInputfield.val()
    })
    

    console.log('created account function')
});

(function(){
    userNameInputfield.val('Robert');
    emailInputfield.val('robert@gmail.com');
    passwordInputfield.val('test')
})();