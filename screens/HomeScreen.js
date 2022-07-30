import React, { useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdjustmentsIcon, ChevronDownIcon, UserIcon, SearchIcon } from "react-native-heroicons/outline";
// Components
import Categories from './components/Categories';
import FeaturedRow from './components/FeaturedRow';

const HomeScreen = () => {
  const basicClr = "#00ccbb"
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: "TESTING"
    })
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">      
        {/* HEADER */}
        <View className="flex flex-row pb-3 items-center mx-4 space-x-2 px-4">
          <Image source={{ uri: 'https://links.papareact.com/wru' }} className='h-7 w-7 bg-gray-300 p-4 rounded-full' />
        
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
            <Text className="font-bold text-xl">
              Current Location!
              <ChevronDownIcon size={20} color={basicClr} />
            </Text>            
          </View>

          <UserIcon size={35} color={basicClr} />
        </View>
        {/* SEARCH */}
        <View className="flex flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <SearchIcon color='gray' size={20}/>
            <TextInput placeholder="Restaurants and cuisines" keyboardType='default' />
          </View>
          <AdjustmentsIcon color={basicClr} />
        </View>

        {/* BODY */}
        <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Categories */}
          <Categories />
          {/* Fetured rows */}
          <FeaturedRow id="123" title="Featured" description="Paid placements from our partners" featuredCategory="featured"/>
          {/* Tasty Discounts */}
          <FeaturedRow id="1234" title="Tasty Discounts" description="Everyone's been enjoying these juicy discounts!" featuredCategory="discounts"/>
          {/* Offers near you */}
          <FeaturedRow id="12345" title="Offers near you!" description="Why not support your local restaurant tonight!" featuredCategory="offers"/>
        </ScrollView>     
    </SafeAreaView>
  );
}

export default HomeScreen