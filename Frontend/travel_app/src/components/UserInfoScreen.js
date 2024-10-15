import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default UserInfoScreen = ({ navigation, route }) => {

    const userEndpoint = route.params._id

    // get api theo id user
    const user = {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVt9ionGvLO1eu6gr5FSxk79tbH92EYE8jQ&s',
        user_name: 'Cường',
        phone_number: '012345678',
        location: 'Viet Nam',
        gender: 'Male'
    }

    // xử lý logic sủa link avatar
    const [linkAvatar, setLinkAvatar] = useState(user.avatar)

    const editAvatarInput = useRef(null)
    const [isEditable, SetIsEditable] = useState(false)
    useEffect(() => {
        if (isEditable && editAvatarInput.current) {
            editAvatarInput.current.focus();
        }
    }, [isEditable])

    ////////////////////////////////

    // Xử lí logic khi sửa thông tin user
    const [isPhoneEditable, SetIsPhoneEditable] = useState(false)
    const [isLocationEditable, SetIsLocationEditable] = useState(false)
    const [isGenderEditable, SetIsGenderEditable] = useState(false)
    const editPhoneInput = useRef(null)
    const editLocationInput = useRef(null)
    const editGenderInput = useRef(null)

    useEffect(() => {
        if (isPhoneEditable && editPhoneInput.current) {
            editPhoneInput.current.focus();
        }
    }, [isPhoneEditable])
    useEffect(() => {
        if (isLocationEditable && editLocationInput.current) {
            editLocationInput.current.focus();
        }
    }, [isLocationEditable])
    useEffect(() => {
        if (isGenderEditable && editGenderInput.current) {
            editGenderInput.current.focus();
        }
    }, [isGenderEditable])
    /////////////////////////////////////////////////

    // hàm call api để sửa thông tin người dùng
    const editUserInfo = () => {

    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.bar}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.bar_title}>
                        User Info
                    </Text>
                </View>

                <View style={styles.avatar_row}>
                    <Text
                        style={styles.user_name}
                    >
                        {user.user_name}
                    </Text>
                    <Image
                        source={{ uri: user.avatar }}
                        style={styles.user_avatar}
                    />
                    <TextInput
                        onChange={(value) => {
                            setLinkAvatar(value)
                        }}
                        style={styles.avatar_input}
                        placeholder='Paste link image here'
                        placeholderTextColor='#B0B0B0'
                        editable={isEditable} // Disable TextInput
                        ref={editAvatarInput}
                    />
                    <TouchableOpacity
                        style={[styles.edit_button, styles.edit_avatar_button]}
                        onPress={() => {
                            SetIsEditable(true)
                        }}
                    >
                        <FontAwesome name="pencil" size={16} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.info_container}>
                    <TouchableOpacity
                        style={styles.pull_button}
                    >
                        <FontAwesome name="chevron-up" size={12} color="white" />
                    </TouchableOpacity>

                    <View style={styles.content_row}>
                        <View style={[styles.row_one]}>
                            <Text style={styles.title_content}>Phone number : </Text>
                            <TextInput
                                value={user.phone_number}
                                ref={editPhoneInput}
                                editable={isPhoneEditable}
                            />
                            <TouchableOpacity
                                style={[styles.edit_button, styles.content_edit_button]}
                                onPress={() => {
                                    SetIsPhoneEditable(true)
                                }}
                            >
                                <FontAwesome name="pencil" size={12} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row_one}>
                            <Text style={styles.title_content}>Location : </Text>
                            <TextInput
                                value={user.location}
                                ref={editLocationInput}
                                editable={isLocationEditable}
                            />
                            <TouchableOpacity
                                style={[styles.edit_button, styles.content_edit_button]}
                                onPress={() => {
                                    SetIsLocationEditable(true)
                                }}
                            >
                                <FontAwesome name="pencil" size={12} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row_one}>
                            <Text style={styles.title_content}>Gender : </Text>
                            <TextInput
                                value={user.gender}
                                ref={editGenderInput}
                                editable={isGenderEditable}
                            />
                            <TouchableOpacity
                                style={[styles.edit_button, styles.content_edit_button]}
                                onPress={() => {
                                    SetIsGenderEditable(true)
                                }}
                            >
                                <FontAwesome name="pencil" size={12} color="white" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.update_button}
                            onPress={() => editUserInfo()}
                        >
                            <Text
                                style={styles.update_button_text}
                            >
                                Update
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#F2F2F7',
    },
    bar: {
        width: '100%',
        height: 85,
        backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22
    },
    bar_title: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        color: 'white',
        marginLeft: 42
    },
    avatar_row: {
        marginTop: 100,
        marginHorizontal: 42,
        alignItems: 'center'
    },
    user_name: {
        fontSize: 20,
        fontFamily: 'OpenSans-Semibold',
        textAlign: 'center'
    },
    user_avatar: {
        width: 160,
        height: 160,
        borderRadius: '50%',
        marginTop: 4
    },
    avatar_input: {
        width: 291,
        height: 33,
        borderRadius: 8,
        paddingHorizontal: 30,
        marginTop: 16,
        backgroundColor: 'white'
    },
    edit_button: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    edit_avatar_button: {
        position: 'absolute',
        top: 131,
        right: 38,
    },
    info_container: {
        width: '100%',
        height: 444,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderWidth: 1,
        borderColor: '#111111',
        backgroundColor: 'white',
        marginTop: 32
    },
    pull_button: {
        backgroundColor: 'blue',
        position: 'absolute',
        left: 172,
        top: -15,
        width: 30,
        height: 30,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content_row: {
        marginTop: 34,
        paddingLeft: 42,
    },
    row_one: {
        marginTop: 23,
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth - 12 - 42,
        justifyContent: 'space-between',
    },
    content_edit_button: {
        marginLeft: 26
    },
    title_content: {
        marginRight: 40
    },
    update_button: {
        width: 194,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#111111',
        alignSelf: 'center',
        marginTop: 60
    },
    update_button_text: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'OpenSans-Semibold',
    }
})