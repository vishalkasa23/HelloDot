import React,{Component} from "react"
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image,Pressable,Modal,TouchableWithoutFeedback} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
export default class AppHeader extends Component{
  state = {
    modalVisible: false,
  };
    render(){
        const {title,onPress,navigation,openGalleryBackground,profile}=this.props;
        const {modalVisible} = this.state;
        return(
            <View style={styles.header}>
              <Modal
          // animationType="slide"
          // transparent={true}
          // style={{
          //   backgroundColor: 'white',
            // width:width-250,
            // height:height-250
            // alignSelf: 'center',paddingTop:300,
            // marginLeft:300
          
          // }}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: !modalVisible});
          }}>
             {/* <TouchableWithoutFeedback 
               style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor:'red'}}
             onPress={() => {
            this.setState({modalVisible: !modalVisible});
          }}> */}
          <TouchableOpacity onPress={() => {
            this.setState({modalVisible: !modalVisible})}}>
          <View style={styles.centeredView}>
              <Text style={styles.modalText}>View contact</Text>
              <Text style={styles.modalText}>Media, links, and docs</Text>
              <Text style={styles.modalText}>Search</Text>
              <Text style={styles.modalText}>Mute notifications</Text>
              <TouchableOpacity onPress={openGalleryBackground}>
              <Text style={styles.modalText}>WallPaper</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>More</Text>
          </View>
          </TouchableOpacity>
          {/* </TouchableWithoutFeedback> */}
        </Modal>

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
              <TouchableOpacity onPress={()=>{}}>
              <Icon name="videocam" color="#fff" size={23} style={{ padding: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{}}>
              <Icon name="call" color="#fff" size={23} style={{ padding: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
              <Icon name="more-vert" color="#fff" size={23} style={{ padding: 10 }} />
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
      // flex:1,
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
    },
    centeredView: {
      backgroundColor: '#202C33',
      width:'50%',
      height:230,
      marginTop:18,
      marginLeft:190,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginTop:5,
      marginBottom: 15,
      marginLeft:10,
      alignItems:'flex-start',
      color:'white'
    },
  });