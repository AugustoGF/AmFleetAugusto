import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },

    viewCamera:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },

    buttonCamera:{
        position: 'absolute',
        bottom: 20,
        left: 25,
    },
    takePicture:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
        borderRadius: 10,
        height: 50,
    },
    modalView:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        margin:10,
    },
    showImage:{
        width:'100%',
        height:'80%',
        borderRadius:20,
    },
    alingButtons:{
        margin:10,
        flexDirection: 'row',
        
    },

});