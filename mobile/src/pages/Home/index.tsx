import React, { useState, useEffect } from 'react';
// TouchableHighlight, Touchable: botões
// npm install @react-navigation/nativeimageBackground: View que aceita background
// KeyboardAvoidingView: evita que o teclado fique por cima do campo (Platform necessaria pra condition apenas no IOS)
import { View, Text, Image, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'; 
import { RectButton } from 'react-native-gesture-handler'; // botão retangular com cor de fundo
import { Feather as Icon } from '@expo/vector-icons'; // Icones
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../../Dropdown';

interface IBGEuf {
  sigla: string;
}

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const navigation = useNavigation(); 

  async function fetchSearchIBGE() {
    
   }

  function handleNavigateToPoints() { //navigation tem a função navigate pra navegarmos de uma tela pra outra e colocamos essa funçaõ no onePress do botão 
    navigation.navigate('Points', { // enviamos uf e city como parâmetro pra tela
      uf,
      city
    });  
  }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined }>
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            // resizeMode="contain"
            imageStyle={{ width: 274, height: 368 }} // edita o estilo só na imagem, o styles.container é pro container
        >
            <View style={styles.main}>
              <Image source={require('../../assets/logo.png')} />

              {/* depois de colocarmos o KeyboardAvoidingView por volta os textos ficaram fixos entao colocamos View sem nada em volta */}
              <View>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style ={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
              </View>
            </View>
            {/* <View style={styles.input}>
              <Dropdown/>
            </View> */}
            <View style={styles.footer}>
              <TextInput 
                style={styles.input} 
                placeholder="Digite a UF"
                value={uf}
                maxLength={2}
                autoCapitalize="characters" // todos os caracteres em capslock
                autoCorrect={false} // não tenta corrigir texto digitado
                onChangeText={setUf} // onChangeText: recebemos o texto digitado (text => setUf(text)) como só tem um parâmetro pode colocar apenas o nome da função
              />

              <TextInput 
                style={styles.input} 
                placeholder="Digite a cidade" 
                value={city}
                autoCorrect={false}
                onChangeText={setCity}
              />

              <RectButton style={styles.button} onPress={handleNavigateToPoints} /* onPress = onClick*/> 
                <View style ={styles.buttonIcon}>
                  <Text>
                    <Icon name="arrow-right" color="#fff" size={24} />
                  </Text>
                </View>
                <Text style ={styles.buttonText}>
                    Entrar
                </Text>
              </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: '#f0f0f5',
      justifyContent: 'center',
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 15,
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 20,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},   
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center', 
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home; 