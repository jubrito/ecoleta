import axios from 'axios';
// 192.168.0.143
// 181.213.132.4
// 181.213.132.5
const api = axios.create({
    // baseURL:  `http://{$192.168.0.143:3333` // endereço pegado do expo que é o nosso ip 
    baseURL: 'http://168.0.143:3333' // endereço pegado do expo que é o nosso ip 
});

export default api