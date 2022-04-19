

// await axios.post('http://localhost:1337/api/auth/local', {
//     identifier: 'testsson',
//     password: 'test1234',
// })
// .then(response =>{
//     console.log('Login success');
//     const {data} = response;
//     sessionStorage.setItem('userData', JSON.stringify(data))
//     console.log('Login details: ', data);

// })
// .catch(error =>{
//     console.log(error.response)
//     if(error.response.status == 400){
//         printErrorMessage('Wrong email or password')
//         loginbutton.removeAttr('disabled')

//     }
// })

const coverInput = document.querySelector('#fileinput')
const userData = JSON.parse(sessionStorage.getItem('userData'))

document.querySelector('#send-btn').addEventListener('click', async (e)=>{
    e.preventDefault();

    const imgData = new FormData();

    imgData.append('files', coverInput.files[0], coverInput.files.name);

    console.log(imgData.getAll('files'))

    const data = await axios.get('http://localhost:1337/api/upload/files/1');

    console.log(data)

    // await axios.post('http://localhost:1337/api/upload', imgData ,{
    //     headers:{
    //         Authorization:`Bearer ${userData.jwt}`,
    //     }
    // })
    // .then(response =>{
    //     console.log(response.status)
    // })

})