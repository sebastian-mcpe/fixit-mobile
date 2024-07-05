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

export default function forgotPassword() {
  return (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <VStack width={'70%'} style={styles.container}>
                <Image alt='' source={require('../assets/images/fixit-logo-h.png')} style={styles.logo}/>
                <Text style={styles.formTitles}>Enter the email asociated with your account:</Text>
                <GenericInput content='Enter your email' style={{marginBottom: 100}}/>
                <GenericButton content={'Send link'} color={Colors.blue} tintColor={Colors.light.tint}/>
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
        height: '10%'
    }
})