import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "../components/ProductCard";

const CartScreen = () => {
	const [cartProducts, setCartProducts] = useState([]);

	const updateItemCount = useCallback(
		async (operation, productId) => {
			try {
				const indexProduct = cartProducts.findIndex(
					(product) => product.product.id == productId
				);
				const cartProductsCopy = [...cartProducts];

				switch (operation) {
					case "+":
						cartProductsCopy[indexProduct].count++;
						break;
					case "-":
						if (cartProductsCopy[indexProduct].count == 1)
							cartProductsCopy.splice(indexProduct, 1);
						else cartProductsCopy[indexProduct].count--;
						break;
				}
				setCartProducts(cartProductsCopy);
			} catch (error) {
				console.log(error, "cannot update data in AsyncStorage");
			}
		},
		[cartProducts]
	);

	const getCartProducts = useCallback(async () => {
		try {
			//AsyncStorage.removeItem("cartProducts");
			const cartProductsJson = await AsyncStorage.getItem("cartProducts");
			if (cartProductsJson !== null) {
				const parsed = JSON.parse(cartProductsJson);
				setCartProducts(parsed);
			}
		} catch (error) {
			console.log(error, "do not receive data from AsyncStorage");
		}
	}, []);

	useEffect(() => {
		getCartProducts();
	}, []);

	useEffect(() => {
		AsyncStorage.setItem("cartProducts", JSON.stringify(cartProducts));
	}, [cartProducts]);

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
			productCard: {
				position: "relative",
			},
			conteinerItemCount: {
				flexDirection: "row",
				width: "30%",
				height: 30,
				borderWidth: 1,
				borderColor: "black",
				position: "absolute",
				right: 11,
				bottom: 10,
			},
			itemCount: {
				width: "25%",
				alignSelf: "center",
				textAlign: "center",
				fontSize: 25,
			},
			erorContainer: {
				alignItems: "center",
				marginVertical: 50,
			},
			erorTxt: {
				textAlign: "center",
				marginBottom: 20,
				fontSize: 17,
				color: "dimgray",
			},
		};

		return StyleSheet.create(styles);
	}, []);
	const styles = getStyles();

	if (cartProducts.length != 0) {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.listProducts}
					data={cartProducts}
					keyExtractor={(product) => product.product.id}
					renderItem={({ item }) => {
						return (
							<View>
								<ProductCard
									style={styles.productCard}
									key={item.product.id}
									product={item.product}
								/>
								<Pressable style={styles.conteinerItemCount}>
									<Pressable
										style={styles.itemCount}
										onPress={() => {
											item.count > 0
												? updateItemCount("-", item.product.id)
												: "";
										}}
									>
										<Text style={{ textAlign: "center" }}>-</Text>
									</Pressable>
									<Text
										style={{
											...styles.itemCount,
											width: "50%",
											fontSize: 15,
											borderLeftWidth: 1,
											borderRightWidth: 1,
											borderColor: "black",
										}}
									>
										{item.count}
									</Text>
									<Pressable
										color={"#EE7100"}
										style={{
											...styles.itemCount,
											fontSize: 20,
										}}
										onPress={() =>
											updateItemCount("+", item.product.id)
										}
									>
										<Text style={{ textAlign: "center" }}>+</Text>
									</Pressable>
								</Pressable>
							</View>
						);
					}}
				/>
			</View>
		);
	} else {
		return (
			<View style={styles.erorContainer}>
				<Text style={styles.erorTxt}>There are no products in the cart</Text>
			</View>
		);
	}
};

export default CartScreen;
