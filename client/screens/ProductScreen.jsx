import { View } from "react-native";
import { useEffect } from "react";
import ProductItem from "../components/ProductItem";

export default function ProductScreen({ route, navigation }) {
	const { productId, title } = route.params;

	useEffect(() => {
		navigation.setOptions({
			title: title,
		});
	}, []);

	return (
		<View>
			<ProductItem productId={productId} />
		</View>
	);
}
