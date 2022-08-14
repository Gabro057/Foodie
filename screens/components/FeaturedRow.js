import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../../sanity";

const FeaturedRow = ({ id, title, description }) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		sanityClient
			.fetch(
				`
        *[_type == "featured" && _id == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type -> {
              name
            }
          }
        }[0]
      `,
				{ id }
			)
			.then((data) => {
				setRestaurants(data?.restaurants);
			});
	}, [id]);

	console.log("restaurants", restaurants);

	return (
		<View>
			<View className='mt-4 flex-row items-center justify-between px-4'>
				<Text className='font-bold text-lg'>{title}</Text>
				<ArrowRightIcon color='#00ccbb' />
			</View>

			<Text className='text-xs text-gray-500 px-4'>{description}</Text>
			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				showsHorizontalScrollIndicator={false}
				className='pt-4'>
				{/* Restaurants */}
				{restaurants?.map((rest) => (
					<RestaurantCard
						key={rest._id}
						id={rest._id}
						imgUrl={rest.image}
						address={rest.address}
						title={rest.name}
						dishes={rest.dishes}
						rating={rest.rating}
						short_description={rest.short_description}
						genre={rest.type?.name}
						long={rest.long}
						lat={rest.lat}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
