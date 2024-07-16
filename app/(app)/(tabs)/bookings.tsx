import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Link, router, useRouter } from "expo-router";
import {
  HStack,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import Colors from "@/constants/Colors";
import ServiceTile from "@/components/ServiceTile";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { string } from "yup";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { getUserID, getUserRole } from "@/utils/token";
import Loader from "@/components/Loader";

type booking = {
  id_Servicio: number;
  fecha_Realizacion: Date;
  estado: string;
  categoria_ServicioId: number;
};

const GET_BOOKINGS = gql`
  query GET_BOOKINGS($id: Int!) {
    servicios(where: { cliente: { id: { eq: $id } } }, take: 50) {
      items {
        id_Servicio
        estado
        fecha_Realizacion
        categoria_ServicioId
      }
    }
  }
`;
const GET_BOOKINGS_DETAILS = gql`
  query categoriaServicio {
    categoriasServicios {
      items {
        id_Servicio
        descripcion
        imagen
        nombre
        precio
      }
    }
  }
`;

export default function bookings() {
  const userId = getUserID();
  const [refreshing, setRefreshing] = React.useState(false);

  const apollo = useApolloClient();
  const [selected, setSelected] = React.useState(0);
  var { loading, error, data, refetch } = useQuery<{
    servicios: { items: booking[] };
  }>(GET_BOOKINGS, {
    variables: {
      id: Number(userId),
    },
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    refetch();
  }, [refreshing]);

  const {
    loading: loadingDetails,
    error: errorDetails,
    data: dataDetails,
  } = useQuery<{
    categoriasServicios: {
      items: {
        id_Servicio: number;
        descripcion: string;
        imagen: string;
        nombre: string;
        precio: number;
      }[];
    };
  }>(GET_BOOKINGS_DETAILS);

  if (loading || loadingDetails) return <Loader />;

  if (error || errorDetails) return <Text>Error! ${error?.message}</Text>;

  const servicios = data?.servicios.items.map((booking) => ({
    ...booking,
    Categoria: dataDetails?.categoriasServicios.items.find(
      (category) => category.id_Servicio === booking.categoria_ServicioId
    ),
  }));

  apollo.resetStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack
          marginTop={100}
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="flex-start"
        >
          <HStack
            justifyContent="space-around"
            width="100%"
            borderStyle="solid"
            borderBottomWidth={1}
            borderColor="#d1d1d1"
            flexDirection="row"
          >
            <Pressable
              onPress={() => setSelected(0)}
              style={[{ width: "30%" }]}
            >
              <Text
                style={[
                  styles.titles,
                  selected == 0 ? styles.SelectedState : null,
                ]}
              >
                Upcoming
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelected(1)}
              style={[{ width: "30%" }]}
            >
              <Text
                style={[
                  styles.titles,
                  selected == 1 ? styles.SelectedState : null,
                ]}
              >
                Previous
              </Text>
            </Pressable>
          </HStack>
          <ScrollView width="80%" showsVerticalScrollIndicator={false}>
            <VStack marginBottom={50}>
              {selected == 0 ? (
                <View>
                  <VStack>
                    {servicios?.map((item, index: number) => {
                      if (item.estado == "pendiente") {
                        return (
                          <ServiceTile
                            date={new Date(item.fecha_Realizacion)}
                            service={item.Categoria?.nombre || ""}
                            status={item.estado}
                            key={index}
                            id={item.id_Servicio}
                          />
                        );
                      }
                    })}
                  </VStack>
                </View>
              ) : (
                <View>
                  <VStack>
                    {data?.servicios.items.map((item, index: number) => {
                      if (item.estado == "completado") {
                        return (
                          <ServiceTile
                            date={new Date(item.fecha_Realizacion)}
                            service="Plumbering"
                            status={item.estado}
                            key={index}
                            id={item.id_Servicio}
                          />
                        );
                      }
                    })}
                  </VStack>
                </View>
              )}
            </VStack>
          </ScrollView>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  titles: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    margin: 0,
    width: "100%",
  },
  imageShowcase: {
    aspectRatio: 3 / 2,
    height: 150,
    borderRadius: 20,
  },
  SelectedState: {
    borderStyle: "solid",
    borderBottomWidth: 3,
    borderColor: Colors.blue,
  },
});
