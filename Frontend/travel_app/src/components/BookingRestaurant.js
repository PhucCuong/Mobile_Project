import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView, Modal, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default BookingRestaurant = ({ navigation, route }) => {
    const id = route.params.id
    const user = route.params.user
    const price_table = route.params.price_table
    
    // hàm cắt lấy giá 
    function extractAmount(input) {
        const parts = input.split('/');
        return parts[0].trim();
    }
    
    const price = extractAmount(price_table)

    const [availableTables, setAvailableTables] = useState([])

    // lấy thông tin người dùng booking
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    // hàm call api
    const callApi = async () => {
        const response = await axios.get(`${ip}/booking/restaurant/${id}`)
        setAvailableTables(response.data)
    }

    useEffect(() => {
        callApi()
    }, [])

    // xử lí thanh phần trăm
    const widthMotion = useRef(new Animated.Value(90)).current

    const handleTopRow = (width) => {
        Animated.timing(widthMotion, {
            toValue: width,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    const scrollViewRef = useRef(null)
    const handleClickNextPage = (width) => {
        handleTopRow(width)
        if (width === 180) {
            scrollViewRef.current.scrollTo({ x: screenWidth * 1, animated: true });
        }
        else if (width === 270) {
            scrollViewRef.current.scrollTo({ x: screenWidth * 2, animated: true });
        }
    }

    const handleClickPrevPage = () => {
        const widthNumber = widthMotion.__getValue();
        if (widthNumber === 270) {
            handleTopRow(180)
            scrollViewRef.current.scrollTo({ x: screenWidth * 1, animated: true });
        } else if (widthNumber === 180) {
            handleTopRow(90)
            scrollViewRef.current.scrollTo({ x: screenWidth * 0, animated: true });
        } else if (widthNumber === 90) {
            navigation.goBack()
        }

    }

    const handleScrollX = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x
        const index = Math.floor(contentOffsetX / screenWidth);
        if (index === 0) handleTopRow(90)
        else if (index === 1) handleTopRow(180)
        else if (index === 2) handleTopRow(270)
    }

    const [indexTable, setIndexTable] = useState(null)
    const [tableSelectedId, setTableSelectedId] = useState(null)        // bàn đã chọn để đặt
    const handleClickTable = (index, table_id) => {
        setIndexTable(index)
        setTableSelectedId(table_id)
    }

    // xử lí chọn ngày
    const [date, setDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateText, setDateText] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (selectedDate) => {
        setDate(selectedDate);
        setDateText(selectedDate.toLocaleDateString());
        hideDatePicker();
    };

    // xử lí chọn giờ
    const [time, setTime] = useState(null);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [timeText, setTimeText] = useState('');

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (selectedTime) => {
        setTime(selectedTime);
        setTimeText(selectedTime.toLocaleTimeString());
        hideTimePicker();
    };

    return (
        <SafeAreaView
            style={styles.safe_area_view}
        >
            {/* màn hình đứng yên */}
            <View style={styles.first_row}>
                <TouchableOpacity
                    onPress={() => handleClickPrevPage()}
                >
                    <FontAwesome name="arrow-left" size={24} color="#252935" />
                </TouchableOpacity>
                <View style={styles.base_line}></View>
                <Animated.View style={[styles.up_line, { width: widthMotion }]}></Animated.View>
            </View>

            {/* màn hình scrollView */}
            <ScrollView
                style={styles.container}
                horizontal
                ref={scrollViewRef}
                pagingEnabled
                onScroll={handleScrollX}
            >
                {/* màn hình chọn đặt bàn */}
                <View
                    style={styles.choose_table_container}
                >
                    <Text style={styles.restaurant_name}>Restaurant name</Text>
                    <ScrollView>
                        <View
                            style={styles.table_row}
                        >
                            {
                                availableTables.map((item, index) => (
                                    <TouchableOpacity
                                        style={[styles.one_table, { backgroundColor: indexTable === index ? '#96D8D0' : '#EBEFF3' }]}
                                        onPress={() => handleClickTable(index, item._id)}
                                        key={index}
                                    >
                                        <FontAwesome name="cutlery" size={24} color="#252935" />
                                        <Text>{item.tableName}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleClickNextPage(180)}
                    >
                        <Text
                            style={styles.button_text}
                        >Reserved a Table</Text>
                    </TouchableOpacity>
                </View>

                {/* màn hình điền thông tin */}
                <View
                    style={styles.infomation_container}
                >
                    <Text style={styles.restaurant_name}>Infomation Detail</Text>

                    <Text
                        style={styles.label}
                    >
                        Full Name
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Your full name'
                        placeholderTextColor='#E1E3E7'
                        onChangeText={(value) => setFullName(value)}
                    />

                    <Text
                        style={styles.label}
                    >
                        Phone Number
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your phone number'
                        placeholderTextColor='#E1E3E7'
                        onChangeText={(value) => setPhoneNumber(value)}
                    />

                    <View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Day to come</Text>
                            <Text style={styles.label}>Time to come</Text>
                        </View>
                        <View style={styles.row}>
                            {/* ngày */}
                            <TextInput
                                value={dateText}
                                placeholder="Chọn ngày"
                                onFocus={showDatePicker} // Hiển thị DatePicker khi TextInput được focus
                                style={styles.small_input}
                                placeholderTextColor='#E1E3E7'
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirmDate}
                                onCancel={hideDatePicker}
                            />
                            <FontAwesome name="chevron-down" size={15} color="#E1E3E7" style={styles.down_icon_left} />


                            {/*  giờ */}
                            <TextInput
                                value={timeText}
                                placeholder="Chọn giờ"
                                onFocus={showTimePicker} // Mở TimePicker khi focus vào TextInput
                                style={styles.small_input}
                            />
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time" // Chế độ chọn giờ
                                onConfirm={handleConfirmTime}
                                onCancel={hideTimePicker}
                                placeholderTextColor='#E1E3E7'
                            />
                            <FontAwesome name="chevron-down" size={15} color="#E1E3E7" style={styles.down_icon_right} />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleClickNextPage(270)}
                    >
                        <Text
                            style={styles.button_text}
                        >Continue</Text>
                    </TouchableOpacity>
                </View>

                {/* màn hình thanh toán hoá đơn */}
                <View
                    style={styles.order_container}
                >
                    <Text style={styles.restaurant_name}>Order Summary</Text>

                    <View style={styles.order_row}>
                        <Text style={styles.order_label}>Name</Text>
                        <TextInput value={fullName} style={styles.order_value} />
                    </View>

                    <View style={styles.order_line}></View>

                    <View style={styles.order_row}>
                        <Text style={styles.order_label}>User Name</Text>
                        <TextInput value={user.user_name} style={styles.order_value} />
                    </View>

                    <View style={styles.order_line}></View>

                    <View style={styles.order_row}>
                        <Text style={styles.order_label}>Phone Number</Text>
                        <TextInput value={phoneNumber} style={styles.order_value} />
                    </View>

                    <View style={styles.order_line}></View>

                    <View style={styles.order_row}>
                        <Text style={styles.order_label}>Date</Text>
                        <TextInput value={dateText} style={styles.order_value} />
                    </View>

                    <View style={styles.order_line}></View>

                    <View style={styles.order_row}>
                        <Text style={styles.order_label}>Hour</Text>
                        <TextInput value={timeText} style={styles.order_value} />
                    </View>

                    <View style={styles.order_final_line}></View>

                    <View style={styles.order_row}>
                        <Text style={styles.total_text}>Grand Total</Text>
                        <TextInput value={price} style={styles.total_text} />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text
                            style={styles.button_text}
                        >Pay and Reserve</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe_area_view: {
        backgroundColor: '#252935'
    },
    base_line: {
        width: 270,
        height: 4,
        backgroundColor: '#D9D9D9',
        position: 'absolute',
        top: 40,
        left: 60
    },
    up_line: {
        // width: widthMotion,
        height: 4,
        backgroundColor: '#252935',
        position: 'absolute',
        top: 40,
        left: 60
    },
    first_row: {
        backgroundColor: '#FFFFFF',
        height: screenHeight * 0.1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingLeft: 16
    },
    container: {
        height: screenWidth * 3,
    },
    choose_table_container: {
        width: screenWidth,
        backgroundColor: '#FFFFFF',
    },
    restaurant_name: {
        fontSize: 24,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 24,
        marginLeft: 16
    },
    table_row: {
        maxWidth: screenWidth,
        flexWrap: 'wrap',
        paddingLeft: 15,
        flexDirection: 'row',
        paddingBottom: 20
    },
    one_table: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 15,
        marginHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infomation_container: {
        width: screenWidth,
        backgroundColor: 'white'
    },
    order_container: {
        width: screenWidth,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#252935',
        width: 276,
        height: 45,
        borderRadius: 32,
        alignSelf: 'center',
        position: 'absolute',
        top: 540,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'OpenSans-Semibold',
    },
    label: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        color: '#000000',
        marginTop: 32,
        marginLeft: 16
    },
    input: {
        width: 343,
        height: 54,
        marginTop: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E1E3E7',
        marginLeft: 16,
        paddingHorizontal: 32
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 32
    },
    small_input: {
        width: 144,
        height: 54,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E1E3E7',
        marginLeft: 16,
        marginTop: 16,
        paddingHorizontal: 16
    },
    down_icon_left: {
        position: 'absolute',
        top: 33,
        left: 130
    },
    down_icon_right: {
        position: 'absolute',
        top: 33,
        right: 10
    },
    order_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16
    },
    order_label: {
        fontSize: 16,
        color: '#666D80'
    },
    order_value: {
        fontSize: 16,
        color: '#111111'
    },
    order_line: {
        width: 360,
        height: 2,
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: 16
    },
    order_final_line: {
        width: 360,
        height: 2,
        backgroundColor: '#111111',
        alignSelf: 'center',
        marginTop: 100
    },
    total_text: {
        color: '#666D80',
        fontSize: 16,
        fontWeight: 'bold'
    }
})