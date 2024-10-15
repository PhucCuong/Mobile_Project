import { Text, View, ScrollView, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';  //import chuyển màu linear
const { width } = Dimensions.get('window');
import { useState, useEffect } from 'react';
import axios from 'axios';
import ip from '../../assets/ip/Ip.js'

const default_avatar = 'https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'

export default RegisterScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')

    const handleRegister = async () => {
        if (password !== retypePassword) {
            Alert.alert('mai mật khẩu phải giống nhau!')
            return
        }
        try {
            const response = await axios.post(`${ip}/register`, {
                avatar: default_avatar,
                user_name: userName,
                password: password,
                phone_number: '',
                location: '',
                gender: ''
            });

            console.log(response.data.message);
            Alert.alert(
                'Thông báo',
                response.data.message,
                [
                    {
                        text: 'Hủy',
                        onPress: () => console.log('Nhấn Hủy'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('LoginScreen')
                        },
                    },
                ],
                { cancelable: false } // Không cho phép tắt Alert bằng cách nhấn bên ngoài
            );
        } catch (error) {
            if (error.response) {
                // Nếu có phản hồi từ server (mã trạng thái không phải 2xx)
                if (error.response.status === 400) {
                    console.error(error.response.data.message); // Tên người dùng đã tồn tại
                    Alert.alert(error.response.data.message)
                } else {
                    console.error('Đã xảy ra lỗi:', error.response.status); // Lỗi khác
                    Alert.alert(error.response.status)
                }
            } else if (error.request) {
                // Nếu không có phản hồi từ server
                console.error('Không nhận được phản hồi từ server:', error.request);
            } else {
                // Lỗi khi thiết lập yêu cầu
                console.error('Lỗi:', error.message);
            }
        }
    }

    const enterLogin = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDYyfHx0cmF2ZWx8ZW58MHx8fHwxNzI4Mzc0MzA2fDA&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450' }}
                resizeMode='cover'
                style={styles.background}
            />
            <LinearGradient
                colors={['rgba(77, 63, 63, 0.2)', 'rgba(34, 242, 255, 0.7)']} // Chuyển đổi mã màu và độ trong suốt
                style={styles.overlay}
            />

            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.description}>Sign up to explore</Text>
                <View style={{ marginTop: 23 }}>
                    <TextInput
                        style={[styles.input]}
                        placeholder='Username'
                        placeholderTextColor="#B0B0B0"
                        onChangeText={(value) => setUserName(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor="#B0B0B0"
                        onChangeText={(value) => setPassword(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Retype Password'
                        placeholderTextColor="#B0B0B0"
                        onChangeText={(value) => setRetypePassword(value)}
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.button_text}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
    },
    title: {
        fontStyle: 'OpenSans-Semibold',
        minWidth: 130,
        fontSize: 32,
        alignSelf: 'center',
        marginTop: 250,
        width: 86,
        height: 39,
        color: '#FFFFFF'
    },
    description: {
        alignSelf: 'center',
        marginTop: 23,
        fontSize: 20,
        color: 'rgba(238, 238, 238, 0.933333)'
    },
    input: {
        width: width - 64,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 23,
        paddingHorizontal: 32,
        height: 48
    },
    button: {
        marginTop: 23,
        width: 222,
        height: 48,
        backgroundColor: '#007AFF',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    button_text: {
        fontSize: 16,
        fontFamily: 'OpenSans-Semibold',
        color: 'white'
    }
})