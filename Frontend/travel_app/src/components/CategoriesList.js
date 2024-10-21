import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default CategoriesList = ({ navigation, route }) => {
    const page_type = route.params.type
    const user = route.params.user

    const [page, setPage] = useState(page_type)  // sử dụng thêm useEffect ràng buộc là "page" để call api mỗi lần chuyển trang

    background = 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDI3fHx0cmF2ZWx8ZW58MHx8fHwxNzI4ODMyMzgyfDA&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'

    const [restaurantList, setRestaurantList] = useState([])
    const [hotelList, setHotelList] = useState([])
    const [beachList, setBeachList] = useState([])
    const [coffeeList, setCoffeeList] = useState([])

    const callApi = async () => {
        try {
            const response_restaurant = await axios.get(`${ip}/Restaurant`)
            const response_hotel = await axios.get(`${ip}/Hotel`)
            const response_beach = await axios.get(`${ip}/Beach`)
            const response_coffee = await axios.get(`${ip}/CoffeeShop`)

            setRestaurantList(response_restaurant.data)
            setHotelList(response_hotel.data)
            setBeachList(response_beach.data)
            setCoffeeList(response_coffee.data)
        } catch (error) {
            console.log(error)
        }

        if (page === 'restaurants') scrollViewRef.current.scrollTo({ x: screenWidth * 0, animated: false });
        else if (page === 'hotels') scrollViewRef.current.scrollTo({ x: screenWidth * 1, animated: false });
        else if (page === 'beaches') scrollViewRef.current.scrollTo({ x: screenWidth * 2, animated: false });
        else if (page === 'coffees') scrollViewRef.current.scrollTo({ x: screenWidth * 3, animated: false });
    }

    /////////////////////////////////////////
    const handleSelectedPage = (page_name, page_index) => {
        setPage(page_name)  // đổi màu chữ
        scrollToIndex(page_index)
    }

    const handleScrollX = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x
        const index = Math.floor(contentOffsetX / screenWidth);

        if (index === 0) {
            setPage('restaurants')
            // categories_list = restaurantList
        } else if (index === 1) {
            setPage('hotels')
            // categories_list = hotelList
        } else if (index === 2) {
            setPage('beaches')
            // categories_list = beachList
        } else if (index === 3) {
            setPage('coffees')
            // categories_list = coffeeList
        }
    }

    const scrollViewRef = useRef(null);
    const scrollToIndex = (index) => {
        scrollViewRef.current.scrollTo({ x: screenWidth * index, animated: true });
    };

    const goToBookingRestaurantScreen = (id, name, price_table) => {
        navigation.navigate('BookingRestaurant', {id: id, user: user, price_table: price_table, restaurant_name: name})
    }

    const goToBookingHotelScreen = (id, name) => {
        navigation.navigate('BookingHotel', {id: id, user: user, hotel_name: name})
    }

    useEffect(() => {
        callApi()
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: background }}
                style={styles.background}
                resizeMode='stretch'
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <FontAwesome name="chevron-left" size={25} color="white" style={styles.back_icon} />
            </TouchableOpacity>
            <View style={styles.selected_row}>
                <TouchableOpacity
                    onPress={() => handleSelectedPage('restaurants', 0)}
                >
                    <Text style={[styles.selected_text, { color: page === 'restaurants' ? 'red' : '#111111' }]}>
                        Restaurants
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelectedPage('hotels', 1)}
                >
                    <Text style={[styles.selected_text, { color: page === 'hotels' ? 'red' : '#111111' }]}>
                        Hotels
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelectedPage('beaches', 2)}
                >
                    <Text style={[styles.selected_text, { color: page === 'beaches' ? 'red' : '#111111' }]}>
                        Beaches
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelectedPage('coffees', 3)}
                >
                    <Text style={[styles.selected_text, { color: page === 'coffees' ? 'red' : '#111111' }]}>
                        Coffees
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.list_categories_container}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                onScroll={handleScrollX}
                ref={scrollViewRef}
            >
                <ScrollView style={styles.one_page}>
                    <Text style={styles.list_title}>favorite Restaurants</Text>
                    <View style={styles.content}>
                        {restaurantList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.category_container, { backgroundColor: (index % 2 === 0) ? '#E6F2E9' : '#F4F2EE' }]}
                                onPress={() => goToBookingRestaurantScreen(item._id, item.category_name,item.price_table)}
                            >
                                <Image
                                    source={{ uri: item.img }}
                                    style={styles.category_image}
                                />

                                <View style={styles.category_content}>
                                    <Text
                                        style={styles.category_name}
                                    >
                                        {item.category_name}</Text>
                                    <Text
                                        style={styles.category_description}
                                        numberOfLines={2}
                                        ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối (tail)
                                    >{item.description}</Text>
                                    <Text
                                        style={styles.category_price}
                                    >
                                        {item.price}
                                    </Text>

                                </View>

                                <TouchableOpacity style={styles.tym_container}>
                                    <FontAwesome name="heart" size={18} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <ScrollView style={styles.one_page}>
                    <Text style={styles.list_title}>favorite Hotels</Text>
                    <View style={styles.content}>
                        {hotelList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.category_container, { backgroundColor: (index % 2 === 0) ? '#E6F2E9' : '#F4F2EE' }]}
                                onPress={() => goToBookingHotelScreen(item._id, item.category_name)}
                            >
                                <Image
                                    source={{ uri: item.img }}
                                    style={styles.category_image}
                                />

                                <View style={styles.category_content}>
                                    <Text
                                        style={styles.category_name}
                                    >
                                        {item.category_name}</Text>
                                    <Text
                                        style={styles.category_description}
                                        numberOfLines={2}
                                        ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối (tail)
                                    >{item.description}</Text>
                                    <Text
                                        style={styles.category_price}
                                    >
                                        {item.price}
                                    </Text>

                                </View>

                                <TouchableOpacity style={styles.tym_container}>
                                    <FontAwesome name="heart" size={18} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <ScrollView style={styles.one_page}>
                    <Text style={styles.list_title}>favorite Beaches</Text>
                    <View style={styles.content}>
                        {beachList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.category_container, { backgroundColor: (index % 2 === 0) ? '#E6F2E9' : '#F4F2EE' }]}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.category_image}
                                />

                                <View style={styles.category_content}>
                                    <Text
                                        style={styles.category_name}
                                    >
                                        {item.category_name}</Text>
                                    <Text
                                        style={styles.category_description}
                                        numberOfLines={2}
                                        ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối (tail)
                                    >{item.description}</Text>
                                    <Text
                                        style={styles.category_price}
                                    >
                                        {item.price}
                                    </Text>

                                </View>

                                <TouchableOpacity style={styles.tym_container}>
                                    <FontAwesome name="heart" size={18} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <ScrollView style={styles.one_page}>
                    <Text style={styles.list_title}>favorite Coffees</Text>
                    <View style={styles.content}>
                        {coffeeList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.category_container, { backgroundColor: (index % 2 === 0) ? '#E6F2E9' : '#F4F2EE' }]}
                            >
                                <Image
                                    source={{ uri: item.img }}
                                    style={styles.category_image}
                                />

                                <View style={styles.category_content}>
                                    <Text
                                        style={styles.category_name}
                                    >
                                        {item.category_name}</Text>
                                    <Text
                                        style={styles.category_description}
                                        numberOfLines={2}
                                        ellipsizeMode="tail" // Hiển thị dấu "..." ở cuối (tail)
                                    >{item.description}</Text>
                                    <Text
                                        style={styles.category_price}
                                    >
                                        {item.price}
                                    </Text>

                                </View>

                                <TouchableOpacity style={styles.tym_container}>
                                    <FontAwesome name="heart" size={18} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        width: screenWidth,
        height: screenHeight,
        position: 'absolute',
        top: 0,
        left: 0
    },
    back_icon: {
        marginTop: 60,
        marginLeft: 26
    },
    selected_row: {
        flexDirection: 'row',
        marginTop: 27,
        justifyContent: 'space-between',
        paddingLeft: 26,
        paddingRight: 40
    },
    selected_text: {
        fontSize: 16,
        fontFamily: 'OpenSans-Semibold',
    },
    list_categories_container: {
        width: screenWidth,
        height: 600,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    one_page: {
        width: screenWidth,
        height: '100%',
        paddingHorizontal: 26
    },
    list_title: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 26,
        marginLeft: 48,
        color: 'blue'
    },
    content: {
        width: screenWidth - 26,
        paddingRight: 26,
        height: '100%'
    },
    category_container: {
        // backgroundColor: '#E6F2E9',
        height: 98,
        width: '100%',
        marginTop: 30,
        borderRadius: 8,
        flexDirection: 'row'
    },
    category_image: {
        width: 98,
        height: 98,
        borderRadius: '50%'
    },
    category_content: {
        height: '100%',
        width: 157,
        marginLeft: 16
    },
    category_name: {
        fontSize: 14,
        fontFamily: 'OpenSans-Semibold',
        color: '#111111',
        marginTop: 8
    },
    category_description: {
        width: 175,
        marginTop: 4,
        color: '#B0B0B0'
    },
    category_price: {
        marginTop: 7,
        fontSize: 12,
        color: '#111111'
    },
    tym_container: {
        width: 30,
        height: 30,
        backgroundColor: 'blue',
        position: 'absolute',
        right: -15,
        top: 34,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})