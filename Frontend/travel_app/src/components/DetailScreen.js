import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default DetailScreen = ({ navigation, route }) => {
    const id = route.params.id

    // thực hiện call get api dựa vào tham số id để lấy về 1 tourist
    // aip gọi về gán vào biến tourist
    const tourist = {
        id: 2,
        img: 'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=600',
        tourist_name: 'Rabbit',
        location: 'Italy',
        like_user: [
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCU9NOBsw3ZYwS1nGnktFBAbFFWRPIVx9BsA&s',
                user_name: 'Alex',
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCU9NOBsw3ZYwS1nGnktFBAbFFWRPIVx9BsA&s',
                user_name: 'Anna',
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYROR0fm8scNmYMwKBN2HpD2Bddj6JeJtCkw&s',
                user_name: 'Kudo',
            },
            {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVt9ionGvLO1eu6gr5FSxk79tbH92EYE8jQ&s',
                user_name: 'Cường'
            }
        ],
        distance: '23,7 km',
        discription: 'Bãi biển Rabbit sở hữu những vách đá trắng, nước trong xanh tinh khiết, nhiệt độ ấm áp và cảnh quan đẹp mê hồn. Tới đây, du khách sẽ có dịp chiêm ngưỡng những chú rùa đẻ trứng và cá heo thỉnh thoảng nhô lên mặt nước.',
        price: '320$/Day',
        benerfics: ['sightseeing', 'buffeet', 'hotel'],
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: tourist.img }}
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
                    <Text style={styles.price_text}>{tourist.price}</Text>
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

                    <Text style={styles.tourist_name}>{tourist.tourist_name}</Text>

                    <Text style={styles.location_name}>{tourist.location}</Text>

                    <View style={styles.benerfic_row}>
                        {
                            tourist.benerfics.map((item, key) => (
                                <View _id={key} style={styles.benerfic_item}>
                                    <Text style={styles.benerfic_text}>
                                        {item}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>

                    <Text style={styles.descript_title}>Description</Text>


                    <Text style={styles.description_text}>{tourist.discription}</Text>
                    <View style={styles.over}></View>

                    <View style={styles.avatar_row}>
                        {
                            tourist.like_user.map((item, key) => (
                                <View>
                                    <Image
                                        source={{ uri: item.avatar }}
                                        style={styles.avatar}
                                    />
                                </View>
                            ))
                        }
                    </View>

                    <TouchableOpacity style={styles.book_button}>
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


