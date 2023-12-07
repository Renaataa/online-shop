import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from '../screens/ProductScreen';
import ProductItem from './ProductItem';
import path from 'react-native-path'

const ProductTile = (props) => {
    //const imgPath = 'require(\'' + path.resolve(__dirname, '..', '..', 'server/static', props.product.img) + '\')'
    //const imgPath = 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/server/static/' + props.product.img
    //console.log(imgPath)

    //????????????????????????????????????????????????????????????????????????????????????????????????????????????

    const Stack = createNativeStackNavigator();

    return (
        <Pressable
            style={styles.productBox}
            onPress={() => {
                return (
                    <Stack.Navigator>
                        <Stack.Screen name="Product" component={ProductScreen}/>
                    </Stack.Navigator>
                )
            }}
        >
            <Image style={styles.imgBox} source={require('C:/Users/renat/Desktop/Prog/Lessons/online-shop/server/static/a541185e-62d8-42f2-b55c-b82f2fec8658.jpg')} />
            <View style={styles.infoBox}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.product.name}</Text>
                <Text style={{fontSize: 15, fontWeight: 649}}>{props.product.price} zl</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    productBox: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        padding: 5
    },
    infoBox: {
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    imgBox: {
        width: '30%',
        height: '100px'
    }
})

export default ProductTile;