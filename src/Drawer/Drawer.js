//import liraries
import database from '@react-native-firebase/database';
import React, {useEffect,useState,useContext}from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, TouchableOpacity,Appearance,Switch,StyleSheet} from 'react-native';
import StartScreen from '../screens/StartScreen';
import {DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth'
// create a component
const CustomDrawer = props => {
    const user = auth().currentUser;
    const [photo,usephoto]=useState();
    const [Designation,useDesignation]=useState()
    function Logout({navigation}){
        auth().signOut()
        return(
          <StartScreen/>
        )
        }
    function getphoto(){
      const ref=database()
      .ref(`/${user.displayName}/User_Data/Photo`);
      ref.on('value', snapshot => {
        usephoto(snapshot.val());
      });
    }
    function getpost(){
      const ref=database()
      .ref(`/${user.displayName}/User_Data/Position`);
      ref.on('value', snapshot => {
        useDesignation(snapshot.val());
      });
    }
    useEffect(() => {
        getphoto();
        getpost();
        // console.log(user)
      }
      );
    return (
        <View style={{ flex: 1, backgroundColor: "white",marginTop:-5 }}>

      {/* <View style={{ flex: 1, backgroundColor: theme.backcolor,marginTop:-5 }}> */}
              {/* {console.log("theme",theme)} */}
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#1f2c34',
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{color:'white',fontWeight:'bold'}}>{user.displayName}</Text>
              {/* <Text style={{color:'white',fontWeight:'bold'}}>{user.email}</Text> */}
              {/* <Text style={{color:'white',fontWeight:'bold'}}>What's Up</Text> */}
            </View>
            <TouchableOpacity>
            <Image source={{ uri: photo}}  style={{ width: 50, height: 50, borderRadius: 30, margin:5 }} />
            </TouchableOpacity >
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: -1,
            backgroundColor: '#1f2c34',
            padding: 20,
          }}
        onPress={Logout}
        >
          <View style={{flexDirection:'row', alignItems:'center',}}>
            <Ionicons name="exit-outline" size={24} color='white' style={{marginLeft:-5}} />
            <Text style={{color:'white',fontWeight:'bold'}}> Log Out</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  })
export default CustomDrawer;
//make this component available to the app

