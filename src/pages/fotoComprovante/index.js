import React, { useState, useEffect, useRef} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, Image, Alert} from 'react-native';
import { Camera} from 'expo-camera';
import { Ionicons, FontAwesome, AntDesign} from '@expo/vector-icons'; 
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import styles from './styles';

export default function FotoComprovante() {
    const camRef = useRef(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const[haPermission, setHasPermission] = useState(null);
    const[capturedPhoto, setCapturedPhoto] = useState(null);
    const[open, setOpen] = useState(false);

    useEffect(()=> {
        (async () =>{
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        (async () =>{
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setHasPermission(status === 'granted');
        })();

    }, []);

    if(haPermission === null){
        return <View />
    }

    if(haPermission === false){
        return <Text> Acesso Negado! </Text>
    }

    async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
        }
    }

    async function savePicture(){
        
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
        .then(()=>{
            Alert.alert('Salvo com sucesso!');
        })
        .catch(error =>{
            console.log('err', error);
        })

    }

    return(
        <SafeAreaView style={styles.container}>
            <Camera
                style={{flex: 1}}
                type ={type}
                ref = {camRef}
            >
                <Grid style={styles.viewCamera}>
                    <Row>
                        <Col>
                            <TouchableOpacity
                            style={[styles.buttonCamera, {left:10}]}
                            onPress={ () => {
                                setType( type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                                    );
                            }}>
                                <Ionicons name="md-reverse-camera" style={{marginBottom:20, marginLeft: 20}} size={36} color="rgba(240,240,240,0.8)" />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                        <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
                            <FontAwesome name="camera" style={{marginBottom:20, marginLeft: 20}} size={36} color="rgba(240,240,240,0.8)" />
                        </TouchableOpacity>
                        </Col>
                        <Col>
                        <TouchableOpacity style={[styles.buttonCamera, {left:45}]}>
                            <FontAwesome name="camera" style={{marginBottom:20, marginLeft: 20}} size={36} color="transparent" />
                        </TouchableOpacity>
                        </Col>
                    </Row>
                </Grid>

            </Camera>

            { capturedPhoto &&
                <Modal
                    animationType="slide"
                    transparent = {false}
                    visible={open}
                >
                    <View style={styles.modalView}>

                        <Image
                            style={styles.showImage}
                            source={{uri: capturedPhoto}}
                        />
                        <View style={styles.alingButtons}>
                            <TouchableOpacity style = {{margin:10, marginRight:20}} onPress={() => setOpen(false)}>
                                <AntDesign name="close" size={30} color="#D3D3D3" />
                            </TouchableOpacity>

                            <TouchableOpacity style = {{margin:10, marginLeft:20}} onPress={ savePicture }>
                                <AntDesign name="upload" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
        </SafeAreaView>
    )
}