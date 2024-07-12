import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { router } from 'expo-router';

const PaymentHistoryScreen = () => {
  const paymentData = [
    {
      id: '1',
      date: '2024-07-01',
      amount: '$50.00',
      status: 'Completed',
    },
    {
      id: '2',
      date: '2024-06-15',
      amount: '$75.00',
      status: 'Pending',
    },
    {
      id: '3',
      date: '2024-06-01',
      amount: '$100.00',
      status: 'Completed',
    },
  ];

  return (
    <GluestackUIProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ padding: 20 }}>

          <FlatList
            data={paymentData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.paymentItem}>
                <Text style={styles.paymentDate}>{item.date}</Text>
                <Text style={styles.paymentAmount}>{item.amount}</Text>
                <Text style={styles.paymentStatus}>{item.status}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    paymentItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      marginVertical: 5,
    },
    paymentDate: {
      fontSize: 16,
      color: '#333',
    },
    paymentAmount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    paymentStatus: {
      fontSize: 16,
      color: '#007BFF',
    },
    separator: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 5,
    }
  })

export default PaymentHistoryScreen;
