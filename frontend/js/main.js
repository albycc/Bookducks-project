/* 
main.js

*/

// export let token = null;

// login user when page loads
(function(){

    token = JSON.parse(sessionStorage.getItem('token'));

    //if there is no logged in user yet. ONLY FOR TESTING PURPOSES
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

})();
