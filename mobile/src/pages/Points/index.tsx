import React , { useState, useEffect }from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';// carregar svg de um endereço externo 
import api from '../../services/api';
import * as Location from 'expo-location';

// Sempre que armazenamos um vetor em um estado, precisamos dizer qual o formato desse vetor através de uma interface
interface Item {
  id: number;
  title: string;
  image_url: string;
}

// colocar apenas o que vamos utilizar
interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string; // além do img, agora com a função de uploads tbm recebemos o image_url que é a url criada com o IP / o nome da imagem 
  latitude: number;
  longitude: number;
}

// parâmetros sendo passados sobre o estado e cidade
interface Params {
  uf: string;
  city: string;
}

const Points = () => {

  // ESTADO dos pontos de coletas buscados na API
  const [ points, setPoints ] = useState<Point[]>([]);

  // ESTADO de itens da PI
  const [ items, setItems ] = useState<Item[]>([]); // como é mais de um, armezena em um vetor do tipo Item

  // ESTADO de itens selecionados pelo usuário
  const [ selectedItems, setSelectedItems ] = useState<number[]>([]); // array de numeros (dos ids dos itens selecionados)

  // ESTADO da posição inicial do usuário
  const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]); // vetor de latitude e longitude (numeros)

  const navigation = useNavigation();

  const route = useRoute(); // pegar parâmetros da rota

  const routeParams = route.params as Params; // definindo como variável de parametro pra rota 

  /* DEFININDO O PONTO INICIAL DO MAPA COMO A LOCALIZAÇÃO DO USUÁRIO */
  useEffect(() => {
    // criada para podermos utilizar ASYNC AWAIT
    async function loadPosition() {
      // Pedir permissões pro usuário para acessarmos a localização dele
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') { // se o usuário não deu permissão
        Alert.alert('Ooooops...', 'Precisamos de sua permissão para obter sua localização');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords; // coordenadas iniciais do usuário
      
      setInitialPosition([
        latitude,
        longitude
      ])
    }

    loadPosition();
  }, []);

  /* PEGANDO OS ITENS DA API */
  useEffect(() => {
    api.get('items').then(response => {
      //.then(response =>) = aguardar ela dar uma resposta e armazenar num estado
      setItems(response.data);
    })
  }, []);

  /* CARREGAR OS PONTOS DE COLETA */
  useEffect(()=> {
    api.get('points', {
      // enviando os query parms
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then(response => { // assim que eu obtiver uma resposta dessa chamada salva na variavel points do estado
      setPoints(response.data);
    })
  }, [selectedItems]); // toda vez que selecionar os itens

  // Se o item já está selecionado, ele deseleciona (igual a do front)
  function handleSelectedItem(id: number) {
    // usuario clica num item
    const alreadySelected = selectedItems.findIndex(item => item === id); // retorna 0 se existir um item no array com esse id e -1 se não estiver

    if (alreadySelected >= 0) { // se já existe (clicou num item selecionado) REMOVE DO ARRAY (item fica branco de novo)
        const filteredItems = selectedItems.filter(item => item !== id);// filtra todos os itens pegando todos menos o que eu preciso remover

        setSelectedItems(filteredItems);
    } else { // ADICIONA NO ARRAY (item fica verde)
        // se colocarmos apenas setSelectedId(id) sempre que clicasse num novo, então com spred aproveitamos o que já tem e adicionamos um novo
        setSelectedItems([...selectedItems, id]);
    }
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id }); // tudo entre { } é passado como parâmetro para a rota (nesse caso estamos passando o id do ponto)
  }
  function handleNavigateBack() {
      navigation.goBack(); // voltar pra página anterior
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
              <TouchableOpacity onPress={handleNavigateBack}>
                  <Icon name="arrow-left" size={20} color="#34cb79" />
              </TouchableOpacity>

              <Text style={styles.title}>Bem vindo.</Text>
              <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

              {/* BORDER-RADIUS SÓ FUNCIONA NAS VIEWS */}
              <View style={styles.mapContainer}>
                { /* 
                  RENDERIZAÇÃO CONDICIONAL:
                  if ternario: condicao ? true : false
                  quando não temos o else do ternário conseguimos fazer em react native:
                  condicao && codigoExecutadoSeCondicaoForTrue
                  ja carregou a posição do usuário e eu posso mostrar o mapa */
                  initialPosition[0] !== 0 && (
                  <MapView 
                    style={styles.map} 
                    loadingEnabled={ initialPosition[0] == 0} // enquanto não conseguiu a localização do usuário (initialPosition[0] = 0), aparece sinal de loading
                    initialRegion={{ 
                        latitude: initialPosition[0],
                        longitude: initialPosition[1],
                        latitudeDelta: 0.014, // zoom
                        longitudeDelta: 0.014,
                  }}>
                    {points.map(point => (
                      <Marker 
                        key={String(point.id)}
                        style={styles.mapMarker}
                        onPress={() => handleNavigateToDetail(point.id)} // sempre que a função recebe parâmetro coloca arrow function
                        coordinate={{
                            latitude: point.latitude,
                            longitude: point.longitude,
                        }}
                      >
                        <View style={styles.mapMarkerContainer}>
                          <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} />
                          <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                        </View>
                    </Marker>
                  ))}
                </MapView>
              ) }
            </View>
          </View>
          <View style={styles.itemsContainer}>
              <ScrollView 
                  horizontal // scroll
                  showsHorizontalScrollIndicator={false} // remove scrollbar
                  contentContainerStyle={{ paddingHorizontal: 20}} // entende como parte do conteudo (ocupamos espaço horizontal do lado)
              >
                  {items.map( item => (// React Native espera que a key (elemento identificador do map) seja uma string
                    <TouchableOpacity 
                      key={String(item.id)} 
                      style={[ // podemos passar um vetor de estilos no react native 
                        styles.item,
                        selectedItems.includes(item.id) ? styles.selectedItem : {}// se o item tiver sido selecionado (ta dentro de selectedItems) fica verde, se não passa vazio
                      ]} 
                      onPress={() => handleSelectedItem(item.id)} // não pode ser apenas {handleSelectedItem} pq precisamos enviar um id e se for {handleSelectedItem(item.id)} passariamos a execução da função como parâmetro (assim que o componente for exibido em tela essa função seria executada). Queremos passar a função como parâmetro = Solução: arrow function
                      activeOpacity={0.6} //Ajustamos o touchable opacity pra controlar a opacidade
                    >
                      <SvgUri width={42} height={42} uri={item.image_url} />
                      <Text style={styles.itemTitle}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
          </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;

