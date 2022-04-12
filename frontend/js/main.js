/* 
main.js

*/

// export let token = null;

// login test user
//ONLY FOR TESTING PURPOSES

const userData = JSON.parse(sessionStorage.getItem('userData'));

(function (){

    // edit account section in header
    const profileLinkSection = $('#profile-link-section');
    const loginLink = $('#login-link');
    
    if(userData !== null){
        
        profileLinkSection.removeClass('hide-visible');
        $('#profile-link').text(userData.user.username)

        $('#logout-btn').on('click', ()=>{
            sessionStorage.removeItem('userData');
        })
    }
    //user is not logged in
    else{
        profileLinkSection.remove();
        loginLink.removeClass('hide-visible')
    }

})();

export {userData};