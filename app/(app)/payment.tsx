import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Box, Button, CircleIcon, GluestackUIProvider, Icon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, VStack, Text } from '@gluestack-ui/themed';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { config } from '@gluestack-ui/config';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

const PaymentOptionScreen = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <VStack space={'lg'} mt={5}>
                    <Text style={styles.sectionHeader}>UPI</Text>
                    <RadioGroup
                        value={selectedOption}
                        onChange={(value) => setSelectedOption(value)}
                    >
                        <Radio value="paytm" size="md" my={1}>
                            <RadioIndicator mr="$2">
                                <Ionicons name="ellipse" color="black" />
                            </RadioIndicator>
                            <RadioLabel>Paytm</RadioLabel>
                        </Radio>
                        <Radio value="phonePe" size="md" my={1}>
                            <RadioIndicator mr="$2">
                                <Ionicons name="ellipse" color="black" />
                            </RadioIndicator>
                            <RadioLabel>PhonePe</RadioLabel>
                        </Radio>
                        <Radio value="gpay" size="md" my={1}>
                            <RadioIndicator mr="$2">
                                <Ionicons name="ellipse" color="black" />
                            </RadioIndicator>
                            <RadioLabel>Google Pay</RadioLabel>
                        </Radio>
                    </RadioGroup>

                    <Text style={styles.sectionHeader}>Cards</Text>
                    <RadioGroup
                        value={selectedOption}
                        onChange={(value) => setSelectedOption(value)}
                    >
                        <VStack space={'sm'}>
                            <Box flexDirection="row" alignItems="center" my={1}>
                                <Radio value="card" size="md">
                                    <Box flexDirection="row" alignItems="center">
                                        <Ionicons name="card" size={24} color="black" />
                                        <Text> ************2575</Text>
                                    </Box>
                                </Radio>
                            </Box>
                        </VStack>
                    </RadioGroup>

                    <Text style={styles.sectionHeader}>Cash</Text>
                    <RadioGroup
                        value={selectedOption}
                        onChange={(value) => setSelectedOption(value)}
                    >
                        <VStack space={'sm'}>
                            <Radio value="cash" size="md" my={1}>
                                <Text>Cash</Text>
                            </Radio>
                        </VStack>
                    </RadioGroup>
                </VStack>

                <Button
                    mt={10}
                    onPress={() => {
                        router.push('succesfullPayment');
                    }}
                    isDisabled={!selectedOption}
                    backgroundColor={Colors.blue}
                >
                    <Text color='white'>Proceed</Text>
                </Button>
            </SafeAreaView>
        </GluestackUIProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sectionHeader: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default PaymentOptionScreen;