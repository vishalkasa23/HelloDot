import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from './Dashboard';

const Header = (props) => {
  const [modalVisible,setmodalVisible]=useState(false)
  return (
  <View style={styles.top}>
    {/* {console.log("InHeaderPropsUser",props)} */}
    <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setmodalVisible(!modalVisible)
          }}>
          <TouchableOpacity onPress={() => {   setmodalVisible(!modalVisible)}}>
          <View style={styles.centeredView}>
              <Text style={styles.modalText}>New Group</Text>
              <Text style={styles.modalText}>New broadcast</Text>
              <Text style={styles.modalText}>Linked devices</Text>
              <Text style={styles.modalText}>Starred messages</Text>
              <TouchableOpacity>
              <Text style={styles.modalText}>Payments</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Settings</Text>
          </View>
          </TouchableOpacity>
        </Modal>
    <TouchableOpacity onPress={()=>{props.navigation.openDrawer()}}>
    <Text style={styles.logo}>HelloDot</Text>
    </TouchableOpacity>
    
    <View style={styles.icons}>
    <TouchableOpacity>
        <Icon
          name="camera"
          color="#8596a0"
          size={23}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{props.navigation.navigate("Search",{userData:props.usersData})}}>
        <Icon
          name="search"
          color="#8596a0"
          size={23}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setmodalVisible(true)}>
        <Icon
          name="more-vert"
          color="#8596a0"
          size={23}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
};

export default Header;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    backgroundColor: '#1f2c34',
    borderColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    // paddingVertical: 10,
  },
  logo: {
    fontSize: 23,
    color: '#8596a0',
    margin: 10,
    fontWeight: '500',
  },
  icons: {
    flexDirection: 'row',
  },
  centeredView: {
    backgroundColor: '#202C33',
    width:'50%',
    height:230,
    marginTop:10,
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