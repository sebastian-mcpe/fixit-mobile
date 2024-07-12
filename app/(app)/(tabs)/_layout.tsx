import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Center, VStack } from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
    return (
        <Tabs initialRouteName='home'>
        <Tabs.Screen name="home"
            options={
                {
                    title: 'home',
                    headerTintColor: 'transparent',
                    tabBarLabelStyle: {
                        color: 'black'
                    },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#eaeaea'
                    },
                    headerBackground: () => {
                        return (
                            <Center alignItems='center'>
                                <Image
                                    style={[styles.logo, { height: '70%', aspectRatio: 1, marginTop: 30 }]}
                                    source={require('@/assets/images/fixit-logo-h.png')} />
                            </Center>
                        )
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Center alignItems='center' justifyContent='center' marginTop={0}>
                                <Ionicons name={focused ? "home" : "home-outline"} size={20} color='black' />
                            </Center>
                        )
                    }
                }
            } />

            <Tabs.Screen name="bookings"
                options={
                    {
                        title: 'Bookings',
                        tabBarLabelStyle: {
                            color: 'black'
                        },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Center alignItems='center' justifyContent='center' marginTop={0}>
                                    <Ionicons name={focused ? "book" : "book-outline"} size={20} color='black' />
                                </Center>
                            )
                        }
                    }
                } />

                <Tabs.Screen name="profile"
                    options={
                        {
                            title: 'Profile',
                            tabBarLabelStyle: {
                                color: 'black'
                            },
                            headerShown: true,
                            headerTitleAlign: 'center',
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <Center alignItems='center' justifyContent='center' marginTop={0}>
                                        <Ionicons name={focused ? "person" : "person-outline"} size={20} color='black' />
                                    </Center>
                                )
                            }
                        }
                    } />
        </Tabs>
    )
}

const styles = StyleSheet.create( {
    logo: {
        resizeMode: 'contain',
        marginBottom: 16,
        width: '100%',
        height: '15%'
    }
})