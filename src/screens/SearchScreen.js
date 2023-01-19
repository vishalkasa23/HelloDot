//import liraries
import React, { Component,useState } from 'react';
import { Text, TouchableOpacity, View,Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
// create a component

const SearchScreen = (props) => {
  const [allusers,setAllUsers]=useState(props.route.params.userData)
  // console.log("alldata",allusers)
  const [filteredUser,setfilteredUser]=useState(allusers)
  const [search,setsearch]=useState()
  function SearchFilterFunction(text){
    setsearch(text)
    var filterdata=allusers.filter(i=> ((i.userName.toLowerCase().includes(text.toLowerCase()))),)
    setfilteredUser(filterdata)
  }
  
  // console.log("FinalProps",props.route.params.userData)
    return (
      <View style={{flex:1, backgroundColor:"white"}}>
        <SearchBar round searchIcon={{ size: 25 }} onChangeText={text => SearchFilterFunction(text)} onClear={text => SearchFilterFunction('')} placeholder="Type Here to Search..." value={search} containerStyle={{backgroundColor:'#202C33'}} inputContainerStyle={{backgroundColor:'#202C33'}} />
      <FlatList
      alwaysBounceHorizontal={false}
      data={filteredUser}
      style={{padding:5,marginTop:0}}
      keyExtractor={(_,index)=> index.toString()}
      renderItem={({item})=>(
        <View>
        <TouchableOpacity style={{flexDirection:'row',marginBottom:20,marginTop:20}} onPress={()=>{
          props.navigation.navigate("ChatBox",{userName:item.userName,guestUid:item.uuid,BackgroundImage:item.BackgroundImage,imageURL:item.imageURL}
          )}}>
         <View style={{width:'12%', alignItems:'center',justifyContent:"center"}}>
          <Image source={{uri:item.imageURL === "" ? "https://i.ibb.co/tmZQsw2/ava3.webp" : item.imageURL}} style={{height:50,width:50,borderRadius:25}}></Image>
         </View>
         <View style={{width:"65%", alignItems:'flex-start',justifyContent:'center'}}>
          <Text style={{color:'black',fontSize:16,fontWeight:"bold",marginLeft:10}}>{item.userName}</Text>
         </View>
        </TouchableOpacity>
        <View style={{borderWidth:0.5, borderColor:"black"}}></View>
        </View>
      )}
      >
      </FlatList>  
        </View>
    );
};

// define your styles


//make this component available to the app
export default SearchScreen;
