import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  GluestackUIProvider,
  Text,
  Button,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  FlatList,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import GenericButton from "@/components/GenericButton";

const query = gql`
  query requestServiceFormData {
    categoriasServicios {
      items {
        id_Servicio
        descripcion
        nombre
        precio
      }
    }
  }
`;
const mutation = gql`
 mutation requestService(
    $servicioID: Int!
    $descripcion: String!
    $fecha_Realizacion: DateTime!
  ) {
    requestService(
      input: {
        parameters: {
          categoria_ServicioId: $servicioID
          clienteId: 0
          descripcion: $descripcion
          fecha_Realizacion: $fecha_Realizacion
        }
      }
    ) {
      mutationResultWithID {
        message
        success
        
      }
    }
  }
`;

const initialValues = {
  onCharge: "",
  description: "",
  category: "",
  fechaRealizacion: new Date(),
};

const validations = yup.object().shape({
  onCharge: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  fechaRealizacion: yup.date().required(),
});

const ServiceDescriptionScreen = () => {
  const { data, loading, error } = useQuery<{
    categoriasServicios: {
      items: {
        id_Servicio: number;
        descripcion: string;
        nombre: string;
        precio: number;
      }[];
    };
  }>(query);
  const [requestService, { data: mutationData }] = useMutation<{
    requestService: {
      mutationResult: {
        message: string;
        success: boolean;
        id: number;
      };
    };
  }>(mutation);

  const onSubmit = async (values: typeof initialValues) => {
    const result = await requestService({
      variables: {
        servicioID: Number(values.category),
        descripcion: values.description,
        fecha_Realizacion: values.fechaRealizacion,
      },
    });
    if (result.data?.requestService.mutationResult.success) {
      Alert.alert("Service requested successfully");
      router.push("/payment");
      router.setParams({
        price: data?.categoriasServicios.items
          .find((item) => item.id_Servicio === Number(values.category))
          ?.precio.toString(),
        description: values.description,
      });
    } else {
      Alert.alert("Failed to request service");
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <View style={{ padding: 20 }}>
              <Text style={styles.title}>Service Description</Text>

              <Text style={styles.label}>Name of person responsible</Text>
              <TextInput
                style={styles.input}
                value={values.onCharge}
                onChangeText={handleChange("onCharge")}
                onBlur={handleBlur("onCharge")}
                placeholder="Enter your person on charge"
              />
              {/* <ErrorMessage name="onCharge" /> */}

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                placeholder="Enter a description..."
                multiline
              />
              {/* <ErrorMessage name="description" /> */}
              <Select onValueChange={handleChange("category")}>
                <SelectTrigger
                  variant="outline"
                  size="md"
                  style={[{ borderRadius: 7 }]}
                >
                  <SelectInput
                    onBlur={handleBlur("category")}
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
                    {data?.categoriasServicios.items.map((item, index) => (
                      <SelectItem
                        key={index}
                        label={item.nombre}
                        value={item.id_Servicio.toString()}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
              <Text style={styles.helperText}>
                Insert Category you wanna request service
              </Text>
              <Text style={styles.helperText}>
                Category price: $
                {
                  data?.categoriasServicios.items.find(
                    (item) => item.id_Servicio === Number(values.category)
                  )?.precio
                }
              </Text>

              <Text style={styles.label}>Your address</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>Home</Text>
                <Feather name="check-circle" size={24} color="#cce5cc" />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  style={styles.requestLaterButton}
                  onPress={() => console.log("Request for later pressed")}
                >
                  <Text color="white">Request for later</Text>
                </Button>

                <Button
                  style={styles.requestNowButton}
                  onPress={(e) => handleSubmit()}
                >
                  <Text color="white">Request Now</Text>
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    height: 100,
  },
  categoryInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  helperText: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  requestLaterButton: {
    backgroundColor: "black",
  },
  requestNowButton: {
    backgroundColor: Colors.blue,
  },
});

export default ServiceDescriptionScreen;
