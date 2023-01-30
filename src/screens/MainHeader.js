import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Header = (props) => (
  <View style={styles.top}>
    {/* {console.log("InHeaderPropsUser",props.usersData)} */}
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
      <TouchableOpacity>
        <Icon
          name="more-vert"
          color="#8596a0"
          size={23}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
    </View>
  </View>
  );

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
});