import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text, VStack, Box, Center, HStack, Select, Button, SelectContent, SelectBackdrop, SelectPortal, SelectTrigger, SelectIcon, SelectInput, SelectItem, SelectDragIndicatorWrapper, SelectDragIndicator, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'
import { Ionicons } from '@expo/vector-icons';
import GenericInput from '@/components/GenericInput';
import GenericPasswordInput from '@/components/GenericPasswordInput';
import GenericButton from '@/components/GenericButton';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

const RegisterScreen = () => {
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <VStack width={'85%'} space='lg' style={styles.container}>
                    <Image alt='' source={require('@/assets/images/fixit-logo-h.png')} style={styles.logo} />
                    <Box style={[{ width: '100%' }]}>
                        <Select defaultValue='client'>
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
                                    <SelectItem label="Client" value="client" />
                                    <SelectItem label="Worker" value="worker" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                        <Text style={styles.instructions}>Insert if you wanna register as a client or a worker</Text>
                    </Box>
                    <HStack flexDirection='row' gap={5}>
                        <GenericInput style={{flex: 1}} content='First Name' />
                        <GenericInput style={{flex: 1}} content='Last Name' />
                    </HStack>
                    <GenericInput content='Email' />
                    <Box>
                        <GenericPasswordInput content='Password' style={[{ marginBottom: 0 }]} />
                        <Text style={styles.passwordInstructions}>Password must contain 8 char.</Text>
                    </Box>
                    <GenericPasswordInput content='Confirm Password' />
                    <GenericButton content='Create Account' color={Colors.blue} tintColor={Colors.dark.tint} onPress={()=>{
                        router.push('profilePhotoUpload')
                    }} />
                    <Text style={styles.terms}>
                        By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
                    </Text>
                </VStack>
            </SafeAreaView>
        </GluestackUIProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea'
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    select: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    instructions: {
        color: '#888',
        marginTop: 0,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    passwordInstructions: {
        color: '#888',
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    createAccountButton: {
        backgroundColor: '#003366',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    terms: {
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
    link: {
        color: '#1E90FF',
    },
    logo: {
        resizeMode: 'contain',
        marginBottom: 16,
        width: '100%',
        height: '10%'
    }
});

export default RegisterScreen;
