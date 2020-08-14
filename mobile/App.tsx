import React from 'react';
import { AppLoading } from 'expo'; // sinal de carregamento do app
import { StatusBar } from 'react-native';

import Routes from './src/routes';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';  
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'; // precisa importar o useFonts apenas em uma delas

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    // Fazer isso pra carregar a fonte antes mesmo do app e enquanto não carrega mostra simbolo de carregando
    return <AppLoading />
  }

  return (    
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}


/*  Diferenças do React:
  1. Componentes da mesma forma mas ao invés de retornar tag HTML, retorna os elementos do React Native:
  - VIEW: (tag) caixa, container do HTML (section, main, aside, footer)
  - TEXT: (tag) blocos de texto (p, span, bold)

  2. Estilizações não são feitas com classes ou ids, não é no modelo cascata como em CSS
  - STYLE: (propriedade) disponível para todos os elementos, recebe um objeto utilizando uma classe do React Native chamada StyleSheet que no método create recebe um objeto com quais estilos vou criar “como se fossem classes” mas sendo um objeto javascript tradicional
  Essa reutilização é graças a uma ferramenta criada pelo facebook chamada Yoga: converte a sintaxe de css para a estilização nativa (android e ios)
  - Tudo em Camelcase: background-color é backgroundColor e tudo de texto entre strings
  - Por padrão todos os elementos tem display: flex
  - Sem herança/cascata de estilos: não tem como estilizar o texto dentro da view (sem sass) e se mudarmos a cor de text, altera apenas o elemento. Temos que editar cada elemento e componente individualmente

  STATUSBAR:
  Se quisermos retornar mais de um componente, utilizamos FRAGMENT que não é tipo colocar <View> em volta mas não é um elemento em tela, 
  é uma div sem produzir a view em tela 
    return (
      <>
        <StatusBar />
        <Home />
      </>
    );
  - backgroundColor="transparent" e translucend (fica por cima do conteudo, nao precisa ser um bloco a partr) na status bar só funciona no android
  
  EXPO GOOGLE FONTS: https://github.com/expo/google-fonts

  */
