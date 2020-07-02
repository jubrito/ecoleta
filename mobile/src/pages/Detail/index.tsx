import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
// SafeAreaView: faz um padding da status bar no iphone e android
// Linking: abrir links externos (endereços no browser) e links internos (deeplinking entre um aplicativo e outro)
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  }, // objeto
  items: {
    title: string;
  }[]; // significa que é um array de objetos com titulo sendo string
}

const Detail = () => {
  // Estado para armazenar as informações de um ponto de coleta (dados do ponto e os itens por ele coletados)
  const [ data, setData ] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  /* route.params são os parâmetros recebidos da função handleNavigateToDetail (que passa point_id)
    mas se passarmos route.params.point_id da erro pq ele não sabe que existe esse point_id la dentro
      > criamos interface Params falando o tipo de point_id  
      > falamos pro Typescript que a variável routeParams tem o formado da interface Params */
  const routeParams = route.params as Params;

  useEffect(() => { // acessa a rota de busca por um ponto específico de acordo com o seu id
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  },[]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  // Mandar whatsapp
  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Quero descartar meus resíduos de maneira ecológica!`);
  }

  // Mandar e-mail https://docs.expo.io/versions/latest/sdk/mail-composer/
  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email], // email do ponto
    })
  }

  // "LOADING" DOS PONTOS (na vdd agr só fica branco)
  if (!data.point) {
    return null; 
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={20} color="#34cb79" />
          </TouchableOpacity>

          <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />
          
          <Text style={styles.pointName}>{data.point.name}</Text>
          <Text style={styles.pointItems}>
            {data.items.map(item => item.title).join(', ')}
          </Text>

          <View style={styles.address}>
              <Text style={styles.addressTitle}>Endereço</Text>
              <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
          </View>
      </View>
      <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleWhatsapp}>
              <FontAwesome name="whatsapp" size={20} color="#fff" />
              <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>
          
          <RectButton style={styles.button} onPress={handleComposeMail}>
              <Icon name="mail" size={20} color="#fff" />
              <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;