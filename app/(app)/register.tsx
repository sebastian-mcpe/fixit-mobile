import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  Text,
  VStack,
  Box,
  Center,
  HStack,
  Select,
  Button,
  SelectContent,
  SelectBackdrop,
  SelectPortal,
  SelectTrigger,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  GluestackUIProvider,
  PhoneIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Ionicons } from "@expo/vector-icons";
import GenericInput from "@/components/GenericInput";
import GenericPasswordInput from "@/components/GenericPasswordInput";
import GenericButton from "@/components/GenericButton";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import * as yup from "yup";
import { Formik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { FormError } from "@/components/FormError";
const initialValues = {
  role: "client",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  confirmPassword: "",
};
const validations = yup.object().shape({
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().min(10).max(10).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
const REGISTER = gql`
  mutation register(
    $email: String!
    $name: String!
    $password: String!
    $phone: String!
    $role: String!
  ) {
    registerUser(
      input: {
        parameters: {
          email: $email
          name: $name
          password: $password
          phone: $phone
          role: $role
        }
      }
    ) {
      mutationResult {
        message
        success
      }
    }
  }
`;
const RegisterScreen = () => {
  const [register] = useMutation(REGISTER);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: typeof initialValues) => {
    const request = {
      role: values.role,
      email: values.email,
      password: values.password,
      name: values.firstName + " " + values.lastName,
      phone: values.phone,
    };
    try {
      setIsLoading(true);
      const result = await register({
        variables: request,
      });
      console.log(result);
      const mutationResult = result.data.registerUser.mutationResult;
      if (mutationResult.success) {
        Alert.alert(
          "Success",
          "Account created successfully",
          [{ text: "OK", onPress: () => router.push("/") }],
          { cancelable: false }
        );
        router.push("/");
      } else {
        Alert.alert("Error", mutationResult.message);
      }
    } catch (error) {
      Alert.alert("Error", String(error));
    }
    setIsLoading(false);
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <VStack width={"85%"} space="lg" style={styles.container}>
              <Image
                alt=""
                source={require("@/assets/images/fixit-logo-h.png")}
                style={styles.logo}
              />
              <Box style={[{ width: "100%" }]}>
                <Select
                  onValueChange={handleChange("role")}
                  defaultValue="client"
                >
                  <SelectTrigger
                    variant="outline"
                    size="md"
                    style={[{ borderRadius: 7 }]}
                  >
                    <SelectInput
                      onBlur={handleBlur("role")}
                      value={values.role}
                      placeholder="Select option"
                    />
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color="gray"
                      style={[{ margin: 10 }]}
                    />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Client" value="client" />
                      <SelectItem label="Worker" value="worker" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <Text style={styles.instructions}>
                  Insert if you wanna register as a client or a worker
                </Text>
              </Box>
              <HStack flexDirection="row" gap={5}>
                <GenericInput
                  style={{ flex: 1 }}
                  onBlur={handleBlur("firstName")}
                  onChange={handleChange("firstName")}
                  value={values.firstName}
                  content="First Name"
                />
                <GenericInput
                  style={{ flex: 1 }}
                  onBlur={handleBlur("lastName")}
                  onChange={handleChange("lastName")}
                  value={values.lastName}
                  content="Last Name"
                />
              </HStack>
              <FormError name="firstName" />
              <FormError name="lastName" />
              <GenericInput
                content="Email"
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                value={values.email}
              />
              <FormError name="email" />
              <GenericInput
                content="Phone Number"
                onBlur={handleBlur("phone")}
                onChange={handleChange("phone")}
                value={values.phone}
              />
              <FormError name="phone" />
              <Box>
                <GenericPasswordInput
                  content="Password"
                  style={[{ marginBottom: 0 }]}
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  value={values.password}
                />
                <Text style={styles.passwordInstructions}>
                  Password must contain 8 char.
                </Text>
                <FormError name="password" />
              </Box>
              <Box>
                <GenericPasswordInput
                  onBlur={handleBlur("confirmPassword")}
                  onChange={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  content="Confirm Password"
                />
                <FormError name="confirmPassword" />
              </Box>
              <GenericButton
                isLoading={isLoading}
                content="Create Account"
                color={Colors.blue}
                tintColor={Colors.dark.tint}
                onPress={handleSubmit}
              />
              <Text style={styles.terms}>
                By continuing, you agree to our{" "}
                <Text style={styles.link}>Terms of Service</Text> and{" "}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </VStack>
          )}
        </Formik>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  select: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  instructions: {
    color: "#888",
    marginTop: 0,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  passwordInstructions: {
    color: "#888",
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  createAccountButton: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  terms: {
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
  link: {
    color: "#1E90FF",
  },
  logo: {
    resizeMode: "contain",
    marginBottom: 16,
    width: "100%",
    height: "10%",
  },
});

export default RegisterScreen;
