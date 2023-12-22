import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const ProductCard = (props) => {
    const imgPath = 'http://127.0.0.1:5000/' + props.product.img
    
    return (
        <Pressable
            style={styles.productBox}
            onPress={() => props.navigation.navigate('Product', {
                productId: props.product.id,
                title: props.product.name
            })}
        >
            <Image style={styles.img} source={imgPath} />
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
    img: {
        width: '30%',
        height: '125px'
    }
})

export default ProductCard;