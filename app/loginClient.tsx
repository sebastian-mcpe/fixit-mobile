import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Box, Button, ButtonText, Center, GluestackUIProvider, Heading, Image, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import Colors from '@/constants/Colors'
import EditScreenInfo from '@/components/EditScreenInfo'
import GenericButton from '@/components/GenericButton'
import GenericInput from '@/components/GenericInput'
import GenericPasswordInput from '@/components/GenericPasswordInput'
import { Link } from 'expo-router'
import Animated from 'react-native-reanimated'
import GoogleButton from '@/components/GoogleButton'

export default function loginClient() {
  return (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <VStack width={'70%'} style={styles.container}>
                <Image alt='' source={require('../assets/images/fixit-logo-h.png')} style={styles.logo}/>
                <Text style={styles.formTitles}>Email:</Text>
                <GenericInput content='Enter your email'/>
                <Text style={styles.formTitles}>Password:</Text>
                <GenericPasswordInput content='Enter your password'/>
                <Link href="forgotPassword" style={[{
                    color: Colors.blue,
                    textAlign: 'right',
                    width: '100%',
                    margin: 5,
                    textDecorationLine: 'underline',
                }]}>Forgot Password?</Link>
                <GenericButton content='Login' color={Colors.blue} tintColor={Colors.light.tint}/>
                <Link href="register" style={[{
                    color: Colors.blue,
                    textAlign: 'left',
                    width: '100%',
                    margin: 5,
                    textDecorationLine: 'underline',
                }]}>Don't have an account?</Link>
                <Text style={[{
                    color: Colors.gray,
                    textAlign: 'center',
                    width: '100%',
                    marginTop: 150,
                    marginBottom: 20
                }]}>Or login with:</Text>
                <GoogleButton/>
            </VStack>
        </SafeAreaView>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea'
    },
    formTitles: {
        fontSize: 16,
        textAlign: 'left',
        width: '100%',
        margin: 5,
    },
    welcomeYellow: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: Colors.yellow
    },
    welcomeBlue: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: Colors.blue
    },
    accesAs: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        width: '100%',
        color: Colors.gray,
        marginTop: 100,
        marginBottom: 20
    },
    logo: {
        resizeMode: 'contain',
        marginBottom: 16,
        width: '100%',
        height: '15%'
    }
})