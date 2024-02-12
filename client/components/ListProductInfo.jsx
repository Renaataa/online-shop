import { View, Text } from "react-native";
import { useCallback } from "react";

const ListProductInfo = ({ info }) => {
	const generateList = useCallback(() => {
		return info.map((сharacteristic) => {
			return (
				<Text key={сharacteristic.id}>
					{сharacteristic.title}: {сharacteristic.description}
				</Text>
			);
		});
	}, [info]);

	const list = generateList();

	return <View>{list}</View>;
};

export default ListProductInfo;
