import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Center } from '@gluestack-ui/themed'

export default function _layout() {
    return (
        <Tabs>
            <Tabs.Screen name="home"
                options={
                    {
                        title: '',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#eaeaea'
                        },
                        headerBackground: () => {
                            return (
                                <Center>
                                    <Image
                                        style={[ styles.logo, { height: '70%', aspectRatio: 1, marginTop: 30 } ]}
                                        source={require('@/assets/images/fixit-logo-h.png')} />
                                </Center>
                            )
                        }
                    }
                } />
        </Tabs>
    )
}

const styles = {
    logo: {
        resizeMode: 'contain',
        marginBottom: 16,
        width: '100%',
        height: '15%'
    }
}