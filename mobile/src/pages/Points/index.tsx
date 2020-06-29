import React from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';// carregar svg de um endereço externo 




const Points = () => {

    const navigation = useNavigation();
    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail() {
        navigation.navigate('Detail');
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
                    <MapView 
                        style={styles.map} 
                        initialRegion={{ 
                            latitude: -23.6649649,
                            longitude: -46.6272067,
                            latitudeDelta: 0.014, // zoom
                            longitudeDelta: 0.014,
                        }}>
                            <Marker 
                                style={styles.mapMarker}
                                onPress={handleNavigateToDetail}
                                coordinate={{
                                    latitude: -23.6649649,
                                    longitude: -46.6272067,
                                }}
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60' }} />
                                    <Text style={styles.mapMarkerTitle}>Mercado</Text>
                                </View>
                            </Marker>
                    </MapView>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView 
                    horizontal // scroll
                    showsHorizontalScrollIndicator={false} // remove scrollbar
                    contentContainerStyle={{ paddingHorizontal: 20}} // entende como parte do conteudo (ocupamos espaço horizontal do lado)
                >
                    <TouchableOpacity style={styles.item} onPress={() => {}}>
                        <SvgUri width={42} height={42} uri="http://192.168.15.15:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle}>Lâmpadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}}>
                        <SvgUri width={42} height={42} uri="http://192.168.15.15:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle}>Lâmpadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}}>
                        <SvgUri width={42} height={42} uri="http://192.168.15.15:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle}>Lâmpadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}}>
                        <SvgUri width={42} height={42} uri="http://192.168.15.15:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle}>Lâmpadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}}>
                        <SvgUri width={42} height={42} uri="http://192.168.15.15:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle}>Lâmpadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}}>
                        <SvgUri width={42} height={42} uri="http://192.168.15.15:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle}>Lâmpadas</Text>
                    </TouchableOpacity>
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

