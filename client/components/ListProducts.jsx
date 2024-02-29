import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
	RefreshControl,
} from "react-native";
import { useEffect, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import { StateCode } from "../enums/EnumState";
import { AntDesign } from "@expo/vector-icons";

const ListProducts = ({ requestSettings, changePage }) => {
	const dispatch = useDispatch();
	const { width, height } = Dimensions.get("window");

	useEffect(() => {
		dispatch(loadProducts(requestSettings));
	}, [requestSettings]);

	const productsState = useSelector((store) => store.productsReducer);

	const update = useCallback(async () => {
		dispatch(loadProducts(requestSettings));
	}, [requestSettings]);

	const getStyles = useCallback(() => {
		const styles = {
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
			container: {
				flexGrow: 1,
				justifyContent: "flex-start",
				margin: 20,
			},
			pagination: {
				textAlign: "center",
				fontSize: 17,
				fontWeight: "500",
			},
			listProducts: {
				flexGrow: 1,
				borderWidth: 1,
			},
		};

		if (width >= 900) styles.pagination.fontSize = 26;
		else if (width >= 700) styles.pagination.fontSize = 22;
		else if (width >= 500) styles.pagination.fontSize = 18;

		return StyleSheet.create(styles);
	}, [width]);

	const styles = getStyles();

	if (productsState.stateProducts.state == StateCode.OK) {
		if (productsState.countProducts > 0) {
			return (
				<View style={styles.container}>
					<GestureHandlerRootView>
						<Swipeable
							onSwipeableWillClose={(value) => {
								switch (value) {
									case "left":
										if (requestSettings.page > 1)
											changePage(requestSettings.page - 1);
										break;
									case "right":
										if (
											requestSettings.page <
											productsState.countProducts /
												requestSettings.limit
										)
											changePage(requestSettings.page + 1);
										break;
								}
							}}
						>
							<FlatList
								contentContainerStyle={styles.listProducts}
								refreshControl={
									<RefreshControl
										refreshing={
											productsState.stateProducts.state ==
											StateCode.Processing
										}
										onRefresh={update}
									/>
								}
								data={productsState.products}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => {
									return <ProductCard key={item.id} product={item} />;
								}}
							/>
							<Text style={styles.pagination}>
								⸺⸺ {requestSettings.page} ⸺⸺
							</Text>
						</Swipeable>
					</GestureHandlerRootView>
				</View>
			);
		} else {
			return (
				<View style={styles.erorContainer}>
					<Text style={styles.erorTxt}>
						There are no products within choosed categories
					</Text>
					<AntDesign name="frowno" size={30} color="dimgray" />
				</View>
			);
		}
	} else if (productsState.stateProducts.state == StateCode.Error) {
		return (
			<View style={styles.erorContainer}>
				<Text style={styles.erorTxt}>"Opps... something went wrong"</Text>
				<AntDesign name="frowno" size={30} color="dimgray" />
			</View>
		);
	} else {
		return (
			<View style={styles.erorContainer}>
				<Text style={styles.erorTxt}>Products loading...</Text>
			</View>
		);
	}
};

export default ListProducts;
