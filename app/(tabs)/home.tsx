import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { GluestackUIProvider, ScrollView, Input, InputField, VStack, InputIcon, HStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { Ionicons } from '@expo/vector-icons'
import GenericButton from '@/components/GenericButton'
import Colors from '@/constants/Colors'
import { gql, useQuery } from '@apollo/client';

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

export default function home() {
    var { loading, error, data } = useQuery(GET_DOGS);

    if (loading) return <Text>Loading...</Text>;

    if (error) return <Text>Error! ${error.message}</Text>;

    console.log(data.categoriasServicios.items)

    return (
        <GluestackUIProvider config={config}>
            <ScrollView>
                <View style={[{ alignItems: 'center' }]}>
                    <VStack style={[{ width: '90%' }]}>
                        <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={true} style={[{ alignItems: 'center' }]}>
                            <Ionicons name="location" style={[{ margin: 5 }]} size={18} color="black" />
                            <InputField
                                placeholder='Your current location'
                            />
                        </Input>
                        <GenericButton content={'Request service'} color={Colors.blue} tintColor={Colors.light.tint} />
                        <ScrollView horizontal={true} direction='ltr' showsHorizontalScrollIndicator={false} style={[{ marginTop: 10 }]}>
                            <HStack space='lg'>
                                {data.categoriasServicios.items.map((item: any, index: number) => {
                                    return (
                                        <Pressable>
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
    }
})