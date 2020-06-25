import React, {useEffect, useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Linking } from 'react-native';
import store from '../redux/store'
import { AppLoading } from 'expo'
import MapViewDirections from 'react-native-maps-directions'
import { showList } from '../redux/actions/showList'
import { connect } from 'react-redux'

function Map({ dispatch }) {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [originCoordinates, setOriginCoordinates] = useState({})
    const [destinationCoordinates, setDestinationCoordinates] = useState({})

    useEffect(() => {
        async function dataSet(){
            try {
                let data = store.getState().fetchDataReducer.fetchData.data.routes
                await setData(data)
                
                await getDirection(
                    data[0].startLat, 
                    data[0].startLng,
                    data[0].endLat,
                    data[0].endLng
                    )

                setLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        dataSet()
    }, [])

    const getDirection = (startLat, startLng, endLat, endLng) => {
        setOriginCoordinates({latitude: startLat, longitude: startLng})
        setDestinationCoordinates({latitude: endLat, longitude:endLng})
    }

    const openMap = (coordinates) => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`)
    }

    const hideList = () => {
        dispatch(showList(false))
    }

    if(!loaded){
        return (
          <AppLoading />
        )
      }

    return(
        <View style={styles.container}>
            <MapView 
                style={styles.mapStyle}
                initialRegion={{
                    longitude: data[0].startLng,
                    latitude: data[0].startLat,
                    latitudeDelta: 12,
                    longitudeDelta: 12
                }}
                onPress={() => hideList()}
            >
                {data.map(marker => {
                    return (<Marker
                        key={marker.id}
                        coordinate={{
                            longitude: marker.startLng, 
                            latitude: marker.startLat
                        }}
                        image={require('../assets/placeholder-active.png')}
                    />)}
                )}
                {data.map(marker => {
                    return (<Marker
                        onPress={() => getDirection(
                            marker.startLat,
                            marker.startLng,
                            marker.endLat,
                            marker.endLng
                            )}
                        key={marker.id}
                        coordinate={{
                            longitude: marker.endLng, 
                            latitude: marker.endLat
                        }}
                        image={require('../assets/placeholder.png')}
                        style={styles.marker}
                    />)}
                )}
                <MapViewDirections 
                    apikey='AIzaSyCrVhOeb6Vsf2jB0_2eVn_RMxaCg5DVp9A'
                    origin={originCoordinates}
                    destination={destinationCoordinates}
                    mode='DRIVING'
                    strokeColor='#2200FF'
                    strokeWidth={2}
                    onPress={() => openMap(originCoordinates)}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
  });

  const mapStateToProps = (state) => {
    return {
        showList: state
    }
}

export default connect(mapStateToProps)(Map)