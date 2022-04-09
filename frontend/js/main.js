/* 
main.js

*/

// export let token = null;

// login test user
//ONLY FOR TESTING PURPOSES
function loginTestUser(){

    token = JSON.parse(sessionStorage.getItem('token'));

    if(!token){
        console.log('login function call')
        axios.post('http://localhost:1337/api/auth/local', {
            identifier:'testsson',
            password:'test1234',
        })
        .then(response =>{
            const {data:{jwt}} = response;
            token = jwt;
            console.log('User profile: ', jwt);
            sessionStorage.setItem('token', JSON.stringify(token))
        })
        .catch(error =>{
            console.log('There was an error: ', error)
        })
    }

};

loginTestUser();