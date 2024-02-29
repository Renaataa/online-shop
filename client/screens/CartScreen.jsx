import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "../components/ProductCard";

const CartScreen = () => {
	const [cartProducts, setCartProducts] = useState([]);

	const retrieveData = useCallback(async () => {
		try {
			const cartProductsJson = await AsyncStorage.getItem("cartProducts");
			if (cartProductsJson !== null) {
				setCartProducts(JSON.parse(cartProductsJson));
			}
		} catch (error) {
			console.log(error, "do not receive data from AsyncStorage");
		}
	}, []);

	useEffect(() => {
		retrieveData();
	}, []);

	const getStyles = useCallback(() => {
		const styles = {
			listProducts: {
				flexGrow: 1,
				borderWidth: 1,
			},
			pagination: {
				textAlign: "center",
				fontSize: 17,
				fontWeight: "500",
			},
			container: {
				flexGrow: 1,
				justifyContent: "flex-start",
				margin: 20,
			},
		};

		return StyleSheet.create(styles);
	}, []);
	const styles = getStyles();

	if (cartProducts != null) {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.listProducts}
					data={cartProducts}
					keyExtractor={(product) => product.product.id}
					renderItem={({ item }) => {
						return (
							<ProductCard key={item.product.id} product={item.product} />
						);
					}}
				/>
			</View>
		);
	}
};

export default CartScreen;
