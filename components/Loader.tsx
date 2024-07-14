import Colors from "@/constants/Colors";
import { ActivityIndicator, View } from "react-native";

export default function Loader() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  );
}
