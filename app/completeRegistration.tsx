import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GluestackUIProvider, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { BounceInDown, FadeIn, FadeInDown, LightSpeedInLeft, ZoomInEasyUp } from 'react-native-reanimated'
import GenericButton from '@/components/GenericButton'
import { Center } from '@gluestack-ui/themed'

export default function completeRegistration() {
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={[styles.container]}>
                <VStack>
                    <Center>
                        <Animated.View entering={ZoomInEasyUp.springify(1000)}>
                            <Ionicons name="checkmark-circle" size={150} color={Colors.blue} />
                        </Animated.View>
                    </Center>
                    <Animated.Text entering={FadeInDown.delay(250)} style={styles.titles}>Registration Complete</Animated.Text>
                    <Animated.View entering={FadeIn.delay(100)}>
                        <GenericButton content='continue' color={Colors.blue} tintColor={Colors.light.tint} onPress={() => {
                            router.push('home')
                        }} />
                    </Animated.View>
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
    titles: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    }
})