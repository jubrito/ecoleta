/* TypeScript:
As bibliotecas precisam vir com o código e a definição de tipos (informações de todas as funções, parâmetros e retornos)
As que não veem com a definição de tipos, passamos o mouse em cima e instalamos o que ele sugerir
*/

import express from 'express'; 

const app = express();

/* ROTAS: endereço completo da requisição

 app.get:
    - qual a rota (RECURSO: users)
    - a funcao executada quando acessarem a rota), recebe parâmetros de forma automática:
        - request: obter dados sobre a requisição (Exemplo: se fosse criação de usuários, receberia os dados do user como nome, email, senha..)
        - response: devolver uma resposta para o browser ou aplicação que esteja consumindo a rota */
app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    // response.send('Hello World');  = printa na tela quando acessar essa rota 
    response.json(
    [
        'Juliana',
        'Rafael',
        'Marta'
    ]
    );
});

app.listen(3333);


