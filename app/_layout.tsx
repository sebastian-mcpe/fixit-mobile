import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';

const client = new ApolloClient({
  uri: 'http://localhost:5127/api/graph/',
  cache: new InMemoryCache(),
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IndvcmtlciIsImV4cCI6MTcyMDI1MjU5MywiaXNzIjoiRml4SXRHcm91cCIsImF1ZCI6IkZpeEl0In0.J_Npc9e2wme8d1qZMLnozIpwNhEyLbN7BQexWvDT9hk'
  }
});

export const unstable_settings = {
  initialRouteName: '(tabs)'
};

export default function _layout() {

  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)"
          options={
            { headerShown: false }
          } />
        <Stack.Screen name="index"
          options={{
            headerShown: false
          }} />


        <Stack.Screen name="completeRegistration"
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
    </ApolloProvider>
  )
}