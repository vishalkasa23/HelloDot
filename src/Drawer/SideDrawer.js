//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from "../screens/Dashboard"
import Chat from '../screens/ChatScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
// create a component
import CustomDrawer from "./Drawer"
import SearchScreen from '../screens/SearchScreen';
import TabHeader from '../screens/TabHeader';
const Drawer=createDrawerNavigator();
export default function SideDrawer () {
    return (
        <Drawer.Navigator
        screenOptions={{
            headerShown: true,
            headerTintColor:"white",
            // headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: "#128C7E",
              
            },
            drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
              }
            }}
            drawerContent={props => <CustomDrawer {...props}/>}
            >
            <Drawer.Screen component={TabHeader} name='Messages' 
            options={{
            drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} style={{marginLeft:-5}} />),
             headerShown: false,
             drawerItemStyle: { display: 'none'}}} 
             />
            <Drawer.Screen component={Chat} name='ChatBox'  
            options={{
            drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} style={{marginLeft:-5}} />),
             headerShown: false,
             drawerItemStyle: { display: 'none'}
            }} 

             />
             <Drawer.Screen component={SearchScreen} name='Search'  
            options={{
            drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} style={{marginLeft:-5}} />),
             headerShown: false,
             drawerItemStyle: { display: 'none'}
            }} 

             />


            </Drawer.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
// export default SideDrawer;
