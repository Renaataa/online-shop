import { useSelector } from "react-redux";
import { View, StyleSheet } from 'react-native'; 
import ProductTile from '../components/ProductTile';

const ListProducts = (props) => {

    const listProducts = useSelector((store)=>store.productsReducer)
    console.log(listProducts)

    return (
        <View style={styles.container}>
            {
                listProducts.map((product) => {
                    return <ProductTile key={product.id} product={product} navigation={props.navigation} />
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        margin: 20
    }
})

export default ListProducts;