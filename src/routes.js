import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Veiculos from './pages/veiculos';
import Motoristas from './pages/motoristas'
import ListaComprovantes from './pages/listaComprovantes';
import FotoComprovante from './pages/fotoComprovante';
import Pecas from './pages/pecas';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Analises from './pages/analises';
import Agendamento from './pages/agendamento/CreateTask';
import Agendamento2 from './pages/agendamento2/App';
import firebase from 'firebase';
import {firebasecConfig} from './banco/index.js';
//import CreateTask from './pages/createTask';

firebase.initializeApp(firebasecConfig);
const AppStack = createStackNavigator();

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

export default function Routes(){

    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Veiculos" component={Veiculos} />
                <AppStack.Screen name="Motoristas" component={Motoristas} />
                <AppStack.Screen name="ListaComprovantes" component={ListaComprovantes} />
                <AppStack.Screen name="FotoComprovante" component={FotoComprovante} />
                <AppStack.Screen name="Pecas" component={Pecas} />
                <AppStack.Screen name="Analises" component={Analises} />
                <AppStack.Screen name="Agendamento" component={Agendamento} />
                <AppStack.Screen name="Agendamento2" component={Agendamento2} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}
