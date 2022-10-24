import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItems,
	selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);
	const dispatch = useDispatch();
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

	//useMemo(() => {
	useEffect(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<View className='flex-1 bg-gray-100'>
				<View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
					<View>
						<Text className='text-lg font-bold text-center'>Basket</Text>
						<Text className='text-center text-gray-400'>
							{restaurant.title}
						</Text>
					</View>

					<TouchableOpacity
						onPress={navigation.goBack}
						className='absolute rounded-full bg-gray-100 top-3 right-5'>
						<XCircleIcon color='#00ccbb' height={50} width={50} />
					</TouchableOpacity>
				</View>
				<View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
					<Image
						className='h-7 w-7 bg-gray-300 p-4 rounded-full'
						source={{ uri: "https://links.papareact.com/wru" }}
					/>
					<Text className='flex-1'>Doručíme během 50-75 minut</Text>
					<TouchableOpacity>
						<Text className='text-[#00ccbb]'>Změnit</Text>
					</TouchableOpacity>
				</View>

				<ScrollView className='divide-y divide-gray-200'>
					{Object.entries(groupedItemsInBasket).map(([key, items]) => (
						<View
							key={key}
							className='flex-row items-center space-x-3 bg-white py-2 px-5'>
							<Text className='text-[#00ccbb]'>{items.length} x</Text>
							<Image
								source={{ uri: urlFor(items[0]?.image).url() }}
								className='h-12 w-12 rounded-full'
							/>
							<Text className='flex-1'>{items[0]?.name}</Text>

							<Text className='text-gray-600'>
								<Currency quantity={items[0]?.price} currency='CZK' />
							</Text>

							<TouchableOpacity>
								<Text
									className='text-[#00ccbb] text-xs'
									onPress={() => dispatch(removeFromBasket({ id: key }))}>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>

				<View className='p-5 bg-white mt-5 space-y-4'>
					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Mezisoučet</Text>
						<Text className='text-gray-400'>
							<Currency quantity={basketTotal} currency='CZK' />
						</Text>
					</View>

					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Doprava</Text>
						<Text className='text-gray-400'>
							<Currency quantity={50} currency='CZK' />
						</Text>
					</View>

					<View className='flex-row justify-between'>
						<Text>Součet</Text>
						<Text className='font-extrabold'>
							<Currency quantity={basketTotal + 50} currency='CZK' />
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate("PreparingOrderScreen")}
						className='rounded-lg bg-[#00ccbb] p-4'>
						<Text className='text-center text-white text-lg font-bold'>
							Objednejte si
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;
