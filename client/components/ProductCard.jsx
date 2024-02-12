import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useCallback } from "react";

const ProductCard = ({ product, navigation, imgSize }) => {
	const imgPath = "http://192.168.8.158:5000/" + product.img;

	const getStyles = useCallback((imgSize) => {
		const styles = {
			productBox: {
				flex: 1,
				flexDirection: "row",
				width: "97%",
				alignSelf: "center",
				margin: 5,
				borderColor: "black",
				borderWidth: 1,
			},
			infoBox: {
				flex: 1,
				width: "65%",
				justifyContent: "space-between",
				paddingHorizontal: 10,
			},
			img: {
				width: "35%",
				height: imgSize,
				resizeMode: "contain",
				backgroundColor: "white",
			},
			textTitle: {
				width: "100%",
				fontSize: 22,
				fontWeight: "700",
			},
			textPrice: {
				fontSize: 20,
				fontWeight: "600",
			},
		};

		return StyleSheet.create(styles);
	}, []);

	const styles = getStyles(imgSize);

	return (
		<Pressable
			style={styles.productBox}
			onPress={() =>
				navigation.navigate("Product", {
					productId: product.id,
					title: product.name,
				})
			}
		>
			<Image style={styles.img} source={{ uri: imgPath }} />
			<View style={styles.infoBox}>
				<Text style={styles.textTitle}>{product.name}</Text>
				<Text style={styles.textPrice}>{product.price} zl</Text>
			</View>
		</Pressable>
	);
};

export default ProductCard;
