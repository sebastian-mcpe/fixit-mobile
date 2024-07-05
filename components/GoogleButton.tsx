import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, HStack, VStack, Box, Button, ButtonText } from '@gluestack-ui/themed';
import Colors from '@/constants/Colors';

const GoogleLoginButton = (props: { onPress?: () => void }) => {

  const styles = StyleSheet.create({
    button: {
      width: '100%',
      borderRadius: 50,
      backgroundColor: 'transparent',
      color: Colors.light.tint,
      borderColor: Colors.gray,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    text: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })

  return (
    <Button style={styles.button} onPress={props.onPress}>
      <HStack alignItems="center" justifyContent="center">
        <Image source={require('../assets/images/google-icon.png')} style={styles.icon} />
        <ButtonText style={styles.text}>Login with Google</ButtonText>
      </HStack>
    </Button>
  );
};

export default GoogleLoginButton;
