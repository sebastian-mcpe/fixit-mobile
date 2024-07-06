import { Text, StyleSheet, StyleProp, ViewStyle, TextInputChangeEventData, NativeSyntheticEvent, TextProps } from 'react-native'
import React, { LegacyRef } from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider, ButtonText, Button, Input, InputField } from '@gluestack-ui/themed'
import { ErrorMessage } from 'formik';


export const FormError = React.forwardRef<Text, TextProps & { name: string; }>(({ style, name, ...props }, ref) => {
  return (
    <GluestackUIProvider config={config}>
      <ErrorMessage name={name}  >
        {(msg) => <Text style={styles.text}>{msg}</Text>}
      </ErrorMessage>
    </GluestackUIProvider>
  )
});


const styles = StyleSheet.create({
  text: {
    width: '100%',
    marginBottom: 5,
    color: 'red',
  }
})

