import { View, Image, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../store/slices/productSlice";
import ModalAddToCart from "./ModalAddToCart";
import ModalAskEmail from "./ModalAskEmail";
import ListProductInfo from "./ListProductInfo";
import { StateCode } from "../enums/EnumState";
import { AntDesign } from "@expo/vector-icons";

function ProductItem({ productId }) {
	const dispatch = useDispatch();
	const [showCartModal, setShowCartModal] = useState(false);
	const [showEmailModal, setShowEmailModal] = useState(false);
	const [cartProducts, setCartProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(loadProduct(productId));
	}, []);

	const productState = useSelector((store) => store.productReducer);
	const user = useSelector((store) => store.userReducer);

	const checkEmail = useCallback(() => {
		console.log("check");
		if (user.auth) {
			buy(user.email);
		} else {
			setShowEmailModal(true);
		}
	}, [user]);

	const buy = useCallback(
		(email) => {
			const randomOrderNum = Math.floor(Math.random() * 1000) + 1000;

			const address = "https://api.telegram.org";
			const tokenBot = "6933693870:AAH0wYqM7MqTvjFjhUTnuyREliflYtYCAbY";
			const method = "sendMessage";
			const client = 695269926;
			const text = `*Новый заказ:*_${randomOrderNum}_\n*Email:* \`${email}\`\n*Товар:* ${productState.product.name}`;
			const encodedText = encodeURIComponent(text);

			fetch(
				`${address}/bot${tokenBot}/${method}?chat_id=${client}&parse_mode=MarkdownV2&text=${encodedText}`
			)
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					alert(`You ordered ${productState.product.name}`);
				})
				.catch((error) => {
					console.error("Ошибка:", error);
					alert("Opps... something went wrong");
				});
		},
		[productState]
	);

	const alert = useCallback((message) => {
		Alert.alert("Your purchase", message, [{ text: "OK", onPress: () => {} }]);
	}, []);

	const getCartProducts = useCallback(async () => {
		//AsyncStorage.removeItem("cartProducts");
		try {
			const cartProductsJson = await AsyncStorage.getItem("cartProducts");
			if (cartProductsJson !== null) {
				setCartProducts(JSON.parse(cartProductsJson));
			}
		} catch (error) {
			console.log(error, "do not receive data from AsyncStorage");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getCartProducts();
	}, []);

	const addToCart = (cartProducts, setCartProducts, productState) => {
		if (cartProducts != []) {
			const indexSameProduct = cartProducts.findIndex(
				(product) => product.product.id == productState.product.id
			);

			if (indexSameProduct > -1) {
				const cartProductsCopy = [...cartProducts];
				cartProductsCopy[indexSameProduct].count++;
				setCartProducts(cartProductsCopy);
			} else {
				setCartProducts([
					...cartProducts,
					{ count: 1, product: productState.product },
				]);
			}
		} else {
			setCartProducts([{ count: 1, product: productState.product }]);
		}
	};

	//вхожу сюда при открытии каждого продукта а не только при изменении cartProducts
	useEffect(() => {
		const cartProductsJson = JSON.stringify(cartProducts);
		AsyncStorage.setItem("cartProducts", cartProductsJson);
	}, [cartProducts]);

	const getStyles = useCallback(() => {
		const styles = {
			productContainer: {
				flexDirection: "row",
				width: "100%",
			},
			productInfo: {
				justifyContent: "space-between",
				paddingHorizontal: 10,
				width: "50%",
			},
			img: {
				width: "100%",
				height: 250,
				resizeMode: "contain",
				backgroundColor: "white",
			},
			btn: {
				alignSelf: "center",
				alignItems: "center",
				justifyContent: "center",
				marginTop: 25,
				width: "95%",
				height: 40,
				backgroundColor: "#F99A6B",
				borderRadius: 20,
			},
			btnTxt: {
				fontWeight: "bold",
				textAlign: "center",
			},
			productNameTxt: {
				width: "100%",
				fontSize: 27,
				fontWeight: "bold",
			},
			imageBlock: {
				width: "50%",
			},
			txtProductPrice: {
				fontSize: 20,
				fontWeight: "600",
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

	if (
		productState.stateProduct.state == StateCode.OK &&
		Object.keys(productState.product).length != 0 &&
		!loading
	) {
		return (
			<Pressable onPress={() => setShowCartModal(false)}>
				<View>
					<View style={styles.productContainer}>
						<View style={styles.imageBlock}>
							<Image
								style={styles.img}
								source={{
									uri: `http://192.168.8.158:5000/${productState.product.img}`,
								}}
							/>
						</View>
						<View style={styles.productInfo}>
							<Text style={styles.productNameTxt}>
								{productState.product.name}
							</Text>
							{productState.product.info ? (
								<ListProductInfo info={productState.product.info} />
							) : (
								<Text></Text>
							)}
							<Text style={styles.txtProductPrice}>
								{productState.product.price} zl
							</Text>
						</View>
					</View>

					<Pressable
						style={{ ...styles.btn, backgroundColor: "#F7E18A" }}
						onPress={() => {
							addToCart(cartProducts, setCartProducts, productState);

							setShowCartModal(true);
						}}
					>
						<Text style={styles.btnTxt}>Add to cart</Text>
					</Pressable>
					<Pressable style={styles.btn} onPress={checkEmail}>
						<Text style={styles.btnTxt}>Buy</Text>
					</Pressable>

					<ModalAddToCart
						product={productState.product}
						changeShowModal={(value) => setShowCartModal(value)}
						active={showCartModal}
					/>
					<ModalAskEmail
						buy={buy}
						changeShowModal={(value) => setShowEmailModal(value)}
						active={showEmailModal}
					/>
				</View>
			</Pressable>
		);
	} else if (
		productState.stateProduct.state == StateCode.Error ||
		Object.keys(productState.product).length == 0
	) {
		return (
			<View style={styles.erorContainer}>
				<Text style={styles.erorTxt}>"Opps... something went wrong"</Text>
				<AntDesign name="frowno" size={30} color="dimgray" />
			</View>
		);
	} else {
		return (
			<View style={styles.erorContainer}>
				<Text style={styles.erorTxt}>Product loading...</Text>
			</View>
		);
	}
}

export default ProductItem;
