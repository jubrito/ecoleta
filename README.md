


Ecoleta - a conexão entre empresas e entidades de coleta de resíduos (orgânicos e inorgânicos), providenciando um descarte ecológico e facilitando processos de reutilização e reciclagem.

![](ecoleta.gif?raw=true "Visualização da aplicação web")


<h4 align="center"> 
	Em construção 🚀
</h4>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-ferramentas">Ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodando-a-aplicacao">Rodando a aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## **:computer: TECNOLOGIAS**

#### **Front-end** ([React][react] + [TypeScript][typescript])

  - **[Axios][axios]**
  - **[React Router Dom][react_router_dom]**
  - **[React Icons][react_icons]**
  - **[React Dropzone][react_dropzone]**
  - **[React Leaflet][react_leaflet]**
  - **[Leaflet][leaflet]**
  \* <kbd>[package.json](./sources/website/package.json)</kbd>


#### **Back-end** ([NodeJS][node] + [TypeScript][typescript])

  - **[SQLite][sqlite3]**
  - **[ts-node][tsnode]**
  - **[KnexJS][knex]**
  - **[Express][express]**
  - **[CORS][cors]**
  <!-- - **[dotENV][dotenv]** -->
  <!-- - **[Multer][multer]** -->
  <!-- - **[Celebrate][celebrate]** -->
  <!-- - **[Joi][joi]** -->

  \* <kbd>[package.json](./sources/server/package.json)</kbd>

#### **Mobile** ([React Native][react_native] + [TypeScript][typescript])

    Em construção
  <!-- - **[Expo][expo]**
  - **[Expo Google Fonts][expo_google_fonts]**
  - **[React Navigation][react_navigation]**
  - **[React Native Maps][react_native_maps]**
  - **[Expo Constants][expo_constants]**
  - **[React Native SVG][react_native_svg]**
  - **[Axios][axios]**
  - **[Expo Location][expo_location]**
  - **[Expo Mail Composer][expo_mail_composer]**

  \* <kbd>[package.json](./sources/mobile/package.json)</kbd> -->

## **FERRAMENTAS**

- Layout: **[Figma](https://www.figma.com/file/9TlOcj6l7D05fZhU12xWT3/Ecoleta-(Booster))** &rarr; 
- API: **[IBGE API][ibge_api]** &rarr; **<kbd>[API de UFs][ibge_api_ufs]</kbd>**, **<kbd>[API de Municípios][ibge_api_municipios]</kbd>** 
- API Tests: **[Insomnia][insomnia]**
- Ícones: **[Feather Icons][feather_icons]**, **[Font Awesome][font_awesome]**
- Fontes: **[Ubuntu][font_ubuntu]**, **[Roboto][font_roboto]**
- Maps: **[Leaflet][leaflet]**
- Editor: **[Visual Studio Code][vscode]** &rarr; Extensions: **<kbd>[SQLite][vscode_sqlite_extension]</kbd>**
<!-- - Markdown: **[StackEdit][stackedit]**, **<kbd>[Markdown Emoji][markdown_emoji]</kbd>**
- Commit Conventional: **[Commitlint][commitlint]** -->


## **RODANDO A APLICAÇÃO**

Requisitos: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), Editor ([VSCode](https://code.visualstudio.com/))

```sh
# Clone este repositório
$ git clone https://github.com/jubrito/ecoleta

# Acesse a pasta do projeto no cmd/terminal
$ cd ecoleta

```

### Server (Back-end)

```sh
# Acesse a pasta do server no cmd/terminal
$ cd server

# Instale as dependências do server
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# Acesse http://localhost:3333 (o servidor inciará na porta:3333)  

```


### Web (Front-end)

```sh
# Acesse a pasta do website no cmd/terminal
$ cd wen

# Instalando as dependências do website
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# Acesse http://localhost:3000 - (a aplicação será aberta na porta:3000) 

```

### Mobile 

Em construção


## **:octocat: COMO CONTRIBUIR**

  - Faça um **[fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo)** do repositório;
  - Acesse sua página GitHub e faça um **clone** do seu fork;
  - Crie uma *branch* com o nome da sua feature: `git chechout -b feature/minhaFeature`;
  - Realize e salve as alterações;
  <!-- - Instale as dependências do *commitlint* na raíz do projeto para a verificação dos commits: `npm install` ou `yarn`; -->
  - *Commite* suas alterações de acordo com as [convenções de commit](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/), 
  - Faça um *push* para a sua *branch*: `git push origin feature/minhaFeature`;
  - Abra um *pull request* no repositório onde o *fork* foi feito. Após o *merge* suas alterações irão fazer parte do projeto;
  - Após o *merge* da sua pull request for feito, sua *branch* poderá ser deletada.


## **:page_facing_up: LICENÇA **
**Licença**: Projeto sob a licença MIT **<kbd>[LICENSE](https://github.com/Rocketseat/nlw-01-booster/blob/master/LICENSE.md)</kbd>**

Desenvolvido durante a NLW - Next Level Week, [RocketSeat](https://rocketseat.com.br/)