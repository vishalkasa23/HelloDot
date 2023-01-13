import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView,View} from 'react-native'
import { theme } from '../core/theme'

export default function BackgroundMain({ children,BackgroundImage}) {
  return (
    <ImageBackground
      source={{uri:BackgroundImage}}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container} behavior="padding">
        {children}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    // padding: 20,
    width: '100%',
    // maxWidth: 540,
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
