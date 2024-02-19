import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { StateCode } from "../enums/EnumState";

const Filter = ({
	listAllDetails,
	filteredItems,
	filterFunc,
	requestState,
}) => {
	const [selected, setSelected] = useState([]);
	const [listNames, setListNames] = useState([]);
	const { width, height } = Dimensions.get("window");

	useEffect(() => {
		setListNames(
			listAllDetails.map((item) => {
				return { id: item.id, name: item.name };
			})
		);
	}, [listAllDetails]);

	useEffect(() => {
		filterFunc(selected, `${filteredItems}Id`);
	}, [selected]);

	const getStyles = useCallback(() => {
		const styles = {
			container: {
				width: 160,
				marginLeft: 10,
			},
			SectionedMultiSelect: {
				selectToggleText: {
					fontSize: 17,
				},
				confirmText: {
					color: "black",
				},
				button: {
					backgroundColor: "white",
				},
			},
			erorTxt: {
				color: "dimgray",
				fontSize: 17,
				marginTop: 5,
				marginLeft: 20,
			},
		};

		if (width >= 900)
			styles.SectionedMultiSelect.selectToggleText.fontSize = 26;
		else if (width >= 700)
			styles.SectionedMultiSelect.selectToggleText.fontSize = 22;
		else if (width >= 500)
			styles.SectionedMultiSelect.selectToggleText.fontSize = 18;

		return StyleSheet.create(styles);
	}, [width]);

	const styles = getStyles();

	if (requestState == StateCode.OK) {
		return (
			<View style={styles.container}>
				<SectionedMultiSelect
					styles={{ ...styles.SectionedMultiSelect }}
					items={listNames}
					IconRenderer={MaterialIcons}
					uniqueKey="id"
					selectText={`${filteredItems}s`}
					selectedText=""
					showDropDowns={false}
					showChips={false}
					onSelectedItemsChange={setSelected}
					selectedItems={selected}
					modalWithTouchable={true}
				/>
			</View>
		);
	} else if (requestState == StateCode.Error) {
		return (
			<Text style={styles.erorTxt}>
				Filter for {filteredItems}s is not available
			</Text>
		);
	} else {
		return <Text style={styles.erorTxt}>Filter loading...</Text>;
	}
};

export default Filter;
