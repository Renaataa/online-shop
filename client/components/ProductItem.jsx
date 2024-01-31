import { View, Image, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";

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

	useEffect(() => {
		dispatch(loadProduct(productId));
	}, []);

	const product = useSelector((store) => store.productReducer.product);
	const user = useSelector((store) => store.userReducer);

	const checkEmail = () => {
		console.log("here");
		if (user.auth) {
			console.log("auth");
			buy(user.email);
		} else {
			console.log("no auth");
			setShowEmailModal(true);
		}
	};

	const buy = (email) => {
		const randomOrderNum = Math.floor(Math.random() * 1000) + 1000;

		const address = "https://api.telegram.org";
		const tokenBot = "6933693870:AAH0wYqM7MqTvjFjhUTnuyREliflYtYCAbY";
		const method = "sendMessage";
		const client = 695269926;
		const text = `*Новый заказ:*_${randomOrderNum}_\n*Email:* \`${email}\`\n*Товар:* ${product.name}`;
		const encodedText = encodeURIComponent(text);

		fetch(
			`${address}/bot${tokenBot}/${method}?chat_id=${client}&parse_mode=MarkdownV2&text=${encodedText}`
		)
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				alert(`You ordered ${product.name}`);
			})
			.catch((error) => {
				console.error("Ошибка:", error);
				alert("Opps... something went wrong");
			});
	};

	// work only in mobile version - ok ??????????????????
	const alert = (message) => {
		Alert.alert("Your purchase", message, [
			{ text: "OK", onPress: () => {} },
		]);
	};

	const getStyles = () => {
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
				margin: 50,
			},
			erorTxt: {
				color: "dimgray",
				fontSize: 18,
				margin: 20,
			},
		};

		return StyleSheet.create(styles);
	};
	const styles = getStyles();

	if (
		useSelector((store) => store.productReducer.stateProduct.state) ==
		StateCode.OK
	) {
		return (
			<Pressable onPress={() => setShowCartModal(false)}>
				<View>
					<View style={styles.productContainer}>
						<View style={styles.imageBlock}>
							<Image
								style={styles.img}
								source={{
									uri: `http://192.168.8.158:5000/${product.img}`,
								}}
							/>
						</View>
						<View style={styles.productInfo}>
							<Text style={styles.productNameTxt}>
								{product.name}
							</Text>
							{product.info ? (
								<ListProductInfo info={product.info} />
							) : (
								<Text></Text>
							)}
							<Text style={styles.txtProductPrice}>
								{product.price} zl
							</Text>
						</View>
					</View>

					<Pressable
						style={{ ...styles.btn, backgroundColor: "#F7E18A" }}
						onPress={() => setShowCartModal(true)}
					>
						<Text style={styles.btnTxt}>Add to cart</Text>
					</Pressable>
					<Pressable style={styles.btn} onPress={checkEmail}>
						<Text style={styles.btnTxt}>Buy</Text>
					</Pressable>

					<ModalAddToCart
						product={product}
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
	} else {
		return (
			<View style={styles.erorContainer}>
				<Text style={styles.erorTxt}>
					"Opps... something went wrong"
				</Text>
				<AntDesign name="frowno" size={30} color="dimgray" />
			</View>
		);
	}
}

export default ProductItem;
