import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, ButtonText, Button, Input, InputField, InputSlot, InputIcon, EyeIcon, EyeOffIcon, Icon } from '@gluestack-ui/themed'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GenericInput(props: {content: string, style?: StyleProp<ViewStyle>}) {
  
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

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
          <InputField type={showPassword? "text" : "password"} placeholder={props.content} />
            <InputSlot pr="$3" onPress={handleState}>
              <Ionicons name={showPassword? "eye-off-outline" : "eye-outline"} size={22} color="gray"/>
            </InputSlot>
        </Input>
    </GluestackUIProvider>
  )
}
