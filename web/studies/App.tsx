// COMPONENTE, PROPRIEDADE, ESTADO E IMUTABILIDADE

import React, { useState } from 'react';
import './App.css';

// JSX: Sintaxe de XML dentro do JavaScript (.tsx: TypeScript com JSX)

import Componente from './Componente'; // não precisa colocar index.tsx pois sempre o arquivo index e procurado quando ocultamos

function App() {

  const [ counter, setCounter ] = useState(0);  // [valor do estado, função para atualizar o valor do estado]

  function handleButtonClick() {
      setCounter(counter + 1); // o novo valor da variável counter será ele mesmo mais 1 (não alteramos o counter diretamente, mas o novo valor dela no estado)
  }

  return (

        <div>
          <Componente title="titulo" />
          <Componente title="titulo2" />
          <Componente title={`Contador: ${counter}`} />
          
          <h2>{ counter }</h2>
          <h2>{ counter * 2 }</h2>
          <button type="button" onClick={handleButtonClick}>Aumentar</button>
        </div>
  );
}

export default App;
