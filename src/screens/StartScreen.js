import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import {View,Text} from "react-native"
export default function StartScreen({ navigation }) {
  return (
    <Background>
      {/* <Logo /> */}
      <View 
      style={{ position:'absolute', paddingBottom:50}}>
        <Text 
        style={{fontSize: 35,
        color: "white",
        fontWeight: 'bold'}}
        >HelloDot
        </Text>
        </View>
      <View style={{marginTop:500,  width: '100%',
                     marginVertical: 10,
                     paddingVertical: 2,}}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      </View>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
