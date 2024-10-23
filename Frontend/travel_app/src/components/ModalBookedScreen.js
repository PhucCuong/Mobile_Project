import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, Alert, FlatList, ImageBackground } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';  //import chuyển màu linear


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height

export default ModalBookedScreen = ({ navigation, route }) => {
    const bookedArray = route.params.booked_array
    console.log(bookedArray)

    const goBackScreen = () => {
        navigation.goBack()
    }
    return (
        <ImageBackground
            style={styles.modal}
            source={{ uri: 'https://images.pexels.com/photos/9094948/pexels-photo-9094948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        >
            <LinearGradient
                colors={['rgba(77, 63, 63, 0.2)', 'rgba(34, 242, 255, 0.7)']} // Chuyển đổi mã màu và độ trong suốt
                style={styles.overlay}
            />
            <TouchableOpacity
                style={styles.modal_back_icon}
                onPress={() => goBackScreen()} // Đóng modal khi nhấn vào icon
            >
                <FontAwesome name="times" size={30} color="blue" />
            </TouchableOpacity>
            <Text style={styles.modal_text}>Rooms or Tables booked</Text>
            <View style={styles.modal_container}>
                {
                    bookedArray.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.modal_item}
                        >
                            <FontAwesome name="user-circle" size={30} color="#B0B0B0" />
                            <Text style={styles.table_name}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    modal: {
        width: screenWidth,
        height: screenHeight,
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: -1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modal_back_icon: {
        position: 'absolute',
        top: 100,
        right: 50
    },
    modal_text: {
        color: 'green',
        fontSize: 24,
        marginTop: 200
    },
    modal_container: {
        width: screenWidth - 60,
        marginHorizontal: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    modal_item: {
        height: 100,
        width: screenWidth - 260,
        marginHorizontal: 10,
        backgroundColor: '#96D8D0',
        borderRadius: 8,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    table_name: {
        fontSize: 20,
        color: '#B0B0B0'
    }
})