import { Text, View, ScrollView, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';  //import chuyển màu linear
const { width } = Dimensions.get('window');

export default LoginFail = ({ navigation }) => {
    const backLogin = () => {
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
                <Text style={styles.title}>Login</Text>
                <Text style={styles.description}>Explore next destination</Text>
                <View style={{ marginTop: 23 }}>
                    <TextInput
                        style={[styles.input]}
                        placeholder='Username'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.button_text}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.button_text}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.overlay2}>
                <View style={styles.fail_modal}>
                    <Text style={styles.fail_modal_title}>Login Failed</Text>
                    <Text style={styles.fail_modal_description}>Username or Password is incorrect</Text>
                    <TouchableOpacity
                        style={styles.button_modal_fail}
                        onPress={backLogin}
                    >
                        <Text style={styles.fail_modal_text}>Back</Text>
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
    overlay2: {
        backgroundColor: 'linear-gradient(179.87deg, rgba(0, 0, 0, 0.6) 0.11%, rgba(153, 153, 153, 0.6) 99.89%)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
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
        fontSize: 32,
        alignSelf: 'center',
        marginTop: 250,
        width: 86,
        height: 39,
        color: '#FFFFFF',
        lineHeight: 39,
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
    },
    fail_modal: {
        position: 'absolute',
        width: 350,
        height: 250,
        backgroundColor: '#111111',
        borderRadius: 12,
        top: 316,
        left: 13
    },
    fail_modal_title: {
        fontSize: 20,
        lineHeight: 24,
        color: '#FFFFFF',
        width: 117,
        height: 24,
        alignSelf: 'center',
        marginTop: 40
    },
    fail_modal_description: {
        marginTop: 30,
        fontSize: 16,
        textAlign: 'center',
        color: '#B0B0B0'
    },
    button_modal_fail: {
        width: 222,
        height: 48,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fail_modal_text: {
        fontSize: 16,
        lineHeight: 19,
        color: '#FFFFFF',
        fontWeight: 600,

    }
})