import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function MainButton(props) {

    const handleClick = () => {
        props.click()
    }
    
    return(
        <TouchableOpacity 
            style={style.button}
            onPress={handleClick}
        >
            <Text style={style.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor:'#00C069',
        borderRadius: 25
    },
    text: {
        textAlign: 'center',
        color: '#ffffff',
        padding: 10,
        fontFamily: 'montserratBold',
        textTransform: 'uppercase',
        fontSize: 10
    }
})