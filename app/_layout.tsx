import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)'
};

export default function _layout() {
  return (
    <Stack>

      <Stack.Screen name="(tabs)"
        options={
          { headerShown: false }
        } />

      <Stack.Screen name="completeRegistration"
        options={{
          headerShown: false
        }} />

      <Stack.Screen name="index"
        options={{
          headerShown: false
        }} />

      <Stack.Screen name="loginClient"
        options={{
          headerShown: false
        }} />

      <Stack.Screen name="loginWorker"
        options={{
          headerShown: false
        }} />

      <Stack.Screen name="register"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#eaeaea'
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: "Register"
        }} />

      <Stack.Screen name="profilePhotoUpload"
        options={{
          headerStyle: {
            backgroundColor: '#eaeaea'
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: "Photo upload"
        }} />

      <Stack.Screen name="forgotPassword"
        options={{
          headerStyle: {
            backgroundColor: '#eaeaea'
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: "Password Recovery"
        }} />
    </Stack>
  )
}