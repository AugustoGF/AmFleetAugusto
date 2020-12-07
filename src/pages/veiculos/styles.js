import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#EBF6FF'
        
    },

    header: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontSize:15,
        color:'#737380'
    },

    headerTextBold: {
        fontWeight:'bold'
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
        fontWeight: 'bold',
        paddingBottom:20
    },

    vehicleList: {
        marginTop: 32,
    },
    containerModal: {
        paddingHorizontal: 24,
        paddingTop: 20,
        
    },
    errorMessage:{
        height:30,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30
    },
    wrongText:{
        fontWeight:'bold',
        color:"#E9446A",
        textAlign:'center',
    },
    alinharClose: {
        alignSelf:'flex-end',
        paddingBottom:10,
    },

    vehicle:{
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#fff',
        marginBottom: 16,
    },

    vehicleProperty: {
        fontSize: 14,
        color:'#41414d',
        fontWeight:'bold'
    },

    vehicleValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    driverList: {
        marginTop: 32,
    },

    vehicule:{
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#fff',
        marginBottom: 16,
    },

    vehiculeProperty: {
        fontSize: 14,
        color:'#41414d',
        fontWeight:'bold'
    },

    vehiculeValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButtonText: {
        color: '#4f8cff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    detailsButton:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    detailsButtonAdd:{
        flexDirection:'row',
        paddingBottom:30,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        justifyContent:'space-between',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
    detailsButtonText: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        justifyContent:'space-between',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      input: {
        height: 50,
        backgroundColor:'#fff',
        borderRadius: 8,
        alignSelf: 'stretch',
        borderColor: '#eee', 
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
      button: {
        height: 60,
        backgroundColor:'#00cc00',
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search:{
        marginBottom:30,
    }
});