import { View, Text } from "react-native";

const ListProductInfo = (props) => {
    return (
        <View>
            {
                props.info.map((сharacteristic) => {
                    return <Text key={сharacteristic.id}>{сharacteristic.title}: {сharacteristic.description}</Text>
                })
            } 
        </View>
    );
}

export default ListProductInfo;