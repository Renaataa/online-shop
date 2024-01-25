import { useEffect } from "react";
import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	Dimensions,
} from "react-native";

const getStyles = (width, height) => {
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
			height: 100,
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

	if (width >= 700) {
		(styles.textTitle.fontSize = 26),
			(styles.textPrice.fontSize = 22),
			(styles.img.height = 180);
	} else if (width >= 500) {
		(styles.textTitle.fontSize = 23),
			(styles.textPrice.fontSize = 20),
			(styles.img.height = 160);
	} else if (width >= 390) {
		(styles.textTitle.fontSize = 18), (styles.textPrice.fontSize = 17);
		styles.img.height = 140;
	} else {
		(styles.textTitle.fontSize = 17),
			(styles.textPrice.fontSize = 15),
			(styles.img.height = 118);
	}

	return StyleSheet.create(styles);
};
const ProductCard = ({ product, navigation, setLimit }) => {
	const { width, height } = Dimensions.get("window");
	const imgPath = "http://192.168.8.158:5000/" + product.img;
	const styles = getStyles(width, height);

	useEffect(() => {
		setLimit(Math.floor(height / styles.img.height - 2));
	}, [styles.img.height]);

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
