import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "TESTING"
    })
  }, [])

  return (
    <View>
      <Text className="text-red-500">Home Screen</Text>
    </View>
  );
}

export default HomeScreen