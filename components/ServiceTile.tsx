import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { Center, GluestackUIProvider, Heading, HStack, SafeAreaView, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import Colors from '@/constants/Colors'

export default function ServiceTile(props: { date: Date, service: string, status: string}) {
    return (
        <GluestackUIProvider config={config}>
            <View>
                <Center marginBottom={10} marginTop={10} alignItems='center' justifyContent='center' backgroundColor='#aeb6dd' width='100%' height={120} borderRadius={20} padding={'2%'}>
                    <VStack>
                        <HStack justifyContent='space-between' width='100%' alignItems='flex-start' padding={10}>
                            <Text color='black' style={[{width: '30%', fontSize: 18, fontWeight: 'bold'}]}>{props.date.toDateString()}</Text>
                            <Text color='black'>{props.service}</Text>
                        </HStack>
                        <HStack justifyContent='space-between' width='100%' alignItems='flex-end' padding={10}>
                            <Text>{props.status}</Text>
                            <Pressable onPress={() => router.push('serviceDetail')}>
                                <Text style={{ color: Colors.blue }}>View details</Text>
                            </Pressable>
                        </HStack>
                    </VStack>
                </Center>
            </View>
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
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        margin: 0,
        width: '100%'
    },
    imageShowcase: {
        aspectRatio: 3 / 2,
        height: 150,
        borderRadius: 20
    },
    SelectedState: {
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderColor: Colors.blue
    }
})