import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { HStack, SafeAreaView, ScrollView, VStack } from '@gluestack-ui/themed'
import Colors from '@/constants/Colors'
import ServiceTile from '@/components/ServiceTile'
import { gql, useQuery } from '@apollo/client'
import { string } from 'yup'

type booking = {
    fecha_Realizacion: Date,
    estado: string
}

const GET_BOOKINGS = gql`
    query GET_BOOKINGS {
    servicios(where: { cliente: { id: { eq: 4 } } }) {
        items {
            estado
            fecha_Realizacion
        }
    }
}
`;

export default function bookings() {
    const [selected, setSelected] = React.useState(0)
    var { loading, error, data } = useQuery<{ servicios: { items: booking[] } }>(GET_BOOKINGS);

    if (loading) return <Text>Loading...</Text>;

    if (error) return <Text>Error! ${error.message}</Text>;

    console.log(data?.servicios.items)

    return (
        <SafeAreaView style={[styles.container]}>
            <VStack marginTop={100} width='100%' height='100%' alignItems='center' justifyContent='flex-start'>
                <HStack justifyContent='space-around' width='100%' borderStyle='solid' borderBottomWidth={1} borderColor='#d1d1d1' flexDirection='row'>
                    <Pressable onPress={() => setSelected(0)} style={[{ width: '30%' }]}>
                        <Text style={[styles.titles, selected == 0 ? styles.SelectedState : null]}>Upcoming</Text>
                    </Pressable>
                    <Pressable onPress={() => setSelected(1)} style={[{ width: '30%' }]}>
                        <Text style={[styles.titles, selected == 1 ? styles.SelectedState : null]}>Previous</Text>
                    </Pressable>
                </HStack>
                <ScrollView width='80%' showsVerticalScrollIndicator={false}>
                    <VStack>
                        {
                            selected == 0 ? (
                                <View>
                                    <VStack>
                                        {
                                            data?.servicios.items.map((item, index: number) => {
                                                if (item.estado == "pendiente") {
                                                    return (
                                                        <ServiceTile date={new Date(item.fecha_Realizacion)} service='Haulage' status={item.estado} key={index} />
                                                    )
                                                }
                                            })
                                        }
                                    </VStack>
                                </View>
                            ) : (
                                <View>
                                    <VStack>
                                        <Text>
                                            Last week:
                                        </Text>
                                        {
                                            data?.servicios.items.map((item, index: number) => {
                                                if (item.estado == "completado") {
                                                    return (
                                                        <ServiceTile date={new Date(item.fecha_Realizacion)} service='Plumbering' status={item.estado} key={index} />
                                                    )
                                                }
                                            })
                                        }
                                    </VStack>
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