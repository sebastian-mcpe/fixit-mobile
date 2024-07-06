import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import * as React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, ButtonText, Button } from '@gluestack-ui/themed'

export default function GenericButton(props: { content: string, color: string, isDisabled?: boolean, tintColor: string, onPress?: () => void, style?: StyleProp<ViewStyle> }) {
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
      <Button style={[styles.button, styles.clientButton]} onPress={props.onPress} isDisabled={props.isDisabled}>
        <ButtonText>{props.content}</ButtonText>
      </Button>
    </GluestackUIProvider>
  )
}
