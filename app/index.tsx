import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Box, Button, ButtonText, Center, GluestackUIProvider, Heading, Image, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import Colors from '@/constants/Colors'
import EditScreenInfo from '@/components/EditScreenInfo'
import GenericButton from '@/components/GenericButton'
import { Link, router } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

export default function index() {
    const { session } = useAuth();
    if (session) {
        router.navigate('home');
    }
  return (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <VStack width={'70%'} style={styles.container}>
                <Image alt='' source={require('@/assets/images/fixit-logo-h.png')} style={styles.logo}/>
                <Heading style={styles.welcome}> Bringing <Heading style={styles.welcomeYellow}>Quality</Heading> and <Heading style={styles.   welcomeBlue}>Trust</Heading> Right to Your Doorstep</Heading>
                <Heading style={styles.accesAs}>Acces as:</Heading>
                <GenericButton content='Client' color={Colors.blue} tintColor={Colors.light.tint} onPress={() => {
                    router.push('loginClient')
                }}/>
                <GenericButton content='Worker' color={Colors.yellow} tintColor={Colors.light.tint} onPress={() => {
                    router.push('loginWorker')
                }}/>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
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