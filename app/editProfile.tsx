import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { GluestackUIProvider, Button } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

const EditProfileScreen = () => {
  const [name, setName] = useState('string');
  const [email, setEmail] = useState('string@gmail.com');
  const [password, setPassword] = useState('************');
  const [dob, setDob] = useState('23/05/1995');
  const [country, setCountry] = useState('Dominican Republic');

  return (
    <GluestackUIProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#eaeaea' }}>
        <View style={{ padding: 20 }}>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Image
              source={{ uri: 'https://www.dropbox.com/scl/fi/1y9xkquhh1cs4yd2ymamk/image-65.png?rlkey=8lfiar6g8dw45i8egnh10t4a9&st=3m4wxogm&dl=1' }} // Cambia esta URL por la de tu imagen
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>
          <Text style={styles.title}>Edit Profile</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              editable={false}
              secureTextEntry
            />
            <Button
              style={styles.changePasswordButton}
              onPress={() => console.log('Change password pressed')}
            >
                <Text style={{ color: 'white' }}>Change password</Text>
            </Button>
          </View>

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
          />

          <Text style={styles.label}>Country/Region</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
          />

          <Button
            style={styles.saveButton}
            onPress={() => console.log('Save changes pressed')}
          >
            <Text style={{ color: 'white' }}>Save changes</Text>
          </Button>
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
      marginBottom: 20,
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
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    changePasswordButton: {
      marginLeft: 10,
      backgroundColor: Colors.blue,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      backgroundColor: '#0036e3',
      padding: 5,
      borderRadius: 20,
    },
    saveButton: {
      marginTop: 20,
      backgroundColor: Colors.blue,
      alignItems: 'center',
    }
  })

export default EditProfileScreen;
