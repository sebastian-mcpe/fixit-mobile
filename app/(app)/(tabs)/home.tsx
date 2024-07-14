import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect } from "react";
import {
  GluestackUIProvider,
  ScrollView,
  Input,
  InputField,
  VStack,
  InputIcon,
  HStack,
  RefreshControl,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Ionicons } from "@expo/vector-icons";
import GenericButton from "@/components/GenericButton";
import Colors from "@/constants/Colors";
import { gql, useQuery } from "@apollo/client";
import ServicesHighlight from "@/components/ServicesHighlight";
import * as SecureStore from "expo-secure-store";
import { router, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { getUserRole } from "@/utils/token";
import BookingsTrabajador from "@/components/BookingsTrabajador";
import Loader from "@/components/Loader";

const GET_DOGS = gql`
  query default {
    categoriasServicios {
      items {
        imagen
        nombre
      }
    }
  }
`;

type Servicio = {
  imagen: string;
  nombre: string;
};

export default function home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const role = getUserRole();

  var { loading, error, data, refetch } = useQuery<{
    categoriasServicios: { items: Servicio[] };
  }>(GET_DOGS);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    refetch();
  }, [refreshing]);

  if (loading) return <Loader />;

  if (error)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Error! ${error.message}</Text>
      </ScrollView>
    );
  if (role === "worker") return <BookingsTrabajador />;

  return (
    <GluestackUIProvider config={config}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[{ alignItems: "center" }]}>
          <VStack w="90%" mb={16}>
            <Input
              variant="underlined"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={true}
              style={[{ alignItems: "center" }]}
            >
              <Ionicons
                name="location"
                style={[{ margin: 5 }]}
                size={18}
                color="black"
              />
              <InputField placeholder="Your current location" />
            </Input>
            <GenericButton
              content={"Request service"}
              color={Colors.blue}
              tintColor={Colors.light.tint}
              onPress={() => {
                router.push("/requestService");
              }}
            />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={[{ marginTop: 10 }]}
            >
              <HStack space="lg" gap={30}>
                {data?.categoriasServicios.items.map((item, index: number) => {
                  return (
                    <Pressable key={index}>
                      <Image
                        source={{
                          uri: item.imagen,
                        }}
                        style={styles.imageShowcase}
                      />
                    </Pressable>
                  );
                })}
              </HStack>
            </ScrollView>
          </VStack>
          <ServicesHighlight />
          <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
            <View>
              <Image
                source={require("@/assets/images/star-review.jpg")}
                style={{
                  height: 100,
                  width: 170,
                  borderRadius: 20,
                }}
              />
              <Text
                style={{ marginLeft: 10, fontFamily: "Roboto", fontSize: 14 }}
              >
                Ratings Ranking
              </Text>
            </View>
            <View>
              <Image
                source={require("@/assets/images/desinfection.jpg")}
                style={{
                  height: 100,
                  width: 170,
                  borderRadius: 20,
                }}
              />
              <Text
                style={{ marginLeft: 10, fontFamily: "Roboto", fontSize: 14 }}
              >
                Desinfection services
              </Text>
            </View>
          </View>
          <GenericButton
            style={{ width: "90%", borderRadius: 5 }}
            content={"View all services"}
            color={Colors.blue}
            tintColor={Colors.light.tint}
            onPress={() => {
              router.push("allServices");
            }}
          />
        </View>
      </ScrollView>
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
  titles: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  imageShowcase: {
    aspectRatio: 3 / 2,
    height: 150,
    borderRadius: 20,
  },
});
