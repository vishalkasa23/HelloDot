import React,{Component} from "react"
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
export default class AppHeader extends Component{
    render(){
        const {title,onPress,navigation,openGalleryBackground,profile}=this.props;
        return(

            // <View style={{height:50}}>
            //     <View style={{paddingTop:15,backgroundColor:"#128C7E"}}>

            //         <View style={{flexDirection:'row'}}>
            //             {title ==="Messages" ? null:
                        
            //             <View style={{alignItems:'flex-start'}}>
            //                 <TouchableOpacity onPress={()=>{navigation.goBack(null)}}>
            //                     <Ionicons name="arrow-back" size={25} color="#000"/>
            //                 </TouchableOpacity>
            //                 </View>
                        
            //             } 
            //             {title ==="Messages" ? <View style={{width:'80%',alignItems:'center'}}>
            //                 <Text style={{fontSize:25,fontWeight:'bold'}}></Text>
            //             </View> :
            //             <View style={{width:'80%',alignItems:'center'}}>
            //                 <Text style={{fontSize:25,fontWeight:'bold'}}>{title}</Text>
            //             </View>}
            //         </View>
            //     </View>

            // </View>

            <View style={styles.header}>
            <View style={styles.left} >
              <TouchableOpacity onPress={()=>{navigation.goBack(null)}}>
                <Icon
                  name="arrow-back" color="#fff" size={23}
                  style={{ paddingLeft: 10 }}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: profile ? profile : 'https://i.ibb.co/tmZQsw2/ava3.webp' }}
                style={styles.chatImage}
              />
              <TouchableOpacity>
                <Text style={styles.chatTitle}>{title}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.right} >
              {/* <Icon name="call" color="#fff" size={23} style={{ padding: 5 }} />
              <Icon name="attach-file" color="#fff" size={23} style={{ padding: 5 }} /> */}
              <TouchableOpacity onPress={openGalleryBackground}>
              <Icon name="more-vert" color="#fff" size={23} style={{ padding: 5 }} />
              </TouchableOpacity>
              
            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
      width,
      height,
    },
    header: {
      height: 65,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#202C33',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      flexDirection: 'row',
    },
    chatTitle: {
      color: '#fff',
      fontWeight: '600',
      margin: 10,
      fontSize: 15,
    },
    chatImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
      margin: 5,
    }
  });