import React, {Component, useState, useEffect} from 'react';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
//import styles from './styles';
import { Button, Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

const CurryImagePicker = ({ image, onImagePicked }) => {

    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        if(image) {
            console.log("useEfferct" + image);
            setSelectedImage({uri: image});
        }
    }, [image] )

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an Image', maxWidht: 8080, maxHeight: 600},)
        response => {
            if(response.error){
                console.log("image error");
            }else{
                console.log("Image: " + response.uri)
                setSelectedImage({uri: response.uri});
                onImagePicked({uri: response.uri});
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={selectedImage} />
            </View>
            <View styles={styles.button}>
                <Button title="Pick Image" onPress={this.pickImageHandler}/>
            </View>
        </View>
    )
}

