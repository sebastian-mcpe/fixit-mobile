import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { GluestackUIProvider, ScrollView, Input, InputField, VStack, InputIcon, HStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { Ionicons } from '@expo/vector-icons'
import GenericButton from '@/components/GenericButton'
import Colors from '@/constants/Colors'
import { gql, useQuery } from '@apollo/client';
import ServicesHighlight from '@/components/ServicesHighlight'

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

export default function home() {
    var { loading, error, data } = useQuery<{ categoriasServicios: { items: Servicio[] } }>(GET_DOGS);

    if (loading) return <Text>Loading...</Text>;

    if (error) return <Text>Error! ${error.message}</Text>;

    console.log(data?.categoriasServicios.items)

    return (
        <GluestackUIProvider config={config}>
            <ScrollView>
                <View style={[{ alignItems: 'center' }]}>
                    <VStack w="90%" mb={16} >
                        <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={true} style={[{ alignItems: 'center' }]}>
                            <Ionicons name="location" style={[{ margin: 5 }]} size={18} color="black" />
                            <InputField
                                placeholder='Your current location'
                            />
                        </Input>
                        <GenericButton content={'Request service'} color={Colors.blue} tintColor={Colors.light.tint} />
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={[{ marginTop: 10 }]}>
                            <HStack space='lg' gap={30}>
                                {data?.categoriasServicios.items.map((item, index: number) => {
                                    return (
                                        <Pressable key={index}>
                                            <Image source={
                                                {
                                                    uri: item.imagen
                                                }
                                            } style={styles.imageShowcase} />
                                        </Pressable>
                                    )
                                })}
                            </HStack>
                        </ScrollView>

                    </VStack>
                    <ServicesHighlight />
                    <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
                        <View>

                            <Image source={require('@/assets/images/star-review.jpg')} style={{
                                height: 100,
                                width: 170,
                                borderRadius: 20
                            }} />
                            <Text style={{marginLeft: 10, fontFamily: "Roboto", fontSize: 14}}>Ratings Ranking</Text>
                        </View>
                        <View>

                            <Image source={require('@/assets/images/desinfection.jpg')} style={{
                                height: 100,
                                width: 170,
                                borderRadius: 20
                            }} />
                            <Text style={{marginLeft: 10, fontFamily: "Roboto", fontSize: 14}}>Desinfection services</Text>
                        </View>
                    </View>
                        <GenericButton style={{width: "90%", borderRadius: 5}} content={'View all services'} color={Colors.blue} tintColor={Colors.light.tint} />
                </View>
            </ScrollView>
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