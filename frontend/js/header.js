import {userData} from './main.js';

(function (){

    // edit account section in header
    const profileLinkSection = $('#profile-link-content');
    const loginLink = $('#login-link');
    
    //iser is loegged in
    if(userData !== null){
        
        profileLinkSection.removeClass('hide-visible');
        $('#profile-link').find('span').text(userData.user.username)

        console.log($('#profile-link').find('span'))

        $('#login-link').remove()

    }
    //user is not logged in
    else{
        profileLinkSection.remove();
        loginLink.removeClass('hide-visible')
    }

})();