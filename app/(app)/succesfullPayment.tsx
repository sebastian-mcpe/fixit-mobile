import React from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import {
  Box,
  Button,
  Icon,
  VStack,
  HStack,
  Divider,
  Text,
} from "@gluestack-ui/themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useURL } from "expo-linking";
import { useRoute } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client";

const PaymentSuccessScreen = () => {
  const client = useApolloClient();

  const params = useRoute().params as { [key: string]: string };
  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.card}>
        <Box style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={50} color={Colors.blue} />
        </Box>
        <Text style={styles.greatText}>Great</Text>
        <Text style={styles.paymentSuccessText}>Payment Success</Text>

        <VStack space={"md"} mt={4}>
          <HStack justifyContent="space-between">
            <Text style={styles.labelText}>Payment Mode</Text>
            <Text style={styles.valueText}>{params?.paymentOption}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text style={styles.labelText}>Total Amount</Text>
            <Text style={styles.valueText}>${params?.price}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text style={styles.labelText}>Pay Date</Text>
            <Text style={styles.valueText}>
              {new Date().toDateString().split(" ")[1]}{" "}
              {new Date().toDateString().split(" ")[2]},{" "}
              {new Date().toDateString().split(" ")[3]}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text style={styles.labelText}>Pay Time</Text>
            <Text style={styles.valueText}>
              {new Date().toTimeString().substring(0, 5)}
            </Text>
          </HStack>
        </VStack>

        <Divider my={4} />

        <HStack justifyContent="space-between">
          <Text style={styles.totalPayText}>Total Pay</Text>
          <Text style={styles.totalPayAmountText}> ${params?.price}</Text>
        </HStack>
      </Box>

      <Button
        mt={10}
        onPress={async () => {
          // Get url params
          // Clear apollo cache
          // Redirect to home screen
          client.cache.reset().then(() => {
            router.replace("home");
          });
        }}
        style={styles.doneButton}
      >
        <Text color="white">Done</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#E0E7FF",
    borderRadius: 50,
    padding: 10,
  },
  greatText: {
    marginTop: 10,
    fontSize: 18,
    color: "#3B82F6",
  },
  paymentSuccessText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  labelText: {
    fontSize: 16,
    color: Colors.blue,
  },
  valueText: {
    fontSize: 16,
    color: "#000",
  },
  totalPayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  totalPayAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.blue,
  },
  doneButton: {
    backgroundColor: Colors.blue,
    width: "100%",
    borderRadius: 10,
  },
});

export default PaymentSuccessScreen;
