import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import firebase from "firebase/compat/app";
// Other libraries might need to also be prefixed with "compat":
import "firebase/compat/auth";

export class Login extends Component {

  constructor(props){
      super(props);

      this.state={
          email:'',
          password:'',
        
      }

      this.onSignUp=this.onSignUp.bind(this)
  }


  onSignUp(){
      const {email, password, name} = this.state;
      
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result)=>{
          console.log(result) 
      })
      .catch((error)=>{
          console.log(error)
      })
  }


  render() {
    return (
      <View>
          <TextInput
                placeholder="name"
                onChangeText={(name)=>this.setState({name})}
          />
          <TextInput
                placeholder="email"
                onChangeText={(email)=>this.setState({email})}
          />
          <TextInput
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password)=>this.setState({password})}
          />

          <Button 
            onPress={()=>this.onSignUp()}
            title="Sign in"

          />
      </View>
    )
  }
}

export default Login