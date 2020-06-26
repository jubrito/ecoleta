// Services: formas de obtermos recursos de um meio externo a aplicação

/* Ao invés de utilizar o fetch, API nativa do navegador pra fazer requisições */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' // a baseURL é o comum pras rotas, apenas preciso trocar aqui se mudar
});

export default api;