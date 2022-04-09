

export async function get(url, token){
    return await axios.get(url, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
}