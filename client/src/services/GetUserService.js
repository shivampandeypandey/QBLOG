import config from '../environments/main';
import fetchError from '../helper/customException';


export default async function  GetUserService() {
    try {
        
        const response = await fetch(config.baseUrl+'api/v1/user',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${localStorage.getItem('token')}`
            },
        }, 2 * 10 * 60 * 1000);
        if (!response.ok) {
            throw response
        }
        const json_response = await response.json()
        return json_response.data;
    } catch (err) {
        console.log(err)
    }
}