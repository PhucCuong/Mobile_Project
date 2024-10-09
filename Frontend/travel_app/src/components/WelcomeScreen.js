import { Text, Image, View, ScrollView, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native'

const { width } = Dimensions.get('window');

export default WelcomeScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={{ uri: 'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                resizeMode='cover'
                style={styles.background}
            />
            <View style={styles.overlay}></View>
            <View style={styles.modal}>
                <Text style={styles.title_text}>Discover best places any where in the world</Text>
                <Text style={styles.discription_text}>Also the leap into electronic typesetting, remaining assentially unchanged</Text>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.button_text}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    // Lớp phủ mờ với màu đen và độ mờ
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
    modal: {
        width: width - 100,
        backgroundColor: 'white',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        height: 343,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Button: {
        width: 279,
        height: 48,
        backgroundColor: '#111111',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 42
    },
    button_text: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'OpenSans-Semibold'
    },
    title_text: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 32,
        lineHeight: 40,
        width: 284,
        height: 120,
    },
    discription_text: {
        fontSize: 14,
        lineHeight: 20,
        width: 277,
        height: 40,
        marginTop: 17,
        color: '#B0B0B0'
    }
});