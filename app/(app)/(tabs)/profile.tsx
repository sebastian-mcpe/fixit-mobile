import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Text, ScrollView, GluestackUIProvider, Button } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { config } from '@gluestack-ui/config';
import { useAuth } from '@/context/AuthContext';

const ProfileScreen = () => {
    const { signOut } = useAuth();
    return (
        <GluestackUIProvider config={config}>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: 20 }}>

                    <TouchableOpacity style={styles.option} onPress={() => {
                        router.push('editProfile')
                    }}>
                        <Feather name="edit" size={24} color="black" />
                        <Text style={styles.optionText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="credit-card" size={24} color="black" />
                        <Text style={styles.optionText}>Payment methods</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>History</Text>

                    <TouchableOpacity style={styles.option} onPress={() => {
                        router.push('paymentHistory')
                    }}>
                        <FontAwesome name="dollar" size={24} color="black" />
                        <Text style={styles.optionText}>Payment History</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Ratings</Text>

                    <TouchableOpacity style={styles.option}>
                        <FontAwesome name="star" size={24} color="black" />
                        <Text style={styles.optionText}>Rating history</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Support</Text>

                    <TouchableOpacity style={styles.option} onPress={() => {
                        router.push('support')
                    }}>
                        <Feather name="headphones" size={24} color="black" />
                        <Text style={styles.optionText}>Support</Text>
                    </TouchableOpacity>

                    <Button
                        style={{ marginVertical: 20 }}
                        onPress={() => {
                            console.log('Log Out pressed')
                            signOut()
                            router.replace('../../index')
                        }}
                    >
                        <Text color='white'>Log Out</Text>
                    </Button>
                </View>
            </ScrollView>
        </GluestackUIProvider>
    );
};

const styles = StyleSheet.create({
    option: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f3f3f3',
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 10,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 18,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
})

export default ProfileScreen;
