import React,{Component} from "react"
import {View,Text,TouchableOpacity,StyleSheet} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
export default class AppHeaderMain extends Component{
    render(){
        const {title,onPress,navigation}=this.props;
        return(
                <View style={{paddingTop:15,backgroundColor:"#128C7E",height:60}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{alignItems:'flex-start',marginLeft:15}}>
                            <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
                                <Ionicons name="menu" size={25} color="white"/>
                            </TouchableOpacity>

                        </View>
                            <View style={{width:'80%',alignItems:'center'}}>
                            <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>Messages</Text>
                             </View> 
                             </View>
                    </View>
        )
    }
}