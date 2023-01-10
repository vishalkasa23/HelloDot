import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import SideDrawer from './src/Drawer/SideDrawer';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Dashboard" component={SideDrawer} options={{headerShown: false}}/>
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
        </Provider>
  )
}
