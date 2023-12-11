import { View, StyleSheet } from 'react-native'; 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

const ListProducts = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProducts()) 
    }, [])
    
    const listProducts = useSelector((store)=>store.productsReducer.products)
    //console.log(listProducts)   

    return (
        <View style={styles.container}>
            {
                listProducts.map((product) => {
                    return <ProductCard key={product.id} product={product} navigation={props.navigation} />
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