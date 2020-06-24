import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { Provider, connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import Login from './routes/login'
import Home from './routes/home'
import store from './redux/store'
import { fetchData } from './redux/actions/fetchData'

const Stack = createStackNavigator()

function Main(props) {
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

        if(props.userDetails.userDetailsReducer.userDetails.email 
          && props.userDetails.userDetailsReducer.userDetails.pass){
          setUserLogin(true)
        }

        setDataLoaded(true)

      } catch (err) {
        console.log(err)
      }
    }
    getData()
    console.log(store.getState().userDetailsReducer.userDetails)
    console.log('props', props.userDetails.userDetailsReducer.userDetails)

    if(props.userDetails.userDetailsReducer.userDetails.email 
        && props.userDetails.userDetailsReducer.userDetails.pass){
        setUserLogin(true)
    }


  },[])


  if(!dataLoaded){
    return (
      <AppLoading />
    )
  }

  return (
    <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
              {userLogin === false && <Stack.Screen name='Prisijungti' component={Login} />}
              <Stack.Screen name='namai' component={Home} />
          </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => {
    return {
        userDetails: state
    }
}

export default connect(mapStateToProps)(Main)