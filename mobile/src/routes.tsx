import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // react navigation lida com rotas e a navegação stack é a navegação em pilhas (chamamos as próximas telas através de botão e o usuário consegue voltar pra tela anterior)

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator(); // ele funcionará como roteamento da aplicação

// NAVIGATION CONTAINER: Similar ao Browser Router em React, define como as rotas devem se comportar. Deve estar por fora de todas as rotas da aplicação
const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{ // Background em todas as telas 
                    cardStyle: {
                        backgroundColor: '#f0f0f5',
                    }
                }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;

/*  APP STACK . SCREEN:
    Para cada tela, como se fosse o "route", para cada rota da aplicação (ou seja tela) 
        name: como se fosse o nome da rota (/) mas não tem endereço então colocamos o nome mesmo 
        component: componente exibido em tela nessa rota
        
    <AppStack.Navigator headerMode="none" remove o header */