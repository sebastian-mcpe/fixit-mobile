import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, ButtonText, Button, Input, InputField } from '@gluestack-ui/themed'

export default function GenericInput(props: {content: string, style?: StyleProp<ViewStyle>}) {
  
  const styles = StyleSheet.create({
    input: {
      width: '100%',
      borderRadius: 7,
      marginTop: 10,
      marginBottom: 10,
    }
  })

  return (
    <GluestackUIProvider config={config}>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          style={[styles.input, props.style]}>
          <InputField placeholder={props.content} />
        </Input>
    </GluestackUIProvider>
  )
}
