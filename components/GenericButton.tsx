import { View, Text, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, ButtonText, Button } from '@gluestack-ui/themed'
import Colors from '@/constants/Colors';

export default function GenericButton(props: { content: string, color: string, isLoading?: boolean; isDisabled?: boolean, tintColor: string, onPress?: () => void, style?: StyleProp<ViewStyle> }) {
  const styles = StyleSheet.create({
    button: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: 10,
      marginBottom: 10,
    },
    clientButton: {
      backgroundColor: props.color,
      color: props.tintColor,
    },
  })

  return (
    <GluestackUIProvider config={config}>
      <Button style={[styles.button, styles.clientButton, props.style]} onPress={props.onPress} isDisabled={props.isDisabled}>

        {props.isLoading ? <ActivityIndicator animating={props.isLoading} size="large" color="#FFFFFF" /> : <ButtonText>{props.content}</ButtonText>}

      </Button>
    </GluestackUIProvider>
  )
}
