import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Alert,Image,TouchableNativeFeedback, TouchableWithoutFeedback, SafeAreaView,Platform,Dimensions} from 'react-native';
import { useDimensions,useDeviceOrientation } from '@react-native-community/hooks';
import React, { Component } from 'react';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer,applyMiddleware(thunk))




const firebaseConfig = {
  apiKey: "AIzaSyAh0ceutvKlT3jn_ejhFb78QE5Tb92nwIA",
  authDomain: "expiredatechecker.firebaseapp.com",
  projectId: "expiredatechecker",
  storageBucket: "expiredatechecker.appspot.com",
  messagingSenderId: "831936384956",
  appId: "1:831936384956:web:a2d6517149549b0e13e5b9",
  measurementId: "G-4YQXS55GCN"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig)
}


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded:false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
      
    })
  }

  render() {
    const{loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style={{ flex:1, justifyContent:'center' }}> 
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }

    
    return(

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown:false}}/>
            <Stack.Screen name="Add" component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>   
      </Provider>
    )

    
  }
}

export default App



