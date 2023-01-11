import React, {useState} from 'react';
import { ActivityIndicator, View, StyleSheet} from 'react-native';
function Loading ({navigation}) {
   const [state1,setState1]=useState(true)
   const animating = state1
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {animating}
               color = 'black'
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
}
export default Loading
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 150
   }
})