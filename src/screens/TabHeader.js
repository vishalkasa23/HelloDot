//import liraries
import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import Header from './MainHeader';
import MyTabs from './Toptapnavigator';
import auth from '@react-native-firebase/auth'
// create a component
const TabHeader = ({navigation}) => {
    const [allusers,setAllUsers]=useState()
    const [imageURL,setImageURL]=useState('')
    const [loggedInUsername,setloggedInUsername]=useState('')
    const [loader,setloader]=useState(false)
    const [lastMessageData,setlastMessageData]=useState(false)
    const [BackgroundImage,setbackgroundImage]=useState()
    function getdata(){
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
    }
    useEffect(()=>{
      getdata()
    },[loader])
    return (
        <View style={styles.container}>
            <Header title="Messages" navigation={navigation} onPress={()=>{auth().signOut()}} usersData={allusers} />
            {loader ?<MyTabs/> : <></> }
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default TabHeader;
