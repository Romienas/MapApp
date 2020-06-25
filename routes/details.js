import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Details({ route }) {
    const { startName } = route.params
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{startName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'montserrat'
    }
})