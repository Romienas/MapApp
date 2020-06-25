import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text,
     FlatList, 
     StyleSheet, 
     Image,
     TouchableOpacity
    } from 'react-native'
import { connect } from 'react-redux'
import store from '../redux/store'
import Button from './button'
import { userDetails } from '../redux/actions/userDetails'

function CargoList({ dispatch, navigation }) {
    const [data, setData] = useState({})

    useEffect(() => {
        setData(store.getState().fetchDataReducer.fetchData.data.routes)
    },[])

    const logOut = () => {
        dispatch(userDetails({}))
    }


    function Item({
        navigate,
        startName,
        endName,
        dateStart,
        dateEnd,
        type,
        weight,
        size,
        price
        }) {
        return (
            <TouchableOpacity 
                onPress={() => navigate.navigate('Pradinis miestas', {
                    startName
                })}
            >
                <View style={styles.listItem}>
                    <View style={[styles.flexRow, styles.spaceBetween]}>
                        <View>
                            <View style={styles.flexRow}>
                                <Image 
                                    source={require('../assets/icon-blue.png')}
                                />
                                <Text style={styles.startName}>{startName}</Text>
                            </View>
                            <Text style={styles.date}>Data: {dateStart} - {dateEnd}</Text>
                        </View>
                        <View>
                            <Button 
                                text='praleisti' 
                                click={logOut}
                            />
                        </View>
                    </View>
                    <View style={styles.flexRow}>
                        <Image 
                            source={require('../assets/icon-green.png')} 
                        />
                        <Text style={styles.startName}>{endName}</Text>
                    </View>
                    <View style={[styles.flexRow, styles.spaceBetween]}>
                        <Text style={styles.info}>{type} &#8231; {weight}t &#8231; {size}m3 &#8231; T</Text>
                        <Text style={styles.price}>&#8364; {price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Pasirinkite krovinį</Text>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Item 
                        startName={item.startName} 
                        endName={item.endName}
                        dateStart={item.dateStart}
                        dateEnd={item.dateEnd}
                        type={item.type}
                        weight={item.weight}
                        size={item.size}
                        price={item.price}
                        navigate={navigation}
                    />)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1.5,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    header: {
        fontFamily: 'montserratBold',
        fontSize: 20,
        textAlign: 'center',
        padding: 20,
        paddingBottom: 5
    },
    listItem: {
        padding: 20,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    startName: {
        fontFamily: 'montserratBold'
    },
    date: {
        fontFamily: 'montserrat',
        color: '#999999',
        paddingLeft: 35,
        marginTop: -5
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    info: {
        fontFamily: 'montserrat',
        color: '#999999',
        paddingLeft: 10
    },
    price: {
        fontFamily: 'montserratBold',
        color: '#2200FF',
        fontSize: 16
    }
})

const mapStateToProps = (state) => {
    return {
        userDetails: state
    }
}

export default connect(mapStateToProps)(CargoList)