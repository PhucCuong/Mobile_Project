import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView, Modal, Animated, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default ScanQR = ({ navigation, route }) => {
    const type = route.params.type
    const amount = route.params.amount
    const account_bank = route.params.account_bank
    const id = route.params.id
    const info = route.params.info
    const user = route.params.user

    const goBackScreen = () => {
        navigation.goBack()
    }


    // hàm gọi api để booking bãi biển
    const bookingBeach = async () => {
        try {
            console.log("Calling API:", `${ip}/tourlist/booked/${id}`);
            const response = await axios.put(`${ip}/tourlist/booked/${id}`, info);
            if (response.status === 200) {
                Alert.alert('Booked successfully')
                navigation.goBack()
            } else {
                Alert.alert('Booked failed')
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request
                console.error('Error message:', error.message);
            }
        }
    }

    //hàm gọi api booking restaurant
    const bookingRestaurant = async () => {
        try {
            const response = await axios.put(`${ip}/restaurant/booking/${id}`, info);

            if (response.status === 200) {
                Alert.alert('Booked successfully');
                navigation.navigate('CategoriesList', { type: 'restaurants', user: user })
            } else {
                Alert.alert('Booked failed');
            }
        } catch (error) {
            // Kiểm tra xem lỗi có từ server không
            if (error.response) {
                // Server đã phản hồi với mã trạng thái khác 2xx
                console.error('Error response data:', error.response.data);
                Alert.alert('Booked failure', error.response.data.message || 'Unknown error');
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.error('Error request:', error.request);
                Alert.alert('Booked failure', 'No response from server');
            } else {
                // Lỗi khác
                console.error('Error message:', error.message);
                Alert.alert('Booked failure', error.message);
            }
        }
    }

    // hàm gọi api booking hotel
    const bookingHotel = async () => {
        try {
            const response = await axios.put(`${ip}/hotel/booking/${id}`, info);
    
            if (response.status === 200) {
                Alert.alert('Booked successfully');
                navigation.navigate('CategoriesList', { type: 'hotels' , user: user})
            } else {
                Alert.alert('Booked failed');
            }
        } catch (error) {
            // Kiểm tra xem lỗi có từ server không
            if (error.response) {
                // Server đã phản hồi với mã trạng thái khác 2xx
                console.error('Error response data:', error.response.data);
                Alert.alert('Booked failure', error.response.data.message || 'Unknown error');
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.error('Error request:', error.request);
                Alert.alert('Booked failure', 'No response from server');
            } else {
                // Lỗi khác
                console.error('Error message:', error.message);
                Alert.alert('Booked failure', error.message);
            }
        }
    }

    // hàm gọi api booking coffee 
    const bookingCoffee = async () => {
        try {
            const response = await axios.put(`${ip}/coffee/booking/${id}`, info);
    
            if (response.status === 200) {
                Alert.alert('Booked successfully');
                navigation.navigate('CategoriesList', { type: 'coffees' , user: user})
            } else {
                Alert.alert('Booked failed');
            }
        } catch (error) {
            // Kiểm tra xem lỗi có từ server không
            if (error.response) {
                // Server đã phản hồi với mã trạng thái khác 2xx
                console.error('Error response data:', error.response.data);
                Alert.alert('Booked failure', error.response.data.message || 'Unknown error');
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.error('Error request:', error.request);
                Alert.alert('Booked failure', 'No response from server');
            } else {
                // Lỗi khác
                console.error('Error message:', error.message);
                Alert.alert('Booked failure', error.message);
            }
        }
    }

    const callApiToBooking = () => {
        if(type === 'restaurant') {
            bookingRestaurant()
        } else if (type === 'hotel') {
            bookingHotel()
        } else if (type === 'coffee') {
            bookingCoffee()
        } else if (type === 'beach') {
            bookingBeach()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.back_button}
                    onPress={goBackScreen}
                >
                    <FontAwesome name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Scan QR Code</Text>
            </View>
            <Image
                source={{ uri: `https://img.vietqr.io/image/vietinbank-113366668888-compact2.jpg?amount=${amount}&addInfo=booking&accountName=${account_bank}` }}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={callApiToBooking}
            >
                <Text style={styles.button_text}>
                    Paid
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    header: {
        backgroundColor: '#1B6CD8',
        flexDirection: 'row',
        height: 140,
        alignItems: 'center',
        borderRadius: 12,
        paddingTop: 50
    },
    back_button: {
        marginLeft: 28
    },
    title: {
        marginLeft: 80,
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
    },
    image: {
        height: 510,
        width: '100%',
        marginTop: 30
    },
    button: {
        width: 276,
        height: 45,
        borderRadius: 32,
        backgroundColor: '#252935',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button_text: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 16,
        color: '#FFFFFF'
    }
})