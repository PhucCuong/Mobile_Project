import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';


const screenWidth = Dimensions.get('window').width;

export default DashboardScreen = ({ navigation, route }) => {

    const [user, setUser] = useState({
        avatar: '',
        user_name: '',
        phone_number: '',
        location: '',
        gender: '',
    });

    const id = route.params.id

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://192.168.1.17:3000/customer/${id}`);
                setUser(response.data); // Đặt thành response.data
            } catch (error) {
                console.log(error);
            }
        };

        fetchCustomer();
    }, []);

    // Gửi get lên sever để lấy thông tin các địa điểm để render ra giao diện
    let tourist_list = [
        {
            id: 1,
            img: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=600',
            tourist_name: 'Nungwi ',
            location: 'Tanzania',
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
            discription: 'Bãi biển Nungwi ở phía bắc quần đảo Zanzibar giờ đã trở thành điểm du lịch nghỉ mát nổi tiếng của Tanzania. Màu xanh ngọc bích của biển cả xen lẫn ráng vàng của hoàng hôn hẳn là khung cảnh lãng mạn nhất mà bạn muốn ngắm nhìn mỗi dịp đến đây.',
            price: '560$/Day',
            benerfics: ['sightseeing', 'buffeet', 'hotel'],
        },
        {
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
        },
        {
            id: 3,
            img: 'https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            tourist_name: 'Railay',
            location: 'Thái Lan',
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
            discription: 'Đây là một trong những bãi biển đẹp rất được ưa thích cho du khách du lịch Thái Lan lặn biển vì nước rất trong, nhìn đến tận đáy. Tầng tầng lớp lớp san hô mọc dưới đáy biển, cá lội tung tăng, có cả hải quỳ và sên biển màu tím.',
            price: '100/Day',
            benerfics: ['sightseeing', 'buffeet', 'hotel'],
        },
        {
            id: 4,
            img: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            tourist_name: 'Whitehaven',
            location: 'Úc',
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
            distance: '21,2 km',
            discription: 'Whitehaven hẻo lánh tại công viên quốc gia đảo Whitsunday có đường bờ biển tuyệt đẹp, không người sinh sống là bãi biển đẹp nhất xứ sở chuột túi. Whitehaven sở hữu làn nước trong xanh như ngọc và bãi cát trắng nhất trên thế giới.',
            price: '400/Day',
            benerfics: ['sightseeing', 'buffeet', 'hotel'],
        },
    ]

    // Lọc Categories theo ô tìm kiếm

    const [searchValue, setSearchValue] = useState('')
    const renderTourist = tourist_list.filter((item) =>
        item.tourist_name.toLowerCase().includes(searchValue.toLowerCase())
    )
    ///////////////////////////

    const [acctivedPage, setAcctivedPage] = useState('home')
    const page_acction = (page_name) => {
        setAcctivedPage(page_name)
    }

    const toggle_like = (id) => {
        // Tìm vị trí của item trong tourist_list dựa trên id
        const locationIndex = tourist_list.findIndex(location => location.id === id);

        if (locationIndex !== -1) {
            // Kiểm tra xem user đã có trong mảng like_user hay chưa
            const userIndex = tourist_list[locationIndex].like_user.findIndex(likeUser =>
                likeUser.user_name === user.user_name
            );

            if (userIndex === -1) {
                // Nếu user không tồn tại trong mảng like_user, thêm user vào
                tourist_list[locationIndex].like_user.push({
                    avatar: user.avatar,
                    user_name: user.user_name
                });
                console.log('User added to like list');
            } else {
                // Nếu user đã tồn tại trong mảng like_user, xóa user khỏi mảng
                tourist_list[locationIndex].like_user.splice(userIndex, 1);
                console.log('User removed from like list');
            }

            /////////////////////////////////////////////////////////////////////////
            //  GỬI PUT LÊN SERVER ĐỂ THÊM HOẶC XOÁ USER LIKE RỒI GET VỀ LẠI ĐỂ TONGGLE TYM


        } else {
            console.log('Location not found');
        }

        // Kiểm tra lại mảng tourist_list sau khi cập nhật
        console.log(tourist_list[locationIndex]);
    }

    // hàm kiểm tra xem user đang sử dụng app có trong danh sách những user đã like của từng location hay không
    const checkUserInLikeList = (id, user) => {
        // Kiểm tra xem index có hợp lệ không
        if (index < 0 || index >= tourist_list.length) {
            return false; // Nếu index không hợp lệ, trả về false
        }

        // tìm index
        let index = tourist_list.findIndex(item => item.id === id)

        // Sử dụng some() để kiểm tra xem user có tồn tại trong like_user không
        return tourist_list[index].like_user.some(likeUser =>
            likeUser.user_name === user.user_name
        );
    };

    const goToDetailScreen = (id) => {
        navigation.navigate('DetailScreen', { id: id })
    }

    const gotoCategoriesListScreen = (endpoint) => {
        navigation.navigate('CategoriesList', { category: endpoint })
    }

    return (
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
                            navigation.navigate('UserInfoScreen', { _id: user.id })
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
                    <TouchableOpacity>
                        <Text style={styles.viewall_text}>View all</Text>
                    </TouchableOpacity>
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
                        onPress={() => gotoCategoriesListScreen('beaches')}
                    >
                        <View style={styles.icon_container}>
                            <FontAwesome name="bath" size={24} color="white" />
                        </View>
                        <Text style={styles.categories_text}>Beaches</Text>
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
                    contentContainerStyle={{ width: tourist_list.length * (156 + 16), height: 233 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        renderTourist.map((item, index) => (
                            <TouchableOpacity
                                style={styles.location_item}
                                key={index}
                                onPress={() => goToDetailScreen(item.id)}
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
                                    onPress={() => toggle_like(item.id)}
                                >
                                    <FontAwesome name="heart" size={18} color={
                                        checkUserInLikeList(item.id, user) === true ? 'blue' : 'white'
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

            {/* menu bottom */}
            <View style={styles.menu_bottom_container}>
                <TouchableOpacity
                    onPress={() => page_acction('home')}
                >
                    <FontAwesome name="home" size={24} color={acctivedPage === 'home' ? 'white' : '#555555'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => page_acction('calendar')}
                >
                    <FontAwesome name="calendar" size={24} color={acctivedPage === 'calendar' ? 'white' : '#555555'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.search}>
                        <FontAwesome name="search" size={24} color="#555555" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => page_acction('like')}
                >
                    <FontAwesome name="heart" size={24} color={acctivedPage === 'like' ? 'white' : '#555555'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => page_acction('setting')}
                >
                    <FontAwesome name="gear" size={24} color={acctivedPage === 'setting' ? 'white' : '#555555'} />
                </TouchableOpacity>
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
    tourist_name: {
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
        bottom: 1,
        backgroundColor: '#111111',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    search: {
        width: 56,
        height: 56,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28
    }
})