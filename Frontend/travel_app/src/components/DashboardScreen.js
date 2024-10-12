import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

export default DashboardScreen = () => {
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
    }
})