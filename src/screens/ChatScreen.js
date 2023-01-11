//import liraries
import React, { Component,useEffect,useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Dimensions, Image } from 'react-native';
import AppHeader from './AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'
import {SendMessage,ReceiveMessage} from "./Message"
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import Loading from './LoadingScreen';
import ImgToBase64 from 'react-native-image-base64';
import {launchCamera,launchImageLibrary} from "react-native-image-picker"
import moment from "moment"
// create a component
function Chat (props){
    const [message,setmessage]=useState()
    const [guestUid,setguestUid]=useState()
    const [CurrentUid,setcurrentUid]=useState()
    const [allMessages,setallMessages]=useState()
    const [loader,setLoader]=useState(true)
    const [image,setImage]=useState()
    function getdata(CurrentUid,guestUid){
        try{
            // console.log(CurrentUid,guestUid)
            database().ref("messages").child(CurrentUid).child(guestUid).on("value",(dataSnapshot)=>{
                let message=[]
                dataSnapshot.forEach((data)=>{
                    // console.log(data.val().message.sender)
                    if(data.val().message.sender){
                        message.push({
                            sendBy:data.val().message.sender,
                            receiveBy:data.val().message.receiver,
                            message:data.val().message.msg,
                            image:data.val().message.image,
                            date:data.val().message.date,
                            time:data.val().message.time,
                        })
                    }
                    
                })
                // this.setState({allMessages:})
                setallMessages(message.reverse())
                // setLoader(false)
                setTimeout(()=>{
                    setLoader(false)
                    console.log("come here")
                },1000)
            })
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(guestUid!=props.route.params.guestUid){
            setguestUid(props.route.params.guestUid)
            setcurrentUid(auth().currentUser.uid)
        }
    })
    useEffect(()=>{
        sendMessage([])
        setTimeout(()=>{
            getdata(CurrentUid,guestUid)
        },100)
        
    },[guestUid])
    function openGallery(){
        launchImageLibrary("photo",(response)=>{
          // console.log("res",response.assets)
          response.assets ? response.assets.forEach((item)=>{
            // console.log(item.uri)
            ImgToBase64.getBase64String(item.uri)
            .then(async(base64String) => {
            //   const uuid = auth().currentUser.uid;
              let source= "data:image/jpeg;base64,"+ base64String;
              SendMessage(CurrentUid,guestUid,"",source).then(()=>{
                // this.setState({message:""})
                // setmessage("")
                }).catch((err)=>{
                    alert(err)
                 })
                ReceiveMessage(CurrentUid,guestUid,"",source).then(()=>{
                    // setmessage("")
                 }).catch((err)=>{
                alert(err)
                 })
            })
            .catch(err => {console.log(err)});
          }) : null
          
        })
    }
   const sendMessage = async ()=>{
        if(message){
            // console.log("send",this.state.CurrentUid,this.state.guestUid)
            SendMessage(CurrentUid,guestUid,message,"").then(()=>{
                    // this.setState({message:""})
                    setmessage("")
            }).catch((err)=>{
                alert(err)
            })
            ReceiveMessage(CurrentUid,guestUid,message,"").then(()=>{
                // this.setState({message:""})
                setmessage("")
        }).catch((err)=>{
            alert(err)
        })
        getdata(CurrentUid,guestUid)
        }
    }
        return (
        <View style={{flex:1,backgroundColor:"white"}}>

            {/* { console.log("FINALDATA",this.state.CurrentUid,this.state.guestUid)} */}
            {console.log("This is final",CurrentUid,guestUid)}
            <AppHeader title={props.route.params.userName} navigation={props.navigation} onPress={()=>{props.navigation.goBack()}}/>
            { 
            loader ? <Loading/> :
            <FlatList
            inverted
            style={{marginBottom:60}}
            data={allMessages}
            keyExtractor={(index)=>index.toString()}
            renderItem={({item})=>(
                <View style={{maxWidth:Dimensions.get('window').width / 2 + 10,alignSelf: CurrentUid===item.sendBy ? "flex-end" : "flex-start",margin:5}}>
                    <View style={{borderRadius:25,backgroundColor:CurrentUid===item.sendBy ? "gray":"green"}}>
                        {item.image==="" ? 
                        <Text style={{color:"white",padding:10,fontSize:20,fontWeight:'bold'}}>
                            {item.message} {" "} <View style={{flexDirection:'column'}}>
                            {/* <Text style={{color:"white",fontSize:10}}>{item.date}</Text> */}
                            <Text style={{color:"white",fontSize:10}}>{item.time}</Text>
                            </View>
                        </Text> 
                        : 
                        <View style={{width:Dimensions.get('window').width / 2 + 10,height:225,backgroundColor:'white',borderColor:'black'}}>
                        <Image source={{uri:item.image}} style={{width:Dimensions.get('window').width / 2 + 10,height:200,resizeMode:'stretch',borderRadius:20}}/>
                        <Text style={{fontSize:15,position:'absolute',bottom:5,right:5,color:'black'}}>{item.time}</Text>
                        </View>
                        }
                        
                    </View>
                </View>

        )}
            >


            </FlatList>}
            <View style={{bottom:0,height:50,width:"100%",position:'absolute',flexDirection:'row',backgroundColor:'gray'}}>
                <TouchableOpacity style={{width:"10%", marginRight:5,justifyContent:'center',alignItems:"center"}} onPress={()=>openGallery()}>
                    <Ionicons name="camera" size={30} color="#fff"/>
                </TouchableOpacity>
                <View style={{width:"78%",justifyContent:"center",marginLeft:1}}>
                    <TextInput value={message} onChangeText={(text)=>setmessage(text)} placeholder='Enter Message' placeholderTextColor={"#000"} style={{height:40,borderRadius:20,backgroundColor:'white'}}></TextInput>
                </View>
                <TouchableOpacity style={{width:"10%", marginLeft:1,justifyContent:'center',alignItems:"center"}} onPress={()=>{sendMessage()}}>
                    <Ionicons name="send" size={30} color="#fff"/>
                </TouchableOpacity>
            </View>
        </View>
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
export default Chat;