import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { Provider, connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import * as Font from 'expo-font'
import { StatusBar } from 'react-native'
import { AppLoading } from 'expo'
import Login from './routes/login'
import Home from './routes/home'
import Details from './routes/details'
import store from './redux/store'
import { fetchData } from './redux/actions/fetchData'

const Stack = createStackNavigator()

function Main() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [userLogin, setUserLogin] = useState(false)

  useEffect(() => {
    async function getData(){
      try {
        await Font.loadAsync({
          'montserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
        })

        await axios({
          method: 'GET',
          url: 'https://v2-api.sheety.co/68293db1d365e904bd3fd18233a5b8b7/navigationRoutes/routes'
        })
        .then(res => {
          store.dispatch(fetchData(res))
        })
        .catch(err => console.log('Axios', err))

        userState()

        setDataLoaded(true)

      } catch (err) {
        console.log(err)
      }
    }
    getData()
    store.subscribe(() => {
      userState()
    })
  },[userLogin])


  const userState = () => {
    let email = store.getState().userDetailsReducer.userDetails.email
    let pass = store.getState().userDetailsReducer.userDetails.pass
    
    if(email && pass){
        setUserLogin(true)
    } else {
      setUserLogin(false)
    }
  }

  if(!dataLoaded){
    return (
      <AppLoading />
    )
  }

  return (
      <Provider store={store}>
        <StatusBar barStyle='dark-content' />
        <NavigationContainer>
              {userLogin === false ?
              <Stack.Navigator>
                <Stack.Screen name='Prisijungti' component={Login} options={{headerShown: false}} /> 
              </Stack.Navigator>: 
              <Stack.Navigator>
                <Stack.Screen name='Žemėlapis' component={Home} options={{headerShown: false}} />
                <Stack.Screen name='Pradinis miestas' component={Details} />
              </Stack.Navigator>
              }
      </NavigationContainer>
    </Provider>
  )
}

const mapStateToProps = (state) => {
    return {
        userDetails: state
    }
}

export default connect(mapStateToProps)(Main)