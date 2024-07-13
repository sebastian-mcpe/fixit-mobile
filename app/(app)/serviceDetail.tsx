import React from 'react';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const serviceDetail = () => {
  const theme = useTheme();
  const route = useRoute()
  const id = Number((route.params as {[key: string]: any}).id)
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ borderRadius: 8, padding: 16 }}>
        <Image
          source={{ uri: 'https://your-image-url.com/image.png' }} // Replace with your image URL
          style={{ width: '100%', height: 150, borderRadius: 8 }}
        />
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>
          AC service
        </Text>
        <Text style={{ fontSize: 14 }}>
          Completed
        </Text>
        <Text style={{ fontSize: 14 }}>
          13/06/2024
        </Text>
        <Text style={{ fontSize: 14 }}>
          200 DOP
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Image
            source={{ uri: 'https://your-profile-url.com/profile.jpg' }} // Replace with profile image URL
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 14 }}>
              Alberto Gutierrez
            </Text>
            <Text style={{ fontSize: 12 }}>
              View profile
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 14, marginTop: 16 }}>
          Description
        </Text>
        <Text style={{ fontSize: 14 }}>
          asdhfaskdfhasdkfhasop;djfhas;iodjklhcfnasdjk;fnhjadskil;bfnlakjsaiinkjlnkljnkljkljl’lkefrvn;oslejkdnfliksbfaislhkdjbnickljansop;dlcnkaonasdf;ajsndf.
        </Text>
        <Text style={{ fontSize: 14 }}>
          a’ldsknfaspdo;jlkfnmao;kdfjna;okjdnicslijuobgadskjbnjvasdip;naopdasdlkvncoa;dkln;aipdjsfbkuvl.hukaoydbsfvgluoiygerfbadvsucl.uoeyhgba.lduehosygbfvrchyugb.
        </Text>
        <Text style={{ fontSize: 14, marginTop: 16 }}>
          Rating
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {[...Array(5)].map((_, index) => (
            <Ionicons key={index} name="star-outline" size={24} />
          ))}
        </View>
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}
          >
            <Text>
              Share Feedback
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default serviceDetail;
