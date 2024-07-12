import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Box,
  Button,
  CircleIcon,
  GluestackUIProvider,
  Icon,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  VStack,
  Text,
  HStack,
  Image,
} from "@gluestack-ui/themed";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { config } from "@gluestack-ui/config";
import { router, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useURL } from "expo-linking";
import { useRoute } from "@react-navigation/native";

const PaymentOptionScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const params = useRoute().params as { [key: string]: string };
  const price = params.price;
  const description = params.description;

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <VStack space={"lg"} mt={5}>
          <Text style={styles.sectionHeader}>UPI</Text>
          <RadioGroup
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            gap={10}
          >
            <HStack
              bg="#ffffff"
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Radio value="paytm" size="lg" my={1}>
                <RadioIndicator mr="$2">
                  <Ionicons name="ellipse" color="black" />
                </RadioIndicator>
                <RadioLabel>Paytm</RadioLabel>
              </Radio>
              <Image
                source="https://paytmblogcdn.paytm.com/wp-content/uploads/2022/04/paytm-se-upi-logo.png"
                height={25}
                resizeMode="contain"
                alt="paytm logo"
              />
            </HStack>
            <HStack
              bg="#ffffff"
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Radio value="phonePe" size="lg" my={1}>
                <RadioIndicator mr="$2">
                  <Ionicons name="ellipse" color="black" />
                </RadioIndicator>
                <RadioLabel>PhonePe</RadioLabel>
              </Radio>
              <Image
                source="https://1000logos.net/wp-content/uploads/2022/11/PhonePe-Logo.png"
                height={25}
                alt="phonepe logo"
              />
            </HStack>
            <HStack
              bg="#ffffff"
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Radio value="gpay" size="lg" my={1}>
                <RadioIndicator mr="$2">
                  <Ionicons name="ellipse" color="black" />
                </RadioIndicator>
                <RadioLabel>Google Pay</RadioLabel>
              </Radio>
              <Image
                source="https://www.srcu4u.com/creditunion/wp-content/uploads/2019/07/Google-Pay-Logo-01.png"
                height={25}
                alt="google pay logo"
              />
            </HStack>
          </RadioGroup>

          <Text style={styles.sectionHeader}>Cards</Text>
          <RadioGroup
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
          >
            <VStack space={"sm"}>
              <Box flexDirection="row" alignItems="center" my={1}>
                <Radio value="card" size="md">
                  <HStack>
                    <RadioIndicator mr="$2">
                      <Ionicons name="ellipse" color="black" />
                    </RadioIndicator>
                    <Text style={{ flex: 1 }}> ************2575</Text>
                    <Ionicons name="card" size={24} color="black" />
                  </HStack>
                </Radio>
              </Box>
            </VStack>
          </RadioGroup>

          <Text style={styles.sectionHeader}>Cash</Text>
          <RadioGroup
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
          >
            <VStack space={"sm"}>
              <Radio value="cash" size="md" my={1}>
                <HStack>
                  <RadioIndicator mr="$2">
                    <Ionicons name="ellipse" color="black" />
                  </RadioIndicator>
                  <Text flex={1}>Cash</Text>
                  <MaterialCommunityIcons name="cash" size={25} color="black" />
                </HStack>
              </Radio>
            </VStack>
          </RadioGroup>
        </VStack>

        <Button
          mt={10}
          onPress={() => {
            router.push("succesfullPayment");
            router.setParams({
              price,
              description,
              paymentOption: selectedOption,
            });
          }}
          isDisabled={!selectedOption}
          backgroundColor={Colors.blue}
        >
          <Text color="white">Proceed</Text>
        </Button>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionHeader: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default PaymentOptionScreen;
