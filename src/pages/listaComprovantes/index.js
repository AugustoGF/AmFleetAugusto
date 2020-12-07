import React from 'react';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
//import { ImagePicker } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
//import storage from '@react-native-firebase/storage';
import {ActionSheet, Root} from "native-base";
import logoImg from '../../assets/logo.png';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {Avatar, Button, TouchableRipple} from 'react-native-paper';
import ListItem from 'antd-mobile/lib/list/ListItem';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: false,
            nome: '',
            tipoDeUsuario: '',
            modalVisible: false,
            errorMessage: null,
            nomemotorista: '',
            list:[],
            fileList: [],
            imageFirebase: "",
        };
        this.singOutAccount = this.singOutAccount.bind(this); 
        this.componentDidMount = this.componentDidMount.bind(this);   
}

    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(function(user){

          if(user){
              this.setState({
                  isAuthenticated: true,
              })
              this.getInformation();

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

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let newstate = (hours + "_" + minutes + "_" + seconds + "_" + this.state.nome)
    if (!result.cancelled) {
      this.uploadImage(result.uri, newstate)
        .then(() => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  onChooseImagePress2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let newstate = (hours + "_" + minutes + "_" + seconds + "_" + this.state.nome)
    if (!result.cancelled) {
      this.uploadImage(result.uri, newstate)
        .then(() => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

    onClickAddImage = () => {
        const BUTTONS = ['Tire uma foto', 'Escolha da biblioteca', 'Cancelar'];
        ActionSheet.show({options: BUTTONS, 
            cancelButtonIndex: 2, 
            title: 'Selecione uma foto'},
        buttonIndex => {
            switch (buttonIndex){
                case 0:
                    this.onChooseImagePress();
                    break;
                case 1:
                    this.onChooseImagePress2();
                    break;
                default:
                    break
            }
        }
        )
    };


      List(){
         firebase.storage().ref("images/").listAll().then( function (result){
            result.items.forEach( function (all) {
              //console.log("image reference" + all.toString())
              console.log(all.toString())
            });
           }).catch((error)=> {
             console.log(error);
             alert(error)
           });
        }
      

        //sampleImage = imageRef.getDownloadURL().then(result => console.log(result));

        storageRef = firebase.storage().ref("images/");
     List2(){   
        storageRef.listAll().then(function(result) {
            result.items.forEach(function(imageRef) {
            displayImage(imageRef);
            });
        }).catch(function(error) {
 
        });
        }

        displayImage(imageRef) {
            imageRef.getDownloadURL().then(function(url) {
            }).catch(function(error) {
            });
          }
         
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
            
            <Button
                onPress={() => this.List()}
                title="Cargar Imagem"
                color="#841584"
            />           

        </View>
        </Root>
    )}
}
