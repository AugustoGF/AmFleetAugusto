import React, { Component } from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default class Veiculos extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: false,
            marca: '',
            modelo:'',
            chassi:'',
            cor:'',
            avarias:'',
            placa:'',
            quilometragem:'',
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
                this.getVeiculo();
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
    navigateToLogin = () =>{
        this.props.navigation.navigate('Login');
    }
    guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+S4()+S4()+S4()+S4());
    }
    cadastrarVeiculo = () =>{
        var uid = this.guidGenerator();
        const {marca, modelo, placa, chassi, cor, ano, quilometragem, avarias} = this.state;
        if(marca != null && modelo != null && placa != null && ano != null && chassi != null && cor != null && quilometragem!=null && avarias != null){
            firebase.database().ref(`veiculo/${uid}`).set({
                marca: this.state.marca,
                modelo: this.state.modelo,
                placa: this.state.placa,
                chassi: this.state.chassi,
                cor: this.state.cor,
                ano: this.state.ano,
                quilometragem: this.state.quilometragem,
                avarias: this.state.avarias,
            })
            alert('cadastrado com sucesso!');
        }else{
            this.setState({errorMessage: "Preencha todos os campos presentes!"});

        }
    }
    removerVeiculo = () =>{
        console.log('entrou aqui');
        firebase.database().ref(`veiculo/`).once('value', (data) =>{
            data.forEach((uid) =>{
                console.log(uid.val())
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

zerarState =()=>{
    this.state= {
        marca:'',
        modelo: '',
        placa:'',
        chassi: '',
        quilometragem: '',
        cor: '',
        ano: '',
        avarias: '',
    }
}
    getVeiculo = () =>{
        firebase.database().ref(`veiculo/`).once('value', (data) =>{

            data.forEach((uid) =>{
                
                    this.state.list.push({
                        marca:uid.val().marca,
                        modelo: uid.val().modelo,
                        placa:uid.val().placa,
                        chassi: uid.val().chassi,
                        quilometragem: uid.val().quilometragem,
                        cor: uid.val().cor,
                        ano: uid.val().ano,
                        avarias: uid.val().avarias,
                    })
                    this.setState({
                        list : this.state.list
                    })
            })
        })
    }
    render(){
    return(
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
            <Text style={styles.description}>Procure um motorista</Text>
            <Searchbar placeholder="Escreva aqui..." style={styles.search} editable={true} value={this.state.search} ></Searchbar>
            
            <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
            onPress={this.zerarState}>
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
                        <Text style={styles.description}>Cadastre um Veículo</Text>
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a marca"
                            value={this.state.marca}
                            onChangeText={marca=> this.setState({marca})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o modelo"
                            value={this.state.modelo}
                            onChangeText={modelo=> this.setState({modelo})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o ano"
                            value={this.state.ano}
                            onChangeText={ano=> this.setState({ano})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a placa"
                            value={this.state.placa}
                            onChangeText={placa=> this.setState({placa})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o chassi"
                            value={this.state.chassi}
                            onChangeText={chassi=> this.setState({chassi})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a cor"
                            value={this.state.cor}
                            onChangeText={cor=> this.setState({cor})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite as avarias"
                            value={this.state.avarias}
                            onChangeText={avarias=> this.setState({avarias})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a quilometragem"
                            value={this.state.quilometragem}
                            onChangeText={quilometragem=> this.setState({quilometragem})}
                        />
                        <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View>
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={this.cadastrarVeiculo}
                        >
                            <View>
                            <Text style={styles.textStyle}>Cadastrar</Text>
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
                <AntDesign name="adduser" size={24} color="#00cc00" />
                <Text style={{color:'#00cc00', fontWeight:'bold'}}>Adicionar Veículo</Text>
            </TouchableOpacity>


            <FlatList
                style={styles.veichuleList}
                data={this.state.list}
                keyExtractor={(list, index) => String(index)}
                showsVerticalScrollIndicator ={false}
                renderItem={({item: list}) => (
                    <View style={styles.vehicle}>
                        <Text style={styles.vehicleProperty}>Chassi:</Text>
                        <Text style={styles.vehicleValue}>{list.chassi}</Text>
                        
                        <Text style={styles.vehicleProperty}>Marca:</Text>
                        <Text style={styles.vehicleValue}>{list.marca}</Text>

                        <Text style={styles.vehicleProperty}>Modelo:</Text>
                        <Text style={styles.vehicleValue}>{list.modelo}</Text>

                        <Text style={styles.vehicleProperty}>Ano:</Text>
                        <Text style={styles.vehicleValue}>{list.ano}</Text>

                        <Text style={styles.vehicleProperty}>Placa:</Text>
                        <Text style={styles.vehicleValue}>{list.placa}</Text>

                        <Text style={styles.vehicleProperty}>Quilometragem:</Text>
                        <Text style={styles.vehicleValue}>{list.quilometragem}</Text>

                        <Text style={styles.vehicleProperty}>Cor:</Text>
                        <Text style={styles.vehicleValue}>{list.cor}</Text>

                        <Text style={styles.vehicleProperty}>Avarias:</Text>
                        <Text style={styles.vehicleValue}>{list.avarias}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={this.removerMotorista}
                        >
                            <Text style={styles.detailsButtonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )}
}
