import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default BookingRestaurant = ({ navigation, route }) => {
    // const id = route.params.id

    const tables = [
        {
            table_name: 'Table 1'
        },
        {
            table_name: 'Table 2'
        },
        {
            table_name: 'Table 3'
        },
        {
            table_name: 'Table 4'
        },
        {
            table_name: 'Table 5'
        },
        {
            table_name: 'Table 6'
        },
    ]

    const [indexTable, setIndexTable] = useState(null)
    const handleClickTable = (index) => {
        setIndexTable(index)
    }

    return (
        <SafeAreaView
            style={styles.safe_area_view}
        >
            {/* màn hình đứng yên */}
            <View style={styles.first_row}>
                <TouchableOpacity>
                    <FontAwesome name="arrow-left" size={24} color="#252935" />
                </TouchableOpacity>
                <View style={styles.base_line}></View>
                <View style={styles.up_line}></View>
            </View>

            {/* màn hình scrollView */}
            <ScrollView
                style={styles.container}
                horizontal
            >
                {/* màn hình chọn đặt bàn */}
                <View
                    style={styles.choose_table_container}
                >
                    <Text style={styles.restaurant_name}>Restaurant name</Text>
                    <View
                        style={styles.table_row}
                    >
                        {
                            tables.map((item, index) => (
                                <TouchableOpacity
                                    style={[styles.one_table, {backgroundColor: indexTable === index ? '#96D8D0' : '#EBEFF3'}]}
                                    onPress={() => handleClickTable(index)}
                                >
                                    <FontAwesome name="cutlery" size={24} color="#252935" />
                                    <Text>{item.table_name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

                {/* màn hình điền thông tin */}
                <View
                    style={styles.infomation_container}
                ></View>

                {/* màn hình thanh toán hoá đơn */}
                <View
                    style={styles.order_container}
                ></View>
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
        width: 90,
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
        backgroundColor: '#FFFFFF'
    },
    restaurant_name: {
        fontSize: 24,
        fontFamily: 'OpenSans-Semibold',
        marginTop: 24,
        marginLeft: 16
    },
    table_row: {
        width: screenWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: screenWidth,
        paddingLeft: 15
    },
    one_table: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 15,
        marginHorizontal: 10
    },


    infomation_container: {
        backgroundColor: 'blue',
        width: screenWidth,
    },
    order_container: {
        backgroundColor: 'green',
        width: screenWidth,
    }
})