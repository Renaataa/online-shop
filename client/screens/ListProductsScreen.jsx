import { View, Dimensions } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import ListProducts from "../components/ListProducts";
import FilteredProducts from "../components/FilteredProducts";
import { setImgSize } from "../store/slices/productsSlice";

export default function ListProductsScreen() {
	const { width, height } = Dimensions.get("window");
	const dispatch = useDispatch();
	const [newLimit, setNewLimit] = useState(null);
	const [requestSettings, setRequestSettings] = useState({
		page: 1,
		limit: 4,
		typeId: "",
		brandId: "",
	});

	useEffect(() => {
		const calculateSizes = () => {
			let calculatedPoductImgSize;

			if (width >= 700) {
				calculatedPoductImgSize = 180;
			} else if (width >= 500) {
				calculatedPoductImgSize = 160;
			} else if (width >= 390) {
				calculatedPoductImgSize = 140;
			} else {
				calculatedPoductImgSize = 118;
			}

			const calculatedNewLimit = Math.floor(height / calculatedPoductImgSize - 2);

			dispatch(setImgSize(calculatedPoductImgSize));
			setNewLimit(calculatedNewLimit);
		};

		if (!newLimit) {
			calculateSizes();
		}
	}, [width, height]);

	useEffect(() => {
		if (newLimit != null) setRequestSettings({ ...requestSettings, limit: newLimit });
	}, [newLimit]);

	const filterFunc = useCallback(
		(listId, property) => {
			const strId = listId.reduce(
				(accumulator, id) => accumulator + `${property}=${id}&`,
				"&"
			);
			setRequestSettings({
				...requestSettings,
				page: 1,
				[property]: strId,
			});
		},
		[requestSettings]
	);

	const changePage = useCallback(
		(newPage) => {
			setRequestSettings({
				...requestSettings,
				page: newPage,
			});
		},
		[requestSettings]
	);

	if (newLimit === null) {
		return <View />;
	} else {
		return (
			<View>
				<FilteredProducts filterFunc={filterFunc} />
				<ListProducts requestSettings={requestSettings} changePage={changePage} />
			</View>
		);
	}
}
