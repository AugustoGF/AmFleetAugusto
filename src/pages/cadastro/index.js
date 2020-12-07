
import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import firebase from 'firebase';
import logoImg from '../../assets/logoGrande.png';
import md5 from 'md5';



export default class Cadastro extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged: false,
            matricula: "",
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            errorMessage: null,
        }; 

        this.componentDidMount = () => {
            this.checkIfSignUp();
        }

        this.navigatoToLogin = this.navigatoToLogin.bind(this);
        this.cadastro = this.cadastro.bind(this);

    }

 
    checkIfSignUp = () => {

        firebase.auth().onAuthStateChanged(function(user){

            if(user){
                firebase.database().ref('usuario').child(user.uid).set({
                    matricula: this.state.matricula,
                    nome: this.state.nome,
                    sobrenome: this.state.sobrenome,
                    tipoDeUsuario: 1,
                    email: this.state.email,
                    password: md5(this.state.password)
                })
            }else{
                this.props.navigation.navigate('Cadastro');
            }
        }.bind(this)
        );
    }

    cadastro = () =>{

        try{
            const {email, password, confirmarSenha, matricula, nome} = this.state;
            if(matricula != null && email != null && password != null && confirmarSenha != null && nome!=null){
                if(password != confirmarSenha){
                    this.setState({errorMessage: "'Confirmar Senha' diferente de 'Senha'"}); 
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(email.trim(), password)
                    .then((sucess) =>{
                        this.setState({ isAuthenticated:true});
                        alert('cadastrado com sucesso!');
                        this.navigatoToLogin();
                    }).catch(error => {this.setState({errorMessage : error.message})});
                }
            }else{
                this.setState({errorMessage: "Preencha todos os campos presentes!"});
            }
        }catch (error){
            this.setState({errorMessage : error.message});
        }
    }

    navigatoToLogin(){
        this.props.navigation.navigate('Login');
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
                        placeholder="Digite seu numero de matricula"
                        
                        value={this.state.matricula}
                        onChangeText={matricula=> this.setState({matricula})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={this.state.nome}
                        onChangeText={nome=> this.setState({nome})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu sobrenome"
                        value={this.state.sobrenome}
                        onChangeText={sobrenome=> this.setState({sobrenome})}
                    />

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

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha"
                        secureTextEntry={true}
                        value={this.state.confirmarSenha}
                        onChangeText={confirmarSenha=> this.setState({confirmarSenha})}
                    />
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                    </View>

                    <TouchableRipple 
                        style={styles.button}
                        rippleColor="#E9EEF3"
                        onPress={this.cadastro}
                    >
                        <View>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableOpacity 
                        style={styles.buttonLogin}
                        rippleColor="#E9EEF3"
                        onPress={this.navigatoToLogin}
                    >
                        <View>
                        <Text style={styles.buttonTextLogin}>Já possui login? Clique aqui!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View> 
        )
    }
} 