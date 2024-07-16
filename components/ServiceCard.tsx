import Colors from "@/constants/Colors";
import { View, Text, Button } from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export interface ServiceCardProps {
  completeDate: Date;
  category: string;
  id: number;
  decline: (id: number) => void;
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  completeDate,
  id,
  decline,
}) => {
  const router = useRouter();
  const dateString = `${completeDate.getDate()}nd ${
    months[completeDate.getMonth()]
  }, ${dayOfWeek[completeDate.getDay()]}`;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text color="black" fontWeight="bold" fontSize={16}>
          {dateString}
        </Text>
        <Text width="30%" color="black">
          {category}
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardActions}>
          <Button bgColor="white">
            <Text color="black">Accept</Text>
          </Button>
          <Button
            onPress={() => {
              console.log("Pressed " + id);
              decline(id);
            }}
            bgColor="#283891"
          >
            <Text color="white">Decline</Text>
          </Button>
        </View>
        <Link
          style={styles.details}
          onPress={(e) => {
            e.preventDefault();
            router.push("/serviceDetail");
            router.setParams({ id: String(id) });
          }}
          href={`/serviceDetail`}
        >
          View Details
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#E6EAFF",
    padding: 10,
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginHorizontal: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
  },
  details: {
    color: "#283891",
    fontWeight: "bold",
  },
});
