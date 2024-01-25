import { View, Text } from "react-native";

const ListProductInfo = ({ info }) => {
	return (
		<View>
			{info.map((сharacteristic) => {
				return (
					<Text key={сharacteristic.id}>
						{сharacteristic.title}: {сharacteristic.description}
					</Text>
				);
			})}
		</View>
	);
};

export default ListProductInfo;
