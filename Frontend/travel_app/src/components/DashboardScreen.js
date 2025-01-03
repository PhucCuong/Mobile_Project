import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, Alert, FlatList } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'
import { useIsFocused } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height

export default DashboardScreen = ({ navigation, route }) => {
    const id = route.params.id

    const scrollScreen = useRef(null)
    const modal = useRef(null)

    const isFocused = useIsFocused();

    const [user, setUser] = useState({
        avatar: '',
        user_name: '',
        phone_number: '',
        location: '',
        gender: '',
    });

    /////////////

    const [tourlist, setTourlist] = useState([])

    // hàm call api lấy thông tin người dùng
    const fetchCustomer = async () => {
        try {
            const response = await axios.get(`${ip}/customer/${id}`);
            setUser(response.data); // Đặt thành response.data
        } catch (error) {
            console.log(error);
        }
    };

    // hàm call api lấy thông tin tourlist
    const fetchTourlist = async () => {
        try {
            const response = await axios.get(`${ip}/tourlist`);
            setTourlist(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCustomer();
        fetchTourlist()
    }, [isFocused]);

    // Lọc Categories theo ô tìm kiếm

    const [searchValue, setSearchValue] = useState('')
    const renderTourist = tourlist.filter((item) =>
        item.tourist_name.toLowerCase().includes(searchValue.toLowerCase())
    )
    ///////////////////////////

    const [acctivedPage, setAcctivedPage] = useState('home')
    const page_acction = (page_name) => {
        setAcctivedPage(page_name)
        scrollToPage(page_name)
    }

    // hàm scrollScreen
    const scrollToPage = (page_name) => {
        if (page_name === 'home') {
            scrollScreen.current.scrollTo({ x: screenWidth * 0, animated: false });
        } else if (page_name === 'booked') {
            scrollScreen.current.scrollTo({ x: screenWidth * 1, animated: false });
            call_api(page_name)
        } else if (page_name === 'liked') {
            scrollScreen.current.scrollTo({ x: screenWidth * 2, animated: false });
            call_api(page_name)
        } else if (page_name === 'setting') {
            scrollScreen.current.scrollTo({ x: screenWidth * 3, animated: false });
        }
    }


    const toggle_like = async (id) => {
        try {
            const response = await axios.put(`${ip}/tourlist/like/${id}`, {
                avatar: user.avatar,
                user_name: user.user_name
            });
            setTourlist(response.data)
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
    // hàm kiểm tra xem user đang sử dụng app có trong danh sách những user đã like của từng location hay không
    const checkUserInLikeList = (i) => {
        const exists = tourlist[i].like_user.some(item => item.user_name === user.user_name)
        return exists
    };

    const goToDetailScreen = (id) => {
        navigation.navigate('DetailScreen', { id: id, user_info: user })
    }

    const gotoCategoriesListScreen = (endpoint) => {
        navigation.navigate('CategoriesList', { type: endpoint, user: user })
    }

    const logout = () => {
        Alert.alert(
            "Thông báo",  // Tiêu đề
            "Are You Sure?",  // Nội dung
            [
                {
                    text: "Cancel",  // Nút Cancel
                    style: "cancel"  // Kiểu của nút Cancel
                },
                {
                    text: "OK",  // Nút OK
                    onPress: () => navigation.goBack()
                }
            ],
            { cancelable: true }  // Cho phép đóng Alert khi chạm ngoài
        );
    }

    const [api, setApi] = useState([
        {
            _id: 1,
            tourist_name: 'Bali',
            category_name: 'Bali',
            img: 'https://owa.bestprice.vn/images/tours/uploads/kham-pha-ve-dep-tiem-an-bali-5n4d-khoi-hanh-tu-ha-noi-66b09db7b97cb.jpg',
            location: 'Indonesia'
        },
        {
            _id: 2,
            tourist_name: 'BangKok',
            category_name: 'BangKok',
            img: 'https://www.chudu24.com/wp-content/uploads/2024/04/indian-dinner-cruise-bangkok-l.jpg',
            location: 'Thailand'
        },
        {
            _id: 3,
            tourist_name: 'Nha Trang',
            category_name: 'Nha Trang',
            img: 'https://och.vn/cms/wp-content/uploads/2021/03/12.jpg',
            location: 'Viet Nam'
        },
    ])

    const [bookedApi, setBookedApi] = useState([])

    const callapi_get_liked = async () => {
        try {
            const response = await axios.get(`${ip}/liked/${user.user_name}`)
            setApi(response.data)
        } catch (error) {
            // Kiểm tra xem lỗi có từ server không
            if (error.response) {
                // Server đã phản hồi với mã trạng thái khác 2xx
                console.error('Error response data:', error.response.data);
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.error('Error request:', error.request);
            } else {
                // Lỗi khác
                console.error('Error message:', error.message);
            }
        }
    }

    const callapi_get_booked = async () => {
        try {
            const response = await axios.get(`${ip}/booked/${user.user_name}`)
            setBookedApi(response.data)
        } catch (error) {
            // Kiểm tra xem lỗi có từ server không
            if (error.response) {
                // Server đã phản hồi với mã trạng thái khác 2xx
                console.error('Error response data:', error.response.data);
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.error('Error request:', error.request);
            } else {
                // Lỗi khác
                console.error('Error message:', error.message);
            }
        }
    }

    const call_api = (page_name) => {
        if (page_name === 'liked') {
            callapi_get_liked()
        } else if (page_name === 'booked') {
            callapi_get_booked()
        }
    }

    const [filterName, setFilterName] = useState('')
    const filterBooked = bookedApi.filter((item) =>
        item.type === 'tourlist' ? item.tourist_name.toLowerCase().includes(filterName.toLowerCase()) : item.category_name.toLowerCase().includes(filterName.toLowerCase())
    )

    // lấy các bàn đã được booked
    const [bookedArray, setBookedArray] = useState([])


    const getTableBooked = (tableArray) => {
        setBookedArray([])
        tableArray.forEach((table, index) => {
            table.book_user.forEach((item, i) => {
                if (item.user_name === user.user_name) {
                    setBookedArray(prev => [...prev, table.tableName]);
                }
            })
        })
    }


    const getRoomBooked = (roomArray) => {
        setBookedArray([])
        roomArray.forEach((room, index) => {
            room.book_user.forEach((item, i) => {
                if (item.user_name === user.user_name) {
                    setBookedArray(prev => [...prev, room.name_room]);
                }
            })
        })
    }


    // đi đến trang modal booked
    const [isFirstRender, setIsFirstRender] = useState(true);

    const goToModal = () => {
        navigation.navigate('ModalBookedScreen', { booked_array: bookedArray });
    };

    useEffect(() => {
        if (!isFirstRender && bookedArray.length > 0) {
            goToModal();
        } else {
            setIsFirstRender(false);  // Sau lần render đầu tiên, flag được set thành false
        }
    }, [bookedArray]);

    return (
        <View>
            <ScrollView
                horizontal
                style={styles.big_container}
                pagingEnabled
                ref={scrollScreen}
                scrollEnabled={false}
            >
                {/* HOME SCREEN */}
                <View style={styles.container}>
                    {/* info */}
                    <View style={styles.info_conteiner}>
                        <Text style={styles.name}>Hi, {user.user_name}</Text>
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
                            <TouchableOpacity
                                onPress={() => {
                                    const endpoint = user._id
                                    navigation.navigate('UserInfoScreen', { _id: endpoint })
                                }}
                            >
                                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* input */}
                    <View style={styles.input_container}>
                        <TextInput
                            style={styles.input}
                            placeholder='Search for place...'
                            placeholderTextColor="#B0B0B0"
                            onChangeText={(value) => setSearchValue(value)}
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
                        </View>
                        <View style={styles.categories_row}>
                            <TouchableOpacity
                                style={styles.categories_button}
                                onPress={() => gotoCategoriesListScreen('restaurants')}
                            >
                                <View style={styles.icon_container}>
                                    <FontAwesome name="cutlery" size={24} color="white" />
                                </View>
                                <Text style={styles.categories_text}>Restaurants</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.categories_button}
                                onPress={() => gotoCategoriesListScreen('hotels')}
                            >
                                <View style={styles.icon_container}>
                                    <FontAwesome name="building" size={24} color="white" />
                                </View>
                                <Text style={styles.categories_text}>Hotels</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.categories_button}
                                onPress={() => gotoCategoriesListScreen('coffees')}
                            >
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
                            contentContainerStyle={{ width: tourlist.length * (156 + 16), height: 233 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                renderTourist.map((item, index) => (
                                    <TouchableOpacity
                                        style={styles.location_item}
                                        key={index}
                                        onPress={() => goToDetailScreen(item._id)}
                                    >
                                        <Image
                                            style={styles.location_image}
                                            source={{ uri: item.img }}
                                        />
                                        <View style={styles.hot_container}>
                                            <Text style={styles.hot_text}>HOT</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.tym_container}
                                            onPress={() => toggle_like(item._id)}
                                        >
                                            <FontAwesome name="heart" size={18} color={
                                                checkUserInLikeList(index) === true ? 'blue' : 'white'
                                            } />
                                        </TouchableOpacity>
                                        <Text style={styles.tourist_name}>{item.tourist_name}</Text>

                                        <View style={styles.users_row}>
                                            {
                                                item.like_user.map((user, i) => (
                                                    <Image
                                                        style={styles.small_avatar}
                                                        source={{ uri: user.avatar }}
                                                        key={i}
                                                    />
                                                ))
                                            }
                                        </View>

                                        <Text
                                            style={styles.distance}
                                            numberOfLines={1}
                                        >
                                            {item.distance}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>

                {/* Booked Screen */}
                <View style={[styles.container, { backgroundColor: '#1B6CD8' }]}>
                    {/* lớp dưới */}
                    <View style={styles.booked_page_up_container}>
                        <Text style={[styles.booked_page_title, { marginTop: 50 }]}>
                            Select Name
                        </Text>
                        <TextInput
                            style={styles.booked_page_input}
                            placeholder='Enter name'
                            placeholderTextColor='#6AAEFF'
                            onChangeText={(value) => setFilterName(value)}
                        />
                        <FontAwesome name="search" size={14} color="#6AAEFF" style={styles.select_type_icon} />

                        <Text style={[styles.booked_page_title]}>
                            Select Date
                        </Text>
                        <TextInput
                            style={[styles.booked_page_input, { alignSelf: 'flex-end' }]}
                            placeholder='01.01.2023'
                            placeholderTextColor='#6AAEFF'
                        />
                        <FontAwesome name="calendar" size={14} color="#6AAEFF" style={styles.select_type_icon2} />
                    </View>

                    {/* lớp trên */}
                    <View style={styles.booked_page_down_container}>
                        <Text style={styles.booked_list_title}>
                            Booked List
                        </Text>

                        <ScrollView style={[styles.liked_page_list, { marginBottom: 170 }]}>
                            {
                                filterBooked.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.liked_page_button}
                                        onPress={() => {
                                            if (item.type === 'restaurant' || item.type === 'coffee') {
                                                getTableBooked(item.tables)
                                            } else if (item.type === 'hotel') {
                                                getRoomBooked(item.rooms)
                                            }
                                        }}
                                    >
                                        <View>
                                            <Image
                                                source={{ uri: item.img }}
                                                style={styles.liked_page_image}
                                            />
                                            <View style={styles.liked_page_star_row}>
                                                <FontAwesome name="star" size={14} color="blue" />
                                                <FontAwesome name="star" size={14} color="blue" />
                                                <FontAwesome name="star" size={14} color="blue" />
                                                <FontAwesome name="star" size={14} color="blue" />
                                                <FontAwesome name="star" size={14} color="blue" />
                                            </View>
                                        </View>

                                        <View style={styles.liked_page_right_column}>
                                            <Text style={styles.name_place}>{item.type === 'tourlist' ? item.tourist_name : item.category_name}</Text>
                                            <View style={styles.liked_page_location_row}>
                                                <FontAwesome name="map-marker" size={17} color="#B0B0B0" />
                                                <Text style={styles.liked_page_country}>{item.location}</Text>
                                            </View>
                                            <FontAwesome name="check" size={22} color="green" style={styles.liked_page_arrow} />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>

                {/* Liked Screen */}
                <View style={styles.container}>
                    <Text style={styles.title_liked_page}>
                        My Favorites
                    </Text>
                    <Text style={styles.content_liked_page}>
                        properties that i love
                    </Text>
                    <ScrollView style={styles.liked_page_list}>
                        {
                            api.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.liked_page_button}
                                    onPress={() => goToDetailScreen(item._id)}
                                >
                                    <View>
                                        <Image
                                            source={{ uri: item.img }}
                                            style={styles.liked_page_image}
                                        />
                                        <View style={styles.liked_page_star_row}>
                                            <FontAwesome name="star" size={14} color="blue" />
                                            <FontAwesome name="star" size={14} color="blue" />
                                            <FontAwesome name="star" size={14} color="blue" />
                                            <FontAwesome name="star" size={14} color="blue" />
                                            <FontAwesome name="star" size={14} color="blue" />
                                        </View>
                                    </View>

                                    <View style={styles.liked_page_right_column}>
                                        <Text style={styles.name_place}>{item.tourist_name}</Text>
                                        <View style={styles.liked_page_location_row}>
                                            <FontAwesome name="map-marker" size={17} color="#B0B0B0" />
                                            <Text style={styles.liked_page_country}>{item.location}</Text>
                                        </View>
                                        <FontAwesome name="arrow-right" size={22} color="blue" style={styles.liked_page_arrow} />
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>

                {/* Setting Screen */}
                <View style={styles.container}>
                    <Image style={styles.avatar_setting} source={{ uri: user.avatar }} />
                    <Text style={styles.name_setting}>{user.user_name}</Text>
                    <TouchableOpacity
                        style={styles.setting_logout_button}
                        onPress={logout}
                    >
                        <Text style={styles.logout_button_text}>
                            Log out
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* menu bottom */}
            <View style={styles.menu_bottom_container}>
                <TouchableOpacity
                    onPress={() => {
                        page_acction('home')
                    }}
                >
                    <FontAwesome name="home" size={24} color={acctivedPage === 'home' ? 'white' : '#555555'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        page_acction('booked')
                    }}
                >
                    <FontAwesome name="calendar" size={24} color={acctivedPage === 'booked' ? 'white' : '#555555'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.search}>
                        <FontAwesome name="search" size={24} color="#555555" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        page_acction('liked')
                    }}
                >
                    <FontAwesome name="heart" size={24} color={acctivedPage === 'liked' ? 'white' : '#555555'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        page_acction('setting')
                    }}
                >
                    <FontAwesome name="gear" size={24} color={acctivedPage === 'setting' ? 'white' : '#555555'} />
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    big_container: {
        height: screenWidth * 4,

    },
    container: {
        backgroundColor: '#F2F2F7',
        width: screenWidth,
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
    tourist_name: {
        fontSize: 16,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 8
    },
    distance: {
        fontSize: 10,
        color: '#B0B0B0',
        position: 'absolute',
        bottom: 10,
        right: 12,
        width: '85%'
    },
    users_row: {
        flexDirection: 'row',
        position: 'absolute',
        left: 16,
        bottom: 24,
        paddingLeft: 10,
        maxWidth: 100,
        overflow: 'hidden'
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
    plus_text: {
        color: 'white',
        fontSize: 6
    },
    menu_bottom_container: {
        width: screenWidth - 2,
        height: 96,
        borderRadius: 32,
        position: 'absolute',
        top: 668,
        backgroundColor: '#111111',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    search: {
        width: 56,
        height: 56,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28
    },
    avatar_setting: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 63,
        alignSelf: 'center'
    },
    name_setting: {
        fontSize: 32,
        alignSelf: 'center',
        marginTop: 24,
        fontFamily: 'OpenSans-Semibold',
    },
    setting_logout_button: {
        width: 313,
        height: 55,
        borderRadius: 16,
        backgroundColor: '#96D8D0',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300
    },
    logout_button_text: {
        color: 'red',
        fontSize: 20
    },
    title_liked_page: {
        fontSize: 30,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 50,
        marginLeft: 30
    },
    content_liked_page: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        color: '#B0B0B0',
        marginTop: 20,
        marginLeft: 30
    },
    liked_page_list: {
        marginHorizontal: 30,
    },
    liked_page_button: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        elevation: 4,

        borderRadius: 8,
        width: '100%',
        height: 100,
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    liked_page_image: {
        width: 70,
        height: 70,
        borderRadius: 4,
        marginTop: 5,
        marginLeft: 13
    },
    liked_page_star_row: {
        flexDirection: 'row',
        marginLeft: 13,
        marginTop: 6
    },
    liked_page_right_column: {
        marginLeft: 27,
        flex: 1
    },
    name_place: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 10
    },
    liked_page_location_row: {
        flexDirection: 'row',
        marginTop: 18,
    },
    liked_page_country: {
        fontSize: 16,
        fontFamily: 'OpenSans-Semibold',
        marginLeft: 16,
        color: '#B0B0B0'
    },
    liked_page_arrow: {
        position: 'absolute',
        top: 50,
        right: 22
    },
    booked_page_up_container: {
        flex: 1,
        marginHorizontal: 30
    },
    booked_page_title: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 35,
        color: 'white'
    },
    booked_page_input: {
        width: 260,
        height: 53,
        backgroundColor: '#0C5ABE',
        borderRadius: 16,
        marginTop: 18,
        paddingLeft: 42,
        paddingRight: 22
    },
    select_type_icon: {
        position: 'absolute',
        right: 100,
        top: 110
    },
    select_type_icon2: {
        position: 'absolute',
        right: 30,
        top: 245
    },
    booked_page_down_container: {
        width: screenWidth,
        backgroundColor: 'white',
        borderRadius: 32,
        position: 'absolute',
        top: 320,
        height: 511
    },
    booked_list_title: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        color: '#212B69',
        marginTop: 40,
        marginLeft: 30,
    },
})