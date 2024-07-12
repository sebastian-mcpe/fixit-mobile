import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Center, GluestackUIProvider, Heading, Pressable, ScrollView } from '@gluestack-ui/themed'
import { gql, useQuery } from '@apollo/client';
import { router } from 'expo-router';

const GET_DOGS = gql`
    query default {
      categoriasServicios {
        items {
          imagen
          nombre
        }
      }
    }
`;

type Servicio = {
    imagen: string,
    nombre: string
}

export default function allServices() {
    var { loading, error, data } = useQuery<{ categoriasServicios: { items: Servicio[] } }>(GET_DOGS);

    if (loading) return <Text>Loading...</Text>;

    if (error) return <Text>Error! ${error.message}</Text>;

    console.log(data?.categoriasServicios.items)

    return (
        <GluestackUIProvider>
            <SafeAreaView>
                <ScrollView>
                    <Center flexDirection='row' flexWrap='wrap' paddingHorizontal={'5%'}>
                        {data?.categoriasServicios.items.map((item, index: number) => {
                            return (
                                <Pressable key={index} width={'50%'} marginVertical={20} onPress={() => {
                                    router.push('requestService')
                                }}>
                                    <Image source={
                                        {
                                            uri: item.imagen
                                        }
                                    } style={[styles.imageShowcase, {
                                        height: 100,
                                        aspectRatio: 17 / 10,
                                        borderRadius: 20
                                    }]} />
                                    <Heading textAlign='center' width={'100%'} fontSize={16}>{item.nombre}</Heading>
                                </Pressable>
                            )
                        })}
                    </Center>
                </ScrollView>
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
    },
    imageShowcase: {
        aspectRatio: 3 / 2,
        height: 150,
        borderRadius: 20
    },

})