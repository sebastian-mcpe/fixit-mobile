import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { GluestackUIProvider, Text, Button, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

const ServiceDescriptionScreen = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  return (
    <GluestackUIProvider config={config}>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Service Description</Text>

          <Text style={styles.label}>Name of person responsible</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter a description..."
            multiline
          />
          <Select>
              <SelectTrigger variant="outline" size="md" style={[{ borderRadius: 7 }]}>
                  <SelectInput placeholder="Select option" />
                  <Ionicons name="chevron-down" size={20} color="gray" style={[{ margin: 10 }]} />
              </SelectTrigger>
              <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                      <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="AC Service" value="AC Service" />
                      <SelectItem label="Haulage" value="Haulage" />
                      <SelectItem label="Gardening" value="Gardening" />
                      <SelectItem label="Technician" value="Technician" />
                      <SelectItem label="Plumber" value="Plumber" />
                  </SelectContent>
              </SelectPortal>
          </Select>
          <Text style={styles.helperText}>Insert Category you wanna request service</Text>

          <Text style={styles.label}>Your address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Home</Text>
            <Feather name="check-circle" size={24} color="#cce5cc" />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.requestLaterButton}
              onPress={() => console.log('Request for later pressed')}
            >
                <Text color='white'>Request for later</Text>
            </Button>
            <Button
              style={styles.requestNowButton} onPress={() => {
                router.push('payment')
            }}
            >
                <Text color='white'>Request Now</Text>
            </Button>
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
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
      height: 100,
    },
    categoryInput: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#007BFF',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 5,
    },
    helperText: {
      fontSize: 14,
      color: '#6c757d',
      marginBottom: 10,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    addressText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    requestLaterButton: {
      backgroundColor: 'black',
    },
    requestNowButton: {
      backgroundColor: Colors.blue,
    }
  })

export default ServiceDescriptionScreen;
