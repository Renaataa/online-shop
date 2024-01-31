import { View } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBrand } from "../store/slices/brandSlice";
import { loadType } from "../store/slices/typeSlice";
import Filter from "../components/Filter";

const FilteredProducts = ({ filterFunc }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadBrand());
		dispatch(loadType());
	}, []);

	let listBrands = useSelector((store) => store.brandReducer.brands);
	let listTypes = useSelector((store) => store.typeReducer.types);

	let stateBrands = useSelector(
		(store) => store.brandReducer.stateBrand.state
	);
	let stateTypes = useSelector((store) => store.typeReducer.stateType.state);

	return (
		<View>
			<Filter
				listAllDetails={listBrands}
				filteredItems={"brand"}
				filterFunc={filterFunc}
				requestState={stateBrands}
			/>
			<Filter
				listAllDetails={listTypes}
				filteredItems={"type"}
				filterFunc={filterFunc}
				requestState={stateTypes}
			/>
		</View>
	);
};

export default FilteredProducts;
