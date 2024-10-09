import { Text, View, ScrollView, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';  //import chuyển màu linear
const { width } = Dimensions.get('window');

export default RegisterScreen = () => {
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
                <View style={{marginTop: 23}}>
                    <TextInput
                        style={[styles.input]}
                        placeholder='Username'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Retype Password'
                    />
                </View>
                <View style={{marginTop: 40}}>
                    <TouchableOpacity style={styles.button}>
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
        color: '#EEEEEE'
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
        backgroundColor: 'blue',
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