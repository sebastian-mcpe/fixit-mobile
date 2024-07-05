import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { Text, VStack, Box, Center, HStack, Select, Button, SelectContent, SelectBackdrop, SelectPortal, SelectTrigger, SelectIcon, SelectInput, SelectItem, SelectDragIndicatorWrapper, SelectDragIndicator, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'
import { Ionicons } from '@expo/vector-icons';
import GenericInput from '@/components/GenericInput';
import GenericPasswordInput from '@/components/GenericPasswordInput';
import GenericButton from '@/components/GenericButton';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const profilePhotoUpload = () => {
    const [image, setImage] = useState(String);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <VStack width={'70%'} space='4xl' style={styles.container}>
                    <Pressable onPress={pickImage} style={[styles.PictureBackground, {marginBottom: 200}]}>
                        <Box style={[styles.PictureBackground]}>
                            {
                                !image && <Text style={{ color: '#747474', fontSize: 20 }}>Upload profile picture</Text>
                            }
                            {
                                image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 200 }} />
                            }
                        </Box>
                    </Pressable>
                    <GenericButton content='Complete registration' color={Colors.blue} tintColor={Colors.dark.tint} />
                </VStack>
            </SafeAreaView>
        </GluestackUIProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea'
    },
    PictureBackground: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#c5c5c5',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: 200,
        borderWidth: 2,
        borderColor: '#747474',
    },
});

export default profilePhotoUpload;
