import React, {Component} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';

export default class Pecas extends Component{
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
                this.getPeca();
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
    cadastrarPeca = () =>{
        var uid = this.guidGenerator();
        const {nome, descricao, quantidade} = this.state;
        if(nome != null && descricao != null && quantidade != null ){
            firebase.database().ref(`pecas/${uid}`).set({
                nome: this.state.nome,
                descricao: this.state.descricao,
                quantidade: this.state.quantidade,
            })
            alert('cadastrado com sucesso!');
        }else{
            this.setState({errorMessage: "Preencha todos os campos presentes!"});

        }
    }
    removerPeca = () =>{
        console.log('entrou aqui');
        firebase.database().ref(`pecas/`).once('value', (data) =>{
            data.forEach((uid) =>{
                uid.val();
            })
        }).then(()=>{
            alert('removida com sucesso');
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
    getPeca = () =>{
        firebase.database().ref(`pecas/`).once('value', (data) =>{
            console.log(' dataaaaaaaa '+data.val());
            data.forEach((uid) =>{
                
                    this.state.list.push({
                        nome: uid.val().nome,
                        descricao:uid.val().descricao,
                        quantidade: uid.val().quantidade,
                    })
                    this.setState({
                        list : this.state.list
                    })
            })
        })
    }
    render(){
    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableRipple 
                    rippleColor="#E9EEF3"
                    onPress={this.singOutAccount}
                >

                    <FontAwesome name="power-off" size={24} color="red" />

                </TouchableRipple>
            </View>

            <Text style={styles.description}>Procure uma peça</Text>
            <Searchbar placeholder="Escreva aqui..." style={styles.search} editable={true} value={this.state.search} ></Searchbar>
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
                        <Text style={styles.description}>Cadastre uma Peça</Text>
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome"
                            value={this.state.nome}
                            onChangeText={nome=> this.setState({nome})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a descrição"
                            value={this.state.descricao}
                            onChangeText={descricao=> this.setState({descricao})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a quantidade"
                            value={this.state.quantidade}
                            onChangeText={quantidade=> this.setState({quantidade})}
                        />
                        <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View>
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={this.cadastrarPeca}
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
                <Text style={{color:'#00cc00', fontWeight:'bold'}}>Adicionar Peça</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.driverList}
                data={this.state.list}
                keyExtractor={(list, index) => String(index)}
                showsVerticalScrollIndicator ={false}
                renderItem={({item: list}) => (
                    <View style={styles.driver}>
                        <Text style={styles.driverProperty}>Nome:</Text>
                        <Text style={styles.driverValue}>{list.nome}</Text>

                        <Text style={styles.driverProperty}>Descricao:</Text>
                        <Text style={styles.driverValue}>{list.descricao}</Text>

                        <Text style={styles.driverProperty}>Quantidade:</Text>
                        <Text style={styles.driverValue}>{list.quantidade}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={this.removerPeca}
                        >
                            <Text style={styles.detailsButtonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )}
}
