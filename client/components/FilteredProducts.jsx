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

	let brandsState = useSelector((store) => store.brandReducer);
	let typesState = useSelector((store) => store.typeReducer);

	return (
		<>
			<Filter
				listAllDetails={brandsState.brands}
				filteredItems={"brand"}
				filterFunc={filterFunc}
				requestState={brandsState.stateBrand.state}
			/>
			<Filter
				listAllDetails={typesState.types}
				filteredItems={"type"}
				filterFunc={filterFunc}
				requestState={typesState.stateType.state}
			/>
		</>
	);
};

export default FilteredProducts;
