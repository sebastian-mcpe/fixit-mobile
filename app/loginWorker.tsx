import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import {
  Box,
  Button,
  ButtonText,
  Center,
  GluestackUIProvider,
  Heading,
  Image,
  SafeAreaView,
  VStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Colors from "@/constants/Colors";
import EditScreenInfo from "@/components/EditScreenInfo";
import GenericButton from "@/components/GenericButton";
import GenericInput from "@/components/GenericInput";
import GenericPasswordInput from "@/components/GenericPasswordInput";
import { Link, useRouter } from "expo-router";
import GoogleButton from "@/components/GoogleButton";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { FormError } from "@/components/FormError";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/context/AuthContext";

const initialValues = {
  role: "worker",
  email: "",
  password: "",
};
const validations = yup.object().shape({
  // TODO: CHANGE EMAIL REGEX
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
type formValues = typeof initialValues;

async function login(values: formValues) {
  const response = await fetch(
    "https://fixit-main20240707123824.azurewebsites.net/api/Auth/Login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();
  return data;
}

export default function loginClient() {
  const { signIn, session } = useAuth();
  const router = useRouter();
  const onSubmit = async (
    values: formValues,
    formikHelpers: FormikHelpers<formValues>
  ) => {
    var userData = await login(values);
    console.log(userData);

    if (userData["token"]) {
      signIn(userData["token"]);
      router.push("home");
    } else {
      formikHelpers.setErrors({ email: "Invalid email or password" });
    }
  };
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
            <VStack width={"70%"} style={styles.container}>
              <Image
                alt=""
                source={require("@/assets/images/fixit-logo-h.png")}
                style={styles.logo}
              />
              <Text style={styles.formTitles}>Email:</Text>
              <GenericInput
                value={values.email}
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                content="Enter your email"
              />
              <FormError name="email" />
              <Text style={styles.formTitles}>Password:</Text>
              <GenericPasswordInput
                value={values.password}
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
                content="Enter your password"
              />
              <FormError name="password" />
              <Link
                href="forgotPassword"
                style={[
                  {
                    color: Colors.blue,
                    textAlign: "right",
                    width: "100%",
                    margin: 5,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Forgot Password?
              </Link>
              <GenericButton
                onPress={handleSubmit}
                content="Login"
                color={Colors.yellow}
                tintColor={Colors.light.tint}
              />
              <Link
                href="register"
                style={[
                  {
                    color: Colors.blue,
                    textAlign: "left",
                    width: "100%",
                    margin: 5,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Don't have an account?
              </Link>
              <Text
                style={[
                  {
                    color: Colors.gray,
                    textAlign: "center",
                    width: "100%",
                    marginTop: 150,
                    marginBottom: 20,
                  },
                ]}
              >
                Or login with:
              </Text>
              <GoogleButton />
            </VStack>
          )}
        </Formik>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  formTitles: {
    fontSize: 16,
    textAlign: "left",
    width: "100%",
    margin: 5,
  },
  welcomeYellow: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: Colors.yellow,
  },
  welcomeBlue: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: Colors.blue,
  },
  accesAs: {
    fontSize: 20,
    textAlign: "left",
    margin: 10,
    width: "100%",
    color: Colors.gray,
    marginTop: 100,
    marginBottom: 20,
  },
  logo: {
    resizeMode: "contain",
    marginBottom: 16,
    width: "100%",
    height: "15%",
  },
});
