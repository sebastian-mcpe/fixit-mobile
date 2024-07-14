import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Stack } from "expo-router";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const prodURL = "https://fixit-main20240707123824.azurewebsites.net/api/graph/";
const devURL = "http://localhost:5127/api/graph/";

const httpLink = createHttpLink({
  uri: prodURL,
});

const AuthLink = () => {
  return setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${await SecureStore.getItem("session")}`,
      },
    };
  });
};

const client = new ApolloClient({
  link: AuthLink().concat(httpLink),
  cache: new InMemoryCache(),
});

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function _layout(token: string) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="completeRegistration"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="register"
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#eaeaea",
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Register",
            }}
          />

          <Stack.Screen
            name="profilePhotoUpload"
            options={{
              headerStyle: {
                backgroundColor: "#eaeaea",
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Photo upload",
            }}
          />

          <Stack.Screen
            name="forgotPassword"
            options={{
              headerStyle: {
                backgroundColor: "#eaeaea",
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Password Recovery",
            }}
          />

          <Stack.Screen
            name="editProfile"
            options={{
              headerStyle: {
                backgroundColor: "#eaeaea",
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Edit profile",
            }}
          />

          <Stack.Screen
            name="serviceDetail"
            options={{
              headerStyle: {
                backgroundColor: "#eaeaea",
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Service detail",
            }}
          />

          <Stack.Screen
            name="paymentHistory"
            options={{
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Payment history",
            }}
          />

          <Stack.Screen
            name="support"
            options={{
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Support",
            }}
          />

          <Stack.Screen
            name="allServices"
            options={{
              headerStyle: {
                backgroundColor: "#eaeaea",
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "All services",
            }}
          />

          <Stack.Screen
            name="payment"
            options={{
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Payment",
            }}
          />

          <Stack.Screen
            name="succesfullPayment"
            options={{
              headerShown: false,
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitle: "Successful payment",
            }}
          />
          <Stack.Screen
            name="shareFeedback"
            options={{ headerTitle: "Feedback" }}
          />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ApolloProvider>
  );
}
