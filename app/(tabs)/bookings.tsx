import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { HStack, SafeAreaView, ScrollView, VStack } from '@gluestack-ui/themed'
import Colors from '@/constants/Colors'

export default function bookings() {
    const [selected, setSelected] = React.useState(0)

    return (
        <SafeAreaView style={[styles.container]}>
            <VStack marginTop={100} width='100%' height='100%' alignItems='center' justifyContent='flex-start'>
                <HStack justifyContent='space-around' width='100%' borderStyle='solid' borderBottomWidth={1} borderColor='#d1d1d1' flexDirection='row'>
                    <Pressable onPress={() => setSelected(0)} style={[{width: '40%'}]}>
                        <Text style={[styles.titles, selected == 0 ? styles.SelectedState : null]}>Upcoming</Text>
                    </Pressable>
                    <Pressable onPress={() => setSelected(1)} style={[{width: '40%'}]}>
                        <Text style={[styles.titles, selected == 1 ? styles.SelectedState : null]}>Previous</Text>
                    </Pressable>
                </HStack>
                <ScrollView width='80%'>
                    <VStack>
                        {
                            selected == 0 ? (
                                <View>
                                    <Text>Upcoming bookings</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text>Previous bookings</Text>
                                </View>
                            )
                        }
                    </VStack>
                </ScrollView>
            </VStack>
        </SafeAreaView>
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