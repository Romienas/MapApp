import React from 'react'
import { View, StyleSheet } from 'react-native'
import Map from '../components/map'
import CargoList from '../components/cargoList'
import { connect } from 'react-redux'

function Home({ navigation }) {
    return(
        <View style={styles.container}>
            <Map />
            <CargoList navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})

export default connect()(Home)