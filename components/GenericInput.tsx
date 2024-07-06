import { View, Text, StyleSheet, StyleProp, ViewStyle, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native'
import React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, ButtonText, Button, Input, InputField } from '@gluestack-ui/themed'

type props = {
  content: string,
  style?: StyleProp<ViewStyle>,
  onChange?: (e: string) => void
  onBlur?: (e: any) => void
  value?: string
}

export default function GenericInput(props: props) {

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
        <InputField
          onChangeText={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          placeholder={props.content}
        />
      </Input>
    </GluestackUIProvider>
  )
}
