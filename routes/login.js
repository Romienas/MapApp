import React, {useState} from 'react'
import {
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard
} from 'react-native'
import MainButton from '../components/button'
import {connect} from 'react-redux'
import {userDetails} from '../redux/actions/userDetails'

function Login({dispatch}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const getUserLogin = () => {
        const user = {email, pass}
        dispatch(userDetails(user))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
        >
            <View style={style.view}>
                <Text style={style.header}>Prisijungti</Text>
                <TextInput 
                    style={style.input}
                    placeholder='El. paštas'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    style={style.input}
                    placeholder='Slaptažodis'
                    autoCompleteType='password'
                    secureTextEntry={true}
                    onChangeText={(text) => setPass(text)}
                />
                <MainButton 
                    text='Prisijungti'
                    click={getUserLogin}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}


const style = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }, 
    header: {
        fontFamily: 'montserratBold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 40
    },
    input: {
        fontFamily: 'montserrat',
        borderBottomColor: '#b8b8b8',
        borderBottomWidth: 1,
        marginBottom: 30,
        width: 200
    }
})

const mapStateToProps = (state) => {
    return {
        userDetails: state
    }
}

export default connect(mapStateToProps)(Login)