import { StyleSheet, View, Text } from "react-native";
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Pressable } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
export default function ServicesHighlight() {
  const router = useRouter();
  return (
    <Pressable
      style={{ flex: 1, width: "100%" }}
      onPress={(e) => router.push("/requestService")}
    >
      <View style={styles.services}>
        <View style={styles.servicesItem}>
          <MaterialIcons name="carpenter" size={50} color="black" />
          <Text style={{ fontFamily: "Roboto" }}>Carpintery</Text>
        </View>
        <View style={styles.servicesItem}>
          <Feather name="tv" size={50} color="black" />
          <Text style={{ fontFamily: "Roboto" }}>Technicians</Text>
        </View>
        <View style={styles.servicesItem}>
          <MaterialCommunityIcons name="mower-bag" size={50} color="black" />
          <Text style={{ fontFamily: "Roboto" }}>Gardening</Text>
        </View>
        <View style={styles.servicesItem}>
          <FontAwesome5 name="box" size={50} color="black" />
          <Text style={{ fontFamily: "Roboto" }}>Haulage</Text>
        </View>
      </View>
      <View style={styles.services}>
        <View style={styles.servicesItem}>
          <MaterialCommunityIcons name="vacuum" size={50} color="black" />
          <Text style={styles.servicesItemText}>Cleaning</Text>
        </View>
        <View style={styles.servicesItem}>
          <MaterialIcons name="home-repair-service" size={50} color="black" />
          <Text style={styles.servicesItemText}>Home Repairs</Text>
        </View>
        <View style={styles.servicesItem}>
          <MaterialCommunityIcons name="tools" size={50} color="black" />
          <Text style={styles.servicesItemText}>Appliance Repair</Text>
        </View>
        <View style={styles.servicesItem}>
          <Entypo name="air" size={50} color="black" />
          <Text style={styles.servicesItemText}>AC Service & Repair</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  services: {
    flexDirection: "row",
  },
  servicesItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    alignItems: "center",
    paddingVertical: 10,
  },
  servicesItemText: {
    fontFamily: "Roboto",
    textAlign: "center",
  },
});
