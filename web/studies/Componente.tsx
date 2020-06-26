import React from 'react';
import './App.css';

/*  PROPRIEDADES: 
    Atributos que enviamos para o componente
    Para informar um componente quais propriedades pode receber:
        - transformar a função em uma constante (function Header() vira Arrow Function)
        - informar qual o tipo/formato da variável Header (Header: React.FC) 
            FC: Function Component, ou seja, componente escrito em forma de função
            FC é um Generic: tipo do TypeScript que pode receber um parâmetro (quais propriedades o componente pode receber)
            acessamos as propriedades colocando (props)

    INTERFACE:
    Definir a tipagem de um objeto/campo diferente
    title?: string, significaria que é opcional
    é passado como generics (parametro) no FC

    ESTADO: 
    Armazenar informação a partir do componente (exemplo: ação do usuário que clicou ou preencheu em algo)
    Se queremos que o componente reflita as alterações de uma variável (exemplo: counter++)
    - IMUTABILIDADE: não podemos alterar o valor de maneira direta (exemplo: counter++). 
        Não alteramos o valor do estado, mas criamos um novo valor para o estado
*/

interface ComponenteProps {
    title?: string;
}

const Componente: React.FC<ComponenteProps> = (props) => {

    return (
        <header>
            <h1>Componente:</h1>
            <p>{props.title}</p>
        </header>
    )
}

export default Componente;