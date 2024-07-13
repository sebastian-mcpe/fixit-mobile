import { gql, useQuery } from "@apollo/client";
import { View, StyleSheet, Text, FlatList } from "react-native";

const GET_RATING_HISTORY = gql`
  query RatingHistory {
    ratingHistory {
      comment
      rating
      date
    }
  }
`;

export default function RatingHistoryScreen() {
  const { data: ratingHistory } = useQuery<{
    RatingHistory: {
      comment: string;
      rating: number;
      date: Date;
    }[];
  }>(GET_RATING_HISTORY);
  if (!ratingHistory) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rating History</Text>
      <FlatList
        data={ratingHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ratingContainer}>
            <View style={styles.ratingHeader}>
              <Text style={styles.ratingTitle}>{item.title}</Text>
              <Text style={styles.ratingDate}>{item.date}</Text>
            </View>
            <View style={styles.ratingContent}>
              <Text style={styles.ratingText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  ratingContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    borderRadius: 10,
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingDate: {
    color: "#666",
  },
  ratingContent: {
    marginBottom: 10,
  },
  ratingText: {
    color: "#666",
  },
});
