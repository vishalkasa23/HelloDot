import React,{useEffect, useState} from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { FlatList } from 'react-native-gesture-handler';
import { Text, TouchableOpacity, View,Image } from 'react-native';
// import { View } from 'react-native-web';
import {launchCamera,launchImageLibrary} from "react-native-image-picker"
import { UpdateUser } from '../api/auth-api';
import ImgToBase64 from 'react-native-image-base64';
// import AppHeader from './AppHeader';
import AppHeaderMain from './AppHeaderMain';
import Loading from './LoadingScreen';
import Header from './MainHeader';

export default function Dashboard({navigation}) {
  const [allusers,setAllUsers]=useState()
  const [imageURL,setImageURL]=useState('')
  const [loggedInUsername,setloggedInUsername]=useState('')
  const [loader,setloader]=useState(false)
  const [BackgroundImage,setbackgroundImage]=useState()
  useEffect(()=>{
    try{
      database().ref('users').on("value", (datasnapshot) => {
        const uuid = auth().currentUser.uid;
        
        new Promise((resolve,reject)=>{
          let users = [];
          let lastMessage="";
          let lastDate="";
          let lastTime="";
          let properDate=""
      
        datasnapshot.forEach((child) => {
          // console.log(child.val())
          if (child.val().uuid === uuid) {  
            setloggedInUsername(child.val().name)
            setImageURL(child.val().image)
            setbackgroundImage(child.val().BackgroundImage)
            setloader(true)
          }
          else {
            let newUser={
              userId:"",
              userName:"",
              userProPic:"",
              lastMessage:"",
              lastDate:"",
              lastTime:"",
              properDate:"",
              BackgroundImage:""
            }
            new Promise((resolve,reject)=>{
              database().ref("messages").child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on('value',(datasnapshots)=>{
                if(datasnapshots.val()){
                  datasnapshots.forEach((child)=>{
                    lastMessage=child.val().message.image!=="" ? "Photo" : child.val().message.msg
                    lastDate=child.val().message.date;
                    lastTime=child.val().message.time;
                    properDate=child.val().message.date+" "+child.val().message.time
                  });
                }
                else {
                  lastMessage=""
                    lastDate=""
                    lastTime=""
                    properDate="" 
                }
                newUser.userId=child.val().uuid
                newUser.userName=child.val().name
                newUser.userProPic=child.val().image
                newUser.lastMessage=lastMessage
                newUser.lastTime=lastTime
                newUser.lastDate=lastDate
                newUser.properDate=properDate
                newUser.BackgroundImage=child.val().BackgroundImage
                return resolve(newUser)
              });
            }).then((newUser)=>{
              users.push({ 
                userName: newUser.userName,
                uuid: newUser.userId,
                imageURL:newUser.userProPic,
                BackgroundImage:newUser.BackgroundImage,
                lastMessage:newUser.lastMessage,
                lastTime:newUser.lastTime,
                lastDate:newUser.lastDate,
                properDate:newUser.lastDate ? new Date(newUser.properDate) : null
              });
              setAllUsers(users.sort((a,b)=>b.properDate-a.properDate));
            })
            return resolve(users)
             }
          });
            }).then((users)=>{
              setAllUsers(users.sort((a,b)=>b.properDate-a.properDate));
              setloader(true)
            })
          })
          }
    catch(error){
      alert(error)
    }
  },[loader])

function openGallery(){
      launchImageLibrary("photo",(response)=>{
        // console.log("res",response.assets)
        response.assets ? response.assets.forEach((item)=>{
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
    <View style={{flex:1, backgroundColor:"#202C33"}}>
      {/* <AppHeaderMain title="Messages" navigation={navigation} onPress={()=>{auth().signOut()}}/> */}
      {!loader ? <Loading/> : 
      <>
      <Header title="Messages" navigation={navigation} onPress={()=>{auth().signOut()}} usersData={allusers} /> 
      <FlatList
      alwaysBounceHorizontal={false}
      data={allusers}
      style={{padding:5,marginTop:0}}
      keyExtractor={(_,index)=> index.toString()}
      ListHeaderComponent={
        <View style={{height:160, justifyContent:'center', alignItems:"center"}}>
          <TouchableOpacity style={{height:90,width:90,borderRadius:45}} onPress={openGallery}>
          <Image source={{uri:imageURL==='' ? "https://i.ibb.co/tmZQsw2/ava3.webp" : imageURL}} style={{height:100,width:100,borderRadius:50}}></Image>
          {/* <Image source={{uri:"file:///data/user/0/com.hellodot/cache/rn_image_picker_lib_temp_8df4c24c-b7ee-4350-b65f-88f9c885d031.jpg"}} style={{height:100,width:100,borderRadius:25}}></Image> */}
          
          </TouchableOpacity>
           <Text style={{color:"white",fontSize:20,marginTop:10,fontWeight:"bold"}}>{loggedInUsername}</Text>
        </View>
      }
      renderItem={({item})=>(
        
        <View>
        <TouchableOpacity style={{flexDirection:'row',marginBottom:20,marginTop:20}} onPress={()=>{
          // console.log("-------------------------",BackgroundImage)
          navigation.navigate("ChatBox",{userName:item.userName,guestUid:item.uuid,BackgroundImage:BackgroundImage,imageURL:item.imageURL}
          )}}>
         <View style={{width:'12%', alignItems:'center',justifyContent:"center"}}>
          <Image source={{uri:item.imageURL === "" ? "https://i.ibb.co/tmZQsw2/ava3.webp" : item.imageURL}} style={{height:50,width:50,borderRadius:25}}></Image>
         </View>
         <View style={{width:"65%", alignItems:'flex-start',justifyContent:'center'}}>
          <Text style={{color:'white',fontSize:16,fontWeight:"bold",marginLeft:10}}>{item.userName}</Text>
          <Text style={{color:'gray',fontSize:12,marginLeft:10}}>{item.lastMessage}</Text>
         </View>
         <View style={{width:"20%", alignItems:'flex-start',justifyContent:'center'}}>
          <Text style={{color:'gray',fontSize:12}}>{item.lastTime}</Text>
         </View>
        </TouchableOpacity>
        {/* <View style={{borderWidth:0.5, borderColor:"black"}}></View> */}
        </View>
      )}
      >


      </FlatList>
      </>
      }
      
    </View>
  )
}
