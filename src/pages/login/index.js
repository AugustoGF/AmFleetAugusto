import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import firebase from 'firebase';
import logoImg from '../../assets/logoGrande.png';


export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password:'',
            isAuthenticated: false,
            errorMessage: null,
        }; 

        firebase.auth().onAuthStateChanged(function(user){

            if(user){
                this.setState({
                    isAuthenticated: true,
                })
                console.log(user)
                this.navigateToHome();

            }
            else{
                this.props.navigation.navigate('Login')
            }
        }.bind(this)
        );

}
    handleLogin = async() =>{

        try{
            const {email, password} = this.state;
            await firebase.auth()
                .signInWithEmailAndPassword(email, password).catch(error => {this.setState({errorMessage : error.message})});

        }catch (err){
            console.log(err);
        }
    }

    navigateToHome = () => {
        this.props.navigation.navigate('Home');
    }
    navigatoToCadastro = () =>{
        this.props.navigation.navigate('Cadastro');
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImg}/>
                </View>
                <View style={styles.body}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={this.state.email}
                        onChangeText={email=> this.setState({email})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password=> this.setState({password})}
                    />
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.wrongText}>Email ou senha incorreto!</Text>}
                    </View>
                    <TouchableRipple 
                        style={styles.button}
                        rippleColor="#E9EEF3"
                        onPress={this.handleLogin}
                    >
                        <View>
                        <Text style={styles.buttonText}>Entrar</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableOpacity 
                        style={styles.buttonCadastro}
                        onPress={this.navigatoToCadastro}
                    >
                        <Text style={styles.buttonTextCadastro}>Não possui cadastro? Clique aqui!</Text>
                        
                    </TouchableOpacity>
                </View>
            </View> 
        )
    }
} 
