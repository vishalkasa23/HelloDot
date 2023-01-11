import React,{useEffect, useState} from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { FlatList } from 'react-native-gesture-handler';
import { Text, TouchableOpacity, View,Image } from 'react-native';
// import { View } from 'react-native-web';
import {launchCamera,launchImageLibrary} from "react-native-image-picker"
import { UpdateUser } from '../api/auth-api';
import ImgToBase64 from 'react-native-image-base64';
import AppHeader from './AppHeader';
export default function Dashboard({navigation}) {
  const [allusers,setAllUsers]=useState()
  const [imageURL,setImageURL]=useState('')
  const [loggedInUsername,setloggedInUsername]=useState('')

  useEffect(()=>{
    try{
      database().ref('users').on("value", (datasnapshot) => {
        const uuid = auth().currentUser.uid;
        let users = [];
        datasnapshot.forEach((child) => {
          // console.log(child.val())
          if (child.val().uuid === uuid) {  
            setloggedInUsername(child.val().name)
            setImageURL(child.val().image)
          }
          else {
            users.push({ 
              userName: child.val().name,
              uuid: child.val().uuid,
              imageURL:child.val().image
            });
          }
        });
        setAllUsers(users);
        // console.log("Arraydata",users)
      })
    }
    catch(error){
      alert(error)
    }
  },[])

function openGallery(){
      launchImageLibrary("photo",(response)=>{
        // console.log("res",response.assets)
        response ? response.assets.forEach((item)=>{
          // console.log(item.uri)
          ImgToBase64.getBase64String(item.uri)
          .then(async(base64String) => {
            const uuid = auth().currentUser.uid;
            let source= "data:image/jpeg;base64,"+ base64String;
            UpdateUser(source,uuid).then(()=>{
              setImageURL(item.uri)
            })
          })
          .catch(err => {console.log(err)});
        }) : null
        
      })
  }
  return (
    <View style={{flex:1, backgroundColor:"white"}}>
      <AppHeader title="Messages" navigation={navigation} onPress={()=>{auth().signOut()}}/>

      <FlatList
      alwaysBounceHorizontal={false}
      data={allusers}
      style={{padding:5,marginTop:-220}}
      keyExtractor={(_,index)=> index.toString()}
      ListHeaderComponent={
        <View style={{height:160, justifyContent:'center', alignItems:"center"}}>
          <TouchableOpacity style={{height:90,width:90,borderRadius:45}} onPress={openGallery}>
          <Image source={{uri:imageURL==='' ? "https://i.ibb.co/tmZQsw2/ava3.webp" : imageURL}} style={{height:100,width:100,borderRadius:50}}></Image>
          {/* <Image source={{uri:"file:///data/user/0/com.hellodot/cache/rn_image_picker_lib_temp_8df4c24c-b7ee-4350-b65f-88f9c885d031.jpg"}} style={{height:100,width:100,borderRadius:25}}></Image> */}
          
          </TouchableOpacity>
           <Text style={{color:"black",fontSize:20,marginTop:10,fontWeight:"bold"}}>{loggedInUsername}</Text>
        </View>
      }
      renderItem={({item})=>(
        <View>
        <TouchableOpacity style={{flexDirection:'row',marginBottom:20,marginTop:20}} onPress={()=>{
          console.log(item.uuid)
          navigation.navigate("ChatBox",{userName:item.userName,guestUid:item.uuid}
          )}}>
         <View style={{width:'12%', alignItems:'center',justifyContent:"center"}}>
          <Image source={{uri:item.imageURL === "" ? "https://i.ibb.co/tmZQsw2/ava3.webp" : item.imageURL}} style={{height:50,width:50,borderRadius:25}}></Image>
         </View>
         <View style={{width:"85%", alignItems:'flex-start',justifyContent:'center',marginLeft:10}}>
          <Text style={{color:'black',fontSize:16,fontWeight:"bold"}}>{item.userName}</Text>
         </View>
        </TouchableOpacity>
        <View style={{borderWidth:0.5, borderColor:"black"}}></View>
        </View>
      )}
      >


      </FlatList>
    </View>
  )
}
