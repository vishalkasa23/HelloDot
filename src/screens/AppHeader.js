import React,{Component} from "react"
import {View,Text,TouchableOpacity,StyleSheet} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AppHeader extends Component{
    render(){
        const {title,onPress,navigation}=this.props;
        return(

            <View style={{height:200}}>
                <View style={{paddingTop:15,backgroundColor:"#ffd31d"}}>

                    <View style={{flexDirection:'row'}}>
                        {title ==="Messages" ? null:
                        
                        <View style={{alignItems:'flex-start'}}>
                            <TouchableOpacity onPress={()=>{navigation.goBack(null)}}>
                                <Ionicons name="arrow-back" size={25} color="#000"/>
                            </TouchableOpacity>
                            </View>
                        
                        } 
                        {title ==="Messages" ? <View style={{width:'80%',alignItems:'center'}}>
                            <Text style={{fontSize:25,fontWeight:'bold'}}></Text>
                        </View> :
                        <View style={{width:'80%',alignItems:'center'}}>
                            <Text style={{fontSize:25,fontWeight:'bold'}}>{title}</Text>
                        </View>}
                    </View>
                </View>

            </View>
        )
    }
}