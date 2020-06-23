/* TypeScript:
As bibliotecas precisam vir com o código e a definição de tipos (informações de todas as funções, parâmetros e retornos)
As que não veem com a definição de tipos, passamos o mouse em cima e instalamos o que ele sugerir
*/

import express from 'express'; 
/* Existe três pontinhos "..." e "Could not find a declaration file for module 'express'" e npm install @types/express: 
Typescript: precisamos definir a tipagem do express:
ou seja, os tipos das bibliotecas (nesse caso express), delimitando 
o formato dos parâmetros e o retorno da função, quais são as funções, 
quais variáveis existem num objeto ou método */ 


const app = express();

app.use(express.json()); // por padrão, o express não sabe que estamos desenvolvendo uma API Rest, então não entende por padrão JSON

/* ------------------------------------------[     ROTAS, RECURSOS E MÉTODOS HTTP    ]------------------------------------------
    ROTAS: endereço completo da requisição
    RECURSO: qual entidade estamos acessando do sistema

    app.get:
    - qual a rota (RECURSO: users)
    - a funcao executada quando acessarem a rota), recebe parâmetros de forma automática:

        > REQUEST: obter dados sobre a requisição (Exemplo: se fosse criação de usuários, receberia os dados do user como nome, email, senha..)
        > RESPONSE: devolver uma resposta para o browser ou aplicação que esteja consumindo a rota 
            response.send('Hello World');  = printa na tela quando acessar essa rota 
            response.json({objeto}) ou response.json([array] para uma lista de informações)

    > GET: Buscar uma ou mais informações do back-end (GET http://localhost:3333/users = listar usuários, GET http://localhost:3333/users/5 = buscar dados do usuário com id 5)
    > POST: Criar nova informação no back-end (POST http://localhost:3333/users = criar um usuário)
    > PUT: Atualizar 
    > DELETE: Remover
    - Navegador sempre acessa uma rota utilizando requisição do tipo GET

    # REQUEST PARAM: Parâmetros que vem na própria rota que identificam um recurso
        - Quando precisamos identificar qual entididade/recurso específico iremos realizar uma operação 
        - Buscar, atualizar, deletar um único usuário
        - 99% das vezes obrigatório

    # QUERY PARAM: Parâmetros que vem na própria rota opcionais para filtros, paginação
        - Insominia: http://localhost:3333/users?search=ar (Buscando users que contenham "ar")

    # REQUEST BODY: Parâmetros para criação/atualização de informações (Corpo da requisição)
        - Criação de informações pelo insomnia
        - Quando criamos/atualizamos um usuário, informações (nome, email, senha) vem pelo request.body
*/

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
});

const users = [
    'Juliana',  // id = 0
    'Rafael',   // id = 1
    'Marta',
    'Marcos'
];

// LISTAGEM DE USUÁRIOS
app.get('/users', (request, response) => {
    console.log('Listagem de usuários');
                                                 // como pode ter mais de um search, pode retornar um array, então fizemos cast para String para sumir o erro
    const search = String(request.query.search); // O nome search é definido na própria requisição (no insomnia está search), no request param é na rota
   
    /* .filter()
        precisa retornar true (manter o usuario nos usuarios filtrados) e false (remover) 
        se existir o search, o filteredUsers vai ser o filtrado, se não será o próprio users*/
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
    
    console.log(search);
    
    return response.json(filteredUsers);
});

// BUSCAR USUÁRIO ÚNICO (:id = receber um parâmetro acessível dentro da requisição)
app.get('/users/:id', (request, response) => { 
    const id = Number(request.params.id); // Converter o id para números pq se colocarmos /users/2 o 2 é recebido como string ("2")

    const user = users[id];

    return response.json(user);

});


// CRIAR USUÁRIO
app.post('/users', (request, response) => {

    const data = request.body;

    const user = {
        name: data.name,
        email: data.email,
    };

    return response.json(user); // return força que a requisição pare aqui quando formos devolver resposta pro browser
});

app.listen(3333);


