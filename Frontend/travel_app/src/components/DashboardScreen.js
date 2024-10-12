import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default DashboardScreen = () => {

    const location_list = [
        {
            id: 1,
            img: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=600',
            location_name: 'Croatia',
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
            ],
            distance: '2,5 km',
        },
        {
            id: 2,
            img: 'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=600',
            location_name: 'Donga',
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
            ],
            distance: '23,7 km',
        },
        {
            id: 3,
            img: 'https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location_name: 'Italia',
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
            ],
            distance: '10,4 km',
        },
        {
            id: 4,
            img: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location_name: 'Greece',
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
            ],
            distance: '21,2 km',
        },
    ]

    return (
        <View style={styles.container}>
            {/* info */}
            <View style={styles.info_conteiner}>
                <Text style={styles.name}>Hi, Cường</Text>
                <View>
                    <View style={styles.location_row}>
                        <FontAwesome name="map-marker" size={17} color="#B0B0B0" />
                        <Text style={styles.location}>Bien Hoa city, Viet Nam</Text>
                    </View>
                </View>
                <View style={styles.notification_a_avatar}>
                    <TouchableOpacity style={styles.bell}>
                        <FontAwesome name="bell" size={24} color="black" />
                        <View style={styles.online}></View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVt9ionGvLO1eu6gr5FSxk79tbH92EYE8jQ&s' }} style={styles.avatar} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* input */}
            <View style={styles.input_container}>
                <TextInput
                    style={styles.input}
                    placeholder='Search for place...'
                    placeholderTextColor="#B0B0B0"
                />
                <FontAwesome
                    name="search" size={24} color="#B0B0B0"
                    style={styles.search_icon}
                />
            </View>

            {/* Categories */}
            <View style={styles.categories_container}>
                <View style={styles.title_row}>
                    <Text style={styles.tiltle_text}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewall_text}>View all</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categories_row}>
                    <TouchableOpacity style={styles.categories_button}>
                        <View style={styles.icon_container}>
                            <FontAwesome name="cutlery" size={24} color="white" />
                        </View>
                        <Text style={styles.categories_text}>Restaurants</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categories_button}>
                        <View style={styles.icon_container}>
                            <FontAwesome name="building" size={24} color="white" />
                        </View>
                        <Text style={styles.categories_text}>Hotels</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categories_button}>
                        <View style={styles.icon_container}>
                            <FontAwesome name="bath" size={24} color="white" />
                        </View>
                        <Text style={styles.categories_text}>Beaches</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categories_button}>
                        <View style={styles.icon_container}>
                            <FontAwesome name="coffee" size={24} color="white" />
                        </View>
                        <Text style={styles.categories_text}>Coffees</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*  */}
            <View style={styles.location_title_row}>
                <Text style={styles.location_title}>Locations</Text>
                <TouchableOpacity>
                    <Text style={styles.viewall_text}>View all</Text>
                </TouchableOpacity>
            </View>

            {/*  */}
            <View style={styles.scrooll_row}>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ width: location_list.length * (156 + 16), height: 233 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        location_list.map((item, key) => (
                            <TouchableOpacity style={styles.location_item}>
                                <Image
                                    style={styles.location_image}
                                    source={{ uri: item.img }}
                                />
                                <View style={styles.hot_container}>
                                    <Text style={styles.hot_text}>HOT</Text>
                                </View>
                                <TouchableOpacity style={styles.tym_container}>
                                    <FontAwesome name="heart" size={18} color="blue" />
                                </TouchableOpacity>
                                <Text style={styles.location_name}>{item.location_name}</Text>

                                <View style={styles.users_row}>
                                    {
                                        item.like_user.map((user, key) => (
                                            <Image
                                                style={styles.small_avatar}
                                                source={{uri: user.avatar}}
                                            />
                                        ))
                                    }
                                    <View style={styles.plus}>
                                        <Text style={styles.plus_text}>
                                            +99
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.distance}>{item.distance}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F7',
        flex: 1,
    },
    info_conteiner: {
        marginTop: 60,
        paddingLeft: 38,
    },
    name: {
        height: 42,
        fontFamily: 'OpenSans-Semibold',
        fontSize: 32,
    },
    location_row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    location: {
        color: '#B0B0B0',
        fontSize: 14,
        fontFamily: 'OpenSans-Semibold',
        marginLeft: 14
    },
    notification_a_avatar: {
        position: 'absolute',
        right: 13,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 64,
        borderWidth: 2,
        borderColor: 'blue'
    },
    bell: {
        width: 40,
        height: 40,
        marginRight: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    online: {
        backgroundColor: 'blue',
        width: 8,
        height: 8,
        borderRadius: 4,
        position: 'absolute',
        top: 12,
        right: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    input_container: {
        marginTop: 25,
        alignItems: 'center'
    },
    input: {
        width: 311,
        height: 48,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 94
    },
    search_icon: {
        position: 'absolute',
        left: 54,
        top: 12
    },
    categories_container: {
        marginTop: 32,
    },
    title_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 38,
        paddingRight: 29
    },
    tiltle_text: {
        fontSize: 18,
        lineHeight: 20,
        color: '000000'
    },
    viewall_text: {
        color: 'blue'
    },
    categories_row: {
        marginTop: 13,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon_container: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categories_button: {
        alignItems: 'center'
    },
    categories_text: {
        fontSize: 14,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 8
    },
    location_title_row: {
        flexDirection: 'row',
        marginTop: 32,
        paddingHorizontal: 32,
        justifyContent: 'space-between'
    },
    location_title: {
        fontSize: 18,
        fontFamily: 'OpenSans-Semibold',
        width: 86,
        height: 20
    },
    scrooll_row: {
        marginTop: 16,
        paddingHorizontal: 10,
        height: 244,
        backgroundColor: '#F2F2F7'
    },
    location_item: {
        width: 156,
        height: 233,
        borderRadius: 24,
        backgroundColor: 'white',
        marginHorizontal: 8,
        alignItems: 'center',

        shadowColor: 'rgba(11, 24, 43, 1)', // Màu của shadow
        shadowOffset: { width: 8, height: 8 }, // Lệch bóng về bên phải (width) và xuống dưới (height)
        shadowOpacity: 0.1, // Độ mờ của shadow
        shadowRadius: 4, // Độ mềm của shadow
        elevation: 5, // Thuộc tính cho Android
    },
    location_image: {
        width: 156,
        height: 156,
        borderRadius: 24
    },
    hot_container: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: 22,
        height: 12,
        borderRadius: 4,
        position: 'absolute',
        top: 150,
        left: 23
    },
    hot_text: {
        fontSize: 10,
        fontFamily: 'OpenSans-Semibold',
        color: 'white'
    },
    tym_container: {
        width: 32,
        height: 32,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        position: 'absolute',
        top: 16,
        right: 16
    },
    location_name: {
        fontSize: 16,
        fontFamily: 'OpenSans-Semibold',
    },
    distance: {
        fontSize: 10,
        color: '#B0B0B0',
        position: 'absolute',
        bottom: 18,
        right: 12
    },
    users_row: {
        flexDirection: 'row',
        position: 'absolute',
        left: 16,
        bottom: 14,
        paddingLeft: 10
    },
    small_avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: -6,
    },
    plus: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: -6,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus_text :{
        color: 'white',
        fontSize: 6
    }
})