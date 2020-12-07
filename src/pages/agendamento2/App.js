import React, {Component,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Alert, Image, Text, TouchableOpacity, Modal, NativeModules} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Searchbar} from 'react-native-paper';
import { Input } from 'react-native-elements';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import {SafeAreaView,  StyleSheet,  Dimensions} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
import { Agenda } from 'react-native-calendars';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AlarmClock from "react-native-alarm-clock";


export default class Agendamento extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: false,
            nome: '',
            tipoDeUsuario: '',
            modalVisible: false,
            errorMessage: null,
            list:[],
        };
        this.singOutAccount = this.singOutAccount.bind(this);
}

componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user){
        
        if(user){
            this.setState({
                isAuthenticated: true,
            })
            this.getAgendamento();
        }
        else{
            this.setState({
                isAuthenticated: false,
            })
            this.navigateToLogin();

        }
    }.bind(this)
    );
}
guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4());
}

cadastrarAgendamento = () =>{
    var uid = this.guidGenerator();
    const {titulo, descricao, start, end, alerta} = this.state;
    if(titulo != null && descricao != null && start != null && end != null && alerta!=null){
        firebase.database().ref(`agendamento/${uid}`).set({
            titulo: this.state.titulo,
            descricao: this.state.descricao,
            start: this.state.start,
            end: this.state.end,
            alerta: this.state.alerta,
        })
        alert('agendamento realizado com sucesso!');
    }else{
        this.setState({errorMessage: "Preencha todos os campos presentes!"});

    }
}
removerAgendamento = () =>{
    console.log('entrou aqui');
    firebase.database().ref(`agendamento/`).once('value', (data) =>{
        data.forEach((uid) =>{
            uid.val();
        })
    }).then(()=>{
        alert('removido com sucesso');
    }).catch(error =>{
        console.log(error)
    })
}
singOutAccount = () =>{
    firebase.auth().signOut().then(() =>{
        this.setState({
            isAuthenticated:false,
        })
        console.log('saiu')
        this.props.navigation.navigate('Login');
    }).catch(error =>
        console.log(error.code))
}

navigateToLogin = () =>{
    this.props.navigation.navigate('Login');
}
getAgendamento = () =>{
    firebase.database().ref(`agendamento/`).once('value', (data) =>{
        console.log(' data'+data.val());
        data.forEach((uid) =>{
                this.state.list.push({
                    title: uid.val().titulo,
                    summary: uid.val().descricao,
                    start: uid.val().start,
                    end: uid.val().end,
                    //alerta: uid.val().alerta,
                })
                this.setState({
                    list : this.state.list
                })
        })
    })
}

eventClicked = (event) => {
    alert(JSON.stringify(event));
  };

  getTime() {
    var dt = new Date();
    document.clock.local.value = IfZero(dt.getHours()) + ":" + IfZero(dt.getMinutes());
    setTimeout("getTime()", 1000);
    curTime = (IfZero(dt.getHours()) + ":" + IfZero(dt.getMinutes()));
};
 alarmSet() {
    hourNum = document.clock.hourOpt[document.clock.hourOpt.selectedIndex].value;
    minNum = document.clock.minOpt[document.clock.minOpt.selectedIndex].value;
    alarmTime = hourNum + ":" + minNum;
 };
 alarmOn() {
    if (alarmTime == curTime) {
        document.all.sound.src = document.clock.alarmSound.value;
    }
    else {
        //setTimeout("alarmOn()", 1000)
        alert(JSON.stringify(this.state.event));
    }
};

render(){
      let {width} = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Image source={logoImg} />
                    <TouchableRipple 
                        rippleColor="#E9EEF3"
                        onPress={this.singOutAccount}
                    >
                    <FontAwesome name="power-off" size={24} color="red" />
                    </TouchableRipple>
            </View>
            <Text style={styles.description}>Agendamento</Text>

            <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}>
                <View style={styles.modalView}>
                    <TouchableRipple
                        style={styles.alinharClose}
                        rippleColor="#E9EEF3"
                        onPress={() => {
                            this.setState({modalVisible:false})
                        }}
                        >
                        <AntDesign name="close" size={20} color="#D3D3D3" />
                    </TouchableRipple>
                    <View style={styles.header}>
                        <Text style={styles.description}>Agende um serviço</Text>
                        
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o Titulo"
                            value={this.state.titulo}
                            onChangeText={titulo=> this.setState({titulo})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a descrição"
                            value={this.state.descricao}
                            onChangeText={descricao=> this.setState({descricao})}
                        />
                         <TextInput
                            style={styles.input}
                            placeholder="Selecione a data início"
                            value={this.state.start}
                            onChangeText={start=> this.setState({start})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Selecione a data fim"
                            value={this.state.end}
                            onChangeText={end=> this.setState({end})}
                        />
                            
                        <TextInput
                            style={styles.input}
                            placeholder="Selecione a data para o alerta"
                            value={this.state.alerta}
                            onChangeText={alerta=> this.setState({alerta})}
                        />
                        <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View>
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={this.cadastrarAgendamento}
                        >
                            <View>
                            <Text style={styles.textStyle}>Agendar</Text>
                            </View>
                        </TouchableRipple>
                </View>
            </Modal>

            <TouchableOpacity 
                style={styles.detailsButtonAdd} 
                rippleColor="#E9EEF3"
                onPress={() => {
                this.setState({modalVisible: true});
                }}
            >  
                <AntDesign name="calendar" size={24} color="#00cc00" />
                <Text style={{color:'#00cc00', fontWeight:'bold'}}>Agendar serviço</Text>
                <Text style={styles.driverList}></Text>
            </TouchableOpacity>

            <SafeAreaView style={styles.containerCalendario}>
                <EventCalendar
                    eventTapped={this.eventClicked}
                    events={this.state.list}
                    width={width}
                    size={60}
                    initDate={'2020-12-07'}
                    scrollToFirst
                />
            </SafeAreaView>
        </View>
      );
    }
}

