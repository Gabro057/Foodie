import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { Component } from "react";

const CategoryCard = ({ imgUrl, title = "" }) => {
	console.log("categoryCard img=" + imgUrl);

	return (
		<TouchableOpacity className='relative mr-2'>
			<Image className='h-20 w-20 rounded' source={{ uri: imgUrl }} />
			<Text className='absolute bottom-1 left-1 text-white font-bold'>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CategoryCard;
