import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { router } from 'expo-router';

const SupportScreen = () => {
  return (
    <GluestackUIProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ padding: 20 }}>

          <Text style={styles.subtitle}>Contact Us</Text>
          <Text style={styles.description}>
            If you have any questions or need assistance, feel free to reach out to our support team.
          </Text>

          <View style={styles.contactItem}>
            <Feather name="phone" size={24} color="black" />
            <Text style={styles.contactText}>+1 234 567 890</Text>
          </View>

          <View style={styles.contactItem}>
            <Feather name="mail" size={24} color="black" />
            <Text style={styles.contactText}>support@example.com</Text>
          </View>

          <View style={styles.contactItem}>
            <Feather name="map-pin" size={24} color="black" />
            <Text style={styles.contactText}>123 Proceres, Santo Domingo, Dominican Republic</Text>
          </View>
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
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    contactText: {
      fontSize: 16,
      marginLeft: 10,
    }
  })

export default SupportScreen;
