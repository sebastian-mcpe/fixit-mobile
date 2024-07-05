import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GluestackUIProvider, ScrollView, Input, InputField, VStack, InputIcon, HStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { Ionicons } from '@expo/vector-icons'
import GenericButton from '@/components/GenericButton'
import Colors from '@/constants/Colors'

export default function home() {
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
                        <GenericButton content={'Request service'} color={Colors.blue} tintColor={Colors.light.tint}/>
                        <ScrollView horizontal={true} direction='ltr' showsHorizontalScrollIndicator={false}>
                            <HStack>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
                                <Text style={styles.titles}>Services</Text>
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
    }
})