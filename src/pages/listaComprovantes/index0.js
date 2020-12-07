import React, {Component,useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import CurryImagePicker from './CurryImagePicker';
import ImagePicker from 'react-native-image-picker';
import {ActionSheet, Root} from "native-base";
import FotoComprovante from '../fotoComprovante';

export default class Comprovante extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: true,
            nome: '',
            tipoDeUsuario: '',
            modalVisible: false,
            errorMessage: null,
            nomemotorista: '',
            list:[],
            fileList: [],
        };
        this.singOutAccount = this.singOutAccount.bind(this);
}

    getInformation = () =>{
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref('usuario/' + uid).once('value', (data) => {
        
            this.setState({
                nome: data.val().nome
            })
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    this.props.navigation.navigate('Login');
                break;
                case 'auth/invalid-password':
                    this.props.navigation.navigate('Login');
                break;
                case 'auth/user-not-found':
                    this.props.navigation.navigate('Login');
                break;
            default:
                this.props.navigation.navigate('Login');
                break;
            }
        })
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(function(user){
            
            if(user){
                this.setState({
                    isAuthenticated: true,
                })
                this.getMotorista();
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


    removerMotorista = () =>{
        console.log('entrou aqui');
        firebase.database().ref(`motorista/`).once('value', (data) =>{
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

    getMotorista = () =>{
        firebase.database().ref(`motorista/`).once('value', (data) =>{
            console.log(' data '+data.val());
            data.forEach((uid) =>{
                
                    this.state.list.push({
                        nomemotorista: uid.val().nome,
                        uri: uid.val().uri,
                    })
                    this.setState({
                        list : this.state.list
                    })
            })
        })
    }


    navigateToFotoComprovante = () =>{
        this.props.navigation.navigate('AnaFotoComprovantelises');
     }

    onSelectedImage = (image) => {
        let newDataImg = this.state.fileList;
        const source = {uri: image.path};
        let item = {
            id: DataCue.now(),
            url: source,
            content: image.data
        };
        newDataImg.push(item);
        this.setState({fileList: newDataImg})
    };

    takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.onSelectedImage(image);
            console.log(image);
          });
    };

    choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.onSelectedImage(image);
            console.log(image);
          });
    };

    onClickAddImage = () => {
        const BUTTONS = ['Tire uma foto', 'Escolha da biblioteca', 'Cancelar'];
        ActionSheet.show({options: BUTTONS, 
            cancelButtonIndex: 2, 
            title: 'Selecione uma foto'},
        buttonIndex => {
            switch (buttonIndex){
                case 0:
                    this.takePhotoFromCamera();
                    break;
                case 1:
                    this.choosePhotoFromLibrary();
                    break;
                default:
                    break
            }
        }
        )
    };
    
    renderItem = ({item, index}) => {
        return(
            <View>
                <Image source={item.url} style={styles.imageContainer} />
            </View>
        )
    };

    render(){

    return(
        <Root>
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

            <Text style={styles.description}>Comprovantes</Text>

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
                        <Text style={styles.description}>Cadastre seu Comprovante</Text>
                    </View>
                    
                     
                        <Text style={styles.title}>Olá, {this.state.nome}!</Text>
                        
                        <Text style={styles.textStyle}></Text>
                        <Text style={styles.description}>Selecione a foto</Text>
                        
                        <View style={styles.container2}>
                            <View style={styles.imageContainer}>
                                <Image source={()=>{}} /> 
                            </View>
                            <View styles={styles.button}>
                                <TouchableRipple 
                                    style={styles.button3}
                                    rippleColor="#E9EEF3"
                                    onPress={this.onClickAddImage}>
                                    <View>
                                    <Text style={styles.textStyle}>Selecionar foto</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </View>


                        <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View>
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={this.cadastrarMotorista}
                        >
                            <View>
                            <Text style={styles.textStyle}>Cadastrar comprovante</Text>
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
                <AntDesign name="camera" size={24} color="#00cc00" />
                <Text style={{color:'#00cc00', fontWeight:'bold'}}>Adicionar Comprovante</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.driverList}
                data={this.state.list}
                keyExtractor={(list, index) => String(index)}
                showsVerticalScrollIndicator ={false}
                renderItem={({item: list}) => (
                    <View style={styles.driver}>

                        <Text style={styles.driverProperty}>Nome:</Text>
                        <Text style={styles.driverValue}>{list.nomemotorista} </Text>

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
        </Root>
    )}
}
