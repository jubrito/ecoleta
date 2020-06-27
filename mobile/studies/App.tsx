import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
});

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
*/
