import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView, Alert } from 'react-native';
import { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import ip from '../../assets/ip/Ip.js'
import axios from 'axios';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default DetailScreen = ({ navigation, route }) => {
    const id = route.params.id
    const user = route.params.user_info

    const [tourlist, setTourlist] = useState({
        id: 2,
        img: '',
        tourist_name: '',
        location: '',
        like_user: [

        ],
        distance: '',
        description: '',
        price: '',
        benerfics: [],
    })

    const callapi = async () => {
        try {
            const response = await axios.get(`${ip}/tourlist/${id}`);
            setTourlist(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const convertAmount = (string) => {
        const newStr = string.replace(/,/g, '')
        const newStr1 = newStr.replace(' ', '')
        const newStr2 = newStr1.replace('VND', '')
        return newStr2
    }

    const bookingTourlistToApi = async () => {
        // try {
        //     console.log("Calling API:", `${ip}/tourlist/booked/${id}`);
        //     const response = await axios.put(`${ip}/tourlist/booked/${id}`, {
        //         user_name: user.user_name,
        //         avatar: user.avatar
        //     });
        //     if (response.status === 200) {
        //         Alert.alert('Booked successfully')
        //     } else {
        //         Alert.alert('Booked failed')
        //     }
        // } catch (error) {
        //     if (error.response) {
        //         // Server responded with a status other than 200 range
        //         console.error('Error response:', error.response.data);
        //         console.error('Error status:', error.response.status);
        //     } else if (error.request) {
        //         // Request was made but no response received
        //         console.error('Error request:', error.request);
        //     } else {
        //         // Something happened in setting up the request
        //         console.error('Error message:', error.message);
        //     }
        // }
        const info = {
            user_name: user.user_name,
            avatar: user.avatar
        }
        const newPrice = convertAmount(tourlist.price)
        navigation.navigate('ScanQR', { type: 'beach', amount: newPrice, account_bank: tourlist.tourist_name, id, info})
    }

    useEffect(() => {
        callapi()
    }, [])


    return (
        <View style={styles.container}>
            <Image
                source={{ uri: tourlist.img }}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.back_icon}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <FontAwesome name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <View style={styles.content_container}>
                <View style={styles.price_container}>
                    <Text style={styles.price_text}>{tourlist.price}</Text>
                </View>
                <ScrollView>
                    <View style={styles.row_star}>
                        <FontAwesome name="star" size={18} color="blue" />
                        <FontAwesome name="star" size={18} color="blue" />
                        <FontAwesome name="star" size={18} color="blue" />
                        <FontAwesome name="star" size={18} color="blue" />
                        <FontAwesome name="star" size={18} color="blue" />
                        <Text>4.9</Text>
                    </View>

                    <Text style={styles.tourist_name}>{tourlist.tourist_name}</Text>

                    <Text style={styles.location_name}>{tourlist.location}</Text>

                    <View style={styles.benerfic_row}>
                        {
                            tourlist.benerfics.map((item, index) => (
                                <View key={index} style={styles.benerfic_item}>
                                    <Text style={styles.benerfic_text}>
                                        {item}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>

                    <Text style={styles.descript_title}>Description</Text>


                    <Text style={styles.description_text}>{tourlist.description}</Text>
                    <View style={styles.over}></View>

                    <View style={styles.avatar_row}>
                        {
                            tourlist.like_user.map((item, index) => (
                                <View key={index}>
                                    <Image
                                        source={{ uri: item.avatar }}
                                        style={styles.avatar}
                                    />
                                </View>
                            ))
                        }
                    </View>

                    <TouchableOpacity
                        style={styles.book_button}
                        onPress={() => bookingTourlistToApi()}
                    >
                        <Text style={styles.button_text}>
                            Book Now
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 32
    },
    image: {
        width: '100%',
        height: screenHeight / 2,
        zIndex: 0
    },
    content_container: {
        width: '100%',
        height: 510,
        zIndex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 302,
        borderRadius: 32
    },
    price_container: {
        width: 90,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 8,
        position: 'absolute',
        right: 32,
        top: -17
    },
    price_text: {
        fontSize: 12,
        color: 'white'
    },
    row_star: {
        flexDirection: 'row',
        marginLeft: 32,
        marginTop: 40,
        width: '35%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tourist_name: {
        marginLeft: 32,
        marginTop: 8,
        fontSize: 32,
        fontFamily: 'OpenSans-Semibold',

    },
    location_name: {
        marginTop: 4,
        marginLeft: 32,
        fontSize: 14,
        color: '#B0B0B0'
    },
    benerfic_row: {
        height: 50,
        marginLeft: 32,
        marginRight: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24
    },
    benerfic_item: {
        height: '100%',
        padding: 16,
        backgroundColor: '#EEEEEE',
        borderRadius: 8,
    },
    benerfic_text: {
        fontSize: 12,
        color: '#111111',
        fontFamily: 'OpenSans-Semibold',
        fontWeight: 'bold'
    },
    descript_title: {
        color: '#000000',
        fontSize: 18,
        lineHeight: 20,
        fontFamily: 'OpenSans-Semibold',
        marginLeft: 32,
        marginTop: 24
    },
    description_text: {
        marginTop: 24,
        marginLeft: 32,
        marginRight: 42,
        height: 115,
        overflow: 'hidden',
        textAlign: 'left'
    },
    over: {
        marginTop: 24,
        marginLeft: 32,
        height: 115,
        width: screenWidth - 74,
        position: 'absolute',
        top: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    avatar_row: {
        marginTop: 16,
        marginLeft: 32,
        paddingLeft: 14,
        overflow: 'hidden',
        height: 47,
        width: screenWidth / 2 - 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 47,
        height: 47,
        borderRadius: 23.5,
        marginLeft: -14,
        borderWidth: 1,
        borderColor: 'white'
    },
    book_button: {
        width: 101,
        height: 54,
        backgroundColor: '#111111',
        position: 'absolute',
        right: 42,
        top: 396,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontSize: 14,
        fontFamily: 'OpenSans-Semibold',
        color: 'white'
    },
    back_icon: {
        position: 'absolute',
        left: 26,
        top: 60,
    }
})


